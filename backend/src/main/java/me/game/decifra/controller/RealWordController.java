package me.game.decifra.controller;

import me.game.decifra.service.ScheduleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/realWord")
public class RealWordController {

    private final ScheduleService scheduleService;

    public RealWordController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    @GetMapping
    public ResponseEntity<?> SendWord() {

        String word = scheduleService.getCountryOfTheDay();

        return ResponseEntity.status(HttpStatus.OK).body(Map.of(
                "word", word
        ));
    }
}
