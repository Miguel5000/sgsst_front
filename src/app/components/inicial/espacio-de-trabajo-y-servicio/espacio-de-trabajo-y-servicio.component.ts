import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTab } from '@angular/material/tabs';
import { GestorRoles } from 'src/app/_model/GestorRoles'

@Component({
  selector: 'app-espacio-de-trabajo-y-servicio',
  templateUrl: './espacio-de-trabajo-y-servicio.component.html',
  styleUrls: ['./espacio-de-trabajo-y-servicio.component.css']
})
export class EspacioDeTrabajoYServicioComponent implements OnInit {

  rol: string|null;
  opcionesTrabajo: Opcion[];
  opcionesServicio: Opcion[];
  opcionesIntermedias: Opcion[];
  intermediario: boolean;
  tituloIntermediario: string;

  constructor(private router: Router) { }

  ngOnInit(): void {

    this.rol = sessionStorage.getItem("rol");

    if(this.rol == null){

      this.router.navigate(["/paginaInicio"]);

    }

    this.opcionesTrabajo = [];
    this.opcionesServicio = [];
    this.opcionesIntermedias = [];
    this.intermediario = true;

    if (this.router.url.includes("servicio/")) {

      //Actas

      if (this.router.url == "/servicio/actas") {

        this.tituloIntermediario = "Actas";
        GestorBotones.crearBotonesActas(this.opcionesIntermedias);

      }

      if (this.router.url == "/servicio/actas/direccion") {

        this.tituloIntermediario = "Actas de dirección";
        GestorBotones.crearBotonesActasDireccion(this.opcionesIntermedias);

      }

      if (this.router.url == "/servicio/actas/copasst") {

        this.tituloIntermediario = "Actas del COPASST";
        GestorBotones.crearBotonesActasCopasst(this.opcionesIntermedias);

      }

      //Evaluación anual

      if (this.router.url == "/servicio/evaluacionAnual") {

        this.tituloIntermediario = "Evaluación Anual";
        GestorBotones.crearBotonesEvaluacionAnual(this.opcionesIntermedias);

      }

      //Acoso laboral

      if (this.router.url == "/servicio/acosoLaboral") {

        this.tituloIntermediario = "Acoso Laboral";
        GestorBotones.crearBotonesAcosoLaboral(this.opcionesIntermedias);

      }

      //PQRS

      if (this.router.url == "/servicio/pqrs") {

        this.tituloIntermediario = "PQRS";
        GestorBotones.crearBotonesPqrs(this.opcionesIntermedias);

      }

    } else if (this.router.url.includes("trabajo/")) {

      //Director actas

      if (this.router.url == "/trabajo/director/actas") {

        this.tituloIntermediario = "Actas";
        GestorBotones.crearBotonesDirectorActas(this.opcionesIntermedias);

      }

      //Miembro COPASST actas

      if (this.router.url == "/trabajo/miembroCopasst/actas") {

        this.tituloIntermediario = "Actas";
        GestorBotones.crearBotonesMiembroCopasstActas(this.opcionesIntermedias);

      }

      //Secretario COPASST actas

      if (this.router.url == "/trabajo/secretarioCopasst/actas") {

        this.tituloIntermediario = "Actas";
        GestorBotones.crearBotonesSecretarioCopasstActas(this.opcionesIntermedias);

      }


    } else {

      this.intermediario = false;

      let opcion: Opcion = new Opcion();
      opcion.nombre = "Actas";
      opcion.imagen = "assets/iconos/Acta.png";
      opcion.ruta = "/servicio/actas";
      this.opcionesServicio.push(opcion);

      opcion = new Opcion();
      opcion.nombre = "Evaluación anual";
      opcion.imagen = "assets/iconos/Evaluación.png";
      opcion.ruta = "/servicio/evaluacionAnual";
      this.opcionesServicio.push(opcion);

      if (this.rol != GestorRoles.SECRETARIO_CCL && this.rol != GestorRoles.EMPLEADOR) {
        opcion = new Opcion();
        opcion.nombre = "Acoso laboral";
        opcion.imagen = "assets/iconos/Acoso.png";
        opcion.ruta = "/servicio/acosoLaboral";
        this.opcionesServicio.push(opcion);
      }

      if (this.rol != GestorRoles.EMPLEADOR) {
        opcion = new Opcion();
        opcion.nombre = "PQRS";
        opcion.imagen = "assets/iconos/PQRS.png";
        opcion.ruta = "/servicio/pqrs";
        this.opcionesServicio.push(opcion);
      }

      //Trabajo

      if (this.rol == GestorRoles.EMPLEADOR) {

        GestorBotones.crearBotonesTrabajoEmpleador(this.opcionesTrabajo)

      }

      if (this.rol == GestorRoles.DIRECTOR) {

        GestorBotones.crearBotonesTrabajoDirector(this.opcionesTrabajo)

      }

      if (this.rol == GestorRoles.MIEMBRO_COPASST) {

        GestorBotones.crearBotonesTrabajoMiembroCopasst(this.opcionesTrabajo)

      }

      if (this.rol == GestorRoles.SECRETARIO_COPASST) {

        GestorBotones.crearBotonesTrabajoSecretarioCopasst(this.opcionesTrabajo)

      }

      if (this.rol == GestorRoles.MIEMBRO_CCL) {

        GestorBotones.crearBotonesTrabajoMiembroCcl(this.opcionesTrabajo)

      }

      if (this.rol == GestorRoles.SECRETARIO_CCL) {

        GestorBotones.crearBotonesTrabajoSecretarioCcl(this.opcionesTrabajo)

      }

    }
  }

}

class GestorBotones {

  static crearBotonesActas(conjuntoOpciones: Opcion[]) {

    let opcion: Opcion = new Opcion();
    opcion.nombre = "Dirección";
    opcion.imagen = "assets/iconos/Dirección.png";
    opcion.ruta = "/servicio/actas/direccion";
    conjuntoOpciones.push(opcion);

    opcion = new Opcion();
    opcion.nombre = "COPASST";
    opcion.imagen = "assets/iconos/COPASST.png";
    opcion.ruta = "/servicio/actas/copasst";
    conjuntoOpciones.push(opcion);

    opcion = new Opcion();
    opcion.nombre = "CCL";
    opcion.imagen = "assets/iconos/CCL.png";
    opcion.ruta = "servicio/listaActas/ccl";
    conjuntoOpciones.push(opcion);

  }

  static crearBotonesActasDireccion(conjuntoOpciones: Opcion[]) {

    let opcion: Opcion = new Opcion();
    opcion.nombre = "Reunión";
    opcion.imagen = "assets/iconos/Reunión.png";
    opcion.ruta = "/servicio/listaActas/direccion/reunion";
    conjuntoOpciones.push(opcion);

    opcion = new Opcion();
    opcion.nombre = "Capacitación";
    opcion.imagen = "assets/iconos/Capacitación.png";
    opcion.ruta = "/servicio/listaActas/direccion/capacitacion";
    conjuntoOpciones.push(opcion);

  }

  static crearBotonesActasCopasst(conjuntoOpciones: Opcion[]) {

    let opcion: Opcion = new Opcion();
    opcion.nombre = "Reunión";
    opcion.imagen = "assets/iconos/Reunión.png";
    opcion.ruta = "/servicio/listaActas/copasst/reunion";
    conjuntoOpciones.push(opcion);

    opcion = new Opcion();
    opcion.nombre = "Capacitación";
    opcion.imagen = "assets/iconos/Capacitación.png";
    opcion.ruta = "/servicio/listaActas/copasst/capacitacion";
    conjuntoOpciones.push(opcion);

  }

  static crearBotonesEvaluacionAnual(conjuntoOpciones: Opcion[]) {

    let opcion: Opcion = new Opcion();
    opcion.nombre = "Ver informe de mejora";
    opcion.imagen = "assets/iconos/Ver informe.png";
    opcion.ruta = "/verInforme";
    conjuntoOpciones.push(opcion);

    opcion = new Opcion();
    opcion.nombre = "Ver registro de informes";
    opcion.imagen = "assets/iconos/Lista.png";
    opcion.ruta = "/listaInformes";
    conjuntoOpciones.push(opcion);

  }

  static crearBotonesAcosoLaboral(conjuntoOpciones: Opcion[]) {

    let opcion: Opcion = new Opcion();
    opcion.nombre = "Enviar reporte";
    opcion.imagen = "assets/iconos/Enviar.png";
    opcion.ruta = "/enviarReporte";
    conjuntoOpciones.push(opcion);

    opcion = new Opcion();
    opcion.nombre = "Mis reportes";
    opcion.imagen = "assets/iconos/Lista.png";
    opcion.ruta = "/misReportes";
    conjuntoOpciones.push(opcion);

  }

  static crearBotonesPqrs(conjuntoOpciones: Opcion[]) {

    let opcion: Opcion = new Opcion();
    opcion.nombre = "Enviar PQRS";
    opcion.imagen = "assets/iconos/Enviar.png";
    opcion.ruta = "/enviarPqrs";
    conjuntoOpciones.push(opcion);

    opcion = new Opcion();
    opcion.nombre = "Mis PQRS";
    opcion.imagen = "assets/iconos/Lista.png";
    opcion.ruta = "/misPqrs";
    conjuntoOpciones.push(opcion);

  }

  static crearBotonesTrabajoEmpleador(conjuntoOpciones: Opcion[]) {

    let opcion: Opcion = new Opcion();
    opcion.nombre = "Crear informe de mejora";
    opcion.imagen = "assets/iconos/Evaluación.png";
    opcion.ruta = "/crearInforme";
    conjuntoOpciones.push(opcion);

  }

  static crearBotonesTrabajoDirector(conjuntoOpciones: Opcion[]) {

    let opcion:Opcion = new Opcion();
    opcion.nombre = "Generar cuentas";
    opcion.imagen = "assets/iconos/Generar.png";
    opcion.ruta = "/generarCuentas";
    conjuntoOpciones.push(opcion);

    opcion = new Opcion();
    opcion.nombre = "Añadir áreas";
    opcion.imagen = "assets/iconos/Área.png";
    opcion.ruta = "/agregarAreas";
    conjuntoOpciones.push(opcion);

    opcion = new Opcion();
    opcion.nombre = "Añadir lugares";
    opcion.imagen = "assets/iconos/Lugar.png";
    opcion.ruta = "/agregarLugares";
    conjuntoOpciones.push(opcion);

    opcion = new Opcion();
    opcion.nombre = "Actas";
    opcion.imagen = "assets/iconos/Acta.png";
    opcion.ruta = "/trabajo/director/actas";
    conjuntoOpciones.push(opcion);

  }

  static crearBotonesDirectorActas(conjuntoOpciones: Opcion[]){

    let opcion:Opcion = new Opcion();
    opcion.nombre = "Capacitaciones";
    opcion.imagen = "assets/iconos/Reunión.png";
    opcion.ruta = "/trabajo/director/actas/capacitaciones";
    conjuntoOpciones.push(opcion);

    opcion = new Opcion();
    opcion.nombre = "Reuniones";
    opcion.imagen = "assets/iconos/Capacitación.png";
    opcion.ruta = "/trabajo/director/actas/reuniones";
    conjuntoOpciones.push(opcion);

  }

  static crearBotonesTrabajoMiembroCopasst(conjuntoOpciones: Opcion[]) {

    let opcion = new Opcion();
    opcion.nombre = "Actas";
    opcion.imagen = "assets/iconos/Acta.png";
    opcion.ruta = "/trabajo/miembroCopasst/actas";
    conjuntoOpciones.push(opcion);

    opcion = new Opcion();
    opcion.nombre = "PQRS";
    opcion.imagen = "assets/iconos/PQRS.png";
    opcion.ruta = "/listaPqrs";
    conjuntoOpciones.push(opcion);

  }

  static crearBotonesMiembroCopasstActas(conjuntoOpciones: Opcion[]){

    let opcion:Opcion = new Opcion();
    opcion.nombre = "Capacitaciones";
    opcion.imagen = "assets/iconos/Capacitación.png";
    opcion.ruta = "/trabajo/miembroCopasst/actas/capacitaciones";
    conjuntoOpciones.push(opcion);

    opcion = new Opcion();
    opcion.nombre = "Reuniones";
    opcion.imagen = "assets/iconos/Reunión.png";
    opcion.ruta = "/trabajo/miembroCopasst/actas/reuniones";
    conjuntoOpciones.push(opcion);

  }

  static crearBotonesTrabajoSecretarioCopasst(conjuntoOpciones: Opcion[]) {

    let opcion = new Opcion();
    opcion.nombre = "Actas";
    opcion.imagen = "assets/iconos/Acta.png";
    opcion.ruta = "/trabajo/secretarioCopasst/actas";
    conjuntoOpciones.push(opcion);

    opcion = new Opcion();
    opcion.nombre = "PQRS";
    opcion.imagen = "assets/iconos/PQRS.png";
    opcion.ruta = "/listaPqrs";
    conjuntoOpciones.push(opcion);
    
  }

  static crearBotonesSecretarioCopasstActas(conjuntoOpciones: Opcion[]){

    let opcion:Opcion = new Opcion();
    opcion.nombre = "Capacitaciones";
    opcion.imagen = "assets/iconos/Capacitación.png";
    opcion.ruta = "/trabajo/secretarioCopasst/actas/capacitaciones";
    conjuntoOpciones.push(opcion);

    opcion = new Opcion();
    opcion.nombre = "Reuniones";
    opcion.imagen = "assets/iconos/Reunión.png";
    opcion.ruta = "/trabajo/secretarioCopasst/actas/reuniones";
    conjuntoOpciones.push(opcion);

  }

  static crearBotonesTrabajoMiembroCcl(conjuntoOpciones: Opcion[]) {

    let opcion = new Opcion();
    opcion.nombre = "Actas";
    opcion.imagen = "assets/iconos/Acta.png";
    opcion.ruta = "/trabajo/miembroCcl/actas";
    conjuntoOpciones.push(opcion);

    opcion = new Opcion();
    opcion.nombre = "Acoso laboral";
    opcion.imagen = "assets/iconos/Acoso.png";
    opcion.ruta = "/listaReportes";
    conjuntoOpciones.push(opcion);

    opcion = new Opcion();
    opcion.nombre = "PQRS";
    opcion.imagen = "assets/iconos/PQRS.png";
    opcion.ruta = "/listaPqrs";
    conjuntoOpciones.push(opcion);

  }

  static crearBotonesTrabajoSecretarioCcl(conjuntoOpciones: Opcion[]) {

    let opcion = new Opcion();
    opcion.nombre = "Actas";
    opcion.imagen = "assets/iconos/Acta.png";
    opcion.ruta = "/trabajo/secretarioCcl/actas";
    conjuntoOpciones.push(opcion);

    opcion = new Opcion();
    opcion.nombre = "Acoso laboral";
    opcion.imagen = "assets/iconos/Acoso.png";
    opcion.ruta = "/listaReportes";
    conjuntoOpciones.push(opcion);

    opcion = new Opcion();
    opcion.nombre = "PQRS";
    opcion.imagen = "assets/iconos/PQRS.png";
    opcion.ruta = "/listaPqrs";
    conjuntoOpciones.push(opcion);
    
  }

}

class Opcion {

  nombre: string;
  imagen: string;
  ruta: string;

}

