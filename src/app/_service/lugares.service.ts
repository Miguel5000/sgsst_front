import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Empresa } from '../_model/Empresa';
import { Lugar } from '../_model/Lugar';

@Injectable({
  providedIn: 'root'
})
export class LugaresService {

  private URL: string = environment.API +  '/lugares';

  constructor(private http: HttpClient) { }

  getLugares(empresa: Empresa){

    return this.http.post<Lugar[]>(this.URL + "/getlugares", empresa);

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

}
