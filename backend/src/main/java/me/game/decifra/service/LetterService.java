package me.game.decifra.service;

import org.springframework.stereotype.Service;
import java.util.ArrayList;

@Service
public class LetterService {
    private final ScheduleService scheduleService;

    public LetterService(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    ArrayList<String> correctLetters = new ArrayList<String>();

    public ArrayList<String> revelingCorrectLetters(String letter, boolean isCapital) {

        String wordsDay;
        if (!isCapital) {
            wordsDay = scheduleService.getCountryOfTheDay().toUpperCase();
        } else {
            wordsDay = scheduleService.getCapitalOfTheDay().toUpperCase();
        }
        String[] word = wordsDay.split("");
        correctLetters.clear();
        for (String arrayLetter: word) {
            if (arrayLetter.equals(letter)) {
                correctLetters.add(letter);
            } else if (arrayLetter.equals(" ")) {
                correctLetters.add(" ");
            } else if (arrayLetter.equals("-")) {
                correctLetters.add("-");
            } else if (arrayLetter.equals("'")){
                correctLetters.add("'");
            } else if (arrayLetter.equals("´")){
                correctLetters.add("´");
            } else {
                correctLetters.add("*");
            }
        }
        return correctLetters;
    }
}
