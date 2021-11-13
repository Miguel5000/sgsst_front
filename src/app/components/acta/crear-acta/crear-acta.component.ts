import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Acta } from 'src/app/_model/Acta';
import { ActasService } from 'src/app/_service/actas.service';
import {map, startWith} from 'rxjs/operators';
import { GestorRoles } from 'src/app/_model/GestorRoles';

@Component({
  selector: 'app-crear-acta',
  templateUrl: './crear-acta.component.html',
  styleUrls: ['./crear-acta.component.css']
})
export class CrearActaComponent implements OnInit {

  tipoActa = "Reunión";
  lugares = ["Casa", "Edificio"];
  lugaresFiltrados: Observable<string[]>;
  participantes = ["Miguel", "James", "Alejandra"];
  participantesFiltrados: Observable<string[]>;
  datosInicialesForm: FormGroup;
  participantesForm: FormGroup;
  rol: string;
  subtemasInterfaz: SubtemaInterfaz[];
  editableSubtemas: boolean[];

  constructor(private actasService: ActasService) { 

    this.datosInicialesForm = this.createFormGroupDatos();
    this.participantesForm = this.createFormGroupParticipantes();
    this.rol = GestorRoles.DIRECTOR;
    this.subtemasInterfaz = [];
    this.editableSubtemas = [];

    let subtemaInicial:SubtemaInterfaz = new SubtemaInterfaz();
    subtemaInicial.nombre = "Subtema";
    subtemaInicial.areaDeInteres = "Área";

    this.subtemasInterfaz.push(subtemaInicial);
    this.editableSubtemas.push(false);
   
  }

  ngOnInit(): void {
    this.lugaresFiltrados = this.datosInicialesForm.controls.lugar.valueChanges.pipe(
      startWith(''),
      map(value => this.getLugaresFiltrados(value)),
    );
    this.participantesFiltrados = this.participantesForm.controls.participante.valueChanges.pipe(
      startWith(''),
      map(value => this.getParticipantesFiltrados(value)),
    );
  }

  createFormGroupDatos() {

    return new FormGroup({

      lugar: new FormControl('', [
        Validators.required,
      ] ),

    });

  }

  createFormGroupParticipantes() {

    return new FormGroup({

      participante: new FormControl('', [
        Validators.required,
      ] ),

    });

  }

  getLugaresFiltrados(valor: string){

    return this.lugares.filter(elemento => elemento.toLocaleLowerCase().includes(valor.toLocaleLowerCase()));

  }

  getParticipantesFiltrados(valor: string){

    return this.participantes.filter(elemento => elemento.toLocaleLowerCase().includes(valor.toLocaleLowerCase()));

  }

  hacerSubtemaEditable(indice:number){

    for(let i=0; i<this.editableSubtemas.length; i++){

      if(i == indice){

        this.editableSubtemas[i] = true;

      }else{

        this.editableSubtemas[i] = false;

      }

    }

  }

  hacerSubtemasNoEditables(){

    for(let i=0; i<this.editableSubtemas.length; i++){

      this.editableSubtemas[i] = false;

    }

  }

  agregarSubtema(){

    let nuevoSubtema: SubtemaInterfaz = new SubtemaInterfaz();
    nuevoSubtema.nombre = "Subtema";
    nuevoSubtema.areaDeInteres = "Área";
    this.subtemasInterfaz.push(nuevoSubtema);
    this.editableSubtemas.push(true);

  }

  eliminarSubtema(indice: number){

    this.subtemasInterfaz.splice(indice,1);
    this.editableSubtemas.splice(indice,1);

  }

}

class SubtemaInterfaz{

  nombre: string;
  areaDeInteres: string;

}

class ParticipantesInterfaz{

  nombre: string;

}