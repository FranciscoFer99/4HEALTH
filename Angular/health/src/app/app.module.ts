import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { PrincipalUsuarioComponent } from './components/principal-usuario/principal-usuario.component';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { DatosUsuarioComponent } from './components/datos-usuario/datos-usuario.component';
import { CambioContrasennaComponent } from './components/cambio-contrasenna/cambio-contrasenna.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { GestionUsuariosAdminComponent } from './components/gestion-usuarios-admin/gestion-usuarios-admin.component';
import { LoadPageComponent } from './components/load-page/load-page.component';
import { GestionClasesAdminComponent } from './components/gestion-clases-admin/gestion-clases-admin.component';
import { ModificarUsuarioComponent } from './components/modificar-usuario/modificar-usuario.component';
import { RecuperarClaseComponent } from './components/recuperar-clase/recuperar-clase.component';
import { CrearClaseComponent } from './components/crear-clase/crear-clase.component';
import { ModificarClaseComponent } from './components/modificar-clase/modificar-clase.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { PageErrorComponent } from './components/page-error/page-error.component';
import { EvolucionUsuarioComponent } from './components/evolucion-usuario/evolucion-usuario.component';
import { EditarUsuarioAdminComponent } from './components/editar-usuario-admin/editar-usuario-admin.component';
import { CrearUsuarioAdminComponent } from './components/crear-usuario-admin/crear-usuario-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InicioSesionComponent,
    PrincipalUsuarioComponent,
    RegistroUsuarioComponent,
    DatosUsuarioComponent,
    CambioContrasennaComponent,
    GestionUsuariosAdminComponent,
    LoadPageComponent,
    GestionClasesAdminComponent,
    ModificarUsuarioComponent,
    RecuperarClaseComponent,
    CrearClaseComponent,
    ModificarClaseComponent,
    PageErrorComponent,
    EvolucionUsuarioComponent,
    EditarUsuarioAdminComponent,
    CrearUsuarioAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
