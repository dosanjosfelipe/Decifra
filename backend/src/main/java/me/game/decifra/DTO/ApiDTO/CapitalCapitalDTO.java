package me.game.decifra.DTO.ApiDTO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CapitalCapitalDTO {
    private CapitalNomeDTO capital;

    public CapitalNomeDTO getCapital() {return capital;}
    public void setCapital(CapitalNomeDTO capital) {this.capital = capital;}
}
