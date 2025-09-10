package me.game.decifra.utils;

import java.text.Normalizer;
import java.util.regex.Pattern;

public class AccentRemover {

    public static String removeAccent(String word) {
        String normalized = Normalizer.normalize(word, Normalizer.Form.NFD);

        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        return pattern.matcher(normalized).replaceAll("");
    }
}
