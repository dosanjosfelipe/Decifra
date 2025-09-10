package me.game.decifra.DTO.ApiDTO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CapitalNomeDTO {
    private String nome;

    public String getNome() {return nome;}
    public void setNome(String nome) {this.nome = nome;}
}
