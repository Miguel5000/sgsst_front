import { Component, OnInit } from '@angular/core';
import { Acta } from 'src/app/_model/Acta';
import { GrupoSgsst } from 'src/app/_model/GrupoSgsst';
import { Lugar } from 'src/app/_model/Lugar';
import { Subtema } from 'src/app/_model/Subtema';
import { Usuario } from 'src/app/_model/Usuario';
import { ActasService } from 'src/app/_service/actas.service';
import { GruposSgsstService } from 'src/app/_service/grupos-sgsst.service';
import { LugaresService } from 'src/app/_service/lugares.service';

@Component({
  selector: 'app-ver-acta',
  templateUrl: './ver-acta.component.html',
  styleUrls: ['./ver-acta.component.css']
})
export class VerActaComponent implements OnInit {

  constructor(private actasService: ActasService,
    private lugaresService: LugaresService,
    private grupoService: GruposSgsstService) { }

  acta: Acta;
  lugar: Lugar;
  subtemas: Subtema[] = [];
  participantes: Usuario[] = [];
  tipoActa: string;
  rol: string;
  grupos: GrupoSgsst[] = [];
  gruposNombres: string[] = [];
  fechaConvertida: string;
  horaInicioConvertida: string;
  horaFinConvertida: string;

  ngOnInit(): void {

    let actaMostrarJson = sessionStorage.getItem("actaMostrar");

    let rolSession = sessionStorage.getItem("rol");

    if (rolSession != null) {

      this.rol = rolSession;

    }

    if (actaMostrarJson != null) {

      this.acta = JSON.parse(actaMostrarJson);

      let fechaAjustada = this.acta.fecha.split(" ")[0];
      fechaAjustada = fechaAjustada.replace("/", "-");
      fechaAjustada = fechaAjustada.replace("/", "-");
      fechaAjustada = fechaAjustada.split("-")[2] + "-" + fechaAjustada.split("-")[1] + "-" + fechaAjustada.split("-")[0];

      this.acta.fecha = fechaAjustada;

      this.fechaConvertida = new Date(this.acta.fecha).toLocaleDateString();
      this.horaInicioConvertida = this.acta.horaInicio.split(":")[0] + ":" + this.acta.horaInicio.split(":")[1];
      this.horaFinConvertida = this.acta.horaFin.split(":")[0] + ":" + this.acta.horaFin.split(":")[1];

      if(this.acta.capacitacion != null){

        this.tipoActa = "Capacitación";

      }else{

        this.tipoActa = "Reunión";

      }

      this.lugaresService.getLugar(this.acta).subscribe(data => {

        this.lugar = data;

      })

      this.actasService.getSubtemas(this.acta).subscribe(data => {
        
        this.subtemas = data;

      })

      this.actasService.getAsistencias(this.acta).subscribe(data => {

        this.participantes = data;

      })

      this.grupoService.getGrupos().subscribe(data => {

        this.grupos = data;

        this.subtemas.forEach(element => {
          this.gruposNombres.push(this.grupos.filter(x => x.id == element.idGrupo)[0].nombre);
        });

      })

    }

  }

}
