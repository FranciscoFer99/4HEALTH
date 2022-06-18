package com.fran.health.controlador;


import java.sql.Date;
import java.util.ArrayList;
import java.util.Calendar;
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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fran.health.model.Tipousuario;
import com.fran.health.model.Usuario;
import com.fran.health.repositorio.TipoUsuarioRepositorio;
import com.fran.health.repositorio.UsuarioRepositorio;



import java.util.Calendar;

@CrossOrigin
@RestController
public class TipoUsuarioController {

	

	
	
		
		@Autowired
		 TipoUsuarioRepositorio Tipousuario;
		
		
		@GetMapping("/listarTipoUsuario")
		public DTO listarZona(HttpServletRequest request) {
			DTO miDto = new DTO();
			List<DTO> listaUsuariosDTO = new ArrayList<DTO>();
			List<Tipousuario> lu =Tipousuario.findAll();
			for (Tipousuario u : lu) {
				DTO dtoPersona=new DTO();
				dtoPersona.put("id",u.getId());
				dtoPersona.put("tipo", u.getTipo());
				dtoPersona.put("descripcion", u.getDescripcion());
				listaUsuariosDTO.add(dtoPersona);


			}
			miDto.put("listaTipoUsuario", listaUsuariosDTO);
			return miDto;
		}
		
		
	}


