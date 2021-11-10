import { Router } from '@angular/router';
import { Component, DoCheck } from '@angular/core';
import { UsuariosService } from './_service/usuarios.service';

var jquery: NodeRequire = require("../assets/jquery.js");

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {

  inputArchivo: any;
  sesionIniciada: boolean;
  title = 'sgsst-front';
  activacionDesglose: boolean;
  reader: FileReader;
  apoyo: any;

  constructor(private router: Router, private usuariosService: UsuariosService) {

    (<any>window).jQuery = jquery;
    (<any>window).$ = jquery;
    var nicepage: NodeRequire = require("../assets/nicepage.js");

    this.activacionDesglose = false;

  }

  ngDoCheck(): void {

    let jsonUsuario: string | null = sessionStorage.getItem("usuario");
    if (jsonUsuario == null) {
      this.sesionIniciada = false;
    } else {
      this.sesionIniciada = true;
    }

  }

  desglose() {

    if (this.activacionDesglose == true) {
      this.activacionDesglose = false;
    } else {
      this.activacionDesglose = true;
    }

  }

  onFileSelected(event: any) {

    let archivoInput:File = event.target.files[0];
    /*archivoInput.arrayBuffer().then(buffer => {
      let archivo = new Uint8Array(buffer);
      this.usuariosService.guardarArchivo(archivo).subscribe();
    });*/
    console.log(archivoInput.type);

  }

  



  onResize(event: any) {
    let ancho = event.target.innerWidth;
    if (ancho > 992) {

      this.activacionDesglose = false;

    }
  }

  cerrarSesion() {

    sessionStorage.removeItem("usuario");
    sessionStorage.removeItem("rol");
    this.router.navigate(["/paginaInicio"]);

  }

}
