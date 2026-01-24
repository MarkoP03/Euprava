package com.example.health.controller;

import com.example.health.dto.AllergyDto;
import com.example.health.model.Allergy;
import com.example.health.service.AllergyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/allergies")
public class AllergyController {

    private final AllergyService allergyService;

    @Autowired
    public AllergyController(AllergyService allergyService) {
        this.allergyService = allergyService;
    }

    @GetMapping
    public ResponseEntity<List<AllergyDto>> getAllAllergies() {
        List<Allergy> allergies = allergyService.findByDeletedFalse();

        List<AllergyDto> dtos = new ArrayList<>();
        for (Allergy a : allergies) {
            dtos.add(new AllergyDto(a));
        }

        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AllergyDto> getAllergyById(@PathVariable Long id) {
        Allergy allergy = allergyService.getById(id);
        if (allergy == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        AllergyDto dto = new AllergyDto(allergy);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @GetMapping("/medical-record/{medicalRecordId}")
    public ResponseEntity<List<AllergyDto>> getAllergiesByMedicalRecordId(@PathVariable Long medicalRecordId) {
        List<Allergy> allergies = allergyService.findByMedicalRecordIdAndDeletedFalse(medicalRecordId);

        List<AllergyDto> dtos = new ArrayList<>();
        for (Allergy a : allergies) {
            dtos.add(new AllergyDto(a));
        }

        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<AllergyDto> createAllergy(@RequestBody Allergy allergy) {
        try {
            Allergy created = allergyService.save(allergy);
            AllergyDto dto = new AllergyDto(created);
            return new ResponseEntity<>(dto, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<AllergyDto> updateAllergy(@PathVariable Long id, @RequestBody Allergy allergy) {
        Allergy updated = allergyService.update(id, allergy);
        if (updated == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        AllergyDto dto = new AllergyDto(updated);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @DeleteMapping("/del/{id}")
    public ResponseEntity<AllergyDto> deleteAllergy(@PathVariable Long id) {
        Allergy allergy = allergyService.deleted(id);
        if (allergy == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        AllergyDto dto = new AllergyDto(allergy);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }
}
