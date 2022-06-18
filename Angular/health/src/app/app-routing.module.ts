import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CambioContrasennaComponent } from './components/cambio-contrasenna/cambio-contrasenna.component';
import { CrearClaseComponent } from './components/crear-clase/crear-clase.component';
import { CrearUsuarioAdminComponent } from './components/crear-usuario-admin/crear-usuario-admin.component';
import { DatosUsuarioComponent } from './components/datos-usuario/datos-usuario.component';
import { EditarUsuarioAdminComponent } from './components/editar-usuario-admin/editar-usuario-admin.component';
import { EvolucionUsuarioComponent } from './components/evolucion-usuario/evolucion-usuario.component';
import { GestionClasesAdminComponent } from './components/gestion-clases-admin/gestion-clases-admin.component';
import { GestionUsuariosAdminComponent } from './components/gestion-usuarios-admin/gestion-usuarios-admin.component';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { LoadPageComponent } from './components/load-page/load-page.component';
import { ModificarClaseComponent } from './components/modificar-clase/modificar-clase.component';
import { ModificarUsuarioComponent } from './components/modificar-usuario/modificar-usuario.component';
import { PageErrorComponent } from './components/page-error/page-error.component';
import { PrincipalUsuarioComponent } from './components/principal-usuario/principal-usuario.component';
import { RecuperarClaseComponent } from './components/recuperar-clase/recuperar-clase.component';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';

const routes: Routes = [
  { path: 'evolucion', component: EvolucionUsuarioComponent },
  { path: 'modificarClase/:id', component: ModificarClaseComponent },
  { path: 'crearClase', component: CrearClaseComponent },
  { path: 'recuperarClase', component: RecuperarClaseComponent },
  { path: 'modificarUsuario/:id', component: ModificarUsuarioComponent },
  { path: 'editarUsuario/:id', component: EditarUsuarioAdminComponent },
  { path: 'gestionClases', component: GestionClasesAdminComponent },
  { path: 'loadPage', component: LoadPageComponent },
  { path: 'cambiarContrasenna', component: CambioContrasennaComponent },
  { path: 'gestionUsuarios', component: GestionUsuariosAdminComponent },
  { path: 'datosUsuario', component: DatosUsuarioComponent },
  { path: 'registroUsuario', component: RegistroUsuarioComponent },
  { path: 'registroUsuarioAdmin', component: CrearUsuarioAdminComponent },
  { path: 'inicionSesion', component: InicioSesionComponent },
  { path: 'principalUsuario', component: PrincipalUsuarioComponent },
  { path: '', component: InicioSesionComponent },
  { path: '**', component: PageErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
