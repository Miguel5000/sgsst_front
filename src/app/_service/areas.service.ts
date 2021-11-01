import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Empresa } from '../_model/Empresa';
import { Area } from '../_model/Area';

@Injectable({
  providedIn: 'root'
})
export class AreasService {

  private URL: string = environment.API +  '/areas';

  constructor(private http: HttpClient) { }

  getAreas(empresa: Empresa){

    return this.http.post<Area[]>(this.URL + "/getactas", empresa);

  }

  crear(area: Area){

    return this.http.post(this.URL + "/crear", area);

  }

  editar(area: Area){

    return this.http.put(this.URL + "/editar", area);

  }

  eliminar(area: Area){

    return this.http.delete(this.URL + "/editar", {body: area});

  }

}
