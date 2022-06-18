import { usuario } from 'src/app/interfaces/interfaces';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-cambio-contrasenna',
  templateUrl: './cambio-contrasenna.component.html',
  styleUrls: ['./cambio-contrasenna.component.css']
})
export class CambioContrasennaComponent implements OnInit {

  usuarioLog: usuario;
  cargando: boolean;
  mod: any;

  constructor(private servicioUsuario: UsuarioService, private ruta: Router) { }

  ngOnInit(): void {

    this.cargando = false;
    //Lo primero que hacemos es iniciar el usuario en LocalStorage para poder manejar sus datos
    this.servicioUsuario.getUsuarioAutenticado().subscribe(data => {
      if (data["log"] == "No logueado") {
        this.ruta.navigate(['/inicionSesion']);
      }
      console.log("Pruebeciña", this.usuarioLog)
      //Guardamos el usuario en una variable
      this.usuarioLog = data;
      console.log("Prueba iniciar sesion ", data)

    });


    // if(localStorage.getItem('tokenUsuario')){
    //   this.ruta.navigate(['/principalUsuario']);
    // }else{
    //   this.ruta.navigate(['/inicionSesion']);
    // }

    setTimeout(() => {
      this.cargando = true;
    }, 2000);

  }
  //Guardamos los valores en un FormControl
  contrasenna: FormControl = new FormControl('')
  nuevaContrasenna: FormControl = new FormControl('')
  repNuevaContrasenna: FormControl = new FormControl('')

  /**
   * Cambia la contraseña del usuario
   */
  cambiarContrasenna() {
    //Si las dos nuevas contraseñas introducidas por el usuario coinciden, continuamos
    if (this.nuevaContrasenna.value == this.repNuevaContrasenna.value) {
      //Pasamos al método cambiarContrasennaUsu los values del formulario introducidos por el usuario y al ser un Observable usaos subscribe
      this.servicioUsuario.cambiarContrasennaUsu(this.contrasenna.value, this.nuevaContrasenna.value, this.usuarioLog.id).subscribe(data => {
        //La respuesta del servidor va a ser un par clave-valor, y validamos según su contenido
        console.log(this.contrasenna.value, "Contraseña actual");
        console.log(this.nuevaContrasenna.value, "Contraseña nueva");

        if (data[0] == "La contraseña no se ha actualizado") {
          this.mod = 'no';
        } else {
          this.mod = 'si';
          setTimeout(() => {
            this.ruta.navigate(['/datosUsuario']);
          }, 3000);
        }
      })
    } else {
      this.mod = 'noCoinciden';
    }
  }



}
