package me.game.decifra.external;

import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;

@Component
public class CountryClient {

    private final WebClient webClient;

    public CountryClient() {
        ExchangeStrategies strategies = ExchangeStrategies.builder()
                .codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(16 * 1024 * 1024))
                .build();

        this.webClient = WebClient.builder()
                .exchangeStrategies(strategies)
                .build();
    }

    public String callCountryAPI() {
        String URL = "https://servicodados.ibge.gov.br/api/v1/paises/all";

        return webClient.get()
                .uri(URL)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }
}
