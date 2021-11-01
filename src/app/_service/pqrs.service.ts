import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Empresa } from '../_model/Empresa';
import { Pqrs } from '../_model/Pqrs';
import { Usuario } from '../_model/Usuario';
import { TipoPqrs } from '../_model/TipoPqrs';

@Injectable({
  providedIn: 'root'
})
export class PqrsService {

  private URL: string = environment.API +  '/lugares';

  constructor(private http: HttpClient) { }

  getListaPqrsPorEmpresa(empresa: Empresa){

    return this.http.post<Pqrs[]>(this.URL + "/getlistapqrsporempresa", empresa);

  }

  getListaPqrsPorUsuario(usuario: Usuario){

    return this.http.post<Pqrs[]>(this.URL + "/getlistapqrsporusuario", usuario);

  }

  get(id: number){

    return this.http.get<Pqrs>(this.URL + "/get?id=" + id);

  }

  crear(pqrs: Pqrs){

    return this.http.post(this.URL + "/crear", pqrs);

  }

  getTipos(){

    return this.http.get<TipoPqrs[]>(this.URL + "/gettipos");

  }

}
