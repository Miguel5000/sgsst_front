import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/_service/usuarios.service';
import { environment } from 'src/environments/environment';
import { ValidacionComponent } from '../../utilitarios/validacion/validacion.component';

@Component({
  selector: 'app-cambio-de-clave',
  templateUrl: './cambio-de-clave.component.html',
  styleUrls: ['./cambio-de-clave.component.css']
})
export class CambioDeClaveComponent implements OnInit {

  nombre:any;
  token:string;
  contraseña:string;
  contraseña2:string;
  cambioForm: FormGroup;
  ruta:string;
  titulo:string;
 

  constructor(private _snackBar: MatSnackBar, 
    private usuariosService: UsuariosService,
    private router: Router) {
     this.cambioForm = this.createFormGroup();
     
    }
  
    createFormGroup() {
  
       return new FormGroup({
        token: new FormControl('', [Validators.required]),
        contraseña: new FormControl('',[Validators.required]),
        contraseña2: new FormControl('',Validators.required),
      }); 
    }
  
    ngOnInit(): void {
      this.ruta=this.router.url;
      console.log(this.ruta);
      if(this.ruta=="/recuperarClave"){
        this.titulo="Recuperar Contraseña";
        
      }else{
        this.titulo="Cambiar Contraseña";
        this.cambioForm.controls.token.removeValidators(Validators.required);
      }
      
    }
    getMensajeError() {
      let error: string[] = [];
  
      if(this.cambioForm.controls.token.hasError('required')) {
        error.push("Digite el token que le enviaron");
      }
  
      if(this.cambioForm.controls.contraseña.hasError('required')) {
        error.push("Digite la contraseña");
      }
  
      if(this.cambioForm.controls.contraseña2.hasError('required')) {
        error.push("Digite la confimación de contraseña");
      }
      if(this.cambioForm.controls.contraseña.value != this.cambioForm.controls.contraseña2.value){
        error.push("Las contraseñas no son iguales");
      }
  
      return error;
    }

    recuperarContrasena(){
      
      if(this.cambioForm.valid){
        
        const value = this.cambioForm.value
        this.token=value.token;
        this.contraseña=value.contraseña;
        this.contraseña2=value.contraseña2;
      
        let paquete={clave:this.contraseña}
        this.usuariosService.cambiarClave(this.token,paquete).subscribe(data => {
          this._snackBar.open('cambio de contraseña excelente', 'Cancel  ', {
            duration: 5000
          });
          this.router.navigate(['/iniciarSesion']);
        });
        
      }else{
        let error = this.getMensajeError();

        this._snackBar.openFromComponent(ValidacionComponent, {
          data: error,
          duration: 10000
        });
      }
    }

    cambiarClave(){
      if(this.cambioForm.valid){
        
        const value = this.cambioForm.value
        this.contraseña=value.contraseña;
        this.contraseña2=value.contraseña2;
        this.nombre=sessionStorage.getItem(environment.NOMBRE);
        console.log(this.nombre);
        let paquete={clave:this.contraseña,nombre:this.nombre}
        this.usuariosService.cambiarcontrasena(paquete).subscribe(data => {
          this._snackBar.open('cambio de contraseña excelente', 'Cancel  ', {
            duration: 5000
          });
          this.router.navigate(["/espacioDeTrabajoYServicio"]);
        });
        
      }else{
        let error = this.getMensajeError();


        this._snackBar.openFromComponent(ValidacionComponent, {
          data: error,
          duration: 10000
        });
      }
    }

    cambiarClaves(event:Event){
  
      
      if(this.ruta=="/recuperarClave"){
        this.recuperarContrasena();
      }else{
        console.log("entro al else")
        this.cambiarClave();
      }


    }

}
