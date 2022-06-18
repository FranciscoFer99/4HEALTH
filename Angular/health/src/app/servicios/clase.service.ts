import { TokenJWT } from './../interfaces/interfaces';
import { usuario } from 'src/app/interfaces/interfaces';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClaseService {

  private url: string = "http://localhost:8080";

  usuarioAutenticado: usuario; // Para almacenar el usuario autenticado
  @Output()
  cambiosEnUsuarioAutenticado = new EventEmitter<usuario>();

  JWT: TokenJWT;

  constructor(private http: HttpClient) { }

  eliminarClase(id: number, clasecol: string): Observable<any> {

    var jsonObject = {
      id: id,
      clasecol: clasecol,
    };
    console.log("Jeisonobjectj",jsonObject)
    return this.http.post<any>(`${this.url}/eliminarClase`, jsonObject)
  }

  registroClase(nombre: string, descripcion: string, foto: string, horario:string, monitor: number): Observable<any> {
    //Creamos la variable md5, la cual es un objeto Md5

    //Creamos un JSon, en el cual añadimos valores
    var jsonObject = {
      nombre: nombre,
      descripcion: descripcion,
      foto: foto,
      horario: horario,
      monitor:monitor,
    };
    console.log('Jeison registro ',jsonObject)
    return this.http.post<any>(`${this.url}/crearClase`, jsonObject)
  }

  registroUsuarioClase(idclase: string, idmonitor: number): Observable<any> {
    //Creamos la variable md5, la cual es un objeto Md5

    //Creamos un JSon, en el cual añadimos valores
    var jsonObject = {
      idclase: idclase,
      idmonitor: idmonitor,
    };
    console.log('Jeison usuarioClase ',jsonObject)
    return this.http.post<any>(`${this.url}/crearUsuarioClase`, jsonObject)
  }

  modificarUsuarioClase(id:number, idclase: string, idmonitor: number): Observable<any> {
    //Creamos la variable md5, la cual es un objeto Md5

    //Creamos un JSon, en el cual añadimos valores
    var jsonObject = {
      id: id,
      idclase: idclase,
      idmonitor: idmonitor,
    };
    console.log('Jeison usuarioClase ',jsonObject)
    return this.http.post<any>(`${this.url}/modificarUsuarioClase`, jsonObject)
  }

  modificarClase(idclase:number, nombre: string, descripcion: string, foto: string, horario:string, monitor: number): Observable<any> {
    //Creamos la variable md5, la cual es un objeto Md5

    //Creamos un JSon, en el cual añadimos valores
    var jsonObject = {
      idclase:idclase,
      nombre: nombre,
      descripcion: descripcion,
      foto: foto,
      horario: horario,
      monitor:monitor,
    };
    console.log('Jeison registro ',jsonObject)
    return this.http.post<any>(`${this.url}/modificarClase`, jsonObject)
  }


  buscarClaseUsuario(idClaseUsuario: number):Observable<any>{
    return this.http.get<any>(this.url + '/buscarClaseUsuario/' + idClaseUsuario);
  }



  //Pruebas clases inscritas del usuario

  buscarClaseInscritoUsuario(idClaseUsuario: number):Observable<any>{
    return this.http.get<any>(this.url + '/claseInscritoUsuario/' + idClaseUsuario);
  }

  //Pruebas clases no inscritas del usuario


  buscarClaseNoInscritoUsuario(idClaseUsuario: number):Observable<any>{
    return this.http.get<any>(this.url + '/claseNoInscritoUsuario/' + idClaseUsuario);
  }


  annadirUsuarioClase(idusuario: number, idclase: string): Observable<any> {
    //Creamos la variable md5, la cual es un objeto Md5

    //Creamos un JSon, en el cual añadimos valores
    var jsonObject = {
      idclase: idclase,
      idusuario: idusuario,
    };
    console.log('Jeison usuarioClase ',jsonObject)
    return this.http.post<any>(`${this.url}/annadirUsuarioClase`, jsonObject)
  }


  eliminarUsuarioClase(idClase: number):Observable<any>{
    return this.http.get<any>(this.url + '/eliminarClase/' + idClase);
  }



}
