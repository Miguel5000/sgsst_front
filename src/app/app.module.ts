import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PaginaDeInicioComponent } from './components/invitado/pagina-de-inicio/pagina-de-inicio.component';
import { RegistroComponent } from './components/invitado/registro/registro.component';
import { InicioDeSesionComponent } from './components/invitado/inicio-de-sesion/inicio-de-sesion.component';
import { GeneracionDeClaveComponent } from './components/invitado/generacion-de-clave/generacion-de-clave.component';
import { CambioDeClaveComponent } from './components/invitado/cambio-de-clave/cambio-de-clave.component';
import { GenerarCuentasComponent } from './components/inicial/generar-cuentas/generar-cuentas.component';
import { AgregarAreasComponent } from './components/inicial/agregar-areas/agregar-areas.component';
import { AgregarLugaresComponent } from './components/inicial/agregar-lugares/agregar-lugares.component';
import { EspacioDeTrabajoYServicioComponent } from './components/inicial/espacio-de-trabajo-y-servicio/espacio-de-trabajo-y-servicio.component';
import { VerListaDeActasComponent } from './components/acta/ver-lista-de-actas/ver-lista-de-actas.component';
import { CrearActaComponent } from './components/acta/crear-acta/crear-acta.component';
import { VerActaComponent } from './components/acta/ver-acta/ver-acta.component';
import { RegistroDeInformesComponent } from './components/informe/registro-de-informes/registro-de-informes.component';
import { CrearInformeComponent } from './components/informe/crear-informe/crear-informe.component';
import { VerInformeComponent } from './components/informe/ver-informe/ver-informe.component';
import { EnviarReporteComponent } from './components/acoso_laboral/enviar-reporte/enviar-reporte.component';
import { VerReportesEnviadosComponent } from './components/acoso_laboral/ver-reportes-enviados/ver-reportes-enviados.component';
import { VerListaDeReportesComponent } from './components/acoso_laboral/ver-lista-de-reportes/ver-lista-de-reportes.component';
import { EnviarPqrsComponent } from './components/pqrs/enviar-pqrs/enviar-pqrs.component';
import { VerPqrsEnviadosComponent } from './components/pqrs/ver-pqrs-enviados/ver-pqrs-enviados.component';
import { VerListaPqrsComponent } from './components/pqrs/ver-lista-pqrs/ver-lista-pqrs.component';

@NgModule({
  declarations: [
    AppComponent,
    PaginaDeInicioComponent,
    RegistroComponent,
    InicioDeSesionComponent,
    GeneracionDeClaveComponent,
    CambioDeClaveComponent,
    GenerarCuentasComponent,
    AgregarAreasComponent,
    AgregarLugaresComponent,
    EspacioDeTrabajoYServicioComponent,
    VerListaDeActasComponent,
    CrearActaComponent,
    VerActaComponent,
    RegistroDeInformesComponent,
    CrearInformeComponent,
    VerInformeComponent,
    EnviarReporteComponent,
    VerReportesEnviadosComponent,
    VerListaDeReportesComponent,
    EnviarPqrsComponent,
    VerPqrsEnviadosComponent,
    VerListaPqrsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
