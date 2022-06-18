import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { usuario, usuarioclase } from 'src/app/interfaces/interfaces';
import { ClaseService } from 'src/app/servicios/clase.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-modificar-clase',
  templateUrl: './modificar-clase.component.html',
  styleUrls: ['./modificar-clase.component.css']
})
export class ModificarClaseComponent implements OnInit {


  horarios: string[] = ["9:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-13:00", "13:00-14:00", "14:00-15:00", "15:00-16:00", "16:00-17:00", "17:00-18:00", "19:00-20:00", "20:00-21:00"]
  foto: string = ""
  litstaUsuarios: usuario[] = [];
  loginForm: FormGroup
  idClaseUsuario: number
  claseBuscada: any
  cargando: boolean;
  mod:any;

  constructor(private servicioUsuario: UsuarioService, private ruta: Router, private servicioClase: ClaseService, private _route: ActivatedRoute) { }
  usuarioLog: usuario;

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


    this.idClaseUsuario = parseInt(this._route.snapshot.paramMap.get('id'));
    console.log("Id de claseusuario", this.idClaseUsuario)
    this.buscarClaseUsuario()
    this.cargarUsuarios()

    // this.loginForm = new FormGroup({
    //   nombre: new FormControl(this.claseBuscada.idClase.nombre, [Validators.required, Validators.maxLength(30)]),
    //   horario: new FormControl(this.claseBuscada.idClase.horario, Validators.required),
    //   monitor: new FormControl(this.claseBuscada.idUsuario.nombreUsu, Validators.required),
    //   descripcion: new FormControl(this.claseBuscada.idClase.descripcion, [Validators.required, Validators.maxLength(50)]),
    //   img: new FormControl([Validators.required]),
    // })

    setTimeout(() => {
      this.cargando = true;
    }, 2000);

    // var inputImg: any = document.getElementById('image');
    // inputImg.style.visibility = "hidden";


  }

  buscarClaseUsuario() {
    this.servicioClase.buscarClaseUsuario(this.idClaseUsuario).subscribe(data => {
      this.claseBuscada = data;
     // console.log("Claseusuario ", this.claseBuscada)

      this.crearFormulario();
    })

  }

  crearFormulario() {
    console.log("Sbri", this.claseBuscada)
    this.loginForm = new FormGroup({
      nombre: new FormControl(this.claseBuscada.nombreClase, [Validators.required, Validators.maxLength(30)]),
      horario: new FormControl(this.claseBuscada.horario, Validators.required),
      monitor: new FormControl(this.claseBuscada.idUsuario, Validators.required),
      descripcion: new FormControl(this.claseBuscada.descripcion, [Validators.required, Validators.maxLength(50)]),
      img: new FormControl([Validators.required]),
    })

    this.foto = this.claseBuscada.imagen
  }




  modificarClase() {
    // if (this.loginForm.valid) {

    // console.log("foto usuario",this.foto)
    //Usamos el método registrarUsuario del servicio usuario, y le pasamos los value de los diferentes campos del formulario
    this.servicioClase.modificarClase(this.claseBuscada.idclase, this.loginForm.controls["nombre"].value, this.loginForm.controls["descripcion"].value, this.foto, this.loginForm.controls["horario"].value, this.loginForm.controls["monitor"].value).subscribe(data => {

      console.log("datos usuario", this.loginForm)
      let monitor = parseInt(this.loginForm.controls["monitor"].value)
      console.log("monitor", monitor);

      this.servicioClase.modificarUsuarioClase(this.claseBuscada.id, data["1"], monitor).subscribe(data =>
        console.log("RegistroUsuarioClase", this.claseBuscada.id, data["1"], this.loginForm.controls["monitor"].value)
      );


      //Si el valor devuelto por el servidor es "Error, mostramos un alert al usuario"
      if (data["0"] == "Error") {
        this.mod = 'no'
      } else {
        this.mod = 'si'
        setTimeout(() => {
          this.ruta.navigate(['/gestionClases']);
        }, 2000);

      }
    })
    // let monitor = parseInt(this.loginForm.controls["monitor"].value)
    //   this.servicioClase.modificarUsuarioClase(this.claseBuscada.id, "3", monitor).subscribe(data =>
    //     console.log("RegistroUsuarioClase", this.claseBuscada.id, data["1"], this.loginForm.controls["monitor"].value)
    //   );

    //console.log(this.foto)


    // } else {
    //   alert("El formulario no es valido")
    // }

  }






  cargarUsuarios() {
    console.log('Dentro de cargar usuarios')
    this.servicioUsuario.listarTodosUsuarios().subscribe(data => {
      this.litstaUsuarios = []
      //console.log("lista all usuarios", data);
      if (data.resultado == "correcto") {
        //console.log("Correcto")
        // this.usuarios = [];
        data.usuarios.forEach(usuarioN => this.litstaUsuarios.push(usuarioN));
        // console.log("Usuarios",this.litstaUsuarios)
        //console.log(this.litstaUsuarios[0].nombre)
      } else {
        console.log("Incorrecto");
      }
    });
  }


  guardarImagen() {
    var inputImg: any = document.getElementById('image');
    var fotito: any = document.getElementById('fotito');
    console.log("imagen", inputImg);

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
