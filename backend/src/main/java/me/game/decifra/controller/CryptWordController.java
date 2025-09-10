package me.game.decifra.controller;

import me.game.decifra.DTO.CryptWordDTO;
import me.game.decifra.service.CryptWordService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Map;

@RestController
@RequestMapping("/cryptWord")
public class CryptWordController {

    private final CryptWordService cryptWordService;

    public CryptWordController(CryptWordService cryptWordService) {
        this.cryptWordService = cryptWordService;
    }

    @PostMapping
    public ResponseEntity<?> sendWordOfDay(@RequestBody CryptWordDTO dto) {

        ArrayList<String> cryptWord = cryptWordService.generateCryptWord(dto.isCapital());

        return ResponseEntity.status(HttpStatus.OK).body(Map.of(
                "cryptWord", cryptWord
        ));
    }
}
