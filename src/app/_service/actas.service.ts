import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Acta } from '../_model/Acta';
import { PaqueteGetActas } from '../_model/PaqueteGetActas';
import { TipoActa } from '../_model/TipoActa';
import { Subtema } from '../_model/Subtema';
import { Asistencia } from '../_model/Asistencia';
import { Usuario } from '../_model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class ActasService {

  private URL: string = environment.API +  '/actas';

  constructor(private http: HttpClient) { }

  getActas(paquete: PaqueteGetActas){

    return this.http.post<Acta[]>(this.URL + "/getactas", paquete);

  }

  get(id: number){

    return this.http.get<Acta>(this.URL + "/get?id=" + id);

  }

  crear(acta: Acta){

    return this.http.post(this.URL + "/crear", acta);

  }

  editar(acta: Acta){

    return this.http.put(this.URL + "/editar", acta);

  }

  eliminar(acta: Acta){

    return this.http.delete(this.URL + "/eliminar", {body: acta});

  }

  getTipo(id: number){

    return this.http.get<TipoActa>(this.URL + "/gettipo?id=" + id);

  }

  //Subtemas

  getSubtemas(acta: Acta){

    return this.http.post<Subtema[]>(this.URL + "/getsubtemas", acta);

  }

  crearSubtema(subtema: Subtema){

    return this.http.post(this.URL + "/crearsubtema", subtema);

  }

  editarSubtema(subtema: Subtema){

    return this.http.put(this.URL + "/editarsubtema", subtema);

  }

  eliminarSubtema(subtema: Subtema){

    return this.http.delete(this.URL + "/eliminarsubtema", {body: subtema});

  }

  //Asistencias

  getAsistencias(acta: Acta){

    return this.http.post<Usuario[]>(this.URL + "/getasistencias", acta);

  }

  getVerdaderasAsistencias(acta: Acta){

    return this.http.post<Asistencia[]>(this.URL + "/getverdaderasasistencias", acta);

  }

  crearAsistencia(asistencia: Asistencia){

    return this.http.post(this.URL + "/crearasistencia", asistencia);

  }

  editarAsistencia(asistencia: Asistencia){

    return this.http.put(this.URL + "/editarasistencia" , asistencia);

  }

  eliminarAsistencia(asistencia: Asistencia){

    return this.http.delete(this.URL + "/eliminarasistencia", {body: asistencia});

  }

}
