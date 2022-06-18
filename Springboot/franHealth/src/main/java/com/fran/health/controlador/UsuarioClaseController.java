package com.fran.health.controlador;


import java.sql.Date;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fran.health.model.Usuario;
import com.fran.health.model.Usuarioclase;
import com.fran.health.repositorio.TipoUsuarioRepositorio;
import com.fran.health.repositorio.UsuarioClaseRepositorio;
import com.fran.health.repositorio.UsuarioRepositorio;
import com.fran.health.seguridad.AutenticadorJWT;

import java.util.Calendar;

@CrossOrigin
@RestController
public class UsuarioClaseController {

	

	
	
		
		@Autowired
		 UsuarioClaseRepositorio usuarioClaseRepo;
		
		@Autowired
		 UsuarioRepositorio usuarioRepo;
		
		@Autowired
			TipoUsuarioRepositorio tipoUsuarioRepo;
//		
//		/*
//		@GetMapping("/api1")
//		List<DTO> api1()
//		{
//
//			List<DTO> listaPersonaDTO = new ArrayList<DTO>();
//			
//			List<Persona> listaPersona=new ArrayList<Persona>();
//			listaPersona.add(new Persona("Paco",18));
//			listaPersona.add(new Persona("Sam",50));
//			listaPersona.add(new Persona("Ana",32));
//			listaPersona.add(new Persona("Marc",55));
//			
//			for (Persona p : listaPersona) {
//				DTO dtoPersona=new DTO();
//				dtoPersona.put("nombre",p.getNombre());
//				dtoPersona.put("edad", p.getEdad());
//				listaPersonaDTO.add(dtoPersona);
//			}
//			//DTO dtoSalida=new DTO();
//			//dtoSalida.put("listaPersonas", listaPersonaDTO);
//			//return dtoSalida;
//			return listaPersonaDTO;
//			} */
//		@GetMapping("/listartodos")
//		public DTO  listarTodos(HttpServletRequest request) {
//			DTO miDto = new DTO();
//			List<DTO> listaUsuariosDTO = new ArrayList<DTO>();
//			List<Usuario> lu =usuarioRepo.findAll();
//			for (Usuario u : lu) {
//				DTO dtoPersona=new DTO();
//				dtoPersona.put("id",u.getId());
//				dtoPersona.put("nombre", u.getNombre());
//				dtoPersona.put("telefono", u.getTelefono());
//				dtoPersona.put("anno_experiencia", u.getAnnoExperiencia());
//				dtoPersona.put("gmail", u.getGmail());
//				dtoPersona.put("password", u.getPassword());
//				dtoPersona.put("rol", u.getRol());
//				dtoPersona.put("foto", u.getFoto());
//				listaUsuariosDTO.add(dtoPersona);
//			}
//			miDto.put("listaDoctores", listaUsuariosDTO);
//			return miDto;
//		}	
//		
//		/**
//		 * Crea un usuario en la base de datos
//		 * @param d
//		 * @param request
//		 * @return
//		 */
//		@PostMapping(path="/crearUsuario",consumes=MediaType.APPLICATION_JSON_VALUE)
//		public DTO  anadeModulo(@RequestBody datosRegistroUsuario d, HttpServletRequest request) {
//			
//			
//					DTO dto = new DTO();
//				
//				try {
//
//					//Creamos un nuevo usuario y añadimos los valores del JSon en el nuevo objeto usuario
//					Usuario doc = new Usuario();
//					doc.setNombre(d.nombre);
//					doc.setNombreUsu(d.nombreUsu);
//					doc.setEmail(d.email);
//					doc.setContrasenna(d.contrasenna);
//					doc.setFechaNac(d.fecha_nac);
//					doc.setTelefono(d.telefono);
//					doc.setDireccion(d.direccion);
//					doc.setCp(d.cp);
//					doc.setLocalidad(d.localidad);
//					doc.setProvincia(d.provincia);
//					doc.setAltura(d.altura);
//					doc.setSexo(d.sexo);
//					doc.setFoto(d.foto);
//					doc.setIdTipousuario(tipoUsuarioRepo.findById(1));
//					//Guardamos el usuario pasando el mismo al método save de usuarioRepo
//					usuarioRepo.save(doc);
//					//Guardamos en dto, el en indice "0" el valor "Perfecto"
//					dto.put("0", "Perfecto");
//				} catch (Exception e) {
//					//Si ocurre un error guardamos en dto el valor de "Error
//					dto.put("0", "Error");
//				}
//				
//				//Devolvemos el dto al front
//				return dto;
//				
//				
//		}
//		
//		
//		
//		
//		//Prueba
//		@PostMapping(path="/modificarUsuario",consumes=MediaType.APPLICATION_JSON_VALUE)
//		public DTO  actualizarmodulo(@RequestBody datosActualizarUsuario d, HttpServletRequest request) {
//			
//			
//					DTO dto = new DTO();
//					System.out.println("----------------------------------------");
//					System.out.println(d.id + " David estoy aqui");
//				
//				try {
//
//					//Creamos un nuevo usuario y añadimos los valores del JSon en el nuevo objeto usuario
//					Usuario doc = usuarioRepo.findById(d.id);
//					doc.setNombre(d.nombre);
//					doc.setNombreUsu(d.nombreUsu);
//					doc.setEmail(d.email);
//					doc.setTelefono(d.telefono);
//					doc.setDireccion(d.direccion);
//					doc.setCp(d.cp);
//					doc.setLocalidad(d.localidad);
//					doc.setProvincia(d.provincia);
//					doc.setAltura(d.altura);
//					doc.setSexo(d.sexo);
//					doc.setFoto(d.foto);
//					//Guardamos el usuario pasando el mismo al método save de usuarioRepo
//					usuarioRepo.save(doc);
//					//Guardamos en dto, el en indice "0" el valor "Perfecto"
//					dto.put("0", "Perfecto");
//					dto.put("1", d);
//					
//				} catch (Exception e) {
//					//Si ocurre un error guardamos en dto el valor de "Error
//					dto.put("0", "Error");
//					System.out.println(e.getMessage());
//;				}
//				
//				//Devolvemos el dto al front
//				return dto;
//				
//				
//		}
//		
//		/**
//		 * Comprueba si el email y la contraseña del usuario corresponde a la de un usuario registrado en la base de datos
//		 * @param datos
//		 * @param request
//		 * @return
//		 */
//		@PostMapping(path = "/autentica", consumes = MediaType.APPLICATION_JSON_VALUE)
//		public DTO autenticaUsuario(@RequestBody DatosAutenticacionUsuario datos, HttpServletRequest request) {
//			DTO dto = new DTO();
//
//			try {
//				//Usamos findByEmailAndContrasenna de usuario repositorio para buscar al usuario
//				Usuario usuario = usuarioRepo.findByEmailAndContrasenna(datos.email, datos.contrasenna);
//				System.out.println("email = " + datos.email);
//				System.out.println("contrasenna = " + datos.contrasenna);
//				//Si existe el usuario, lo guardamos en la variable usuAutenticado
//				if (usuario != null) {
//					Usuario usuAutenticado = usuario;
//					//Guardamos el token del usuario en un objeto dto, el cual es un par clave valor
//					dto.put("jwt", AutenticadorJWT.codificaJWT(usuAutenticado));
//				}
//			} catch (Exception e) {
//				System.out.println(e.getMessage());
//				
//			}
//			// Devuelve el objeto dto al front
//			return dto;
//		}
//		
//		/**
//		 * Devuelve todos los datos del usuario del cual se le ha pasado el TokenJWT
//		 * @param request
//		 * @return
//		 */
//		@GetMapping("/datosautenticado")
//		public DTO listarAutenticado(HttpServletRequest request) {
//			DTO dtoUsuario = new DTO();
//			System.out.println("El request => " + request);
//			//Gracias al token obtenemos el id del usuario autenticado
//			int idUsuarioAutenticado = AutenticadorJWT.getIdUsuarioDesdeJwtIncrustadoEnRequest(request);
//			System.out.println("Id de autenticado => " + idUsuarioAutenticado);
//			//Creamos un objeto de tipo usuario, al cual le añadimos el usuario completo de la base de datos, el cual hemos encontrado
//			//con el método findById de usuarioRepo al cual le hemos pasado el id del usuario autenticado
//			Usuario u = usuarioRepo.findById(idUsuarioAutenticado);
//			dtoUsuario.put("id", u.getId());
//			dtoUsuario.put("nombre", u.getNombre());
//			dtoUsuario.put("nombreUsu", u.getNombreUsu());
//			dtoUsuario.put("email", u.getEmail());
//			dtoUsuario.put("contrasenna", u.getContrasenna());
//			dtoUsuario.put("fecha_nac", u.getFechaNac());
//			dtoUsuario.put("telefono", u.getTelefono());
//			dtoUsuario.put("direccion", u.getDireccion());
//			dtoUsuario.put("cp", u.getCp());
//			dtoUsuario.put("localidad", u.getLocalidad());
//			dtoUsuario.put("provincia", u.getProvincia());
//			dtoUsuario.put("altura", u.getAltura());
//			dtoUsuario.put("sexo", u.getSexo());
//			dtoUsuario.put("foto", u.getFoto());
//			
//			//Devolvemos los valores al front
//			return dtoUsuario;
//			
//		}
//		
//		
//		@GetMapping("/buscarUsuario/{id}")
//		public DTO buscarUsuario(@PathVariable(value="id") int id) {
//			DTO dtoUsuario = new DTO();
//			Usuario u = usuarioRepo.findById(id);
//			dtoUsuario.put("id", u.getId());
//			dtoUsuario.put("nombre", u.getNombre());
//			dtoUsuario.put("nombreUsu", u.getNombreUsu());
//			dtoUsuario.put("email", u.getEmail());
//			dtoUsuario.put("contrasenna", u.getContrasenna());
//			dtoUsuario.put("fecha_nac", u.getFechaNac());
//			dtoUsuario.put("telefono", u.getTelefono());
//			dtoUsuario.put("direccion", u.getDireccion());
//			dtoUsuario.put("cp", u.getCp());
//			dtoUsuario.put("localidad", u.getLocalidad());
//			dtoUsuario.put("provincia", u.getProvincia());
//			dtoUsuario.put("altura", u.getAltura());
//			dtoUsuario.put("sexo", u.getSexo());
//			dtoUsuario.put("foto", u.getFoto());
//			
//			//Devolvemos los valores al front
//			return dtoUsuario;
//			
//		}
//		
//		
//		
//		/*
//		@GetMapping("/listartodosusuarios")
//		public List<Usuario> listarTodosUsuarios(HttpServletRequest request) {	
//			List<Usuario>u = usuarioRepo.findAll();
//			System.out.println("Lista de todos los usuario" + u);
//			return u;
//			
//		}*/
//		
		@GetMapping("/claseUsuario")
		public DTO listarAllUsuarios(HttpServletRequest request) {	
			DTO dto = new DTO();
			//Creamos una lista de usuarios para traernos todos los usuarios
			List<Usuarioclase>usuarios = usuarioClaseRepo.findAll();
			
			List<DTO> listaUsuarios = new ArrayList<DTO>();
			
			if (usuarios != null) {
				for(Usuarioclase u : usuarios) {
					listaUsuarios.add(datosClaseUsuario(u));
				}
				dto.put("usuarioClase", listaUsuarios);
				dto.put("resultado", "correcto");
			}else {
				dto.put("resultado", "fallo");
			}
			
			return dto;
			
			
		}
		
		private DTO datosClaseUsuario(Usuarioclase u) {
			DTO dto = new DTO();
			dto.put("id", u.getId());
			dto.put("nombreClase", u.getIdClase().getNombre());
			dto.put("imagen", u.getIdClase().getImagen());
			dto.put("clasecol", u.getIdClase().getClasecol());
			dto.put("idclase", u.getIdClase().getId());
			dto.put("nombreUsuario", u.getIdUsuario().getNombre());
			dto.put("tipoUsuario", u.getIdUsuario().getIdTipousuario());
			dto.put("Usuario", u.getIdUsuario());
			
			

			return dto;
		}
		
		private DTO datosUsuario(Usuario u) {
			DTO dto = new DTO();
			dto.put("id", u.getId());
			dto.put("nombre", u.getNombre());
			dto.put("nombreUsu", u.getNombreUsu());
			dto.put("email", u.getEmail());
			dto.put("contrasenna", u.getContrasenna());
			dto.put("fecha_nac", u.getFechaNac());
			dto.put("telefono", u.getTelefono());
			dto.put("direccion", u.getDireccion());
			dto.put("cp", u.getCp());
			dto.put("localidad", u.getLocalidad());
			dto.put("provincia", u.getProvincia());
			dto.put("altura", u.getAltura());
			dto.put("sexo", u.getSexo());
			dto.put("foto", u.getFoto());
			dto.put("idTipousuario", u.getIdTipousuario());

			return dto;
		}
		
		
		
		@GetMapping("/buscarClaseUsuario/{id}")
		public DTO listaridUsuario(@PathVariable(value="id") int id) {	
			DTO dto = new DTO();
			//Creamos una lista de usuarios para traernos todos los usuarios
			Usuarioclase usuarios = usuarioClaseRepo.findById(id);
			
			
			
			//if (usuarios != null) {
				dto.put("id", usuarios.getId());
				dto.put("nombreClase", usuarios.getIdClase().getNombre());
				dto.put("imagen", usuarios.getIdClase().getImagen());
				dto.put("horario", usuarios.getIdClase().getHorario());
				dto.put("idclase", usuarios.getIdClase().getId());
				dto.put("idUsuario", usuarios.getIdUsuario().getId());
				dto.put("tipoUsuario", usuarios.getIdUsuario().getIdTipousuario());
				dto.put("descripcion", usuarios.getIdClase().getDescripcion());
				
				
				dto.put("resultado", "correcto");
			//}else {
				//dto.put("resultado", "fallo");
			//}
			
			return dto;
			
			
		}
		
		
		//Pruebas de mostrar las clases en las que esta apuntado el usuario
		
		@GetMapping("/claseInscritoUsuario/{id}")
		public DTO listarClasesInscritoUsuarios(@PathVariable(value="id") int id, HttpServletRequest request) {	
			DTO dto = new DTO();
			//Creamos una lista de usuarios para traernos todos los usuarios
			List<Usuarioclase>usuarios = usuarioClaseRepo.findUserInClass(usuarioRepo.findById(id));
			
			List<DTO> listaUsuarios = new ArrayList<DTO>();
			
			if (usuarios != null) {
				for(Usuarioclase u : usuarios) {
					listaUsuarios.add(datosClaseInscritoUsuario(u));
				}
				dto.put("usuarioClase", listaUsuarios);
				dto.put("resultado", "correcto");
			}else {
				dto.put("resultado", "fallo");
			}
			
			return dto;
			
			
		}
		
		private DTO datosClaseInscritoUsuario(Usuarioclase u) {
			DTO dto = new DTO();
			dto.put("idUsuarioClase", u.getId());
			dto.put("idClase", u.getIdClase().getId());
			dto.put("nombreClase", u.getIdClase().getNombre());
			dto.put("descripClase", u.getIdClase().getDescripcion());
			dto.put("imagenClase", u.getIdClase().getImagen());
			dto.put("clasecolClase", u.getIdClase().getClasecol());
			dto.put("horarioClase", u.getIdClase().getHorario());
			dto.put("idUsuario", u.getIdUsuario().getId());

			return dto;
		}
		
		
		//Pruebas clases en las que no está apuntado el usuario
		
		@GetMapping("/claseNoInscritoUsuario/{id}")
		public DTO listarClasesNoInscritoUsuarios(@PathVariable(value="id") int id, HttpServletRequest request) {	
			DTO dto = new DTO();
			//Creamos una lista de usuarios para traernos todos los usuarios
			List<Usuarioclase>usuarios = usuarioClaseRepo.findUserNotInClass(usuarioRepo.findById(id));
			
			List<DTO> listaUsuarios = new ArrayList<DTO>();
			
			if (usuarios != null) {
				for(Usuarioclase u : usuarios) {
					listaUsuarios.add(datosClaseNoInscritoUsuario(u));
				}
				dto.put("usuarioClase", listaUsuarios);
				dto.put("resultado", "correcto");
			}else {
				dto.put("resultado", "fallo");
			}
			
			return dto;
			
			
		}
		
		private DTO datosClaseNoInscritoUsuario(Usuarioclase u) {
			DTO dto = new DTO();
			dto.put("idUsuarioClase", u.getId());
			dto.put("idClase", u.getIdClase().getId());
			dto.put("nombreClase", u.getIdClase().getNombre());
			dto.put("descripClase", u.getIdClase().getDescripcion());
			dto.put("imagenClase", u.getIdClase().getImagen());
			dto.put("clasecolClase", u.getIdClase().getClasecol());
			dto.put("horarioClase", u.getIdClase().getHorario());
			dto.put("idUsuario", u.getIdUsuario().getId());

			return dto;
		}
		
		
//		
//		
//		
//		
//		/**
//		 * Actualiza la contraseña del usuario
//		 * @param a
//		 * @param request
//		 * @return
//		 */
//		@PostMapping(path = "/actualizarUser", consumes = MediaType.APPLICATION_JSON_VALUE)
//		public DTO actualizarUser(@RequestBody DTO a, HttpServletRequest request) {
//			DTO miDto = new DTO();
//			//Creamos una variable "a", la cual es un DTO, un par clave-valor, y le decimos trae el valor de "id" del JSon enviado
//			//en el front y lo usamos para biscar el usuario por su id con el método findById de usuarioRepo, lo guardamos todo 
//			//en un objeto de tipo usuario
//			Usuario usuario = usuarioRepo.findById(Integer.parseInt("" + a.get("id")));
//			//Al tener el usuario completo en la variable usuario, usamos el método get contraseña, si la contraseña actual 
//			//y la nueva contraseña la cual la obtenemos del JSon como el "id" en la parte anterior son iguales 
//			if(usuario.getContrasenna().equals(a.get("contrasenna"))) {
//				//Actualizamos la contraseña del usuario
//				usuario.setContrasenna("" + a.get("nuevaContrasenna"));
//				//Pasamos el usuario al método save de usuarioRepo para actualizarlo en la base de datos
//				usuarioRepo.save(usuario);
//				//Guardamos en miDto, que es un par clave-valor el indice "0", con el valor "Contraseña actualizasa"
//				miDto.put("0", "Contraseña actualizada");
//
//			}else {
//				//Si ocurre algún problema, guardamos en miDto en el mismo indice el valor "La contraseña no se ha actualizado"
//				miDto.put("0", "La contraseña no se ha actualizado");
//			}			
//			//Devolvemos miDto
//			return miDto;
//		}
//		
//		@RequestMapping("/eliminarusuario/{id}")
//		public DTO elimiarAnimal(@PathVariable(value="id") int id) {
//			
//			DTO dto = new DTO();
//			try {
//				usuarioRepo.deleteById(id);
//				dto.put("0", "correcto");
//			} catch (Exception e) {
//				dto.put("0", "error");
//			}
//			
//			return dto;
//		}
//		
//		
//		
//		
//		
//		
//		static class DatosDoctor {
//			int id;
//			String nombre;
//			String dni;
//			String foto;
//			String gmail;
//			String password;
//			String rol;
//			String telefono;
//			String anno_experiencia;
//			
//			/*
//			public DatosDoctor() {
//				super();
//			}*/
//
//			public DatosDoctor(String nombre, String dni, String foto, String gmail, String password, String rol, String telefono, String anno_experiencia) {
//				super();
//				this.nombre = nombre;
//				this.dni = dni;
//				this.gmail = gmail;
//				this.foto = foto;
//				this.password = password;
//				this.rol = rol;
//				this.telefono = telefono;
//				this.anno_experiencia = anno_experiencia;
//			}
//		}
//		
//		
//		
//		
//		@GetMapping("/buscarUsuario")
//		public List<DTO>  buscarDoctor(HttpServletRequest request) {
//			List<DTO> listaUsuariosDTO = new ArrayList<DTO>();
//			List<Usuario> lu =usuarioRepo.findById(2);
//			for (Usuario u : lu) {
//				DTO dtoPersona=new DTO();
//				dtoPersona.put("id",u.getId());
//				dtoPersona.put("nombre", u.getNombre());
//				dtoPersona.put("telefono", u.getTelefono());
//				dtoPersona.put("anno_experiencia", u.getAnnoExperiencia());
//				dtoPersona.put("gmail", u.getGmail());
//				dtoPersona.put("password", u.getPassword());
//				dtoPersona.put("rol", u.getRol());
//				dtoPersona.put("foto", u.getFoto());
//				listaUsuariosDTO.add(dtoPersona);
//			}
//			return listaUsuariosDTO;
//		}	
//		
//		
//		/*@GetMapping("/anadir")
//		public void anadir() {
//			
//			cjr.save(new Usuario (null,"Christian","passw77","admin",null,Calendar.getInstance().getTime()));
//			
//		}
//		
//		@GetMapping("/actualizar")
//		public void actualizar() {
//			Usuario u=new Usuario(6,"pueblo","nue","user",null,Calendar.getInstance().getTime());
//			cjr.save(u);
//			
//		}
//		@GetMapping("/borrar")
//		public int removeCurso() {
//			cjr.deleteById(1);
//			return 0;
//			}
//		@PostMapping("/borrarpost")
//		public int removeCursoPorid(@ModelAttribute("identi")
//		DatosBajaUsuario u) {
//			cjr.deleteById(u.id);
//			return 0;
//			}
//		
//		@PostMapping("/autentica")
//		public DTO autenticaUsuario(@ModelAttribute("persona")
//		DatosAutenticacionUsuario u) {
//			DTO dto = new DTO();
//			dto.put("usuario", u.usuario);
//			dto.put("password", u.password);
//			List<DTO> lista=new ArrayList<DTO>();
//			
//		  return dto;}
//		*/
//		/**
//		 * Constrolador que consume un Json de usuario sin id.
//		 */
//		/*
//		@PostMapping(path="/anadirnuevo",consumes=MediaType.APPLICATION_JSON_VALUE)
//		public void autenticaUsuario(@RequestBody
//		DatosAltaUsuario u,HttpServletRequest request) {
//			
//			cjr.save(new Usuario (null,u.usuario,u.password,u.rol,Base64.decodeBase64((String) u.imagen),u.fecha));
//			
//		  }
//		
//		*/
//		
//		class DatosAutenticacionUsuario{
//			String usuario;
//			String password;
//			
//			/**
//			 * Constructor
//			 */
//			public DatosAutenticacionUsuario(String usuario, String password) {
//				super();
//				this.usuario = usuario;
//				this.password = password;
//			}
//		}  
//		
//		
//		static class DatosAltaUsuario{
//			String usuario;
//			String password;
//			String rol;
//			String imagen;
//			Date fecha;
//			
//
//			public DatosAltaUsuario(String usuario, String password, String rol, String imagen, Date fecha) {
//				super();
//				this.usuario = usuario;
//				this.password = password;
//				this.rol=rol;
//				this.imagen=imagen;
//				this.fecha=fecha;
//			}
//		}
//		static class DatosBajaUsuario{
//			int id;
//			
//			/**
//			 * Constructor
//			 */
//			public DatosBajaUsuario(int id) {
//				super();
//				this.id=id;
//			}
//		}
//	static	class DatosActualizaUsuario{
//			int id;
//			String usuario;
//			String password;
//			String rol;
//			
//			/**
//			 * Constructor
//			 */
//			public DatosActualizaUsuario(int id,String usuario, String password, String rol) {
//				super();
//				this.id=id;
//				this.usuario = usuario;
//				this.password = password;
//				this.rol=rol;
//			}
//		}
//			
		
	}