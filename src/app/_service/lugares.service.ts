import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Empresa } from '../_model/Empresa';
import { Lugar } from '../_model/Lugar';
import { Acta } from '../_model/Acta';

@Injectable({
  providedIn: 'root'
})
export class LugaresService {

  private URL: string = environment.API +  '/lugares';

  constructor(private http: HttpClient) { }

  get(id: number){

    return this.http.get<Lugar>(this.URL + "/get?id=" + id)

  }

  getLugares(empresa: Empresa){

    return this.http.post<Lugar[]>(this.URL + "/getlugares", empresa);

  }

  getLugar(acta: Acta){

    return this.http.post<Lugar>(this.URL + "/getlugar", acta);

  }

  crear(lugar: Lugar){

    return this.http.post<Lugar>(this.URL + "/crear", lugar);

  }

  editar(lugar: Lugar){

    return this.http.put<Lugar>(this.URL + "/editar", lugar);

  }

  eliminar(lugar: Lugar){

    return this.http.delete<Lugar>(this.URL + "/eliminar", {body: lugar});

  }

  isAgregable(lugar: Lugar){

    return this.http.post<boolean>(this.URL + "/isagregable", lugar);

  }

  isEliminable(lugar: Lugar){

    return this.http.post<boolean>(this.URL + "/iseliminable", lugar);

  }

}
