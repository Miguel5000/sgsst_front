import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empresa } from 'src/app/_model/Empresa';
import { GestorRoles } from 'src/app/_model/GestorRoles';
import { Usuario } from 'src/app/_model/Usuario';
import { PqrsService } from 'src/app/_service/pqrs.service';

@Component({
  selector: 'app-ver-lista-pqrs',
  templateUrl: './ver-lista-pqrs.component.html',
  styleUrls: ['./ver-lista-pqrs.component.css']
})
export class VerListaPqrsComponent implements OnInit {

  listaPqrsInterfaz: PqrsInterfaz[] = [];
  listaPqrsInterfazFiltro: PqrsInterfaz[] = [];
  rol: string;
  empresa: Empresa;
  usuario: Usuario;

  constructor(private router: Router,
    private pqrsService: PqrsService) { }

  ngOnInit(): void {

    let rolSession = sessionStorage.getItem("rol");
    let empresaJson = sessionStorage.getItem("empresa");
    let usuarioJson = sessionStorage.getItem("usuario");

    if (rolSession != null && empresaJson != null && usuarioJson != null) {

      this.rol = rolSession;
      this.empresa = JSON.parse(empresaJson);
      this.usuario = JSON.parse(usuarioJson);

      if (this.router.url.includes("listaPqrs")) {

        if (this.rol == GestorRoles.SECRETARIO_COPASST || this.rol == GestorRoles.MIEMBRO_COPASST) {

          this.pqrsService.getListaPqrsPorGrupo(this.empresa.id, 1).subscribe(data => {

            data.forEach(element => {

              this.pqrsService.getTipo(element.idTipo).subscribe(data2 => {

                let pqrsInterfaz: PqrsInterfaz = new PqrsInterfaz();
                pqrsInterfaz.fecha = new Date(element.fecha).toLocaleString().split(",")[0];
                pqrsInterfaz.id = element.id;
                pqrsInterfaz.tipo = data2.nombre;
                pqrsInterfaz.titulo = element.titulo;

                this.listaPqrsInterfaz.push(pqrsInterfaz);
                this.listaPqrsInterfazFiltro.push(pqrsInterfaz);

              })

            });

          })

        } else {

          this.pqrsService.getListaPqrsPorGrupo(this.empresa.id, 2).subscribe(data => {

            data.forEach(element => {

              this.pqrsService.getTipo(element.idTipo).subscribe(data2 => {

                let pqrsInterfaz: PqrsInterfaz = new PqrsInterfaz();
                pqrsInterfaz.fecha = new Date(element.fecha).toLocaleString().split(",")[0];
                pqrsInterfaz.id = element.id;
                pqrsInterfaz.tipo = data2.nombre;
                pqrsInterfaz.titulo = element.titulo;

                this.listaPqrsInterfaz.push(pqrsInterfaz);
                this.listaPqrsInterfazFiltro.push(pqrsInterfaz);

              })

            });

          })

        }

      } else {

        this.pqrsService.getListaPqrsPorUsuario(this.usuario).subscribe(data => {

          data.forEach(element => {

            this.pqrsService.getTipo(element.idTipo).subscribe(data2 => {

              let pqrsInterfaz: PqrsInterfaz = new PqrsInterfaz();
              pqrsInterfaz.fecha = new Date(element.fecha).toLocaleString().split(",")[0];
              pqrsInterfaz.id = element.id;
              pqrsInterfaz.tipo = data2.nombre;
              pqrsInterfaz.titulo = element.titulo;

              this.listaPqrsInterfaz.push(pqrsInterfaz);
              this.listaPqrsInterfazFiltro.push(pqrsInterfaz);

            })

          });

        })

      }

    }

  }

  filtrar(event: Event) {

    let elemento: HTMLInputElement = event.target as HTMLInputElement;

    this.listaPqrsInterfazFiltro = this.listaPqrsInterfaz.filter(pqrs => pqrs.fecha.toLowerCase().includes(elemento.value.toLowerCase())
      || pqrs.titulo.toLowerCase().includes(elemento.value.toLowerCase())
      || pqrs.tipo.toLowerCase().includes(elemento.value.toLowerCase()));


  }

  ver(pqrsInterfaz: PqrsInterfaz){

    this.pqrsService.get(pqrsInterfaz.id).subscribe(data => {

      sessionStorage.setItem("pqrsVer", JSON.stringify(data));
      this.router.navigate(["/verPqrs"]);

    })

  }

}

class PqrsInterfaz {

  id: number;
  fecha: string;
  titulo: string;
  tipo: string;

}