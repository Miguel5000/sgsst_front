import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { GrupoSgsst } from '../_model/GrupoSgsst';

@Injectable({
  providedIn: 'root'
})
export class GruposSgsstService {

  private URL: string = environment.API +  '/grupossgsst';

  constructor(private http: HttpClient) { }

  getGrupos(){

    return this.http.get<GrupoSgsst[]>(this.URL + "/getgrupos");

  }

  get(id: number){

    return this.http.get<GrupoSgsst>(this.URL + "?id=" + id);

  }

}
