package me.game.decifra.service;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class LetterServiceTest {

    @Test
    void revelingCorrectLetters() {
        ArrayList<String> word = new ArrayList<String>(List.of("C", "A", "N", "A", "D", "A"));
        ArrayList<String> correctLetters = new ArrayList<String>();
        String letter = "A";
        for (String arrayLetter: word) {
            if (arrayLetter.equals(letter)) {
                correctLetters.add(letter);
            } else {
                correctLetters.add("*");
            }
        }
        ArrayList<String> expected = new ArrayList<>(Arrays.asList("*", "A", "*", "A", "*", "A"));
        assertEquals(expected, correctLetters);
    }
}