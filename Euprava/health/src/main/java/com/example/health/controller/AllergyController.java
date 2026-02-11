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
        List<Allergy> allergies = allergyService.findAllActive();

        List<AllergyDto> dtos = new ArrayList<>();
        for (Allergy allergy : allergies) {
            dtos.add(new AllergyDto(allergy));
        }

        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AllergyDto> getAllergyById(@PathVariable Long id) {
        Allergy allergy = allergyService.findById(id);
        if (allergy == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(new AllergyDto(allergy));
    }

    @GetMapping("/medical-record/{medicalRecordId}")
    public ResponseEntity<List<AllergyDto>> getAllergiesByMedicalRecordId(@PathVariable Long medicalRecordId) {
        List<Allergy> allergies = allergyService.findByMedicalRecordIdAndDeletedFalse(medicalRecordId);

        List<AllergyDto> dtos = new ArrayList<>();
        for (Allergy allergy : allergies) {
            dtos.add(new AllergyDto(allergy));
        }

        return ResponseEntity.ok(dtos);
    }

    @PostMapping
    public ResponseEntity<AllergyDto> createAllergy(@RequestBody AllergyDto dto) {
        Allergy allergy = new Allergy();
        allergy.setType(dto.getType());
        allergy.setDescription(dto.getDescription());
        allergy.setSeverity(dto.getSeverity());

        Allergy saved = allergyService.save(dto.getMedicalRecordId(), allergy);
        return new ResponseEntity<>(new AllergyDto(saved), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AllergyDto> updateAllergy(
            @PathVariable Long id,
            @RequestBody AllergyDto dto) {

        Allergy updated = new Allergy();
        updated.setType(dto.getType());
        updated.setDescription(dto.getDescription());
        updated.setSeverity(dto.getSeverity());

        Allergy result = allergyService.update(id, dto.getMedicalRecordId(), updated);

        if (result == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok(new AllergyDto(result));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<AllergyDto> deleteAllergy(@PathVariable Long id) {
        Allergy deleted = allergyService.softDelete(id);
        if (deleted == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(new AllergyDto(deleted));
    }
}