import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Empresa } from '../_model/Empresa';
import { Area } from '../_model/Area';
import { Usuario } from '../_model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AreasService {

  private URL: string = environment.API +  '/areas';

  constructor(private http: HttpClient) { }

  get(id: number){

    return this.http.get<Area>(this.URL + "/get?id=" + id)

  }

  getParaUsuario(usuario: Usuario){

    return this.http.post<Area>(this.URL + "/getparausuario",usuario);

  }

  getAreas(empresa: Empresa){

    return this.http.post<Area[]>(this.URL + "/getareas", empresa);

  }

  crear(area: Area){

    return this.http.post(this.URL + "/crear", area);

  }

  editar(area: Area){

    return this.http.put(this.URL + "/editar", area);

  }

  eliminar(area: Area){

    return this.http.delete(this.URL + "/eliminar", {body: area});

  }

  isAgregable(area: Area){

    return this.http.post<boolean>(this.URL + "/isagregable", area);

  }

  isEliminable(area: Area){

    return this.http.post<boolean>(this.URL + "/iseliminable", area);

  }

}
