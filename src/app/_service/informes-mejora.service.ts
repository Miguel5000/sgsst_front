import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Empresa } from '../_model/Empresa';
import { InformeMejora } from '../_model/InformeMejora';

@Injectable({
  providedIn: 'root'
})
export class InformesMejoraService {

  private URL: string = environment.API +  '/informesmejora';

  constructor(private http: HttpClient) { }

  getInformes(empresa: Empresa){

    return this.http.post<InformeMejora[]>(this.URL + "/getinformes", empresa);

  }

  get(id: number){

    return this.http.get<InformeMejora>(this.URL + "/get?id=" + id);

  }

  crear(informe: InformeMejora){

    return this.http.post(this.URL + "/crear", informe);

  }

  editar(informe: InformeMejora){

    return this.http.put(this.URL + "/editar", informe);

  }

}
