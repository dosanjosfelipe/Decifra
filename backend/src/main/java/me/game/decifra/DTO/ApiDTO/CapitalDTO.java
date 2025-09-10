package me.game.decifra.DTO.ApiDTO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CapitalDTO {
    private CapitalCapitalDTO governo;

    public CapitalCapitalDTO getGoverno() {return governo;}
    public void setGoverno(CapitalCapitalDTO governo) {this.governo = governo;}
}
