import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InformeMejora } from 'src/app/_model/InformeMejora';
import { InformesMejoraService } from 'src/app/_service/informes-mejora.service';

@Component({
  selector: 'app-ver-informe',
  templateUrl: './ver-informe.component.html',
  styleUrls: ['./ver-informe.component.css']
})
export class VerInformeComponent implements OnInit {

  idInforme: number;
  temas: String[] = [];
  temasInterfaz: TemaInterfaz[];
  medidasE: String[] = [];
  medidasEInterfaz: MedidaEInterfaz[];
  medidasD: String[] = [];
  medidasDInterfaz: MedidaDInterfaz[];
  medidasCo: String[] = [];
  medidasCoInterfaz: MedidaCoInterfaz[];
  medidasCcl: String[] = [];
  medidasCclInterfaz: MedidaCclInterfaz[];

  constructor(private informeMejora: InformesMejoraService,
    private route: ActivatedRoute) { 

    this.temasInterfaz = [];
    this.medidasEInterfaz = [];
    this.medidasDInterfaz = [];
    this.medidasCoInterfaz = [];
    this.medidasCclInterfaz = [];
  }

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      this.idInforme = params.id;
      this.informeMejora.get(this.idInforme).subscribe( data => {
        let informe: InformeMejora = new InformeMejora();
        informe.temas = data.temas;
        informe.medidas = data.medidas;

        let JSONTemas = JSON.parse(informe.temas);
        let JsonMedidas = JSON.parse(informe.medidas);

        for(let i = 0; i < JSONTemas.length; i++) {
          this.temasInterfaz.push(JSONTemas[i]);
        }

        for(let i = 0; i < JsonMedidas.empleador.length; i++) {
          this.medidasEInterfaz.push(JsonMedidas.empleador[i]);
        }

        for(let i = 0; i < JsonMedidas.director.length; i++) {
          this.medidasDInterfaz.push(JsonMedidas.director[i]);
        }

        for(let i = 0; i < JsonMedidas.copasst.length; i++) {
          this.medidasCoInterfaz.push(JsonMedidas.copasst[i]);
        }

        for(let i = 0; i < JsonMedidas.ccl.length; i++) {
          this.medidasCclInterfaz.push(JsonMedidas.ccl[i]);
        }
      });
    });
  }
}

class TemaInterfaz {
  descripcion: String;
}

class MedidaEInterfaz {
  descripcion: String;
}

class MedidaDInterfaz {
  descripcion: String;
}

class MedidaCoInterfaz {
  descripcion: String;
}

class MedidaCclInterfaz {
  descripcion: String;
}
