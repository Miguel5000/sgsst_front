import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private _snackBar: MatSnackBar) { 
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
  }

  agregarTema() {
    if (this.temasForm.valid) {
      let nuevoTema: TemaInterfaz = new TemaInterfaz();
      nuevoTema.descripcion = this.temasForm.controls.tema.value;
      this.temasInterfaz.push(nuevoTema);
      this.editableTemas.push(true);
      console.log(nuevoTema.descripcion);
    } else {
      this._snackBar.open("Introduzca un tema", "close", {
        duration:3000
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
      console.log(nuevaMedidaE.descripcion);
    } else {
      this._snackBar.open("Introduzca una medida", "close", {
        duration:3000
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
      console.log(nuevaMedidaD.descripcion);
    } else {
      this._snackBar.open("Introduzca una medida", "close", {
        duration:3000
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
      console.log(nuevaMedidaCo.descripcion);
    } else {
      this._snackBar.open("Introduzca una medida", "close", {
        duration:3000
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
      console.log(nuevaMedidaCcl.descripcion);
    } else {
      this._snackBar.open("Introduzca una medida", "close", {
        duration:3000
      });
    }
    this.medidasCclForm.reset();
  }

  getMensajeError() {
    let mensajeError: string[] = [];

    for (let i = 0; i < this.temasInterfaz.length; i++) {
      if (!this.temas.includes(this.temasInterfaz[i].descripcion) || this.temasInterfaz[i].descripcion == "") {
        mensajeError.push("Hay entradas invalidas en la lista de temas");
        break;
      }
    }

    for (let i = 0; i < this.medidasEInterfaz.length; i++) {
      if (!this.medidasE.includes(this.medidasEInterfaz[i].descripcion || this.medidasEInterfaz[i].descripcion == "")) {
        mensajeError.push("Hay entradas invalidas en la lista de medidas empleador");
        break;
      }
    }

    for (let i = 0; i < this.medidasDInterfaz.length; i++) {
      if (!this.medidasD.includes(this.medidasDInterfaz[i].descripcion || this.medidasDInterfaz[i].descripcion == "")) {
        mensajeError.push("Hay entradas invalidas en la lista de medidas director");
        break;
      }
    }

    for (let i = 0; i < this.medidasCoInterfaz.length; i++) {
      if (!this.medidasCo.includes(this.medidasCoInterfaz[i].descripcion || this.medidasCoInterfaz[i].descripcion == "")) {
        mensajeError.push("Hay entradas invalidas en la lista de medidas coppast");
        break;
      }
    }

    for (let i = 0; i < this.medidasCclInterfaz.length; i++) {
      if (!this.medidasCcl.includes(this.medidasCclInterfaz[i].descripcion || this.medidasCclInterfaz[i].descripcion == "")) {
        mensajeError.push("Hay entradas invalidas en la lista de medidas ccl");
        break;
      }
    }

    let descripcionTemas: String[] = [];

    this.temasInterfaz.forEach(element => {
      descripcionTemas.push(element.descripcion);
    });

    let descripcionMedidasE: String[] = [];

    this.medidasEInterfaz.forEach(element => {
      descripcionMedidasE.push(element.descripcion);
    });

    let descripcionMedidasD: String[] = [];

    this.medidasDInterfaz.forEach(element => {
      descripcionMedidasD.push(element.descripcion);
    });

    let descripcionMedidasCo: String[] = [];

    this.medidasCoInterfaz.forEach(element => {
      descripcionMedidasCo.push(element.descripcion);
    });

    let descripcionMedidasCcl: String[] = [];

    this.medidasCclInterfaz.forEach(element => {
      descripcionMedidasCcl.push(element.descripcion);
    });
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