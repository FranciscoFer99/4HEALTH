import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { datosClaseUsuario, usuario } from 'src/app/interfaces/interfaces';
import { ClaseService } from 'src/app/servicios/clase.service';
import { UsuarioClaseService } from 'src/app/servicios/usuario-clase.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-gestion-clases-admin',
  templateUrl: './gestion-clases-admin.component.html',
  styleUrls: ['./gestion-clases-admin.component.css']
})
export class GestionClasesAdminComponent implements OnInit {

  public page: number;

  constructor(private servicioUsuario: UsuarioService, private ruta: Router, private servicioClaseUsuario: UsuarioClaseService, private servicioClase: ClaseService) { }
  usuarios
  pepe = [1, 3 ,2 ,1, 3 ,2 ,4]
  clases: datosClaseUsuario[] = []
  clasecol:string
  usuarioLog: usuario;
  cargando: boolean;
  eliminar:any

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



    this.recuperarClaseUsuario();
    setTimeout(() => {
      this.cargando = true;
    }, 2000);
  }

  recuperarClaseUsuario(){
    this.servicioClaseUsuario.getAllClaseUsuario().subscribe(data =>{
      this.clases = []
      if (data["resultado"] == "correcto") {
        data.usuarioClase.forEach(clases => this.clases.push(clases));
        console.log(this.clases);
      }

    })
  }

  editarClaseUser(idClase:number){
    console.log(idClase)
    this.ruta.navigate(['/modificarClase', idClase ]);
  }

  eliminarClase(idUsuario:number){
    console.log(idUsuario)
    this.clasecol = '1'
    this.servicioClase.eliminarClase(idUsuario, this.clasecol).subscribe(data =>{
      console.log("valor eliminar clase",data)
      if(data[0] == "Perfecto"){
        this.eliminar = 'si'
        this.recuperarClaseUsuario();
      }else{
        this.eliminar = 'no'

      }
    })
  }

}
