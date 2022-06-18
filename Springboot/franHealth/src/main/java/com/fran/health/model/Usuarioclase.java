/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.fran.health.model;


import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author david
 */
@Entity
@Table(name = "usuarioclase")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Usuarioclase.findAll", query = "SELECT u FROM Usuarioclase u"),
    @NamedQuery(name = "Usuarioclase.findUserInClass", query = "SELECT u FROM Usuarioclase u where u.idUsuario = :id"),
    @NamedQuery(name = "Usuarioclase.findUserNotInClass", query = "SELECT u FROM Usuarioclase u where u.idClase not in (SELECT u2.idClase FROM Usuarioclase u2 where u2.idUsuario = :id) group by u.idClase"),
    @NamedQuery(name = "Usuarioclase.findById", query = "SELECT u FROM Usuarioclase u WHERE u.id = :id")})
public class Usuarioclase implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @JoinColumn(name = "idClase", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Clase idClase;
    @JoinColumn(name = "idUsuario", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Usuario idUsuario;

    public Usuarioclase() {
    }

    public Usuarioclase(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Clase getIdClase() {
        return idClase;
    }

    public void setIdClase(Clase idClase) {
        this.idClase = idClase;
    }

    public Usuario getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Usuario idUsuario) {
        this.idUsuario = idUsuario;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Usuarioclase)) {
            return false;
        }
        Usuarioclase other = (Usuarioclase) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Entidad.Usuarioclase[ id=" + id + " ]";
    }
    
}
