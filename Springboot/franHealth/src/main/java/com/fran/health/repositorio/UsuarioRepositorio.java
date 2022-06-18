package com.fran.health.repositorio;
import java.io.Serializable;
import java.util.List;
import javax.transaction.Transactional;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.fran.health.model.Usuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;


@Repository
public interface UsuarioRepositorio extends JpaRepository<Usuario,Serializable>{
	@Bean
	public abstract List<Usuario> findAll();
	public abstract Usuario findById(int id);
	@Query(value="SELECT *  FROM Usuario  WHERE nombreUsu like %:id%", nativeQuery = true)
	public abstract List<Usuario> findUsuarioAsincrono(String id);
	public abstract Usuario findByEmailAndContrasenna(String email, String contrasenna);
	@Transactional
	public abstract void deleteById(int id);
	@Transactional
	public abstract Usuario  save(Usuario u);



	
}
