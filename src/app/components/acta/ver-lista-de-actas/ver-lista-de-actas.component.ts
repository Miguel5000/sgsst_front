import { Component, OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Acta } from 'src/app/_model/Acta';
import { Empresa } from 'src/app/_model/Empresa';
import { GrupoSgsst } from 'src/app/_model/GrupoSgsst';
import { PaqueteGetActas } from 'src/app/_model/PaqueteGetActas';
import { TipoActa } from 'src/app/_model/TipoActa';
import { ActasService } from 'src/app/_service/actas.service';

@Component({
  selector: 'app-ver-lista-de-actas',
  templateUrl: './ver-lista-de-actas.component.html',
  styleUrls: ['./ver-lista-de-actas.component.css']
})
export class VerListaDeActasComponent implements OnInit {

  isCreable:boolean = false;
  tipoActas:string;
  actas: Acta[] = [];
  actasFiltradas: Acta[] = [];
  paquete: PaqueteGetActas;

  constructor(private router: Router,
    private actasService: ActasService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    if(this.router.url.includes("trabajo") && !this.router.url.includes("miembro")){

      this.isCreable = true;

    }

    if(this.router.url.includes("capacitacion")){

      this.tipoActas = "Capacitación";

    }else{


      this.tipoActas = "Reunión";

    }

    this.paquete = new PaqueteGetActas();
    let tipoActa:TipoActa = new TipoActa();
    tipoActa.id = this.tipoActas == "Reunión" ? 1:2;
    this.paquete.TipoActa = tipoActa;
    
    let idGrupo: number;
    if(this.router.url.toLowerCase().includes("copasst")){

      idGrupo = 1;

    }else if(this.router.url.toLowerCase().includes("ccl")){

      idGrupo = 2;

    }else{

      idGrupo = 3;

    }
    let grupo:GrupoSgsst = new GrupoSgsst();
    grupo.id = idGrupo;

    this.paquete.Grupo = grupo;
    
    this.paquete.Publicacion = (this.router.url.includes("servicio")) ? true:false;
    
    let empresa:Empresa;

    let empresaJson = sessionStorage.getItem("empresa");
    if(empresaJson != null){
      empresa = JSON.parse(empresaJson);
    }else{
      empresa = new Empresa();
      empresa.id = 1;
      empresa.nombre = "Abc";
      empresa.telefono = "3131562857";
      empresa.logotipo = "agaghkhgkagk";
      empresa.direccion = "Dire";
      empresa.dimensionArea = 25;
    }

    this.paquete.Empresa = empresa;
    
    this.actasService.getActas(this.paquete).subscribe(data => {

      this.actas = data;
      this.actasFiltradas = data;
      this.actas.forEach(element => {
        element.fecha = new Date(element.fecha).toLocaleDateString() + " " + element.horaInicio.split(":")[0] + ":" +  element.horaInicio.split(":")[1] +  " - " + element.horaFin.split(":")[0] + ":" +  element.horaFin.split(":")[1];
      });

    })

  }

  crear(){

    sessionStorage.setItem("tipoActa", this.tipoActas);
    sessionStorage.setItem("enlaceListaActas", this.router.url);
    this.router.navigate(["/crearActa"])

  }
  
  editar(acta: Acta){

    sessionStorage.setItem("actaEditar", JSON.stringify(acta));
    sessionStorage.setItem("enlaceListaActas", this.router.url);
    this.router.navigate(["/crearActa"])

  }

  ver(acta: Acta){

    sessionStorage.setItem("actaMostrar", JSON.stringify(acta));
    this.router.navigate(["/verActa"])

  }

  eliminar(acta: Acta){

    let fechaAjustada = acta.fecha.split(" ")[0];
    fechaAjustada = fechaAjustada.replace("/", "-");
    fechaAjustada = fechaAjustada.replace("/", "-");
    fechaAjustada = fechaAjustada.split("-")[2] + "-" + fechaAjustada.split("-")[1] + "-" + fechaAjustada.split("-")[0];

    acta.fecha = fechaAjustada;

    this.actasService.eliminar(acta).subscribe(data => {

      this._snackBar.open("Acta eliminada exitosamente", "Cerrar", { duration: 3000 });
      this.actas = 
      this.actasFiltradas = [];

    });

    this.actasService.getActas(this.paquete).subscribe(data => {

      this.actas = data;
      this.actasFiltradas = data;
      this.actas.forEach(element => {
        element.fecha = new Date(element.fecha).toLocaleDateString() + " " + element.horaInicio.split(":")[0] + ":" +  element.horaInicio.split(":")[1] +  " - " + element.horaFin.split(":")[0] + ":" +  element.horaFin.split(":")[1];
      });

    })


    
  }

  filtrar(event: Event){

    let elemento:HTMLInputElement = event.target as HTMLInputElement;
    this.actasFiltradas = this.actas.filter(acta => acta.tema.toLowerCase().includes(elemento.value.toLowerCase())
     || acta.numero.toString().toLowerCase().includes(elemento.value.toLowerCase())
     || acta.fecha.toString().toLowerCase().includes(elemento.value.toLowerCase()));

  }
  
}
