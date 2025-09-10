package me.game.decifra.service;

import org.springframework.stereotype.Service;
import java.util.ArrayList;

@Service
public class CryptWordService {

    private final ScheduleService scheduleService;

    public CryptWordService(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    public ArrayList<String> generateCryptWord(boolean isCapital) {
        String wordsDay;
        if (!isCapital) {
            wordsDay = scheduleService.getCountryOfTheDay();
        } else {
            wordsDay = scheduleService.getCapitalOfTheDay();
        }

        String[] word = wordsDay.split("");

        ArrayList<String> cryptWord = new ArrayList<>();

        for (String letter : word) {
            if (letter.equals(" ")) {
                cryptWord.add(" ");
            } else if (letter.equals("-")) {
                cryptWord.add("-");
            } else {
                cryptWord.add("*");
            }
        }
        return cryptWord;
    }
}
