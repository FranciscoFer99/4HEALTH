import { usuario } from 'src/app/interfaces/interfaces';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( private ruta: Router, private servicioUsuario: UsuarioService) { }

  usuarioLog: any;
  ngOnInit(): void {
    this.servicioUsuario.getUsuarioAutenticado().subscribe(data => {
      if (data["log"] == "No logueado") {
        //Si no esconde las vistas descomentar estas dos lineas
        // console.log("No logueadoooo SAbrinaAAA")
        // this.ruta.navigate(['/inicionSesion']);
      }else{

        console.log("Pruebeciña", this.usuarioLog)
        //Guardamos el usuario en una variable
        this.usuarioLog = data;
        console.log("Prueba iniciar sesion ", data)

      }

    });
  }


  cerrarSesion(){
    localStorage.removeItem("tokenUsuario");
    this.usuarioLog = null
    this.ruta.navigate(['/inicionSesion']);
  }




}
