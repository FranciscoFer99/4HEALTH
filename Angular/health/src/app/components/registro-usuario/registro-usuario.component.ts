import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tipousuario, usuario } from 'src/app/interfaces/interfaces';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {

  loginForm: FormGroup
  cargando: boolean;
  foto: string = ""
  usuarioLog: usuario;
  registrado: any
  p:any
  pass:any
  noFor:any
  constructor(private usuarioService: UsuarioService, private ruta:Router, private servicioUsuario: UsuarioService,) {

  }
  tipoUsuario: tipousuario[] = [];

  ngOnInit(): void {
    this.cargando = false;
    this.loginForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      apellido: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      nombreUsuario: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      email: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      contrasenna: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      repcontrasenna: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      fecha_nac: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required, Validators.maxLength(9)]),
      direccion: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      cp: new FormControl('', [Validators.required, Validators.maxLength(5)]),
      localidad: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      provincia: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      altura: new FormControl('', [Validators.required, Validators.maxLength(3)]),
      sexo: new FormControl('Otro'),
      img: new FormControl([Validators.required]),
    })


    //Lo primero que hacemos es iniciar el usuario en LocalStorage para poder manejar sus datos
    this.servicioUsuario.getUsuarioAutenticado().subscribe(data => {
      if (data["log"] == "No logueado") {
        this.usuarioLog = null
      }
      console.log("Pruebeciña", this.usuarioLog)
      //Guardamos el usuario en una variable
      this.usuarioLog = data;
      this.p = data
      console.log("Prueba iniciar sesion ", data)

    });



    setTimeout(() => {
      this.cargando = true;
    }, 2000);

    //Arreglar foto selected

    var fotito: any = document.getElementById('fotito');
    fotito.style.display = "none";

  }


  //Obtenemos los valores del formulrio con un FormControl



  /**
   * Registra al usuario en la base de datos
   */
  registrarUsuario() {
    if (this.loginForm.valid) {

      if (this.loginForm.controls["contrasenna"].value == this.loginForm.controls["repcontrasenna"].value) {
        //Usamos el método registrarUsuario del servicio usuario, y le pasamos los value de los diferentes campos del formulario
        this.usuarioService.registroUsuario(this.loginForm.controls["nombre"].value, this.loginForm.controls["nombreUsuario"].value, this.loginForm.controls["email"].value, this.loginForm.controls["contrasenna"].value, this.loginForm.controls["fecha_nac"].value, this.loginForm.controls["telefono"].value, this.loginForm.controls["direccion"].value, this.loginForm.controls["cp"].value, this.loginForm.controls["localidad"].value, this.loginForm.controls["provincia"].value, this.loginForm.controls["altura"].value, this.loginForm.controls["sexo"].value, this.foto).subscribe(data => {

          console.log("datos usuario", this.loginForm)

          //Si el valor devuelto por el servidor es "Error, mostramos un alert al usuario"
          if (data["0"] == "Error") {
            this.registrado = 'no'
          } else {
            this.registrado = 'si'
              setTimeout(() => {
                this.ruta.navigate(['/inicionSesion']);
              }, 3000);

          }
        })
        console.log(this.foto)
      }else{
        this.pass = 'no'
      }

    } else {
      this.noFor = 'no'
    }

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
