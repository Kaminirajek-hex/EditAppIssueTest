package com.comptest.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotBlank;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "testentity")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value = { "createdAt", "updatedAt" }, allowGetters = true)
public class Testentity {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
    
    private String Red;
    
    private int testtwo;
    
    private boolean tett;

    public Testentity(){}

	public Testentity(Long id, 
        String Red, 
        int testtwo, 
        boolean tett
    ){
    this.id = id;
	this.Red = Red;
	this.testtwo = testtwo;
	this.tett = tett;
	}

    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

    public void setRed(String Red){
        this.Red = Red;
    }

    public String getRed(){
        return this.Red;
    }
    public void setTesttwo(int testtwo){
        this.testtwo = testtwo;
    }

    public int getTesttwo(){
        return this.testtwo;
    }
    public void setTett(boolean tett){
        this.tett = tett;
    }

    public boolean getTett(){
        return this.tett;
    }

    public String toString(){
        return "[id = " + this.id +
                "Red = " + this.Red +
                "testtwo = " + this.testtwo +
                "tett = " + this.tett +
            "]";
    }

}
