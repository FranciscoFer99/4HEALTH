import { TokenJWT } from './../interfaces/interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Md5 } from 'ts-md5';
import { usuario } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url: string = "http://localhost:8080";

  usuarioAutenticado: usuario; // Para almacenar el usuario autenticado
  @Output()
  cambiosEnUsuarioAutenticado = new EventEmitter<usuario>();

  JWT: TokenJWT;

  constructor(private http: HttpClient) { }

  /**
   * Registra al usuario en la base de datos
   * @param nombre
   * @param nombreUsu
   * @param email
   * @param contrasenna
   * @param fecha_nac
   * @param telefono
   * @param direccion
   * @param cp
   * @param localidad
   * @param provincia
   * @param altura
   * @param sexo
   * @param foto
   * @returns
   */
  registroUsuario(nombre: string, nombreUsu: string, email: string, contrasenna: string, fecha_nac: string, telefono: string, direccion: string, cp: string, localidad: string, provincia:string, altura: string, sexo:string, foto: string): Observable<any> {
    //Creamos la variable md5, la cual es un objeto Md5
    const md5 = new Md5();
    //Creamos un JSon, en el cual añadimos valores
    var jsonObject = {
      nombre: nombre,
      nombreUsu: nombreUsu,
      email: email,
      contrasenna: md5.appendStr(contrasenna).end().toString(),  // Método para codificar en Md5
      fecha_nac: fecha_nac,
      telefono: telefono,
      direccion: direccion,
      cp: cp,
      localidad: localidad,
      provincia: provincia,
      altura: altura,
      sexo: sexo,
      foto: foto
    };
    return this.http.post<any>(`${this.url}/crearUsuario`, jsonObject)
  }


  actualizarUsuario(id: number, nombre: string, nombreUsu: string, email: string, telefono: string, direccion: string, cp: string, localidad: string, provincia:string, altura: string, sexo:string, foto: string): Observable<any> {
    //Creamos la variable md5, la cual es un objeto Md5
    const md5 = new Md5();
    //Creamos un JSon, en el cual añadimos valores
    var jsonObject = {
      id: id,
      nombre: nombre,
      nombreUsu: nombreUsu,
      email: email,
      telefono: telefono,
      direccion: direccion,
      cp: cp,
      localidad: localidad,
      provincia: provincia,
      altura: altura,
      sexo: sexo,
      foto: foto
    };
    console.log("Jeisonobjectj",jsonObject)
    return this.http.post<any>(`${this.url}/modificarUsuario`, jsonObject)
  }

  actualizarAdminUsuario(id: number, nombre: string, nombreUsu: string, email: string, telefono: string, direccion: string, cp: string, localidad: string, provincia:string, altura: string, tipo:number, foto: string): Observable<any> {
    //Creamos la variable md5, la cual es un objeto Md5
    const md5 = new Md5();
    //Creamos un JSon, en el cual añadimos valores
    var jsonObject = {
      id: id,
      nombre: nombre,
      nombreUsu: nombreUsu,
      email: email,
      telefono: telefono,
      direccion: direccion,
      cp: cp,
      localidad: localidad,
      provincia: provincia,
      altura: altura,
      tipo: tipo,
      foto: foto
    };
    console.log("Jeisonobjectj",jsonObject)
    return this.http.post<any>(`${this.url}/modificarAdminUsuario`, jsonObject)
  }

  // actualizarUsuario(nombre: string, nombreUsu: string, email: string, contrasenna: string, fecha_nac: string, telefono: string, direccion: string, cp: string, localidad: string, provincia:string, altura: string, sexo:string, foto: string): Observable<any> {
  //   //Creamos la variable md5, la cual es un objeto Md5
  //   const md5 = new Md5();
  //   //Creamos un JSon, en el cual añadimos valores
  //   var jsonObject = {
  //     nombre: nombre,
  //     nombreUsu: nombreUsu,
  //     email: email,
  //     contrasenna: contrasenna,  // Método para codificar en Md5
  //     fecha_nac: fecha_nac,
  //     telefono: telefono,
  //     direccion: direccion,
  //     cp: cp,
  //     localidad: localidad,
  //     provincia: provincia,
  //     altura: altura,
  //     sexo: sexo,
  //     foto: foto
  //   };
  //   return this.http.post<any>(`${this.url}/crearUsuario`, jsonObject)
  // }

/**
 * Autentifica el usuario por email y contraseña
 * @param email
 * @param contrasenna
 * @returns
 */
autenticaUsuario (email: string, contrasenna: string) : Observable<TokenJWT> {
  //Creamos una constante y le damos como valor un objeto Md5, que será usado para encriptar
  const md5 = new Md5();
  //Creamos un JSon e introducimos los datos
  var jsonObject = {
    "email": email,
    "contrasenna": md5.appendStr(contrasenna).end().toString() //Función para convertir a Md5
  };
  //Hacemos una petición POST al servidor la cual va a devolver un Token
  return this.http.post<TokenJWT>(this.url + '/autentica', jsonObject);
}


/**
 * Guarda en LocalStorage el Token del usuario
 */
emitirNuevoCambioEnUsuarioAutenticado() {
  //Obtenemos los datos del usuario con el método getUsuarioAutenticado, el cual trae del servidor un objeto usuario con todos sus valores en la base de datos
  this.getUsuarioAutenticado().subscribe(usuarioAutenticado => {
    //La respuesta del servidor la guardamos en la variable usuarioAutenticado
    this.usuarioAutenticado = usuarioAutenticado;
    //También guardamos los datos en LocalStorage
    //localStorage.setItem('usuario',JSON.stringify(usuarioAutenticado));
    localStorage.setItem('tokenUsuario',JSON.stringify(this.JWT));
    this.cambiosEnUsuarioAutenticado.emit(usuarioAutenticado);
    console.log(usuarioAutenticado);
  });
}
/**
 * Trae un objeto con todos los valores del usuario
 * @returns
 */
public getUsuarioAutenticado(): Observable<usuario>{
  console.log("This.JWT",this.JWT);
  console.log("Local storage token usuario",localStorage.getItem('tokenUsuario'));
  //Guardamos en la variable headers, el token del usuario, el cual lo usuaremos para emitir una petición get al servidor y traer un objeto de tipo usuario
  let headers;
  if(localStorage.getItem('tokenUsuario') == null){
     headers = new HttpHeaders().set('Authorization',`Bearer ${this.JWT}`);
  }else{
    //Guardo el token del usuario en this.JWT, y lo uso para que se mantenga iniciada la sesión del usuario
    this.JWT = JSON.parse(localStorage.getItem('tokenUsuario'));
    headers = new HttpHeaders().set('Authorization',`Bearer ${this.JWT}`);
    //localStorage.removeItem('usuario');
  }
  return this.http.get<usuario>(this.url + '/datosautenticado',{headers: headers});
}


//  public getUsuarioAutenticado(): Observable<usuario>{
//   console.log(this.JWT);
//   //Guardamos en la variable headers, el token del usuario, el cual lo usuaremos para emitir una petición get al servidor y traer un objeto de tipo usuario
//   let headers = new HttpHeaders().set('Authorization',`Bearer ${this.JWT}`);
//   return this.http.get<usuario>(this.url + '/datosautenticado',{headers: headers});
// }


/**
 * Cambia la contraseña del usuario y devuelve un par clave-valor
 * @param contrasenna
 * @param nuevaContrasenna
 * @param idusuario
 * @returns
 */
cambiarContrasennaUsu(contrasenna: string, nuevaContrasenna: string, idusuario: number): Observable<any> {
  //Creamos una constante la cual va a ser un objeto Md5
  const md5 = new Md5();
  const md5N = new Md5();
  //Creamos un JSon, en el cual le pasamos los siguientes datos, el id del usuario, la contraseña actual y la nueva contraseña
  var jsonObject = {
    "id": idusuario,
    "contrasenna": md5.appendStr(contrasenna).end().toString(),//Ciframos la contraseña con el siguiente método
    "nuevaContrasenna": md5N.appendStr(nuevaContrasenna).end().toString(),

  };
  console.log(nuevaContrasenna, "--------------")
  console.log(jsonObject, "Json")
  return this.http.post<any>(this.url + '/actualizarUser', jsonObject);
}

// listarTodosUsuarios():Observable<any>{
//   return this.http.get<any>(this.url + '/listartodosusuarios');
// }
listarTodosUsuarios():Observable<any>{
  return this.http.get<any>(this.url + '/listarallusuarios');
}

eliminarUsuario(idUsuario: number):Observable<any>{
  return this.http.get<any>(this.url + '/eliminarusuario/' + idUsuario);
}

buscarUsuario(idUsuario: number):Observable<any>{
  return this.http.get<any>(this.url + '/buscarUsuario/' + idUsuario);
}


listarAsincUsuarios(valor: string):Observable<any>{
  console.log("valor servicio search", valor)
  return this.http.get<any>(this.url + '/listarAsincusuarios/' + valor);
}

}


