import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CasoAcosoLaboral } from 'src/app/_model/CasoAcosoLaboral';
import { CausaCaso } from 'src/app/_model/CausaCaso';
import { Empresa } from 'src/app/_model/Empresa';
import { InvolucradosEnCaso } from 'src/app/_model/InvolucradosEnCaso';
import { Usuario } from 'src/app/_model/Usuario';
import { CasosAcosoLaboralService } from 'src/app/_service/casos-acoso-laboral.service';
import { UsuariosService } from 'src/app/_service/usuarios.service';
import { ValidacionComponent } from '../../utilitarios/validacion/validacion.component';

@Component({
  selector: 'app-enviar-reporte',
  templateUrl: './enviar-reporte.component.html',
  styleUrls: ['./enviar-reporte.component.css']
})
export class EnviarReporteComponent implements OnInit {

  informacion: string;
  causas: CausaCaso[] = [];
  opcionElegida: number;
  usuarios: Usuario[];
  usuariosFiltrados: Observable<Usuario[]>;
  usuariosFiltradosNoSync: Usuario[];
  empresa: Empresa;
  involucradosForm: FormGroup;
  hechosForm: FormGroup;
  sugerenciasForm: FormGroup;
  involucradosInterfaz: InvolucradoInterfaz[] = [];

  constructor(private casosAcosoLaboralService: CasosAcosoLaboralService,
    private usuariosService: UsuariosService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {

    let empresaJson = sessionStorage.getItem("empresa");

    let involucradoInicial: InvolucradoInterfaz = new InvolucradoInterfaz();
    involucradoInicial.nombre = "Involucrado";
    involucradoInicial.editable = false;

    this.involucradosInterfaz.push(involucradoInicial);

    this.involucradosForm = this.createFormGroupInvolucrados();
    this.hechosForm = this.createFormGroupHechos();
    this.sugerenciasForm = this.createFormGroupSugerencias();

    if (empresaJson != null) {

      this.empresa = JSON.parse(empresaJson);

      this.casosAcosoLaboralService.getCausas().subscribe(data => {

        this.causas = data;

        this.usuariosService.getEmpleados(this.empresa).subscribe(data2 => {

          this.usuarios = data2;

          let usuarioActualJson = sessionStorage.getItem("usuario");

          if(usuarioActualJson != null){

            let usuarioActual: Usuario = JSON.parse(usuarioActualJson);
            this.usuarios = this.usuarios.filter(usuario => usuario.nombre != usuarioActual.nombre);

            this.usuariosFiltrados = this.involucradosForm.controls.involucrado.valueChanges.pipe(
              startWith(''),
              map(value => this.getUsuariosFiltrados(value)),
            );

          }

        })

      })

    }

  }

  createFormGroupInvolucrados() {

    return new FormGroup({

      involucrado: new FormControl('', [
        Validators.required,
      ]),

    });

  }

  createFormGroupHechos() {

    return new FormGroup({

      hecho: new FormControl('', [
        Validators.required,
      ]),

    });

  }

  createFormGroupSugerencias() {

    return new FormGroup({

      sugerencia: new FormControl('', [
        Validators.required,
      ]),

    });

  }

  cargarInformacion(event: Event) {

    let elemento: HTMLInputElement = event.target as HTMLInputElement;
    this.informacion = this.causas.filter(causa => causa.id == parseInt(elemento.value))[0].informacion;
    this.opcionElegida = parseInt(elemento.value);

  }

  getUsuariosFiltrados(valor: string) {

    return this.usuarios.filter(elemento => elemento.nombre.toLocaleLowerCase().includes(valor.toLocaleLowerCase()));

  }

  agregarInvolucrado() {

    if (this.involucradosForm.valid) {

      let involucradoAgregar: InvolucradoInterfaz = new InvolucradoInterfaz();
      involucradoAgregar.nombre = this.involucradosForm.controls.involucrado.value;
      involucradoAgregar.editable = false;
      this.involucradosInterfaz.push(involucradoAgregar);

    }else{

      this.snackBar.open("Introduzca el nombre del involucrado", "close", {duration:3000});

    }

  }

  hacerEditable(involucradoInterfaz: InvolucradoInterfaz) {

    involucradoInterfaz.editable = true;

  }

  editar(involucradoInterfaz: InvolucradoInterfaz) {

    involucradoInterfaz.editable = false;

  }

  eliminar(involucradoInterfaz: InvolucradoInterfaz){

    let indice: number = this.involucradosInterfaz.indexOf(involucradoInterfaz);

    this.involucradosInterfaz.splice(indice, 1);

  }

  buscarInvolucrado(event: Event) {

    let elemento: HTMLInputElement = event.target as HTMLInputElement;
    this.usuariosFiltradosNoSync = this.getUsuariosFiltrados(elemento.value);

  }

  validarInputInvolucrado(event: Event) {

    let elemento: HTMLInputElement = event.target as HTMLInputElement;
    if (this.usuarios.filter(usuario => usuario.nombre == elemento.value).length > 0 || elemento.value == "") {

      elemento.style.backgroundColor = "white";

    } else {

      elemento.style.backgroundColor = "red";

    }

  }

  getMensajeError(){

    let mensajeError: string[] = [];

    if (this.hechosForm.controls.hecho.hasError('required')) {

      mensajeError.push("Introduzca los hechos");

    }

    if (this.sugerenciasForm.controls.sugerencia.hasError('required')) {

      mensajeError.push("Introduzca la sugerencia");

    }

    if(this.opcionElegida == null){

      mensajeError.push("Selecciona una causa");

    }

    for(let i=0; i<this.involucradosInterfaz.length; i++){

      if(this.usuarios.filter(usuario => usuario.nombre == this.involucradosInterfaz[i].nombre).length == 0){

        mensajeError.push("Hay entradas inváldas en la lista de involucrados");
        break;

      }

    }

    let nombresInvolucrados: string[] = [];

    this.involucradosInterfaz.forEach(element => {

      nombresInvolucrados.push(element.nombre);
      
    });

    if ((new Set(nombresInvolucrados)).size !== nombresInvolucrados.length) {
      mensajeError.push("Hay involucrados repetidos");
    }

    return mensajeError;

  }

  enviar(){
  
    let mensajeError = this.getMensajeError();

    if (mensajeError.length > 0) {

      this.snackBar.openFromComponent(ValidacionComponent, {
        data: mensajeError,
        duration: 3000
      });

    }

    if(this.hechosForm.valid && this.sugerenciasForm.valid && mensajeError.length == 0){

      let casoAcosoLaboral: CasoAcosoLaboral = new CasoAcosoLaboral();
      let fechaActual = new Date();
      casoAcosoLaboral.fecha = fechaActual.getFullYear() + "-" + (fechaActual.getMonth()+1) + "-" + fechaActual.getDate();
      casoAcosoLaboral.hechos = this.hechosForm.controls.hecho.value;
      casoAcosoLaboral.sugerencia = this.sugerenciasForm.controls.sugerencia.value;

      let usuarioJson = sessionStorage.getItem("usuario");

      if(usuarioJson != null){

        let creador: Usuario = JSON.parse(usuarioJson);

        casoAcosoLaboral.idCreador = creador.id;
        casoAcosoLaboral.idEmpresa = this.empresa.id;
        casoAcosoLaboral.idEstado = 1;
        casoAcosoLaboral.idCausa = this.opcionElegida;

        this.casosAcosoLaboralService.crear(casoAcosoLaboral).subscribe(data => {

          this.involucradosInterfaz.forEach(element => {
            
            let involucracion: InvolucradosEnCaso = new InvolucradosEnCaso();
            involucracion.idReporte = data.id;
            involucracion.idUsuario = this.usuarios.filter(usuario => usuario.nombre == element.nombre)[0].id;

            this.casosAcosoLaboralService.crearInvolucrado(involucracion).subscribe(data2 => {

              this.snackBar.open("Se ha enviado con éxito el reporte", "close", {duration:3000});
              this.router.navigate(["/servicio/acosoLaboral"]);

            })

          });

        })

      }

    }

  }

}


class InvolucradoInterfaz {

  nombre: string;
  editable: boolean;

}