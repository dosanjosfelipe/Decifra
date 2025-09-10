package me.game.decifra.DTO.ApiDTO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CountryDTO {
    private CountryNameDTO nome;

    public CountryNameDTO getNome() {return nome;}
    public void setNome(CountryNameDTO nome) {this.nome = nome;}
}
