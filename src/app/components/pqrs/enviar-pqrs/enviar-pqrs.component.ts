import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Empresa } from 'src/app/_model/Empresa';
import { GrupoSgsst } from 'src/app/_model/GrupoSgsst';
import { Pqrs } from 'src/app/_model/Pqrs';
import { TipoPqrs } from 'src/app/_model/TipoPqrs';
import { Usuario } from 'src/app/_model/Usuario';
import { GruposSgsstService } from 'src/app/_service/grupos-sgsst.service';
import { PqrsService } from 'src/app/_service/pqrs.service';
import { ValidacionComponent } from '../../utilitarios/validacion/validacion.component';

@Component({
  selector: 'app-enviar-pqrs',
  templateUrl: './enviar-pqrs.component.html',
  styleUrls: ['./enviar-pqrs.component.css']
})
export class EnviarPqrsComponent implements OnInit {

  pqrsForm: FormGroup;
  grupos: GrupoSgsst[] = [];
  tiposPqrs: TipoPqrs[] = [];
  empresa: Empresa = new Empresa();
  usuario: Usuario = new Usuario();

  constructor(private gruposSgsstService: GruposSgsstService,
    private pqrsService: PqrsService,
    private snackBar: MatSnackBar) {

    this.pqrsForm = this.createFormGroup();

  }

  ngOnInit(): void {

    let usuarioJson = sessionStorage.getItem("usuario");
    let empresaJson = sessionStorage.getItem("empresa");

    if (usuarioJson != null && empresaJson != null) {

      this.usuario = JSON.parse(usuarioJson);
      this.empresa = JSON.parse(empresaJson);

      this.gruposSgsstService.getGrupos().subscribe(data => {

        this.grupos = data;
        this.grupos.splice(2, this.grupos.length - 2);

      })

      this.pqrsService.getTipos().subscribe(data => {

        this.tiposPqrs = data;

      })

    }

  }

  createFormGroup() {

    return new FormGroup({

      grupo: new FormControl(null, [
        Validators.required,
      ]),
      tipo: new FormControl(null, [
        Validators.required,
      ]),
      titulo: new FormControl('', [
        Validators.required,
      ]),
      contenido: new FormControl('', [
        Validators.required,
      ])

    });

  }

  getMensajeError() {

    let mensajeError: string[] = [];

    if (this.pqrsForm.controls.grupo.hasError('required')) {

      mensajeError.push("Seleccione el grupo de destino");

    }

    if (this.pqrsForm.controls.tipo.hasError('required')) {

      mensajeError.push("Seleccione el tipo");

    }

    if (this.pqrsForm.controls.titulo.hasError('required')) {

      mensajeError.push("El PQRS debe tener un título");

    }

    if (this.pqrsForm.controls.contenido.hasError('required')) {

      mensajeError.push("El PQRS debe tener un contenido");

    }

    return mensajeError;

  }

  enviar() {

    if (this.pqrsForm.valid) {

      let pqrs: Pqrs = new Pqrs();
      pqrs.titulo = this.pqrsForm.controls.titulo.value;
      pqrs.contenido = this.pqrsForm.controls.contenido.value;
      let fechaActual = new Date();
      pqrs.fecha = fechaActual.getFullYear() + "-" + (fechaActual.getMonth() + 1) + "-" + fechaActual.getDate();
      pqrs.idEmpresa = this.empresa.id;
      pqrs.idGrupo = this.pqrsForm.controls.grupo.value;
      pqrs.idTipo = this.pqrsForm.controls.tipo.value;
      pqrs.idUsuario = this.usuario.id;

      this.pqrsService.crear(pqrs).subscribe(data => {

        this.snackBar.open("PQRS enviado con éxito", "Cerrar", {duration: 3000});
        this.pqrsForm.reset();

      })

    } else {

      let mensajeError = this.getMensajeError();

      this.snackBar.openFromComponent(ValidacionComponent, {
        data: mensajeError,
        duration: 3000
      });

    }

  }

}
