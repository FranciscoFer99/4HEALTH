import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { tipousuario, usuario } from 'src/app/interfaces/interfaces';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styleUrls: ['./modificar-usuario.component.css']
})
export class ModificarUsuarioComponent implements OnInit {

  loginForm
  foto: string = ""
  constructor(private usuarioService: UsuarioService, private _route: ActivatedRoute,  private ruta:Router, private servicioUsuario: UsuarioService) {

  }
  tipoUsuario: tipousuario[] = [];
  idUsuario: number;
  usuarioBuscado: usuario;
  usuarioLog: usuario;
  cargando: boolean;
  mod: any;


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




    // console.log(this._route.snapshot.paramMap.get('id'));
    this.idUsuario = parseInt(this._route.snapshot.paramMap.get('id'));
    this.buscarUsuario();

    setTimeout(() => {
      this.cargando = true;
    }, 2000);
  }

   buscarUsuario(){
    this.usuarioService.buscarUsuario(this.idUsuario).subscribe(data=>{
      this.usuarioBuscado = data;
      this.crearFormulario();
      console.log("Usuario ",this.usuarioBuscado)
    })

  }

  crearFormulario(){
    this.loginForm = new FormGroup({
       nombre: new FormControl(this.usuarioBuscado.nombre, [Validators.required, Validators.maxLength(30)]),
      // apellido: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      nombreUsuario: new FormControl(this.usuarioBuscado.nombreUsu, [Validators.required, Validators.maxLength(50)]),
      email: new FormControl(this.usuarioBuscado.email, [Validators.required, Validators.maxLength(50)]),
      // contrasenna: new FormControl(this.usuarioBuscado.contrasenna, [Validators.required, Validators.maxLength(50)]),
      // repcontrasenna: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      //fecha_nac: new FormControl(this.usuarioBuscado.fecha_nac, [Validators.required]),
      telefono: new FormControl(this.usuarioBuscado.telefono, [Validators.required, Validators.maxLength(9)]),
      direccion: new FormControl(this.usuarioBuscado.direccion, [Validators.required, Validators.maxLength(50)]),
      cp: new FormControl(this.usuarioBuscado.cp, [Validators.required, Validators.maxLength(5)]),
      localidad: new FormControl(this.usuarioBuscado.localidad, [Validators.required, Validators.maxLength(50)]),
      provincia: new FormControl(this.usuarioBuscado.provincia, [Validators.required, Validators.maxLength(50)]),
      altura: new FormControl(this.usuarioBuscado.altura, [Validators.required, Validators.maxLength(3)]),
      sexo: new FormControl(this.usuarioBuscado.sexo),
      img: new FormControl([Validators.required]),
    })

    this.foto = this.usuarioBuscado.foto
  }

  modificarUsuario(){

        //Usamos el método registrarUsuario del servicio usuario, y le pasamos los value de los diferentes campos del formulario
        this.usuarioService.actualizarUsuario(this.idUsuario, this.loginForm.controls["nombre"].value, this.loginForm.controls["nombreUsuario"].value, this.loginForm.controls["email"].value, this.loginForm.controls["telefono"].value, this.loginForm.controls["direccion"].value, this.loginForm.controls["cp"].value, this.loginForm.controls["localidad"].value, this.loginForm.controls["provincia"].value, this.loginForm.controls["altura"].value, this.loginForm.controls["sexo"].value, this.foto).subscribe(data => {

          console.log("datos usuario", this.loginForm)
          console.log(data["1"])

          //Si el valor devuelto por el servidor es "Error, mostramos un alert al usuario"
          if (data["0"] == "Error") {
            this.mod = 'no';
          } else {
            this.mod = 'si';
            setTimeout(() => {
              this.ruta.navigate(['/datosUsuario']);
            }, 3000);
          }
        })
  }


  guardarImagen() {
    var inputImg: any = document.getElementById('image');
    var fotito: any = document.getElementById('fotito');
    console.log("imagensita",inputImg.value);

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
