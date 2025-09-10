package me.game.decifra.service;

import org.springframework.stereotype.Service;
import java.time.Duration;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

// Escolher uma palavra toda meia-noite
@Service
public class ScheduleService {

    private final IBGEAPIService IBGEAPIService;
    private final ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor();

    private String countryOfTheDay;
    private String capitalOfTheDay;

    public ScheduleService(IBGEAPIService countryAPIService) {
        this.IBGEAPIService = countryAPIService;
    }

    public String getCountryOfTheDay() {
        return countryOfTheDay.toUpperCase();
    }

    public String getCapitalOfTheDay() {
        return capitalOfTheDay.toUpperCase();
    }


    public void initSchedule() {
        ZoneId zoneId = ZoneId.of("America/Sao_Paulo");
        LocalTime hourToExecute = LocalTime.of(0, 0);

        setNewWord();

        long startDelay = calcStartDelay(hourToExecute, zoneId);
        long nextActivation = TimeUnit.DAYS.toSeconds(1);

        scheduler.scheduleAtFixedRate(this::setNewWord, startDelay, nextActivation, TimeUnit.SECONDS);
    }

    private void setNewWord() {
        countryOfTheDay = IBGEAPIService.getRandomCountry();
        if (countryOfTheDay.equals("Moldavia (Republica da)")) {
           countryOfTheDay = "Moldavia";
        }
        System.out.println("The country of the Day is: " + countryOfTheDay);
        capitalOfTheDay = IBGEAPIService.getRandomCapital();
        System.out.println("The capital of the Day is: " + capitalOfTheDay);
    }
    private long calcStartDelay(LocalTime hourToExecute, ZoneId zoneId) {
        ZonedDateTime now = ZonedDateTime.now(zoneId);
        ZonedDateTime nextExecution = now.with(hourToExecute);
        if (now.compareTo(nextExecution) > 0) {
            nextExecution = nextExecution.plusDays(1);
        }
        return Duration.between(now, nextExecution).getSeconds();
    }
}


