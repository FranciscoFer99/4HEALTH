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

import com.fran.health.model.Clase;
import com.fran.health.model.Pesousuario;
import com.fran.health.model.Usuario;
import com.fran.health.model.Usuarioclase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;


@Repository
public interface PesoUsuarioRepositorio extends JpaRepository<Pesousuario,Serializable>{
	@Bean
	public abstract List<Pesousuario> findAll();
	public abstract Pesousuario findById(int id);
	public abstract List<Pesousuario> findByPesoUsuario(Usuario id);
	@Transactional
	public abstract void deleteById(int id);
	@Transactional
	public abstract Pesousuario  save(Usuario u);



	
}
