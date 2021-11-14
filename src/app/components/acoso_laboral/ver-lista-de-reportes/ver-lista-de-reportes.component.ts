import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CasoAcosoLaboral } from 'src/app/_model/CasoAcosoLaboral';
import { Empresa } from 'src/app/_model/Empresa';
import { GestorRoles } from 'src/app/_model/GestorRoles';
import { Usuario } from 'src/app/_model/Usuario';
import { CasosAcosoLaboralService } from 'src/app/_service/casos-acoso-laboral.service';
import { UsuariosService } from 'src/app/_service/usuarios.service';

@Component({
  selector: 'app-ver-lista-de-reportes',
  templateUrl: './ver-lista-de-reportes.component.html',
  styleUrls: ['./ver-lista-de-reportes.component.css']
})
export class VerListaDeReportesComponent implements OnInit {

  rol: string;
  usuario: Usuario;
  empresa: Empresa;
  casos: CasoInterfaz[] = [];
  casosFiltrados: CasoInterfaz[] = [];

  constructor(private casosAcosoLaboralService: CasosAcosoLaboralService,
    private usuariosService: UsuariosService,
    private router: Router) { }

  ngOnInit(): void {

    let rolJson = sessionStorage.getItem("rol");
    let empresaJson = sessionStorage.getItem("empresa");
    let usuarioJson = sessionStorage.getItem("usuario");

    if (rolJson != null && empresaJson != null && usuarioJson != null) {

      this.rol = rolJson;
      this.empresa = JSON.parse(empresaJson);
      this.usuario = JSON.parse(usuarioJson);

      if (this.rol == GestorRoles.SECRETARIO_CCL || this.rol == GestorRoles.MIEMBRO_CCL) {

        this.casosAcosoLaboralService.getCasosDeEmpresa(this.empresa).subscribe(data => {

          data.forEach(element => {

            this.casosAcosoLaboralService.getCausa(element.idCausa).subscribe(data2 => {

              this.usuariosService.getPorId(element.idCreador).subscribe(data3 => {

                let caso: CasoInterfaz = new CasoInterfaz();
                caso.id = element.id;
                caso.fecha = element.fecha;

                caso.fecha = new Date(caso.fecha).toLocaleString().split(",")[0];

                caso.nombre = data3.nombre;
                caso.causa = data2.nombre;

                this.casos.push(caso);
                this.casosFiltrados.push(caso);

              })

            })

          });

        })

      } else {

        this.casosAcosoLaboralService.getCasosDeUsuario(this.usuario).subscribe(data => {

          data.forEach(element => {

            this.casosAcosoLaboralService.getCausa(element.idCausa).subscribe(data2 => {

              this.usuariosService.getPorId(element.idCreador).subscribe(data3 => {

                let caso: CasoInterfaz = new CasoInterfaz();
                caso.id = element.id;
                caso.fecha = element.fecha;

                caso.fecha = new Date(caso.fecha).toLocaleString().split(",")[0];

                caso.nombre = data3.nombre;
                caso.causa = data2.nombre;

                this.casos.push(caso);
                this.casosFiltrados.push(caso);

              })

            })

          });

        })

      }

    }

  }

  ver(caso: CasoInterfaz) {

    this.casosAcosoLaboralService.get(caso.id).subscribe(data => {

      sessionStorage.setItem("casoVer", JSON.stringify(data));
      this.router.navigate(['/verReporte']);

    })

  }

  filtrar(event: Event) {

    let elemento: HTMLInputElement = event.target as HTMLInputElement;

    if (this.rol == GestorRoles.SECRETARIO_CCL || this.rol == GestorRoles.MIEMBRO_CCL) {
      this.casosFiltrados = this.casos.filter(caso => caso.nombre.toLowerCase().includes(elemento.value.toLowerCase())
        || caso.causa.toString().toLowerCase().includes(elemento.value.toLowerCase())
        || caso.fecha.toString().toLowerCase().includes(elemento.value.toLowerCase()));
    } else {
      this.casosFiltrados = this.casos.filter(caso => caso.causa.toString().toLowerCase().includes(elemento.value.toLowerCase())
        || caso.fecha.toString().toLowerCase().includes(elemento.value.toLowerCase()));
    }

  }


}

class CasoInterfaz {

  id: number;
  fecha: string;
  nombre: string;
  causa: string;

}
