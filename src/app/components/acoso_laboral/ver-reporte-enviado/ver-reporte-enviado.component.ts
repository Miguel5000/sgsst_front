import { Component, OnInit } from '@angular/core';
import { CasoAcosoLaboral } from 'src/app/_model/CasoAcosoLaboral';
import { AreasService } from 'src/app/_service/areas.service';
import { CasosAcosoLaboralService } from 'src/app/_service/casos-acoso-laboral.service';
import { UsuariosService } from 'src/app/_service/usuarios.service';

@Component({
  selector: 'app-ver-reporte-enviado',
  templateUrl: './ver-reporte-enviado.component.html',
  styleUrls: ['./ver-reporte-enviado.component.css']
})
export class VerReporteEnviadoComponent implements OnInit {

  caso: CasoAcosoLaboral;
  casoInterfaz: CasoInterfaz = new CasoInterfaz();
  involucradosInterfaz: InvolucradoInterfaz[] = [];

  constructor(private casosAcosoLaboralService: CasosAcosoLaboralService,
    private usuariosService: UsuariosService,
    private areasService: AreasService) { }

  ngOnInit(): void {

    let casoJson = sessionStorage.getItem("casoVer");

    if (casoJson != null) {

      this.caso = JSON.parse(casoJson);
      this.caso.fecha = new Date(this.caso.fecha).toLocaleString().split(",")[0];

      this.casosAcosoLaboralService.getCausa(this.caso.idCausa).subscribe(data => {

        this.usuariosService.getPorId(this.caso.idCreador).subscribe(data2 => {

          this.areasService.getParaUsuario(data2).subscribe(data3 => {

            this.casoInterfaz.areaAutor = data3.nombre;
            this.casoInterfaz.causa = data.nombre;
            this.casoInterfaz.correoAutor = data2.correo;
            this.casoInterfaz.fecha = this.caso.fecha;
            this.casoInterfaz.nombreAutor = data2.nombre;
            this.casoInterfaz.hechos = this.caso.hechos;
            this.casoInterfaz.sugerencias = this.caso.sugerencia;

          })

        })

      })

      this.casosAcosoLaboralService.getInvolucraciones(this.caso.id).subscribe(data => {

        data.forEach(element => {
          
          this.usuariosService.getPorId(element.idUsuario).subscribe(data2 => {

            this.areasService.getParaUsuario(data2).subscribe(data3 => {

              let involucradoInterfaz = new InvolucradoInterfaz();
              involucradoInterfaz.nombre = data2.nombre;
              involucradoInterfaz.area = data3.nombre;

              this.involucradosInterfaz.push(involucradoInterfaz);

            })

          })

        });

      })

    }

  }

}

class CasoInterfaz{

  fecha: string;
  causa: string;
  nombreAutor: string;
  areaAutor: string;
  correoAutor: string;
  hechos: string;
  sugerencias: string;

}

class InvolucradoInterfaz{

  nombre: string;
  area: string;

}