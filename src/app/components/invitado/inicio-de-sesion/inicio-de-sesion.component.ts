import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { Usuario } from 'src/app/_model/Usuario';
import { UsuariosService } from 'src/app/_service/usuarios.service';
import { ValidacionComponent } from '../../utilitarios/validacion/validacion.component';

@Component({
  selector: 'app-inicio-de-sesion',
  templateUrl: './inicio-de-sesion.component.html',
  styleUrls: ['./inicio-de-sesion.component.css']
})
export class InicioDeSesionComponent implements OnInit {

  loginForm: FormGroup;

  correo: string;

  constructor(private _snackBar: MatSnackBar, 
    private usuariosService: UsuariosService,
    private router: Router) {

    this.loginForm = this.createFormGroup();

  }

  createFormGroup() {

    return new FormGroup({

      correo: new FormControl('', [
        Validators.required,
        Validators.email
      ] ),
      clave: new FormControl('', [
        Validators.required
      ] ),
      inputArchivo: new FormControl('', [
        Validators.required
      ] ),

    });

  }

  ngOnInit(): void {



  }

  getMensajeError(){

    let mensajeError:string[] = [];

    if(this.loginForm.controls.correo.hasError('email') || this.loginForm.controls.correo.hasError('required')){

      mensajeError.push("Digite un correo electrónico válido");

    }

    if(this.loginForm.controls.clave.hasError('required')){

      mensajeError.push("Digite la contraseña");

    }

    return mensajeError;

  }

  activarInputFile(){

    let elemento = document.getElementById("archivador") as HTMLElement;
    elemento.click();
    return false;

  }



  ejecucion(){

    console.log("Ejecutando");

  }

  iniciarSesion(event: Event){

    if (this.loginForm.valid) {

      const value = this.loginForm.value;

      let usuario:Usuario = new Usuario();
      usuario.correo = value.correo;
      usuario.clave = value.clave;

      this.usuariosService.iniciarSesion(usuario).subscribe(

        data => {console.log(data);
                sessionStorage.setItem("usuario", JSON.stringify(data));

                this.usuariosService.getRol(data).subscribe( data2 => {

                  sessionStorage.setItem("rol", data2.nombre);
                  this.router.navigate(['espacioDeTrabajoYServicio']);}
          
                );

              }, 
        err => {console.log(err);
              this._snackBar.open("Usuario inexistente", "Cerrar", {duration: 3000});
            }

      );

    }else{


      let mensajeError = this.getMensajeError();
      
      this._snackBar.openFromComponent(ValidacionComponent, {
        data: mensajeError,
        duration: 3000
      });

    }

  }

}
