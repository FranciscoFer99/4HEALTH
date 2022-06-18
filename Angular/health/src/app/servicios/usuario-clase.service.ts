import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenJWT, usuario } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsuarioClaseService {

  private url: string = "http://localhost:8080";

  usuarioAutenticado: usuario; // Para almacenar el usuario autenticado
  @Output()
  cambiosEnUsuarioAutenticado = new EventEmitter<usuario>();

  JWT: TokenJWT;

  constructor(private http: HttpClient) { }

  getAllClaseUsuario(): Observable<any> {

    return this.http.get<any>(`${this.url}/claseUsuario`)
  }

}
