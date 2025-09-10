package me.game.decifra.controller;

import me.game.decifra.DTO.VerifyWordDTO;
import me.game.decifra.service.ScheduleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/verifyWord")
public class VerifyWordController {

    private final ScheduleService scheduleService;

    public VerifyWordController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    @PostMapping
    public ResponseEntity<?> verifyIfHasNewWord(@RequestBody VerifyWordDTO dto) {

        String daysWord;
        if (!dto.isCapital()) {
            daysWord = scheduleService.getCountryOfTheDay().toUpperCase();
        } else {
            daysWord = scheduleService.getCapitalOfTheDay().toUpperCase();
        }


        if (!daysWord.equals(dto.oldWord().toUpperCase())) {
            return ResponseEntity.status(HttpStatus.OK).body(Map.of(
                    "hasNewWord", true

            ));
        }

        return ResponseEntity.status(HttpStatus.OK).body(Map.of(
                "hasNewWord", false

        ));
    }
}
