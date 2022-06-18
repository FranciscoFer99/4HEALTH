export interface usuario {
    id:number,
    nombre:string,
    nombreUsu:string,
    email:string,
    contrasenna:string,
    fecha_nac:string,
    telefono:string,
    direccion:string,
    cp:string,
    localidad:string,
    provincia:string,
    altura:string,
    sexo:string,
    foto:string,
    idTipousuario:tipousuario,
}

export interface tipousuario {
  id:number,
  tipo:string,
  descripcion:string,
}

export interface clase {
  id:number,
  nombre:string,
  descripcion:string,
  imagen:string,
  clasecol:string,
  horario:string,
}

export interface pesousuario {
  id:number,
  valor:string,
  fecha:Date,
  idusuario:usuario,
}

export interface usuarioclase {
  id:number,
  idClase:clase,
  idUsuario:usuario,
}

export interface datosClaseUsuario {
  id: number,
  nombreClase:string,
  imagen:string,
  nombreUsuario:string,
  clasecol:string,
  idclase:number,
  tipoUsuario: tipousuario,
}


export interface TokenJWT {
    jwt: any;
}


