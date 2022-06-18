import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { usuario } from 'src/app/interfaces/interfaces';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-datos-usuario',
  templateUrl: './datos-usuario.component.html',
  styleUrls: ['./datos-usuario.component.css']
})
export class DatosUsuarioComponent implements OnInit {

  constructor(private servicioUsuario: UsuarioService, private ruta: Router) { }

  usuarioLog: usuario
  cargando: boolean;
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



    //Lo primero que hacemos es iniciar el usuario en LocalStorage para poder manejar sus datos
    this.servicioUsuario.getUsuarioAutenticado().subscribe(data => {
      //Guardamos el usuario en una variable
      console.log("Data", data);
      this.usuarioLog = data;
      console.log(this.usuarioLog.altura);
    });

    setTimeout(() => {
      this.cargando = true;
    }, 2000);
  }

  editarUser(idUsuario: number) {
    this.ruta.navigate(['/modificarUsuario', idUsuario]);
  }

  pagos(){
    var win = window.open('https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=BNPRBETAP2ZH4', '_blank');
    // Cambiar el foco al nuevo tab (punto opcional)
    win.focus();
  }
}

