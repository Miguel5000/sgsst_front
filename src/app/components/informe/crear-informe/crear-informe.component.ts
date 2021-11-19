import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { InformeMejora } from 'src/app/_model/InformeMejora';
import { InformesMejoraService } from 'src/app/_service/informes-mejora.service';
import { ValidacionComponent } from '../../utilitarios/validacion/validacion.component';

@Component({
  selector: 'app-crear-informe',
  templateUrl: './crear-informe.component.html',
  styleUrls: ['./crear-informe.component.css']
})
export class CrearInformeComponent implements OnInit {

  temasForm: FormGroup;
  temas: String[] = [];
  temasInterfaz: TemaInterfaz[];
  editableTemas: boolean[];
  medidasEForm: FormGroup;
  medidasE: String[] = [];
  medidasEInterfaz: MedidaEInterfaz[];
  editableMedidasE: boolean[];
  medidasDForm: FormGroup;
  medidasD: String[] = [];
  medidasDInterfaz: MedidaDInterfaz[];
  editableMedidasD: boolean[];
  medidasCoForm: FormGroup;
  medidasCo: String[] = [];
  medidasCoInterfaz: MedidaCoInterfaz[];
  editableMedidasCo: boolean[];
  medidasCclForm: FormGroup;
  medidasCcl: String[] = [];
  medidasCclInterfaz: MedidaCclInterfaz[];
  editableMedidasCcl: boolean[];

  publicacion: boolean;
  idEmpresa: number;

  informeAEditar: InformeMejora = new InformeMejora();

  editando: boolean = false;

  constructor(private _snackBar: MatSnackBar,
    private informesMejoraService: InformesMejoraService,
    private router: Router) {

    this.temasForm = this.createFormGroupTemas();
    this.editableTemas = [];
    this.temasInterfaz = [];

    this.medidasEForm = this.createFormGroupMedidasEmpleador();
    this.editableMedidasE = [];
    this.medidasEInterfaz = [];

    this.medidasDForm = this.createFormGroupMedidasDirector();
    this.editableMedidasD = [];
    this.medidasDInterfaz = [];

    this.medidasCoForm = this.createFormGroupMedidasCopasst();
    this.editableMedidasCo = [];
    this.medidasCoInterfaz = [];

    this.medidasCclForm = this.createFormGroupMedidasCcl();
    this.editableMedidasCcl = [];
    this.medidasCclInterfaz = [];
  }

  createFormGroupTemas() {
    return new FormGroup({
      tema: new FormControl('', [Validators.required,])
    });
  }

  createFormGroupMedidasEmpleador() {
    return new FormGroup({
      medidaE: new FormControl('', [Validators.required,])
    });
  }

  createFormGroupMedidasDirector() {
    return new FormGroup({
      medidaD: new FormControl('', [Validators.required,])
    });
  }

  createFormGroupMedidasCopasst() {
    return new FormGroup({
      medidaCo: new FormControl('', [Validators.required,])
    });
  }

  createFormGroupMedidasCcl() {
    return new FormGroup({
      medidaCcl: new FormControl('', [Validators.required,])
    });
  }

  ngOnInit(): void {
    let empresa: any = sessionStorage.getItem("empresa");
    let JsonEmpresa = JSON.parse(empresa);
    this.idEmpresa = JsonEmpresa.id;

    this.informesMejoraService.getMostrarUltimo(this.idEmpresa).subscribe(data => {
      this.editando = true;
      let informe: InformeMejora = new InformeMejora();
      this.informeAEditar = data;
      informe.publicacion = data.publicacion;
      informe.temas = data.temas;
      informe.medidas = data.medidas;

      let JSONTemas = JSON.parse(informe.temas);
      let JsonMedidas = JSON.parse(informe.medidas);

      for (let i = 0; i < JSONTemas.length; i++) {
        this.temasInterfaz.push(JSONTemas[i]);
        this.editableTemas.push(true);
      }

      for (let i = 0; i < JsonMedidas.empleador.length; i++) {
        this.medidasEInterfaz.push(JsonMedidas.empleador[i]);
        this.editableMedidasE.push(true);
      }

      for (let i = 0; i < JsonMedidas.director.length; i++) {
        this.medidasDInterfaz.push(JsonMedidas.director[i]);
        this.editableMedidasD.push(true);
      }

      for (let i = 0; i < JsonMedidas.copasst.length; i++) {
        this.medidasCoInterfaz.push(JsonMedidas.copasst[i]);
        this.editableMedidasCo.push(true);
      }

      for (let i = 0; i < JsonMedidas.ccl.length; i++) {
        this.medidasCclInterfaz.push(JsonMedidas.ccl[i]);
        this.editableMedidasCcl.push(true);
      }

    }, err => {
      let temaInicial: TemaInterfaz = new TemaInterfaz();
      temaInicial.descripcion = "Tema";
      this.temasInterfaz.push(temaInicial);
      this.editableTemas.push(false);

      let medidaEInicial: MedidaEInterfaz = new MedidaEInterfaz();
      medidaEInicial.descripcion = "MedidaEmpleador";
      this.medidasEInterfaz.push(medidaEInicial);
      this.editableMedidasE.push(false);

      let medidaDInicial: MedidaDInterfaz = new MedidaDInterfaz();
      medidaDInicial.descripcion = "MedidaDirector";
      this.medidasDInterfaz.push(medidaDInicial);
      this.editableMedidasD.push(false);

      let medidaCoInicial: MedidaCoInterfaz = new MedidaCoInterfaz();
      medidaCoInicial.descripcion = "MedidaCopasst";
      this.medidasCoInterfaz.push(medidaCoInicial);
      this.editableMedidasCo.push(false);

      let medidaCclInicial: MedidaCclInterfaz = new MedidaCclInterfaz();
      medidaCclInicial.descripcion = "MedidaCcl";
      this.medidasCclInterfaz.push(medidaCclInicial);
      this.editableMedidasCcl.push(false);
    });
  }

  agregarTema() {
    if (this.temasForm.valid) {
      let nuevoTema: TemaInterfaz = new TemaInterfaz();
      nuevoTema.descripcion = this.temasForm.controls.tema.value;
      this.temasInterfaz.push(nuevoTema);
      this.editableTemas.push(true);
    } else {
      this._snackBar.open("Introduzca un tema", "close", {
        duration: 3000
      });
    }
    this.temasForm.reset();
  }

  agregarMedidasEmpleador() {
    if (this.medidasEForm.valid) {
      let nuevaMedidaE: MedidaEInterfaz = new MedidaEInterfaz();
      nuevaMedidaE.descripcion = this.medidasEForm.controls.medidaE.value;
      this.medidasEInterfaz.push(nuevaMedidaE);
      this.editableMedidasE.push(true);
    } else {
      this._snackBar.open("Introduzca una medida", "close", {
        duration: 3000
      });
    }
    this.medidasEForm.reset();
  }

  agregarMedidasDirector() {
    if (this.medidasDForm.valid) {
      let nuevaMedidaD: MedidaDInterfaz = new MedidaDInterfaz();
      nuevaMedidaD.descripcion = this.medidasDForm.controls.medidaD.value;
      this.medidasDInterfaz.push(nuevaMedidaD);
      this.editableMedidasD.push(true);
    } else {
      this._snackBar.open("Introduzca una medida", "close", {
        duration: 3000
      });
    }
    this.medidasDForm.reset();
  }

  agregarMedidasCopasst() {
    if (this.medidasCoForm.valid) {
      let nuevaMedidaCo: MedidaCoInterfaz = new MedidaCoInterfaz();
      nuevaMedidaCo.descripcion = this.medidasCoForm.controls.medidaCo.value;
      this.medidasCoInterfaz.push(nuevaMedidaCo);
      this.editableMedidasCo.push(true);
    } else {
      this._snackBar.open("Introduzca una medida", "close", {
        duration: 3000
      });
    }
    this.medidasCoForm.reset();
  }

  agregarMedidasCcl() {
    if (this.medidasCclForm.valid) {
      let nuevaMedidaCcl: MedidaCclInterfaz = new MedidaCclInterfaz();
      nuevaMedidaCcl.descripcion = this.medidasCclForm.controls.medidaCcl.value;
      this.medidasCclInterfaz.push(nuevaMedidaCcl);
      this.editableMedidasCcl.push(true);
    } else {
      this._snackBar.open("Introduzca una medida", "close", {
        duration: 3000
      });
    }
    this.medidasCclForm.reset();
  }

  getMensajeError() {
    let mensajeError: string[] = [];

    if ((this.temasInterfaz.filter(tema => tema.descripcion == 'Tema').length > 0)) {
      mensajeError.push("Hay entradas invalidas en la lista de temas");
    }

    if (this.temasInterfaz.length == 0) {

      mensajeError.push("Debe haber al menos un tema");

    }

    if (this.medidasEInterfaz.filter(medidaE => medidaE.descripcion == 'MedidaEmpleador').length > 0) {
      mensajeError.push("Hay entradas invalidas en la lista de medidas empleador");
    }

    if (this.medidasDInterfaz.filter(medidasD => medidasD.descripcion == 'MedidaDirector').length > 0) {
      mensajeError.push("Hay entradas invalidas en la lista de medidas director");
    }

    if (this.medidasCoInterfaz.filter(medidasCo => medidasCo.descripcion == 'MedidaCopasst').length > 0) {
      mensajeError.push("Hay entradas invalidas en la lista de medidas coppast");
    }

    if (this.medidasCclInterfaz.filter(medidasCcl => medidasCcl.descripcion == 'MedidaCcl').length > 0) {
      mensajeError.push("Hay entradas invalidas en la lista de medidas ccl");
    }

    return mensajeError;
  }

  hacerTemaEditable(indice: number) {
    for (let i = 0; i < this.editableTemas.length; i++) {
      if (i == indice) {
        this.editableTemas[i] = true;
      } else {
        this.editableTemas[i] = false;
      }
    }
  }

  hacerMedidaEEditable(indice: number) {
    for (let i = 0; i < this.editableMedidasE.length; i++) {
      if (i == indice) {
        this.editableMedidasE[i] = true;
      } else {
        this.editableMedidasE[i] = false;
      }
    }
  }

  hacerMedidaDEditable(indice: number) {
    for (let i = 0; i < this.editableMedidasD.length; i++) {
      if (i == indice) {
        this.editableMedidasD[i] = true;
      } else {
        this.editableMedidasD[i] = false;
      }
    }
  }

  hacerMedidaCoEditable(indice: number) {
    for (let i = 0; i < this.editableMedidasCo.length; i++) {
      if (i == indice) {
        this.editableMedidasCo[i] = true;
      } else {
        this.editableMedidasCo[i] = false;
      }
    }
  }

  hacerMedidaCclEditable(indice: number) {
    for (let i = 0; i < this.editableMedidasCcl.length; i++) {
      if (i == indice) {
        this.editableMedidasCcl[i] = true;
      } else {
        this.editableMedidasCcl[i] = false;
      }
    }
  }

  hacerTemaNoEditables() {
    for (let i = 0; i < this.editableTemas.length; i++) {
      this.editableTemas[i] = false;
    }
  }

  hacerMedidaENoEditables() {
    for (let i = 0; i < this.editableMedidasE.length; i++) {
      this.editableMedidasE[i] = false;
    }
  }

  hacerMedidaDNoEditables() {
    for (let i = 0; i < this.editableMedidasD.length; i++) {
      this.editableMedidasD[i] = false;
    }
  }

  hacerMedidaCoNoEditables() {
    for (let i = 0; i < this.editableMedidasCo.length; i++) {
      this.editableMedidasCo[i] = false;
    }
  }

  hacerMedidaCclNoEditables() {
    for (let i = 0; i < this.editableMedidasCcl.length; i++) {
      this.editableMedidasCcl[i] = false;
    }
  }

  eliminarTema(indice: number) {
    this.temasInterfaz.splice(indice, 1);
    this.editableTemas.splice(indice, 1);
  }

  eliminarMedidaE(indice: number) {
    this.medidasEInterfaz.splice(indice, 1);
    this.editableMedidasE.splice(indice, 1);
  }

  eliminarMedidaD(indice: number) {
    this.medidasDInterfaz.splice(indice, 1);
    this.editableMedidasD.splice(indice, 1);
  }

  eliminarMedidaCo(indice: number) {
    this.medidasCoInterfaz.splice(indice, 1);
    this.editableMedidasCo.splice(indice, 1);
  }

  eliminarMedidaCcl(indice: number) {
    this.medidasCclInterfaz.splice(indice, 1);
    this.editableMedidasCcl.splice(indice, 1);
  }

  guardarInforme(event: Event) {
    let mensajeError = this.getMensajeError();

    if (mensajeError.length > 0) {
      this._snackBar.openFromComponent(ValidacionComponent, {
        data: mensajeError,
        duration: 3000
      });
    }

    if (mensajeError.length == 0) {

      let temas = [];

      for (let i = 0; i < this.temasInterfaz.length; i++) {
        temas.push(this.temasInterfaz[i]);
      }

      let temasInforme = temas;
      let temasJson = JSON.stringify(temasInforme);

      let empleador = [];

      for (let i = 0; i < this.medidasEInterfaz.length; i++) {
        empleador.push(this.medidasEInterfaz[i]);
      }

      let director = [];

      for (let i = 0; i < this.medidasDInterfaz.length; i++) {
        director.push(this.medidasDInterfaz[i]);
      }

      let copasst = [];

      for (let i = 0; i < this.medidasCoInterfaz.length; i++) {
        copasst.push(this.medidasCoInterfaz[i]);
      }

      let ccl = [];

      for (let i = 0; i < this.medidasCclInterfaz.length; i++) {
        ccl.push(this.medidasCclInterfaz[i]);
      }

      let paquete = { empleador, director, copasst, ccl };
      let paqueteJSON = JSON.stringify(paquete);

      if (!this.editando) {

        let informe: InformeMejora = new InformeMejora();
        informe.anio = new Date().getFullYear();

        let empresa: any = sessionStorage.getItem("empresa");
        let JsonEmpresa = JSON.parse(empresa);
        informe.idEmpresa = JsonEmpresa.id;

        informe.medidas = paqueteJSON;
        informe.publicacion = false;
        informe.temas = temasJson;

        this.informesMejoraService.crear(informe).subscribe(data => {
          this._snackBar.open('Informe Guardado', 'Cerrar', {
            duration: 3000
          });
          this.router.navigate(["/espacioDeTrabajoYServicio"]);
        }, err => {
          this._snackBar.open('Error', 'Cerrar', {
            duration: 3000
          });
        });

      }else{

        this.informeAEditar.anio = new Date().getFullYear();

        this.informeAEditar.medidas = paqueteJSON;
        this.informeAEditar.publicacion = false;
        this.informeAEditar.temas = temasJson;

        this.informesMejoraService.editar(this.informeAEditar).subscribe(data => {
          this._snackBar.open('Informe Editado', 'Cerrar', {
            duration: 3000
          });
          this.router.navigate(["/espacioDeTrabajoYServicio"]);
        }, err => {
          this._snackBar.open('Error', 'Cerrar', {
            duration: 3000
          });
        });

      }

    }
  }

  publicarInforme(event: Event) {
    let mensajeError = this.getMensajeError();

    if (mensajeError.length > 0) {
      this._snackBar.openFromComponent(ValidacionComponent, {
        data: mensajeError,
        duration: 3000
      });
    }

    if (mensajeError.length == 0) {

      let empresa: any = sessionStorage.getItem("empresa");
      let JsonEmpresa = JSON.parse(empresa);
      this.idEmpresa = JsonEmpresa.id;

      this.informesMejoraService.getMostrarUltimo(this.idEmpresa).subscribe(data => {

        let idInforme = data.id;

        let temas = []

        for (let i = 0; i < this.temasInterfaz.length; i++) {
          temas.push(this.temasInterfaz[i]);
        }

        let temasInforme = temas;
        let temasJson = JSON.stringify(temasInforme);

        let empleador = [];

        for (let i = 0; i < this.medidasEInterfaz.length; i++) {
          empleador.push(this.medidasEInterfaz[i]);
        }

        let director = [];

        for (let i = 0; i < this.medidasDInterfaz.length; i++) {
          director.push(this.medidasDInterfaz[i]);
        }

        let copasst = [];

        for (let i = 0; i < this.medidasCoInterfaz.length; i++) {
          copasst.push(this.medidasCoInterfaz[i]);
        }

        let ccl = [];

        for (let i = 0; i < this.medidasCclInterfaz.length; i++) {
          ccl.push(this.medidasCclInterfaz[i]);
        }

        let paquete = { empleador, director, copasst, ccl };
        let paqueteJSON = JSON.stringify(paquete);

        let informe: InformeMejora = new InformeMejora();
        informe.id = idInforme;
        informe.anio = new Date().getFullYear();
        informe.idEmpresa = this.idEmpresa;
        informe.medidas = paqueteJSON;
        informe.publicacion = true;
        informe.temas = temasJson;

        this.informesMejoraService.editar(informe).subscribe(data => {
          this._snackBar.open('Informe Publicado', 'Cerrar', {
            duration: 3000
          });
          this.router.navigate(["/espacioDeTrabajoYServicio"]);
        }, err => {
          this._snackBar.open('Error', 'Cerrar', {
            duration: 3000
          });
        });
      });
    }
  }
}

class TemaInterfaz {
  descripcion: String;
}

class MedidaEInterfaz {
  descripcion: String;
}

class MedidaDInterfaz {
  descripcion: String;
}

class MedidaCoInterfaz {
  descripcion: String;
}

class MedidaCclInterfaz {
  descripcion: String;
}