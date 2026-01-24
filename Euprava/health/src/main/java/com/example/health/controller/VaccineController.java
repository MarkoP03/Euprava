package com.example.health.controller;

import com.example.health.dto.VaccineDto;
import com.example.health.model.Vaccine;
import com.example.health.service.VaccineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/vaccines")
public class VaccineController {

    private final VaccineService vaccineService;

    @Autowired
    public VaccineController(VaccineService vaccineService) {
        this.vaccineService = vaccineService;
    }

    @GetMapping
    public ResponseEntity<List<VaccineDto>> getAllVaccines() {
        List<Vaccine> vaccines = vaccineService.findByDeletedFalse();

        List<VaccineDto> dtos = new ArrayList<>();
        for (Vaccine v : vaccines) {
            dtos.add(new VaccineDto(v));
        }

        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<VaccineDto> getVaccineById(@PathVariable Long id) {
        Vaccine vaccine = vaccineService.getById(id);
        if (vaccine == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        VaccineDto dto = new VaccineDto(vaccine);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @GetMapping("/medical-record/{medicalRecordId}")
    public ResponseEntity<List<VaccineDto>> getVaccinesByMedicalRecordId(@PathVariable Long medicalRecordId) {
        List<Vaccine> vaccines = vaccineService.findByMedicalRecordIdAndDeletedFalse(medicalRecordId);

        List<VaccineDto> dtos = new ArrayList<>();
        for (Vaccine v : vaccines) {
            dtos.add(new VaccineDto(v));
        }

        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<VaccineDto> createVaccine(@RequestBody Vaccine vaccine) {
        try {
            Vaccine created = vaccineService.save(vaccine);
            VaccineDto dto = new VaccineDto(created);
            return new ResponseEntity<>(dto, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<VaccineDto> updateVaccine(@PathVariable Long id, @RequestBody Vaccine vaccine) {
        Vaccine updated = vaccineService.update(id, vaccine);
        if (updated == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        VaccineDto dto = new VaccineDto(updated);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @DeleteMapping("/del/{id}")
    public ResponseEntity<VaccineDto> deleteVaccine(@PathVariable Long id) {
        Vaccine vaccine = vaccineService.deleted(id);
        if (vaccine == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        VaccineDto dto = new VaccineDto(vaccine);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }
}
