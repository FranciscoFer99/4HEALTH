import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {

  constructor(private servicioUsuario: UsuarioService, private ruta: Router) { }

  ngOnInit(): void {
    this.cargando = false;

    setTimeout(() => {
      this.cargando = true;
    }, 2000);
  }
  //Traemos los valores del formulario con un FormControl
  email: FormControl = new FormControl('')
  contrasenna: FormControl = new FormControl('')
  cargando: boolean;
  usuarioLog: any;
  ini: any;

  iniciarSesion() {
    console.log(this.email.value)
    console.log(this.contrasenna.value)
    //Llamamos al servicio del usuario y en el metodo autentica usuario le pasamos los valores de el email y la contraseña, al ser un observable usamos el subscribe,
    //el valor que recibimos es el token del usuario
    this.servicioUsuario.autenticaUsuario(this.email.value, this.contrasenna.value).subscribe(data => {
      console.log("Token del usuario", data);
      //Springboot devuelve un DTO con la clave jwt y como valor el propio token del usuario
      if (data.jwt) {
        //Guardamos en la variable JWT del servicio el valor del token
        this.servicioUsuario.JWT = data.jwt;
        //Llamamos al servicio usuario  el cual va a guardar en localstorage los valores del usuario
        this.servicioUsuario.emitirNuevoCambioEnUsuarioAutenticado();
        //Usamos la navegación para redireccionar automáticamente a una página, porque si escribimos a mano en la barra de navegación, se pierden los datos del token
        //  this.ruta.navigate(['/cambiarContrasenna']);

        this.servicioUsuario.getUsuarioAutenticado().subscribe(p => {
          if (p["log"] == "No logueado") {
            //Si no esconde las vistas descomentar estas dos lineas
            // console.log("No logueadoooo SAbrinaAAA")
            // this.ruta.navigate(['/inicionSesion']);
          } else {

            console.log("Pruebeciña", this.usuarioLog)
            //Guardamos el usuario en una variable
            this.usuarioLog = p;
            console.log("Prueba iniciar sesion ", p)

            if (this.usuarioLog.idTipo.id == 2) {
              // this.ruta.navigate(['/gestionUsuarios']);
              window.location.href = "http://localhost:4200/gestionUsuarios";
            }if (this.usuarioLog.idTipo.id == 1) {
              // this.ruta.navigate(['/principalUsuario']);
              window.location.href = "http://localhost:4200/principalUsuario";
            }

          }

        });





        console.log("DAtos del usuario inicio sesion", data)
      } else {
        //Si falla el inicio de sesión se muestra un alert
        this.ini = 'no';
      }
    })
  }
}
