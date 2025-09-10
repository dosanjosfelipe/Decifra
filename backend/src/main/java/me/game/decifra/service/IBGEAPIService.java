package me.game.decifra.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import me.game.decifra.DTO.ApiDTO.CapitalDTO;
import me.game.decifra.DTO.ApiDTO.CountryDTO;
import me.game.decifra.external.CountryClient;
import me.game.decifra.utils.AccentRemover;
import me.game.decifra.utils.ShuffleOBJ;
import org.springframework.stereotype.Service;
import java.lang.reflect.Type;
import java.util.List;

@Service
public class IBGEAPIService {

    private final CountryClient countryClient;

    public IBGEAPIService(CountryClient countryClient) {
        this.countryClient = countryClient;
    }

    public String getRandomCountry() {

        String json = countryClient.callCountryAPI();

        if (json == null || json.isEmpty()) {
            System.out.println("Country Json is empty.");
            return "Country Json is empty.";
        }

        try {
            ObjectMapper mapper = new ObjectMapper();

            List<CountryDTO> countries = mapper.readValue(json, new TypeReference<List<CountryDTO>>() {
                @Override
                public Type getType() {
                    return super.getType();
                }
            });

            if (countries.isEmpty()) {
                System.out.println("country list is empty.");
                return "country list is empty.";
            }

            int countriesIndex = ShuffleOBJ.OBJShuffle(countries);

            return AccentRemover.removeAccent(countries.get(countriesIndex).getNome().getAbreviado());

        } catch (Exception e) {
            e.printStackTrace();
        }
        return "Não foi possivel criar a palavra";
    }
    public String getRandomCapital() {
        String json = countryClient.callCountryAPI();

        if (json == null || json.isEmpty()) {
            System.out.println("Country Json is empty.");
            return "Country Json is empty.";
        }

        try {
            ObjectMapper mapper = new ObjectMapper();
            List<CapitalDTO> capitals = mapper.readValue(json, new TypeReference<List<CapitalDTO>>() {
                @Override
                public Type getType() {
                    return super.getType();
                }
            });

            if (capitals.isEmpty()) {
                System.out.println("capital list is empty.");
                return "capital list is empty.";
            }

            int capitalsIndex = ShuffleOBJ.OBJShuffle(capitals);
            return AccentRemover.removeAccent(capitals.get(capitalsIndex).getGoverno().getCapital().getNome());

        } catch (Exception e) {
            e.printStackTrace();
        }

        return "Não foi possivel criar a palavra";
    }
}
