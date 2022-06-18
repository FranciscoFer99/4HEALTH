import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { usuario } from 'src/app/interfaces/interfaces';
import { ClaseService } from 'src/app/servicios/clase.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-principal-usuario',
  templateUrl: './principal-usuario.component.html',
  styleUrls: ['./principal-usuario.component.css']
})
export class PrincipalUsuarioComponent implements OnInit {

  public page: number;
  idClaseUsuario: number
  estado: string
  claseBuscada: any
  clases: any[] = []
  constructor(private servicioClase: ClaseService, private servicioUsuario: UsuarioService, private ruta: Router) { }
  usuarioLog: usuario;
  cargando: boolean;
  registrado:any;

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

      this.buscarClaseInscritoUsuario()
    });

    setTimeout(() => {
      this.cargando = true;
    }, 2000);
    // this.estado= "Inscrito"
  }

  activar() {
    this.estado = "NoInscrito";
    console.log(this.estado)
  }
  desactivar() {
    this.estado = "Inscrito";
    console.log(this.estado)
  }

  buscarClaseInscritoUsuario() {
    this.idClaseUsuario = this.usuarioLog.id
    this.servicioClase.buscarClaseInscritoUsuario(this.idClaseUsuario).subscribe(data => {
      this.claseBuscada = data;
      console.log("Inscrito ", this.claseBuscada)

      this.clases = []

      data.usuarioClase.forEach(clases => this.clases.push(clases));
      console.log("Clases inscrito usuario",this.clases);

      //this.crearFormulario();
      this.desactivar();
    })

  }

  buscarClaseNoInscritoUsuario() {
    this.idClaseUsuario = this.usuarioLog.id
    this.servicioClase.buscarClaseNoInscritoUsuario(this.idClaseUsuario).subscribe(data => {
      this.claseBuscada = data;
      console.log("No Inscrito ", this.claseBuscada)

      this.clases = []

      data.usuarioClase.forEach(clases => this.clases.push(clases));
      console.log("Clases no inscrito usuario",this.clases);

      // this.crearFormulario();
      this.activar()
    })

  }

  annadirClase(idusuario: number, idclase: string) {

    this.servicioClase.annadirUsuarioClase(idusuario, idclase).subscribe(data =>{

      console.log("usuario", idusuario, "Clase", idclase)
      if (data[0] == "Perfecto") {
        this.registrado = 'reg'
        this.buscarClaseNoInscritoUsuario()
      } else {
        this.registrado = 'noReg';

      }
    }
    );

  }

  eliminarClase(idClase: number) {
    console.log(idClase)
    this.servicioClase.eliminarUsuarioClase(idClase).subscribe(data => {
      if (data[0] == "correcto") {
        this.registrado = 'elim';
        this.buscarClaseInscritoUsuario()
      } else {
        this.registrado = 'noElim';

      }
    })
  }


}
