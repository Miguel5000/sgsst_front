import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Empresa } from '../_model/Empresa';
import { Usuario } from '../_model/Usuario';
import { Byte } from '@angular/compiler/src/util';
import { Rol } from '../_model/Rol';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private URL: string = environment.API +  '/usuarios';

  constructor(private http: HttpClient) { }

  getEmpleados(empresa: Empresa){

    return this.http.post<Usuario[]>(this.URL + "/getempleados", empresa);

  }

  iniciarSesion(usuario: Usuario){

    return this.http.post<Usuario>(this.URL + "/iniciarsesion", usuario);

  }

  get(token: string){

    return this.http.get<Usuario>(this.URL + "/get?token=" + token);

  }

  generarUsuarios(archivo: Byte[]){

    return this.http.post(this.URL + "/generarusuarios", archivo);

  }

  crear(usuario: Usuario){

    return this.http.post(this.URL + "/crear", usuario);

  }

  cambiarClave(usuario: Usuario){

    return this.http.put(this.URL + "/cambiarclave", usuario);

  }

  eliminar(usuario: Usuario){

    return this.http.delete(this.URL + "/eliminar", {body: usuario});

  }

  getRol(usuario: Usuario){

    return this.http.post<Rol>(this.URL + "/getrol", usuario);

  }

  generarToken(usuario: Usuario){

    return this.http.put(this.URL + "/generartoken", usuario);

  }

  enviarCorreo(usuario: Usuario){

    return this.http.post(this.URL + "/enviarcorreo", usuario);

  }

  guardarArchivo(arregloUint: Uint8Array){

    let bytes:number[];
    bytes = [];

    arregloUint.forEach(element => {
      
      bytes.push(element);      

    });

    let paquete =  {archivo: bytes};
    return this.http.put(this.URL + "/guardararchivo", paquete);

  }

}
