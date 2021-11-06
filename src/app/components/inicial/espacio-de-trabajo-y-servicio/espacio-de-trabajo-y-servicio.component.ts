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

  constructor(private router: Router) { }

  ngOnInit(): void {

    this.rol = "Empleado";

    this.opcionesTrabajo = [];
    this.opcionesServicio = [];

    if(this.rol == "Empleado"){

      let opcion:Opcion = new Opcion();
      opcion.nombre = "Actas";
      opcion.imagen = "123.jpg";
      opcion.ruta = "#";
      this.opcionesServicio.push(opcion);

      opcion = new Opcion();
      opcion.nombre = "Evaluación anual";
      opcion.imagen = "123.jpg";
      opcion.ruta = "#";
      this.opcionesServicio.push(opcion);

      opcion = new Opcion();
      opcion.nombre = "Acoso laboral";
      opcion.imagen = "123.jpg";
      opcion.ruta = "#";
      this.opcionesServicio.push(opcion);

      opcion = new Opcion();
      opcion.nombre = "PQRS";
      opcion.imagen = "123.jpg";
      opcion.ruta = "#";
      this.opcionesServicio.push(opcion);

      console.log(this.opcionesServicio);

    }

  }

}

class Opcion{

  nombre: string;
  imagen: string;
  ruta: string;

}
