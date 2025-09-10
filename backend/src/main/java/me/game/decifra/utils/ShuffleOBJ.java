package me.game.decifra.utils;

import me.game.decifra.DTO.ApiDTO.CapitalDTO;

import java.security.SecureRandom;
import java.util.Collections;
import java.util.List;

public class ShuffleOBJ {

    public static <E> int OBJShuffle(List<E> obj) {
        Collections.shuffle(obj);
        SecureRandom random = new SecureRandom();
        return random.nextInt(obj.size());
    }
}
