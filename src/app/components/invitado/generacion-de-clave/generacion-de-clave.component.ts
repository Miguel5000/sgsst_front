import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuariosService } from 'src/app/_service/usuarios.service';
import { Router } from '@angular/router';
import { ValidacionComponent } from '../../utilitarios/validacion/validacion.component';


@Component({
  selector: 'app-generacion-de-clave',
  templateUrl: './generacion-de-clave.component.html',
  styleUrls: ['./generacion-de-clave.component.css']
  
})
export class GeneracionDeClaveComponent implements OnInit {

 correo: string;
 generarForm: FormGroup;

 constructor(private _snackBar: MatSnackBar, 
  private usuariosService: UsuariosService,
  private router: Router) {

  this.generarForm = this.createFormGroup();
}

createFormGroup() {

  return new FormGroup({

    correo: new FormControl('', [
      Validators.required,
      Validators.email
    ] )
  });

}

ngOnInit(): void {
}

getMensajeError(){

  let mensajeError:string[] = [];

  if(this.generarForm.controls.correo.hasError('email') || this.generarForm.controls.correo.hasError('required')){

    mensajeError.push("Digite un correo electrónico válido");

  }
  return mensajeError;

}
  

  generarToken(event: Event){
    
    if(this.generarForm.valid){

      this.correo=this.correo = this.generarForm.controls["correo"].value;

      this.usuariosService.generarToken(this.correo).subscribe(data => {
        this._snackBar.open('Recibira un correo con el token para continuar con el proceso', 'Cancel  ', {
          duration: 5000
        });
        this.router.navigate(['/recuperarClave']);
      });
    }else{

      let mensajeError = this.getMensajeError();
      
      this._snackBar.openFromComponent(ValidacionComponent, {
        data: mensajeError,
        duration: 3000
      });

    }
  }

}

