import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { usuario } from 'src/app/interfaces/interfaces';
import { ClaseService } from 'src/app/servicios/clase.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-crear-clase',
  templateUrl: './crear-clase.component.html',
  styleUrls: ['./crear-clase.component.css']
})
export class CrearClaseComponent implements OnInit {

  horarios: string[] = ["9:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-13:00", "13:00-14:00", "14:00-15:00", "15:00-16:00", "16:00-17:00", "17:00-18:00", "19:00-20:00", "20:00-21:00"]
  foto: string = ""
  litstaUsuarios: usuario[]=[];
  loginForm: FormGroup
  usuarioLog: usuario;
  cargando: boolean;
  crea:any;


  constructor(private servicioUsuario: UsuarioService, private ruta: Router, private servicioClase: ClaseService) { }

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


    this.cargarUsuarios()
    this.loginForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      horario: new FormControl('', Validators.required),
      monitor: new FormControl('', Validators.required),
      descripcion: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      img: new FormControl([Validators.required]),
    })

    setTimeout(() => {
      this.cargando = true;
    }, 2000);

    var fotito: any = document.getElementById('fotito');
    fotito.style.display = "none";

  }




  registrarClase() {
    // if (this.loginForm.valid) {

      console.log("foto usuario",this.foto)
        //Usamos el método registrarUsuario del servicio usuario, y le pasamos los value de los diferentes campos del formulario
        this.servicioClase.registroClase(this.loginForm.controls["nombre"].value,  this.loginForm.controls["descripcion"].value, this.foto,this.loginForm.controls["horario"].value,this.loginForm.controls["monitor"].value ).subscribe(data => {

          console.log("datos usuario", this.loginForm)
          let monitor = parseInt(this.loginForm.controls["monitor"].value)
          this.servicioClase.registroUsuarioClase(data["1"] ,monitor).subscribe(data =>
            console.log("RegistroUsuarioClase",data["1"] ,this.loginForm.controls["monitor"].value)
            );


          //Si el valor devuelto por el servidor es "Error, mostramos un alert al usuario"
          if (data["0"] == "Error") {
           this.crea = 'no'

          } else {
            this.crea = 'si'
            setTimeout(() => {
              this.ruta.navigate(['/gestionClases']);
            }, 3000);

          }
        })
        console.log(this.foto)


    // } else {
    //   alert("El formulario no es valido")
    // }

  }






  cargarUsuarios(){
    console.log('Dentro de cargar usuarios')
    this.servicioUsuario.listarTodosUsuarios().subscribe(data =>{
      this.litstaUsuarios = []
      console.log("lista all usuarios", data);
      if(data.resultado == "correcto"){
        console.log("Correcto")
        // this.usuarios = [];
       data.usuarios.forEach(usuarioN => this.litstaUsuarios.push(usuarioN));
       console.log("Usuarios",this.litstaUsuarios)
       console.log(this.litstaUsuarios[0].nombre)
      }else{
        console.log("Incorrecto");
      }
    });
  }


  guardarImagen() {
    var inputImg: any = document.getElementById('image');
    var fotito: any = document.getElementById('fotito');
    console.log("imagen",inputImg);

    if (inputImg.value != "") {
      // fotito.style.visibility = "";
      fotito.style.display = "";
      inputImg.style.visibility = "hidden";
    } else {
      inputImg.style.display = "";
      fotito.style.display = "none";
      // fotito.style.visibility = "hidden";
      console.log(inputImg.value)
    }


    //El file reader sirve para leer un blob o un file
    const reader = new FileReader();
    //Leer la imagen del input y cargarla en un ArrayBuffer. Desemboca un evento loadend y su atributo result
    //contiene un ArrayBuffer con los datos del archivo
    reader.readAsArrayBuffer(inputImg.files[0]);
    //Tras cargar la imagen la convertimos a base64
    reader.onload = (e: any) => {
      //btoa() convierte a base 64 desde una cadena de datos binarios
      this.foto = btoa(
        // Uint8Array es un array tipado de datos binarios
        //reduce() Aplica una función a un acumulador y a cada valor de un array (de izquierda a derecha) lo reduce a un único valor.
        new Uint8Array(e.target.result).reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
    };
  }
}
