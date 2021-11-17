import { Component, OnInit } from '@angular/core';
import { InformeMejora } from 'src/app/_model/InformeMejora';
import { InformesMejoraService } from 'src/app/_service/informes-mejora.service';

@Component({
  selector: 'app-registro-de-informes',
  templateUrl: './registro-de-informes.component.html',
  styleUrls: ['./registro-de-informes.component.css']
})
export class RegistroDeInformesComponent implements OnInit {

  informeMejora: InformeMejora[] = [];
  informeMostrar: InformeMejora[] = [];

  constructor(private informeService: InformesMejoraService) { }

  ngOnInit(): void {
    let empresa: any = sessionStorage.getItem("empresa");
    let JsonEmpresa = JSON.parse(empresa);

    let informe: InformeMejora = new InformeMejora();
    informe.idEmpresa = JsonEmpresa.id;
    
    this.informeService.getListaInformes(informe.idEmpresa).subscribe( data => {
      this.informeMejora = data;
      this.informeMostrar = data;
    });
  }

}
