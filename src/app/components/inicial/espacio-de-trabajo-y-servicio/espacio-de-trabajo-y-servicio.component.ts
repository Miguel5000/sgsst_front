import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTab } from '@angular/material/tabs';

@Component({
  selector: 'app-espacio-de-trabajo-y-servicio',
  templateUrl: './espacio-de-trabajo-y-servicio.component.html',
  styleUrls: ['./espacio-de-trabajo-y-servicio.component.css']
})
export class EspacioDeTrabajoYServicioComponent implements OnInit {

  rol: string;
  opcionesTrabajo: Opcion[];
  opcionesServicio: Opcion[];
  opcionesIntermedias: Opcion[];
  intermediario: boolean;
  tituloIntermediario: string;

  constructor(private router: Router) { }

  ngOnInit(): void {

    this.rol = "Director";

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

      this.tituloIntermediario = "Espacio de trabajo";

    } else {

      this.intermediario = false;

      let opcion: Opcion = new Opcion();
      opcion.nombre = "Actas";
      opcion.imagen = "123.jpg";
      opcion.ruta = "/servicio/actas";
      this.opcionesServicio.push(opcion);

      opcion = new Opcion();
      opcion.nombre = "Evaluación anual";
      opcion.imagen = "123.jpg";
      opcion.ruta = "/servicio/evaluacionAnual";
      this.opcionesServicio.push(opcion);

      if (this.rol != "Secretario del CCL" && this.rol != "Empleador") {
        opcion = new Opcion();
        opcion.nombre = "Acoso laboral";
        opcion.imagen = "123.jpg";
        opcion.ruta = "/servicio/acosoLaboral";
        this.opcionesServicio.push(opcion);
      }

      if (this.rol != "Empleador") {
        opcion = new Opcion();
        opcion.nombre = "PQRS";
        opcion.imagen = "123.jpg";
        opcion.ruta = "/servicio/pqrs";
        this.opcionesServicio.push(opcion);
      }

      if (this.rol == "Empleador") {

        opcion = new Opcion();
        opcion.nombre = "Crear informe de mejora";
        opcion.imagen = "123.jpg";
        opcion.ruta = "/crearInforme";
        this.opcionesTrabajo.push(opcion);

      }

      if (this.rol == "Director") {

        opcion = new Opcion();
        opcion.nombre = "Generar cuentas";
        opcion.imagen = "123.jpg";
        opcion.ruta = "/generarCuentas";
        this.opcionesTrabajo.push(opcion);

        opcion = new Opcion();
        opcion.nombre = "Añadir áreas";
        opcion.imagen = "123.jpg";
        opcion.ruta = "/agregarAreas";
        this.opcionesTrabajo.push(opcion);

        opcion = new Opcion();
        opcion.nombre = "Añadir lugares";
        opcion.imagen = "123.jpg";
        opcion.ruta = "/agregarLugares";
        this.opcionesTrabajo.push(opcion);

        opcion = new Opcion();
        opcion.nombre = "Actas";
        opcion.imagen = "123.jpg";
        opcion.ruta = "/trabajo/actas";
        this.opcionesTrabajo.push(opcion);

      }

    }
  }

}

class GestorBotones {

  static crearBotonesActas(conjuntoOpciones: Opcion[]) {

    let opcion: Opcion = new Opcion();
    opcion.nombre = "Dirección";
    opcion.imagen = "123.jpg";
    opcion.ruta = "/servicio/actas/direccion";
    conjuntoOpciones.push(opcion);

    opcion = new Opcion();
    opcion.nombre = "COPASST";
    opcion.imagen = "123.jpg";
    opcion.ruta = "/servicio/actas/copasst";
    conjuntoOpciones.push(opcion);

    opcion = new Opcion();
    opcion.nombre = "CCL";
    opcion.imagen = "123.jpg";
    opcion.ruta = "servicio/listaActas/ccl";
    conjuntoOpciones.push(opcion);

  }

  static crearBotonesActasDireccion(conjuntoOpciones: Opcion[]) {

    let opcion: Opcion = new Opcion();
    opcion.nombre = "Reunión";
    opcion.imagen = "123.jpg";
    opcion.ruta = "/servicio/listaActas/direccion/reunion";
    conjuntoOpciones.push(opcion);

    opcion = new Opcion();
    opcion.nombre = "Capacitación";
    opcion.imagen = "123.jpg";
    opcion.ruta = "/servicio/listaActas/direccion/capacitacion";
    conjuntoOpciones.push(opcion);

  }

  static crearBotonesActasCopasst(conjuntoOpciones: Opcion[]) {

    let opcion: Opcion = new Opcion();
    opcion.nombre = "Reunión";
    opcion.imagen = "123.jpg";
    opcion.ruta = "/servicio/listaActas/copasst/reunion";
    conjuntoOpciones.push(opcion);

    opcion = new Opcion();
    opcion.nombre = "Capacitación";
    opcion.imagen = "123.jpg";
    opcion.ruta = "/servicio/listaActas/copasst/capacitacion";
    conjuntoOpciones.push(opcion);

  }

  static crearBotonesEvaluacionAnual(conjuntoOpciones: Opcion[]) {

    let opcion: Opcion = new Opcion();
    opcion.nombre = "Ver informe de mejora";
    opcion.imagen = "123.jpg";
    opcion.ruta = "/verInforme";
    conjuntoOpciones.push(opcion);

    opcion = new Opcion();
    opcion.nombre = "Ver registro de informes";
    opcion.imagen = "123.jpg";
    opcion.ruta = "/listaInformes";
    conjuntoOpciones.push(opcion);

  }

  static crearBotonesAcosoLaboral(conjuntoOpciones: Opcion[]) {

    let opcion: Opcion = new Opcion();
    opcion.nombre = "Enviar reporte";
    opcion.imagen = "123.jpg";
    opcion.ruta = "/enviarReporte";
    conjuntoOpciones.push(opcion);

    opcion = new Opcion();
    opcion.nombre = "Mis reportes";
    opcion.imagen = "123.jpg";
    opcion.ruta = "/misReportes";
    conjuntoOpciones.push(opcion);

  }

  static crearBotonesPqrs(conjuntoOpciones: Opcion[]) {

    let opcion: Opcion = new Opcion();
    opcion.nombre = "Enviar PQRS";
    opcion.imagen = "123.jpg";
    opcion.ruta = "/enviarPqrs";
    conjuntoOpciones.push(opcion);

    opcion = new Opcion();
    opcion.nombre = "Mis PQRS";
    opcion.imagen = "123.jpg";
    opcion.ruta = "/misPqrs";
    conjuntoOpciones.push(opcion);

  }

}

class Opcion {

  nombre: string;
  imagen: string;
  ruta: string;

}
