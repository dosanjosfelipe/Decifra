package me.game.decifra.controller;

import me.game.decifra.DTO.LetterDTO;
import me.game.decifra.service.LetterService;
import me.game.decifra.service.ScheduleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.ArrayList;
import java.util.Map;

@RestController
@RequestMapping("/letter")
public class LetterController {

    private final LetterService letterService;
    private final ScheduleService scheduleService;

    public LetterController(LetterService letterService, ScheduleService scheduleService) {
        this.letterService = letterService;
        this.scheduleService = scheduleService;
    }

    @PostMapping
    public ResponseEntity<?> sendLetterPosition(@RequestBody LetterDTO dto) {

        String wordsDay;
        if (!dto.isCapital()) {
            wordsDay = scheduleService.getCountryOfTheDay().toUpperCase();
        } else {
            wordsDay = scheduleService.getCapitalOfTheDay().toUpperCase();
        }
        String[] word = wordsDay.toUpperCase().split("");

        for (String arrayLetter : word) {
            if (arrayLetter.equals(dto.letter())) {
                ArrayList<String> newCorrectArray = letterService.revelingCorrectLetters(dto.letter(), dto.isCapital());
                return ResponseEntity.status(HttpStatus.OK).body(Map.of(
                        "exist", true,
                        "newCorrectArray", newCorrectArray
                ));
            }
        }

        return ResponseEntity.status(HttpStatus.OK).body(Map.of(
                "exist", false
        ));
    }
}
