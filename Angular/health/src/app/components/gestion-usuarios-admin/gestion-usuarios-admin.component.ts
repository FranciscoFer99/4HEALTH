import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { usuario } from 'src/app/interfaces/interfaces';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-gestion-usuarios-admin',
  templateUrl: './gestion-usuarios-admin.component.html',
  styleUrls: ['./gestion-usuarios-admin.component.css']
})
export class GestionUsuariosAdminComponent implements OnInit {

  constructor(private servicioUsuario: UsuarioService, private ruta: Router) { }
  litstaUsuarios: usuario[] = [];
  cargando: boolean;
  usuarioLog: usuario;
  loginForm: FormGroup;
  eliminado: any
  public page: number;

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

    this.loginForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    })


    // this.servicioUsuario.listarTodosUsuarios().subscribe(data =>{
    //   console.log("lista de todos los usuarios", data);
    //  // this.usuarios = data;
    // });
    this.cargarUsuarios();
    setTimeout(() => {
      this.cargando = true;
    }, 2000);
  }

  cargarUsuarios() {
    this.servicioUsuario.listarTodosUsuarios().subscribe(data => {
      this.litstaUsuarios = []
      console.log("lista all usuarios", data);
      if (data.resultado == "correcto") {
        console.log("Correcto")
        // this.usuarios = [];
        data.usuarios.forEach(usuarioN => this.litstaUsuarios.push(usuarioN));
        console.log("Usuarios", this.litstaUsuarios)
        console.log(this.litstaUsuarios[0].nombre)
      } else {
        console.log("Incorrecto");
      }
    });
  }

  eliminarUser(idUsuario: number) {
    console.log(idUsuario)
    this.servicioUsuario.eliminarUsuario(idUsuario).subscribe(data => {
     this.eliminado = ''
      if (data[0] == "correcto") {
        this.eliminado = 'si'
        // alert("Usuario eliminado correctamente");
        this.cargarUsuarios()
      } else {
        this.eliminado = 'no'
        // alert("Fallo al emlimnar usuario");


      }
    })
  }


  editarUser(idUsuario: number) {
    this.ruta.navigate(['/editarUsuario', idUsuario]);
  }

  prueba(){
    console.log(this.loginForm.controls["nombre"].value)
  }

  cargarAsincUsuarios() {
    console.log("Text search", this.loginForm.controls["nombre"].value)
    this.servicioUsuario.listarAsincUsuarios(this.loginForm.controls["nombre"].value).subscribe(data => {
      this.litstaUsuarios = []
      console.log("lista all usuarios", data);
      if (data.resultado == "correcto") {
        console.log("Correcto")
        // this.usuarios = [];
        data.usuarios.forEach(usuarioN => this.litstaUsuarios.push(usuarioN));
        console.log("Usuarios", this.litstaUsuarios)
        console.log(this.litstaUsuarios[0].nombre)
      } else {
        console.log("Incorrecto");
      }
    });
    if (this.loginForm.controls["nombre"].value == "") {
      this.cargarUsuarios()
    }
  }


}
