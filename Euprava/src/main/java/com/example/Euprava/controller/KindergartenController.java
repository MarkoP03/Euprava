package com.example.Euprava.controller;

import com.example.Euprava.dto.KindergartenDto;
import com.example.Euprava.model.Kindergarten;
import com.example.Euprava.model.User;
import com.example.Euprava.service.KindergartenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/kindergartens")
public class KindergartenController {

    private final KindergartenService kindergartenService;

    @Autowired
    public KindergartenController(KindergartenService kindergartenService) {
        this.kindergartenService = kindergartenService;
    }


    @GetMapping
    public ResponseEntity<List<KindergartenDto>> getAllKindergartens() {
        List<Kindergarten> kindergartens = kindergartenService.findByDeletedFalse();

        List<KindergartenDto> dtos = new ArrayList<>();
        for (Kindergarten k : kindergartens) {
            dtos.add(new KindergartenDto(k));
        }

        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @DeleteMapping("/del/{kindergartenId}")
    public ResponseEntity<KindergartenDto> deleteKindergarten(@PathVariable Long kindergartenId) {
        Kindergarten kindergarten = kindergartenService.deleted(kindergartenId);
        if (kindergarten == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        KindergartenDto kindergartenDto = new KindergartenDto(kindergarten);
        return new ResponseEntity<>(kindergartenDto, HttpStatus.OK);
    }
}
