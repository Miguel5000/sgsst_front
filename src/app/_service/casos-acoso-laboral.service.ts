import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Empresa } from '../_model/Empresa';
import { CasoAcosoLaboral } from '../_model/CasoAcosoLaboral';
import { Usuario } from '../_model/Usuario';
import { EstadoCaso } from '../_model/EstadoCaso';
import { CausaCaso } from '../_model/CausaCaso';
import { InvolucradosEnCaso } from '../_model/InvolucradosEnCaso';

@Injectable({
  providedIn: 'root'
})
export class CasosAcosoLaboralService {

  private URL: string = environment.API +  '/casosacosolaboral';

  constructor(private http: HttpClient) { }

  getCasosDeEmpresa(empresa: Empresa){

    return this.http.post<CasoAcosoLaboral[]>(this.URL + "/getcasosdeempresa", empresa);

  }

  getCasosDeUsuario(usuario: Usuario){

    return this.http.post<CasoAcosoLaboral[]>(this.URL + "/getcasosdeusuario", usuario);

  }

  get(id: number){

    return this.http.get<CasoAcosoLaboral>(this.URL + "/get?id=" + id);

  }

  crear(casoAcosoLaboral: CasoAcosoLaboral){

    return this.http.post<CasoAcosoLaboral>(this.URL + "/crear", casoAcosoLaboral);

  }

  getEstado(id: number){

    return this.http.get<EstadoCaso>(this.URL + "/getestado?id=" + id);

  }

  getCausa(id: number){

    return this.http.get<CausaCaso>(this.URL + "/getcausa?id=" + id);
    
  }

  getCausas(){

    return this.http.get<CausaCaso[]>(this.URL + "/getcausas");

  }

  crearInvolucrado(involucracion: InvolucradosEnCaso){

    return this.http.post(this.URL + "/crearinvolucrado", involucracion);

  }

  getInvolucraciones(id: number){

    return this.http.get<InvolucradosEnCaso[]>(this.URL + "/getinvolucraciones?id=" + id);

  }

}
