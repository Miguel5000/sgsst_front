import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { Usuario } from 'src/app/_model/Usuario';
import { EmpresasService } from 'src/app/_service/empresas.service';
import { UsuariosService } from 'src/app/_service/usuarios.service';
import { environment } from 'src/environments/environment';
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
    private empresasService: EmpresasService,
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
      ] )

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

  iniciarSesion(event: Event){

    if (this.loginForm.valid) {

      const value = this.loginForm.value;

      let usuario:Usuario = new Usuario();
      usuario.correo = value.correo;
      usuario.clave = value.clave;

      this.usuariosService.iniciarSesion(usuario).subscribe(

        data => {console.log(data);
                sessionStorage.setItem("usuario", JSON.stringify(data));
                sessionStorage.setItem(environment.NOMBRE,data.nombre);

                this.usuariosService.getRol(data).subscribe( data2 => {

                  sessionStorage.setItem("rol", data2.nombre);
                  
                  this.empresasService.get(data.idEmpresa).subscribe( data3 => {
                    
                    sessionStorage.setItem("empresa", JSON.stringify(data3));
                    
                  });

                  this.router.navigate(['espacioDeTrabajoYServicio']);
                });
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
