import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenJWT, usuario } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PageErrorService {
  private url: string = "https://jsonplaceholder.typicode.com/photos/";
  private url2: string = "https://api.quotable.io/random?maxLength=50";

  usuarioAutenticado: usuario; // Para almacenar el usuario autenticado
  @Output()
  cambiosEnUsuarioAutenticado = new EventEmitter<usuario>();

  JWT: TokenJWT;

  constructor(private http: HttpClient) { }

  buscarCoctel(): Observable<any> {
    let num = Math.round(Math.random() * (27 - 21) + 21);
    return this.http.get<any>(this.url + num);
  }
  buscarFrase(): Observable<any> {

    return this.http.get<any>(this.url2);
  }


}
