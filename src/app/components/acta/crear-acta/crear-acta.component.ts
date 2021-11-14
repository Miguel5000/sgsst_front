import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Acta } from 'src/app/_model/Acta';
import { ActasService } from 'src/app/_service/actas.service';
import { map, startWith } from 'rxjs/operators';
import { GestorRoles } from 'src/app/_model/GestorRoles';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ValidacionComponent } from '../../utilitarios/validacion/validacion.component';
import { Time } from '@angular/common';
import { Subtema } from 'src/app/_model/Subtema';
import { Asistencia } from 'src/app/_model/Asistencia';
import { Empresa } from 'src/app/_model/Empresa';
import { GrupoSgsst } from 'src/app/_model/GrupoSgsst';
import { Lugar } from 'src/app/_model/Lugar';
import { Usuario } from 'src/app/_model/Usuario';
import { GruposSgsstService } from 'src/app/_service/grupos-sgsst.service';
import { LugaresService } from 'src/app/_service/lugares.service';
import { UsuariosService } from 'src/app/_service/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-acta',
  templateUrl: './crear-acta.component.html',
  styleUrls: ['./crear-acta.component.css']
})
export class CrearActaComponent implements OnInit {

  tipoActa = "Capacitación";
  lugares: string[] = [];
  lugaresFiltrados: Observable<string[]>;
  participantes: string[] = [];
  participantesFiltrados: Observable<string[]>;
  participantesFiltradosNoSync: string[];
  datosInicialesForm: FormGroup;
  temaForm: FormGroup;
  desarrolloForm: FormGroup;
  participantesForm: FormGroup;
  conclusionForm: FormGroup;
  rol: string;
  subtemasInterfaz: SubtemaInterfaz[];
  editableSubtemas: boolean[];
  editableParticipantes: boolean[];
  areas: string[] = [];
  participantesInterfaz: ParticipanteInterfaz[];
  empresa: Empresa;
  isEdicion: boolean = false;

  //Base de datos
  gruposBD: GrupoSgsst[];
  lugaresBD: Lugar[];
  usuariosBD: Usuario[];
  subtemasBD: Subtema[];
  asistenciasBD: Asistencia[];
  actaEditar: Acta;

  constructor(private _snackBar: MatSnackBar,
    private actasService: ActasService,
    private gruposService: GruposSgsstService,
    private lugaresService: LugaresService,
    private usuariosService: UsuariosService,
    private router: Router) {

    this.datosInicialesForm = this.createFormGroupDatos();
    this.temaForm = this.createFormGroupTema();
    this.desarrolloForm = this.createFormGroupDesarrollo();
    this.participantesForm = this.createFormGroupParticipantes();
    this.conclusionForm = this.createFormGroupConclusion();
    this.subtemasInterfaz = [];
    this.editableSubtemas = [];
    this.editableParticipantes = [];
    this.participantesInterfaz = [];
    this.gruposBD = [];
    this.lugaresBD = [];
    this.usuariosBD = [];
    this.asistenciasBD = [];
    this.subtemasBD = [];

    let tipoActaSession = sessionStorage.getItem("tipoActa");

    if (tipoActaSession != null) {

      this.tipoActa = tipoActaSession;

    }

    let rolSession = sessionStorage.getItem("rol");

    if (rolSession != null) {

      this.rol = rolSession;

    }

    let subtemaInicial: SubtemaInterfaz = new SubtemaInterfaz();
    let participanteInicial: ParticipanteInterfaz = new ParticipanteInterfaz();
    subtemaInicial.nombre = "Subtema";
    subtemaInicial.areaDeInteres = "COPASST";
    participanteInicial.nombre = "Participante"

    this.subtemasInterfaz.push(subtemaInicial);
    this.editableSubtemas.push(false);
    this.participantesInterfaz.push(participanteInicial);
    this.editableParticipantes.push(false);

    let empresaJson = sessionStorage.getItem("empresa");
    if (empresaJson != null) {
      this.empresa = JSON.parse(empresaJson);
    } else {
      this.empresa = new Empresa();
      this.empresa.id = 1;
      this.empresa.nombre = "Abc";
      this.empresa.telefono = "3131562857";
      this.empresa.logotipo = "agaghkhgkagk";
      this.empresa.direccion = "Dire";
      this.empresa.dimensionArea = 25;
    }

    if (this.tipoActa != "Capacitación") {

      this.datosInicialesForm.controls.capacitacion.removeValidators(Validators.required);

    }

  }

  ngOnInit(): void {


    this.gruposService.getGrupos().subscribe(data => {
      this.gruposBD = data;
      this.gruposBD.forEach(element => {
        this.areas.push(element.nombre);
      });
      this.lugaresService.getLugares(this.empresa).subscribe(data2 => {
        this.lugaresBD = data2;
        this.lugaresBD.forEach(element => {
          this.lugares.push(element.nombre);
        });
        this.usuariosService.getEmpleados(this.empresa).subscribe(data3 => {
          this.usuariosBD = data3;
          this.usuariosBD.forEach(element => {
            this.participantes.push(element.nombre);
          });

          this.lugaresFiltrados = this.datosInicialesForm.controls.lugar.valueChanges.pipe(
            startWith(''),
            map(value => this.getLugaresFiltrados(value)),
          );
          this.participantesFiltrados = this.participantesForm.controls.participante.valueChanges.pipe(
            startWith(''),
            map(value => this.getParticipantesFiltrados(value)),
          );

          //Edición

          let actaJson = sessionStorage.getItem("actaEditar");

          if (actaJson != null) {

            this.actaEditar = JSON.parse(actaJson);

            sessionStorage.removeItem("actaEditar");
            this.isEdicion = true;

            this.cargarDatos(this.actaEditar);

          }

        })
      });
    })



  }

  cargarDatos(acta: Acta) {

    let fechaAjustada = acta.fecha.split(" ")[0];
    fechaAjustada = fechaAjustada.replace("/", "-");
    fechaAjustada = fechaAjustada.replace("/", "-");
    fechaAjustada = fechaAjustada.split("-")[2] + "-" + fechaAjustada.split("-")[1] + "-" + fechaAjustada.split("-")[0];

    acta.fecha = fechaAjustada;
    this.datosInicialesForm.controls.fecha.setValue(fechaAjustada);
    this.datosInicialesForm.controls.horaInicio.setValue(acta.horaInicio);
    this.datosInicialesForm.controls.horaFin.setValue(acta.horaFin);

    this.datosInicialesForm.controls.lugar.setValue(this.lugaresBD.filter(x => x.id == acta.idLugar)[0].nombre);

    if (this.tipoActa == "Capacitación") {

      this.datosInicialesForm.controls.capacitacion.setValue(acta.capacitacion);

    }

    this.temaForm.controls.tema.setValue(acta.tema);
    this.desarrolloForm.controls.desarrollo.setValue(acta.desarrollo);
    this.conclusionForm.controls.conclusion.setValue(acta.conclusion);

    this.actasService.getSubtemas(acta).subscribe(data => {

      this.subtemasInterfaz.pop();
      this.editableSubtemas.pop();
      this.subtemasBD = data;

      data.forEach(element => {

        let subtemaInterfaz: SubtemaInterfaz = new SubtemaInterfaz();
        subtemaInterfaz.nombre = element.subtemaActa;
        subtemaInterfaz.areaDeInteres = this.gruposBD.filter(x => x.id == element.idGrupo)[0].nombre;
        this.subtemasInterfaz.push(subtemaInterfaz);
        this.editableSubtemas.push(false);

      });

    })

    this.actasService.getAsistencias(acta).subscribe(data => {

      this.participantesInterfaz.pop();
      this.editableParticipantes.pop();

      data.forEach(element => {

        let participanteInterfaz: ParticipanteInterfaz = new ParticipanteInterfaz();
        participanteInterfaz.nombre = element.nombre;
        this.participantesInterfaz.push(participanteInterfaz);
        this.editableParticipantes.push(false);

      });

    })

    this.actasService.getVerdaderasAsistencias(acta).subscribe(data =>{

      this.asistenciasBD = data;

    })

  }

  createFormGroupDatos() {

    return new FormGroup({

      fecha: new FormControl('', [
        Validators.required,
      ]),
      horaInicio: new FormControl('', [
        Validators.required,
      ]),
      lugar: new FormControl('', [
        Validators.required,
      ]),
      horaFin: new FormControl('', [
        Validators.required,
      ]),
      capacitacion: new FormControl('', [
        Validators.required,
      ]),

    });

  }

  createFormGroupParticipantes() {

    return new FormGroup({

      participante: new FormControl('', [
        Validators.required,
      ]),

    });

  }

  createFormGroupTema() {

    return new FormGroup({

      tema: new FormControl('', [
        Validators.required,
      ]),

    });

  }

  createFormGroupDesarrollo() {

    return new FormGroup({

      desarrollo: new FormControl('', [
        Validators.required,
      ]),

    });

  }

  createFormGroupConclusion() {

    return new FormGroup({

      conclusion: new FormControl('', [
        Validators.required,
      ]),

    });

  }

  getLugaresFiltrados(valor: string) {

    return this.lugares.filter(elemento => elemento.toLocaleLowerCase().includes(valor.toLocaleLowerCase()));

  }

  getParticipantesFiltrados(valor: string) {

    return this.participantes.filter(elemento => elemento.toLocaleLowerCase().includes(valor.toLocaleLowerCase()));

  }

  hacerSubtemaEditable(indice: number) {

    for (let i = 0; i < this.editableSubtemas.length; i++) {

      if (i == indice) {

        this.editableSubtemas[i] = true;

      } else {

        this.editableSubtemas[i] = false;

      }

    }

  }

  hacerParticipanteEditable(indice: number) {

    for (let i = 0; i < this.editableParticipantes.length; i++) {

      if (i == indice) {

        this.editableParticipantes[i] = true;

      } else {

        this.editableParticipantes[i] = false;

      }

    }

  }

  hacerSubtemasNoEditables() {

    for (let i = 0; i < this.editableSubtemas.length; i++) {

      this.editableSubtemas[i] = false;

    }

  }

  hacerParticipantesNoEditables() {

    for (let i = 0; i < this.editableParticipantes.length; i++) {

      this.editableParticipantes[i] = false;

    }

  }

  agregarSubtema() {

    let nuevoSubtema: SubtemaInterfaz = new SubtemaInterfaz();
    nuevoSubtema.nombre = "Subtema";
    nuevoSubtema.areaDeInteres = "COPASST";
    this.subtemasInterfaz.push(nuevoSubtema);
    this.editableSubtemas.push(true);

  }

  agregarParticipante() {


    if(this.participantesForm.valid){

      let nuevoParticipante: ParticipanteInterfaz = new ParticipanteInterfaz();
      nuevoParticipante.nombre = this.participantesForm.controls.participante.value;
      this.participantesInterfaz.push(nuevoParticipante);
      this.editableParticipantes.push(true);

    }else{

      this._snackBar.open("Introduzca el nombre del participante", "close", {duration:3000});

    }

  }

  eliminarSubtema(indice: number) {

    this.subtemasInterfaz.splice(indice, 1);
    this.editableSubtemas.splice(indice, 1);

  }

  eliminarParticipante(indice: number) {

    this.participantesInterfaz.splice(indice, 1);
    this.editableParticipantes.splice(indice, 1);

  }

  buscarParticipante(event: Event) {

    let elemento: HTMLInputElement = event.target as HTMLInputElement;
    this.participantesFiltradosNoSync = this.getParticipantesFiltrados(elemento.value);

  }

  validarInputLugar(event: Event) {

    let elemento: HTMLInputElement = event.target as HTMLInputElement;
    if (this.lugares.includes(elemento.value) || elemento.value == "") {

      elemento.style.backgroundColor = "white";

    } else {

      elemento.style.backgroundColor = "red";

    }

  }

  validarInputParticipante(event: Event) {

    let elemento: HTMLInputElement = event.target as HTMLInputElement;
    if (this.participantes.includes(elemento.value) || elemento.value == "") {

      elemento.style.backgroundColor = "white";

    } else {

      elemento.style.backgroundColor = "red";

    }

  }

  getMensajeError() {

    let mensajeError: string[] = [];

    if (this.datosInicialesForm.controls.fecha.hasError('required')) {

      mensajeError.push("Introduzca la fecha");

    }

    if (this.datosInicialesForm.controls.horaInicio.hasError('required')) {

      mensajeError.push("Introduzca la hora de inicio");

    }

    let fecha: Date = new Date(this.datosInicialesForm.controls.fecha.value);
    fecha.setHours(0, 0);
    fecha.setTime(fecha.getTime() + 86400000);
    let fechaActual: Date = new Date();

    if (fecha > fechaActual) {

      let cadenaHora: string = this.datosInicialesForm.controls.horaInicio.value;

      let hora: Time = {

        hours: parseInt(cadenaHora.split(":")[0]),
        minutes: parseInt(cadenaHora.split(":")[1])

      }

      let horaActual: Time = {

        hours: fechaActual.getHours(),
        minutes: fechaActual.getMinutes()

      }

      if (hora.hours > horaActual.hours || (hora.hours == horaActual.hours && hora.minutes > horaActual.minutes)) {

        mensajeError.push("La fecha con hora de inicio no puede ser mayor a la actual");

      }

    }

    if (this.datosInicialesForm.controls.lugar.hasError('required')) {

      mensajeError.push("Introduzca el lugar");

    } else {

      if (!this.lugares.includes(this.datosInicialesForm.controls.lugar.value)) {

        mensajeError.push("Introduzca un lugar válido");

      }

    }

    if (this.datosInicialesForm.controls.horaFin.hasError('required')) {

      mensajeError.push("Introduzca la hora de finalización");

    }

    let cadenaHoraInicio: string = this.datosInicialesForm.controls.horaInicio.value;
    let cadenaHoraFin: string = this.datosInicialesForm.controls.horaFin.value;

    let horaInicio: Time = {

      hours: parseInt(cadenaHoraInicio.split(":")[0]),
      minutes: parseInt(cadenaHoraInicio.split(":")[1])

    }

    let horaFin: Time = {

      hours: parseInt(cadenaHoraFin.split(":")[0]),
      minutes: parseInt(cadenaHoraFin.split(":")[1])

    }

    if (horaInicio.hours > horaFin.hours || (horaInicio.hours == horaFin.hours && horaInicio.minutes >= horaFin.minutes)) {

      mensajeError.push("La hora de finalización debe ser mayor a la de inicio");

    }


    if (this.tipoActa == "Capacitación") {

      if (this.datosInicialesForm.controls.capacitacion.hasError('required')) {

        mensajeError.push("Introduzca el tipo de capacitación");

      }

    }

    if (this.temaForm.controls.tema.hasError('required')) {

      mensajeError.push("Introduzca el tema");

    }

    if (this.desarrolloForm.controls.desarrollo.hasError('required')) {

      mensajeError.push("Introduzca el desarrollo")

    }

    if (this.conclusionForm.controls.conclusion.hasError('required')) {

      mensajeError.push("Introduzca la conclusión")

    }

    for (let i = 0; i < this.participantesInterfaz.length; i++) {
      if (!this.participantes.includes(this.participantesInterfaz[i].nombre) || this.participantesInterfaz[i].nombre == "") {
        mensajeError.push("Hay entradas inválidas en la lista de participantes");
        break;
      }
    }

    let nombresParticipantes: string[] = [];

    this.participantesInterfaz.forEach(element => {
      nombresParticipantes.push(element.nombre);
    });

    if ((new Set(nombresParticipantes)).size !== nombresParticipantes.length) {
      mensajeError.push("Hay nombres repetidos");
    }

    for (let i = 0; i < this.subtemasInterfaz.length; i++) {
      if (this.subtemasInterfaz[i].nombre == "") {
        mensajeError.push("Hay subtemas vacíos");
        break;
      }
    }

    return mensajeError;

  }

  guardarActa(event: Event) {

    let mensajeError = this.getMensajeError();

    if (mensajeError.length > 0) {

      this._snackBar.openFromComponent(ValidacionComponent, {
        data: mensajeError,
        duration: 3000
      });

    }

    if (this.datosInicialesForm.valid && this.temaForm.valid && this.desarrolloForm.valid && this.conclusionForm.valid && mensajeError.length == 0) {

      let acta: Acta = new Acta();

      acta.fecha = this.datosInicialesForm.controls.fecha.value;
      acta.horaInicio = this.datosInicialesForm.controls.horaInicio.value;
      acta.idLugar = this.getIdLugar(this.datosInicialesForm.controls.lugar.value);
      acta.horaFin = this.datosInicialesForm.controls.horaFin.value;
      acta.idEmpresa = this.empresa.id;
      if (this.tipoActa == "Capacitación") {
        acta.capacitacion = this.datosInicialesForm.controls.capacitacion.value;
        acta.idTipo = 2;
      } else {
        acta.idTipo = 1;
      }
      acta.tema = this.temaForm.controls.tema.value;
      acta.desarrollo = this.desarrolloForm.controls.desarrollo.value;
      acta.conclusion = this.conclusionForm.controls.conclusion.value;
      let fechaCero = new Date();
      fechaCero.setHours(0, 0);

      if (!this.isEdicion) {
        acta.numero = new Date().getTime() - fechaCero.getTime();
      } else {
        acta.numero = this.actaEditar.numero;
      }

      acta.publicacion = false;

      if (sessionStorage.getItem("rol") == GestorRoles.DIRECTOR) {
        acta.idGrupo = 3;
      } else if (sessionStorage.getItem("rol") == GestorRoles.SECRETARIO_COPASST) {
        acta.idGrupo = 1;
      } else {
        acta.idGrupo = 2;
      }

      let mensaje: string = "Acta creada con éxito";

      if (!this.isEdicion) {

        this.actasService.crear(acta).subscribe(data => {

          this.subtemasInterfaz.forEach(element => {
            let subtema: Subtema = new Subtema();
            if (sessionStorage.getItem("rol") == GestorRoles.DIRECTOR) {
              subtema.idGrupo = this.getIdGrupo(element.areaDeInteres);
            }
            subtema.subtemaActa = element.nombre;
            subtema.idActa = (data as Acta).id;

            this.actasService.crearSubtema(subtema).subscribe();

          });

          this.participantesInterfaz.forEach(element => {
            let asistencia: Asistencia = new Asistencia();
            asistencia.aprobacion = false;
            asistencia.idUsuario = this.getIdUsuario(element.nombre);
            asistencia.idActa = (data as Acta).id;

            this.actasService.crearAsistencia(asistencia).subscribe();

          });

          this._snackBar.open(mensaje, "Cerrar", { duration: 3000 });

          let enlaceAnterior = sessionStorage.getItem("enlaceListaActas");

          if (enlaceAnterior != null) {

            this.router.navigate([enlaceAnterior]);

          }

        })
      }else{


        this.subtemasBD.forEach(element => {
          this.actasService.eliminarSubtema(element).subscribe();
        });

        this.asistenciasBD.forEach(element => {
          this.actasService.eliminarAsistencia(element).subscribe();
        });

        this.subtemasInterfaz.forEach(element => {
          let subtema: Subtema = new Subtema();
          if (sessionStorage.getItem("rol") == GestorRoles.DIRECTOR) {
            subtema.idGrupo = this.getIdGrupo(element.areaDeInteres);
          }
          subtema.subtemaActa = element.nombre;
          subtema.idActa = this.actaEditar.id;

          this.actasService.crearSubtema(subtema).subscribe();

        });

        this.participantesInterfaz.forEach(element => {
          let asistencia: Asistencia = new Asistencia();
          asistencia.aprobacion = false;
          asistencia.idUsuario = this.getIdUsuario(element.nombre);
          asistencia.idActa = this.actaEditar.id;

          this.actasService.crearAsistencia(asistencia).subscribe();

        });

        acta.id = this.actaEditar.id;

        mensaje = "Acta editada con éxito";
        this.actasService.editar(acta).subscribe(dataFin => {

          this._snackBar.open(mensaje, "Cerrar", { duration: 3000 });

          let enlaceAnterior = sessionStorage.getItem("enlaceListaActas");

          if (enlaceAnterior != null) {

            this.router.navigate([enlaceAnterior]);

          }

        });

      }   

    }

  }


  publicarActa(event: Event) {

    let mensajeError = this.getMensajeError();

    if (mensajeError.length > 0) {

      this._snackBar.openFromComponent(ValidacionComponent, {
        data: mensajeError,
        duration: 3000
      });

    }

    if (this.datosInicialesForm.valid && this.temaForm.valid && this.desarrolloForm.valid && this.conclusionForm.valid && mensajeError.length == 0) {

      let acta: Acta = new Acta();

      acta.fecha = this.datosInicialesForm.controls.fecha.value;
      acta.horaInicio = this.datosInicialesForm.controls.horaInicio.value;
      acta.idLugar = this.getIdLugar(this.datosInicialesForm.controls.lugar.value);
      acta.horaFin = this.datosInicialesForm.controls.horaFin.value;
      acta.idEmpresa = this.empresa.id;
      if (this.tipoActa == "Capacitación") {
        acta.capacitacion = this.datosInicialesForm.controls.capacitacion.value;
        acta.idTipo = 2;
      } else {
        acta.idTipo = 1;
      }
      acta.tema = this.temaForm.controls.tema.value;
      acta.desarrollo = this.desarrolloForm.controls.desarrollo.value;
      acta.conclusion = this.conclusionForm.controls.conclusion.value;
      let fechaCero = new Date();
      fechaCero.setHours(0, 0);

      if (!this.isEdicion) {
        acta.numero = new Date().getTime() - fechaCero.getTime();
      } else {
        acta.numero = this.actaEditar.numero;
      }

      acta.publicacion = true;

      if (sessionStorage.getItem("rol") == GestorRoles.DIRECTOR) {
        acta.idGrupo = 3;
      } else if (sessionStorage.getItem("rol") == GestorRoles.SECRETARIO_COPASST) {
        acta.idGrupo = 1;
      } else {
        acta.idGrupo = 2;
      }

      let mensaje: string = "Acta publicada con éxito";

      if (!this.isEdicion) {

        this.actasService.crear(acta).subscribe(data => {

          this.subtemasInterfaz.forEach(element => {
            let subtema: Subtema = new Subtema();
            if (sessionStorage.getItem("rol") == GestorRoles.DIRECTOR) {
              subtema.idGrupo = this.getIdGrupo(element.areaDeInteres);
            }
            subtema.subtemaActa = element.nombre;
            subtema.idActa = (data as Acta).id;

            this.actasService.crearSubtema(subtema).subscribe();

          });

          this.participantesInterfaz.forEach(element => {
            let asistencia: Asistencia = new Asistencia();
            asistencia.aprobacion = false;
            asistencia.idUsuario = this.getIdUsuario(element.nombre);
            asistencia.idActa = (data as Acta).id;

            this.actasService.crearAsistencia(asistencia).subscribe();

          });

          this._snackBar.open(mensaje, "Cerrar", { duration: 3000 });

          let enlaceAnterior = sessionStorage.getItem("enlaceListaActas");

          if (enlaceAnterior != null) {

            this.router.navigate([enlaceAnterior]);

          }

        })
      }else{


        this.subtemasBD.forEach(element => {
          this.actasService.eliminarSubtema(element).subscribe();
        });

        this.asistenciasBD.forEach(element => {
          this.actasService.eliminarAsistencia(element).subscribe();
        });

        this.subtemasInterfaz.forEach(element => {
          let subtema: Subtema = new Subtema();
          if (sessionStorage.getItem("rol") == GestorRoles.DIRECTOR) {
            subtema.idGrupo = this.getIdGrupo(element.areaDeInteres);
          }
          subtema.subtemaActa = element.nombre;
          subtema.idActa = this.actaEditar.id;

          this.actasService.crearSubtema(subtema).subscribe();

        });

        this.participantesInterfaz.forEach(element => {
          let asistencia: Asistencia = new Asistencia();
          asistencia.aprobacion = false;
          asistencia.idUsuario = this.getIdUsuario(element.nombre);
          asistencia.idActa = this.actaEditar.id;

          this.actasService.crearAsistencia(asistencia).subscribe();

        });

        acta.publicacion = true;
        acta.id = this.actaEditar.id;

        mensaje = "Acta publicada con éxito";
        this.actasService.editar(acta).subscribe(dataFin => {

          this._snackBar.open(mensaje, "Cerrar", { duration: 3000 });

          let enlaceAnterior = sessionStorage.getItem("enlaceListaActas");

          if (enlaceAnterior != null) {

            this.router.navigate([enlaceAnterior]);

          }

        });

      }   

    }

  }

  getIdLugar(nombre: string) {

    for (let i = 0; i < this.lugaresBD.length; i++) {

      if (this.lugaresBD[i].nombre == nombre) {

        return this.lugaresBD[i].id;

      }

    }

    return -1;

  }

  getIdGrupo(nombre: string) {

    for (let i = 0; i < this.gruposBD.length; i++) {

      if (this.gruposBD[i].nombre == nombre) {

        return this.gruposBD[i].id;

      }

    }

    return -1;

  }

  getIdUsuario(nombre: string) {

    for (let i = 0; i < this.usuariosBD.length; i++) {

      if (this.usuariosBD[i].nombre == nombre) {

        return this.usuariosBD[i].id;

      }

    }

    return -1;

  }

}

class SubtemaInterfaz {

  nombre: string;
  areaDeInteres: string;

}

class ParticipanteInterfaz {

  nombre: string;

}