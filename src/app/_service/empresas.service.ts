import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Empresa } from '../_model/Empresa';
import { TipoBrigada } from '../_model/TipoBrigada';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  private URL: string = environment.API +  '/empresas';

  constructor(private http: HttpClient) { }

  get(id: number){

    return this.http.get<Empresa>(this.URL + "/get?id=" + id);

  }

  crear(empresa: Empresa){

    return this.http.post<Empresa>(this.URL + "/crear", empresa);

  }

  guardarArchivo(arregloUint: Uint8Array, nombre: string){

    let bytes:number[];
    bytes = [];

    arregloUint.forEach(element => {
      
      bytes.push(element);      

    });

    let paquete =  {archivo: bytes};
    return this.http.put(this.URL + "/guardararchivo?nombre=" + nombre, paquete);

  }

  //Brigada

  getBrigadas(){

    return this.http.get<TipoBrigada[]>(this.URL + "/getbrigadas");

  }

  getBrigada(id: number){

    return this.http.get<TipoBrigada>(this.URL + "?id=" + id);

  }

}
