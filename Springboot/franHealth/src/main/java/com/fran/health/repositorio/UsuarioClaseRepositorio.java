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
import com.fran.health.model.Usuarioclase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;


@Repository
public interface UsuarioClaseRepositorio extends JpaRepository<Usuarioclase,Serializable>{
	@Bean
	//@Query(value="select * from usuarioclase where clascol != 'eliminado'",nativeQuery=true)
	public abstract List<Usuarioclase> findAll();
	public abstract Usuarioclase findById(int id);
	public abstract List<Usuarioclase> findUserInClass(Usuario id);
	public abstract List<Usuarioclase> findUserNotInClass(Usuario id);
	@Transactional
	public abstract void deleteById(int id);
	@Transactional
	public abstract Usuarioclase  save(Usuario u);



	
}
