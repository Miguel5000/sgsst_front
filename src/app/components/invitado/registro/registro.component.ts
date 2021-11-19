import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Empresa } from 'src/app/_model/Empresa';
import { TipoBrigada } from 'src/app/_model/TipoBrigada';
import { Usuario } from 'src/app/_model/Usuario';
import { EmpresasService } from 'src/app/_service/empresas.service';
import { UsuariosService } from 'src/app/_service/usuarios.service';
import { ValidacionComponent } from '../../utilitarios/validacion/validacion.component';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  //Objeto que inicializa el select de tipo de brigada
  selectBrigada: TipoBrigada = { id: 0, clase: ''};
  //Objeto de tipo array de la clase TipoBrigada para asignas las brigadas
  brigada: TipoBrigada[];
  idEmpresa: number;
  registroForm: FormGroup;
  preg: String;
  activacionTipoBrigada: boolean;
  inputArchivo: any;
  reader: FileReader;
  imagenCargada: string;
  urlImagen: string;

  constructor(private _snackBar: MatSnackBar,
    private empresasService: EmpresasService,
    private usuariosService: UsuariosService,
    private router: Router) { 
      this.registroForm = this.createFormGroup();
    }

  createFormGroup() {
    return new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      celular: new FormControl('', [Validators.required]),
      correo: new FormControl('', [Validators.required, Validators.email]),
      contraseña: new FormControl('', [Validators.required]),
      confirmacion: new FormControl('', [Validators.required]),
      nombreEmpresa: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      area: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required]),
      logotipo: new FormControl('', [Validators.required]),
      pregunta: new FormControl('', [Validators.required]),
      brigada: new FormControl('', /*[Validators.required]*/)
    });
  }

  ngOnInit(): void {

    this.activacionTipoBrigada = false;
    this.empresasService.getBrigadas().subscribe(data => {
      this.brigada = data;
    });
  }

  onFileSelected(event: any): File {
    let archivoInput:File = event.target.files[0];

    let reader = new FileReader();

    const value = this.registroForm.value;

    archivoInput.arrayBuffer().then(buffer => {
      let archivo = new Uint8Array(buffer);
      this.empresasService.guardarArchivo(archivo, value.nombreEmpresa).subscribe( data => {
        this.urlImagen = "https://localhost:44330" + "/imagenes/" + value.nombreEmpresa + "_logo.jpg";
        console.log(this.urlImagen);
      });
    });

    reader.onload = function (e) {

      let elemento = document.getElementById("imagenCargada") as HTMLImageElement; 
      let resultado= e.target?.result;
      if(typeof(resultado) == 'string'){

        elemento.src = resultado;

      }

    }

    reader.readAsDataURL(archivoInput);
    
    return archivoInput;
  }

  getMensajeError() {
    let error: string[] = [];

    if(this.registroForm.controls.nombre.hasError('required')) {
      error.push("Digite el nombre del usuario");
    }
    if(this.registroForm.controls.apellido.hasError('required')) {
      error.push("Digite el apellido del usuario");
    }
    if(this.registroForm.controls.celular.hasError('required')) {
      error.push("Digite el celular del usuario");
    }

    if(this.registroForm.controls.correo.hasError('email') || this.registroForm.controls.correo.hasError('required')){
      error.push("Digite un correo electrónico válido");
    }
    if(this.registroForm.controls.contraseña.hasError('required')) {
      error.push("Digite el contraseña del usuario");
    }
    
    if(this.registroForm.controls.confirmacion.hasError('required')) {
      error.push("Digite la confimación de contraseña del usuario");
    }
    
    if(this.registroForm.controls.nombreEmpresa.hasError('required')) {
      error.push("Digite el nombre de la empresa");
    }
    
    if(this.registroForm.controls.direccion.hasError('required')) {
      error.push("Digite la dirección de la empresa");
    }
    
    if(this.registroForm.controls.area.hasError('required')) {
      error.push("Digite el área de la empresa");
    }
    
    if(this.registroForm.controls.telefono.hasError('required')) {
      error.push("Digite el telefono de la empresa");
    }

    if(this.registroForm.controls.logotipo.hasError('required')) {
      error.push("Suba el logotipo de la empresa");
    }

    if(this.registroForm.controls.pregunta.hasError('required')) {
      error.push("De una respuesta a la pregunta");
    }

    /*if(this.registroForm.controls.brigada.hasError('required')) {
      error.push("Seleccione una brigada");
    }*/

    if(this.registroForm.controls.contraseña.value != this.registroForm.controls.confirmacion.value){
      error.push("Las contraseñas no son iguales");
    }
    return error;
  }

  crearUsuario(event: Event) {
    if (this.registroForm.valid) {
      const value = this.registroForm.value;

      let empresa: Empresa = new Empresa();
      empresa.nombre = value.nombreEmpresa;
      empresa.direccion = value.direccion;
      empresa.dimensionArea = value.area;
      empresa.telefono = value.telefono;
      empresa.logotipo = this.urlImagen;
      empresa.idTipoBrigada = value.brigada;

      this.empresasService.crear(empresa).subscribe( data => {
        data["id"];

        let usuario: Usuario = new Usuario();

        const name = value.nombre;
        const lastname = value.apellido;

        usuario.nombre = (name.concat(' ', lastname));
        usuario.celular = value.celular;
        usuario.correo = value.correo;
        usuario.clave = value.contraseña;
        usuario.idEmpresa = data["id"];
        usuario.idRol = 3;
        usuario.idArea = 4;

        this.usuariosService.crear(usuario).subscribe( data => {
          this._snackBar.open('Usuario registrado exitosamente', 'Cancel  ', {
            duration: 3000
          });
        })
        
        this.router.navigate(["/iniciarSesion"])

      });
    } else {
      let error = this.getMensajeError();

      this._snackBar.openFromComponent(ValidacionComponent, {
        data: error,
        duration: 10000
      });
    }
  }

  habilitarTiposBrigada(valor: string){

    if(valor == "Si"){

      this.activacionTipoBrigada = true;

    }else{

      this.activacionTipoBrigada = false;

    }

  }

  onResetForm() {
    this.registroForm.reset();

    let elemento = document.getElementById("imagenCargada") as HTMLImageElement; 
    elemento.src == undefined;

    Object.keys(this.registroForm.controls).forEach(key => {
      this.registroForm.get(key)?.setErrors(null);
    });
  }

}
