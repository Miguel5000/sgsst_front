import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnviarReporteComponent } from './components/acoso_laboral/enviar-reporte/enviar-reporte.component';
import { VerListaDeReportesComponent } from './components/acoso_laboral/ver-lista-de-reportes/ver-lista-de-reportes.component';
import { VerReporteEnviadoComponent } from './components/acoso_laboral/ver-reporte-enviado/ver-reporte-enviado.component';
import { CrearActaComponent } from './components/acta/crear-acta/crear-acta.component';
import { VerActaComponent } from './components/acta/ver-acta/ver-acta.component';
import { VerListaDeActasComponent } from './components/acta/ver-lista-de-actas/ver-lista-de-actas.component';
import { CrearInformeComponent } from './components/informe/crear-informe/crear-informe.component';
import { RegistroDeInformesComponent } from './components/informe/registro-de-informes/registro-de-informes.component';
import { VerInformeComponent } from './components/informe/ver-informe/ver-informe.component';
import { AgregarAreasYLugaresComponent } from './components/inicial/agregar-areas-y-lugares/agregar-areas-y-lugares.component';
import { EspacioDeTrabajoYServicioComponent } from './components/inicial/espacio-de-trabajo-y-servicio/espacio-de-trabajo-y-servicio.component';
import { GenerarCuentasComponent } from './components/inicial/generar-cuentas/generar-cuentas.component';
import { CambioDeClaveComponent } from './components/invitado/cambio-de-clave/cambio-de-clave.component';
import { GeneracionDeClaveComponent } from './components/invitado/generacion-de-clave/generacion-de-clave.component';
import { InicioDeSesionComponent } from './components/invitado/inicio-de-sesion/inicio-de-sesion.component';
import { PaginaDeInicioComponent } from './components/invitado/pagina-de-inicio/pagina-de-inicio.component';
import { RegistroComponent } from './components/invitado/registro/registro.component';
import { EnviarPqrsComponent } from './components/pqrs/enviar-pqrs/enviar-pqrs.component';
import { VerListaPqrsComponent } from './components/pqrs/ver-lista-pqrs/ver-lista-pqrs.component';
import { VerPqrsEnviadosComponent } from './components/pqrs/ver-pqrs-enviados/ver-pqrs-enviados.component';


const routes: Routes = [

  {path: '', component: PaginaDeInicioComponent},
  {path: 'paginaInicio', component: PaginaDeInicioComponent},
//Espacio de trabajo y servicio
  {path: 'espacioDeTrabajoYServicio', component: EspacioDeTrabajoYServicioComponent},
  {path: 'servicio/actas', component: EspacioDeTrabajoYServicioComponent},
    {path: 'servicio/actas/direccion', component: EspacioDeTrabajoYServicioComponent},
      {path: 'servicio/listaActas/direccion/reunion', component: VerListaDeActasComponent},
      {path: 'servicio/listaActas/direccion/capacitacion', component: VerListaDeActasComponent},
    {path: 'servicio/actas/copasst', component: EspacioDeTrabajoYServicioComponent},
      {path: 'servicio/listaActas/copasst/reunion', component: VerListaDeActasComponent},
      {path: 'servicio/listaActas/copasst/capacitacion', component: VerListaDeActasComponent},
    {path: 'servicio/listaActas/ccl', component: VerListaDeActasComponent},
  {path: 'servicio/evaluacionAnual', component: EspacioDeTrabajoYServicioComponent},
  {path: 'servicio/acosoLaboral', component: EspacioDeTrabajoYServicioComponent},
  {path: 'servicio/pqrs', component: EspacioDeTrabajoYServicioComponent},
  {path: 'trabajo/director/actas', component: EspacioDeTrabajoYServicioComponent},
    {path: 'trabajo/director/actas/capacitaciones', component: VerListaDeActasComponent},
    {path: 'trabajo/director/actas/reuniones', component: VerListaDeActasComponent},
  {path: 'trabajo/miembroCopasst/actas', component: EspacioDeTrabajoYServicioComponent},
    {path: 'trabajo/miembroCopasst/actas/capacitaciones', component: VerListaDeActasComponent},
    {path: 'trabajo/miembroCopasst/actas/reuniones', component: VerListaDeActasComponent},
  {path: 'trabajo/secretarioCopasst/actas', component: EspacioDeTrabajoYServicioComponent},
    {path: 'trabajo/secretarioCopasst/actas/capacitaciones', component: VerListaDeActasComponent},
    {path: 'trabajo/secretarioCopasst/actas/reuniones', component: VerListaDeActasComponent},
  {path: 'trabajo/miembroCcl/actas', component: VerListaDeActasComponent},
  {path: 'trabajo/secretarioCcl/actas', component: VerListaDeActasComponent},
//Fin espacio de trabajo y servicio
  {path: 'enviarReporte', component: EnviarReporteComponent},
  {path: 'listaReportes', component: VerListaDeReportesComponent},
  {path: 'misReportes', component: VerListaDeReportesComponent},
  {path: 'verReporte', component: VerReporteEnviadoComponent},
  {path: "crearActa", component: CrearActaComponent},
  {path: "verActa", component: VerActaComponent},
  {path: "crearInforme", component: CrearInformeComponent},
  {path: 'listaInformes', component: RegistroDeInformesComponent},
  {path: "verInforme", component: VerInformeComponent},
  {path: 'agregarAreas', component: AgregarAreasYLugaresComponent},
  {path: 'agregarLugares', component: AgregarAreasYLugaresComponent},
  {path: 'generarCuentas', component: GenerarCuentasComponent},
  {path: 'cambiarClave', component: CambioDeClaveComponent},
  {path: 'recuperarClave', component: CambioDeClaveComponent},
  {path: 'generarClave', component: GeneracionDeClaveComponent},
  {path: 'iniciarSesion', component: InicioDeSesionComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'enviarPqrs', component: EnviarPqrsComponent},
  {path: 'listaPqrs', component: VerListaPqrsComponent},
  {path: "verPqrs", component: VerPqrsEnviadosComponent},
  {path: "misPqrs", component: VerListaPqrsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 



}
