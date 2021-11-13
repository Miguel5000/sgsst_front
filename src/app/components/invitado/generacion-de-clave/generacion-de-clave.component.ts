import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuariosService } from 'src/app/_service/usuarios.service';
import { Router } from '@angular/router';


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
      correo: new FormControl('', [Validators.required, Validators.email]),
    }); 
  }

  ngOnInit(): void {
 }

  generarToken(event: Event){
    console.log("entroif");
    if(this.generarForm.valid){

      const value = this.generarForm.value
      this.correo=value.correo;
      let paquete={correo:this.correo}
      

      this.usuariosService.generarToken(paquete).subscribe(data => {
        this._snackBar.open('Recibira un correo con el token para continuar con el proceso', 'Cancel  ', {
          duration: 5000
        });
        this.router.navigate(['/recuperarClave']);
      });
    }else{
      console.log("formularioinvalido");

      if(this.generarForm.controls.correo.hasError('email') || this.generarForm.controls.correo.hasError('required')){
        this._snackBar.open('Digite un correo electrónico válido', 'Cancel  ', {
          duration: 5000
        });
       }
    }
  }
}


