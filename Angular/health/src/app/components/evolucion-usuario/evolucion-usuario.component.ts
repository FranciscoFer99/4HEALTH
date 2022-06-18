import { Chart } from 'chart.js';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PesoUsuarioService } from 'src/app/servicios/peso-usuario.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { usuario } from 'src/app/interfaces/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-evolucion-usuario',
  templateUrl: './evolucion-usuario.component.html',
  styleUrls: ['./evolucion-usuario.component.css']
})
export class EvolucionUsuarioComponent implements OnInit {

  constructor(private servicioUsuario: UsuarioService, private ruta: Router, private servicioPesoUsuario: PesoUsuarioService) { }

  cargando: boolean;
  public page: number;
  idUsuario: number
  pesosDelUsuario: any
  clases: any[] = []
  usuarioLog: usuario;
  loginForm: FormGroup
  fechaActual: any
  elim:any

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

      this.cargarPesoUsuario()






    });
    this.loginForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    })

    setTimeout(() => {
      this.cargando = true;
    }, 2000);

  }

  cargarPesoUsuario() {
    this.idUsuario = this.usuarioLog.id
    this.servicioPesoUsuario.buscarPesoUsuario(this.idUsuario).subscribe(data => {
      this.pesosDelUsuario = data
      //console.log(this.pesosDelUsuario)
      this.clases = []

      data.usuarioClase.forEach(clases => this.clases.push(clases));
      console.log(this.clases)


    })

  }


  eliminarClase(idPeso: number) {
    console.log(idPeso)
    this.servicioPesoUsuario.eliminarPesoUsuario(idPeso).subscribe(data => {
      if (data[0] == "correcto") {
        this.elim = 'no'
        this.cargarPesoUsuario()
      } else {
        this.elim = 'noElim';

      }
    })
  }


  mostrarPesoUsuario() {
    console.log("idUsuario", this.usuarioLog.id)
    console.log('Peso Usuario', this.loginForm.controls["nombre"].value)
    this.fechaActual = new Date().getTime();
    console.log("Fecha Actual", this.fechaActual);
    this.servicioPesoUsuario.registroPesoUsuario(this.loginForm.controls["nombre"].value, this.fechaActual, this.usuarioLog.id).subscribe(data => {
      console.log("Lista de pesos del usuario",data)
      this.cargarPesoUsuario()
    })
  }


}


