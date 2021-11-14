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

  cambiarClave(token: string, clave:any){

    return this.http.put(this.URL + "/cambiarclave?token="+ token ,clave);

  }

  cambiarcontrasena(datos: any){
    return this.http.put(this.URL+"/CambiarContrasena",datos);
  }

  eliminar(usuario: Usuario){

    return this.http.delete(this.URL + "/eliminar", {body: usuario});

  }

  getRol(usuario: Usuario){

    return this.http.post<Rol>(this.URL + "/getrol", usuario);

  }

  getRoles(){

    return this.http.get<Rol[]>(this.URL + "/getroles");

  }

  generarToken(correo:any){

    return this.http.put(this.URL + "/GenerarToken", correo);

  }

  isAgregable(usuario: Usuario){

    return this.http.post<boolean>(this.URL + "/isagregable", usuario);

  }

  enviarCorreoCreacion(correo: string, clave: string){

    return this.http.get(this.URL + "/enviarcorreocreacion?correo=" + correo + "&clave=" + clave);

  }

}
