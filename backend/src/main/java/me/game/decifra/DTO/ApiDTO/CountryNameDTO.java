package me.game.decifra.DTO.ApiDTO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CountryNameDTO {
    private String abreviado;

    public String getAbreviado() {return abreviado;}
    public void setAbreviado(String abreviado) {this.abreviado = abreviado;}
}
