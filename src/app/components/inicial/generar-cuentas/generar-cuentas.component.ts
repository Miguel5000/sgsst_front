import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Area } from 'src/app/_model/Area';
import { Empresa } from 'src/app/_model/Empresa';
import { Rol } from 'src/app/_model/Rol';
import { Usuario } from 'src/app/_model/Usuario';
import { AreasService } from 'src/app/_service/areas.service';
import { UsuariosService } from 'src/app/_service/usuarios.service';
import { ValidacionComponent } from '../../utilitarios/validacion/validacion.component';

@Component({
  selector: 'app-generar-cuentas',
  templateUrl: './generar-cuentas.component.html',
  styleUrls: ['./generar-cuentas.component.css']
})
export class GenerarCuentasComponent implements OnInit {

  usuariosInterfaz: UsuarioInterfaz[] = [];
  usuariosInterfazFiltrados: UsuarioInterfaz[] = [];
  empresa: Empresa = new Empresa();
  creacionForm: FormGroup;
  roles: Rol[];
  areas: Area[];

  constructor(private usuarioService: UsuariosService,
    private areasService: AreasService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.creacionForm = this.createFormGroup();

    let empresaJson = sessionStorage.getItem("empresa");

    if (empresaJson != null) {

      this.empresa = JSON.parse(empresaJson);

      this.usuarioService.getRoles().subscribe(data => {

        this.roles = data;
        this.roles = this.roles.filter(rol => rol.nombre != "Director del SGSST");

      })

      this.areasService.getAreas(this.empresa).subscribe(data => {

        this.areas = data;

      })

      this.actualizar();

    }
  }

  createFormGroup() {

    return new FormGroup({

      nombre: new FormControl('', [
        Validators.required
      ]),
      area: new FormControl(null, [
        Validators.required
      ]),
      rol: new FormControl(null, [
        Validators.required
      ]),
      celular: new FormControl('', [
        Validators.required
      ]),
      correo: new FormControl('', [
        Validators.required,
        Validators.email
      ])

    });

  }

  getMensajeError() {

    let mensajeError: string[] = [];

    if (this.creacionForm.controls.nombre.hasError('required')) {

      mensajeError.push("Introduzca un nombre");

    }

    if (this.creacionForm.controls.area.hasError('required')) {

      mensajeError.push("Introduzca un área");

    }

    if (this.creacionForm.controls.rol.hasError('required')) {

      mensajeError.push("Introduzca un rol");

    }

    if (this.creacionForm.controls.celular.hasError('required')) {

      mensajeError.push("Introduzca un número de celular");

    }

    if (this.creacionForm.controls.correo.hasError('required') || this.creacionForm.controls.correo.hasError('email')) {

      mensajeError.push("Introduzca un correo válido");

    }

    return mensajeError;

  }

  filtrar(event: Event) {

    let elemento: HTMLInputElement = event.target as HTMLInputElement;

    this.usuariosInterfazFiltrados = this.usuariosInterfaz.filter(usuario => usuario.nombre.toLowerCase().includes(elemento.value.toLowerCase()) ||
    usuario.correo.toLowerCase().includes(elemento.value.toLowerCase()) ||
    usuario.celular.toLowerCase().includes(elemento.value.toLowerCase()) ||
    usuario.area.toLowerCase().includes(elemento.value.toLowerCase()) ||
    usuario.rol.toLowerCase().includes(elemento.value.toLowerCase()) );

  }

  actualizar() {

    this.usuarioService.getEmpleados(this.empresa).subscribe(data => {

      data.forEach(element => {

        this.usuarioService.getRol(element).subscribe(data2 => {

          this.areasService.getParaUsuario(element).subscribe(data3 => {

            let usuarioInterfaz: UsuarioInterfaz = new UsuarioInterfaz();
            usuarioInterfaz.nombre = element.nombre;
            usuarioInterfaz.correo = element.correo;
            usuarioInterfaz.celular = element.celular;
            usuarioInterfaz.area = data3.nombre;
            usuarioInterfaz.rol = data2.nombre;

            this.usuariosInterfaz.push(usuarioInterfaz);
            this.usuariosInterfazFiltrados = this.usuariosInterfaz.filter(usuario => usuario.nombre.toLowerCase().includes(""));

          })

        })

      });

    })


  }

  agregar() {

    if (this.creacionForm.valid) {

      let usuarioAgregar: Usuario = new Usuario();
      usuarioAgregar.nombre = this.creacionForm.controls.nombre.value;
      usuarioAgregar.idRol = this.creacionForm.controls.rol.value;
      usuarioAgregar.idEmpresa = this.empresa.id;
      usuarioAgregar.idArea = this.creacionForm.controls.area.value;
      usuarioAgregar.correo = this.creacionForm.controls.correo.value;
      usuarioAgregar.celular = this.creacionForm.controls.celular.value;
      let fechaReset: Date = new Date();
      fechaReset.setHours(0, 0);
      usuarioAgregar.clave = (new Date().getTime() - fechaReset.getTime()).toString();

      this.usuarioService.isAgregable(usuarioAgregar).subscribe(data => {

        if (data) {

          this.usuarioService.crear(usuarioAgregar).subscribe(data2 => {

            this.usuarioService.enviarCorreoCreacion(usuarioAgregar.correo, usuarioAgregar.clave).subscribe(data3 => {

              this._snackBar.open("Usuario creado exitosamente", "close", { duration: 3000 });
              this.creacionForm.reset();
              this.usuariosInterfaz = [];
              this.usuariosInterfazFiltrados = [];
              this.actualizar();

            })

          })


        } else {

          this._snackBar.open("Ya existe un usuario con el correo o celular introducidos", "close", { duration: 3000 });

        }

      })

    } else {

      let mensajeError = this.getMensajeError();

      this._snackBar.openFromComponent(ValidacionComponent, {
        data: mensajeError,
        duration: 3000
      });

    }

  }

}

class UsuarioInterfaz {

  nombre: string;
  area: string;
  rol: string;
  correo: string;
  celular: string;

}