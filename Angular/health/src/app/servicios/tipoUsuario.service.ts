import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenJWT } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TipoUsuarioService {

  private url: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    return this.http.get<any>(this.url + '/listarTipoUsuario')
  }



  // get(): Observable<any> {
  //   return this.http.get<any>(this.url + '/listartodos')
  // }
  // post(doctor: doctores): Observable<any> {
  //   let headers = new HttpHeaders().set('Content-Type', 'application/json');
  //   var nuevoDoctor = {
  //     "anno_experiencia": doctor.anno_experiencia,
  //     "dni": doctor.dni,
  //     "foto": doctor.foto,
  //     "gmail": doctor.gmail,
  //     "nombre": doctor.nombre,
  //     "password": doctor.password,
  //     "rol": doctor.rol,
  //     "telefono": doctor.telefono,
  //   }
  //   console.log(nuevoDoctor)
  //   return this.http.post<any>(this.url + '/crearDoctor', nuevoDoctor, { headers: headers })

  // }

  // getBuscarId(id: any): Observable<any> {
  //   return this.http.get<any>(this.url + '/buscarId/' + id)
  // }

  // postActDoct(doctor: doctores): Observable<any> {
  //   let headers = new HttpHeaders().set('Content-Type', 'application/json');
  //   var nuevoDoctor = {
  //     "id": doctor.id,
  //     "anno_experiencia": doctor.anno_experiencia,
  //     "dni": doctor.dni,
  //     "foto": doctor.foto,
  //     "gmail": doctor.gmail,
  //     "nombre": doctor.nombre,
  //     "password": doctor.password,
  //     "rol": doctor.rol,
  //     "telefono": doctor.telefono,
  //   }
  //   console.log(nuevoDoctor)
  //   return this.http.post<any>(this.url + '/actualizarDoctor', nuevoDoctor, { headers: headers })

  // }

  // postEliminarUsu(id:number): Observable<any>{
  // return this.http.get<any>(this.url + '/eliminarUsuario/' + id);
  // }

  // usuarioAutenticado: doctores; // Para almacenar el usuario autenticado
  // @Output()
  // cambiosEnUsuarioAutenticado = new EventEmitter<doctores>();

  // JWT: any;

  // public getUsuarioAutenticado(): Observable<doctores>{
  //   let headers = new HttpHeaders().set('Authorization',`Bearer ${this.JWT}`);
  //   return this.http.get<doctores>(this.url + '/datosautenticado',{headers: headers});
  // }

  // emitirNuevoCambioEnUsuarioAutenticado() {
  //   this.getUsuarioAutenticado().subscribe(usuarioAutenticado => {
  //     this.usuarioAutenticado = usuarioAutenticado;
  //     localStorage.setItem('usuario',JSON.stringify(usuarioAutenticado))
  //     this.cambiosEnUsuarioAutenticado.emit(usuarioAutenticado);
  //   });
  // }

  // autenticaUsuario (gmail: string, password: string) : Observable<TokenJWT> {
  //   var jsonObject = {
  //     gmail: gmail,
  //     password: password
  //   };
  //   // Envío la petición http y devuelvo el Observable, para que cualquiera pueda subscribirse.
  //   return this.http.post<TokenJWT>(this.url + '/autentica', jsonObject);
  // }


}
