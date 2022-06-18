import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenJWT, usuario } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PesoUsuarioService {
  private url: string = "http://localhost:8080";

  usuarioAutenticado: usuario; // Para almacenar el usuario autenticado
  @Output()
  cambiosEnUsuarioAutenticado = new EventEmitter<usuario>();

  JWT: TokenJWT;


  constructor(private http: HttpClient) { }

  buscarPesoUsuario(idUsuario: number):Observable<any>{
    return this.http.get<any>(this.url + '/buscarPesoUsuario/' + idUsuario);
  }

  eliminarPesoUsuario(idPeso: number):Observable<any>{
    return this.http.get<any>(this.url + '/eliminarPesoUsuario/' + idPeso);
  }


  registroPesoUsuario(valor: string, fechaActual: Date, idusuario: number): Observable<any> {
    //Creamos la variable md5, la cual es un objeto Md5

    //Creamos un JSon, en el cual añadimos valores
    var jsonObject = {
      valor: valor,
      fechaActual: fechaActual,
      idusuario: idusuario
    };
    return this.http.post<any>(`${this.url}/crearPesoUsuario`, jsonObject)
  }








}
