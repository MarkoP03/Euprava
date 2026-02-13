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
        List<Vaccine> vaccines = vaccineService.findAllActive();

        List<VaccineDto> dtos = new ArrayList<>();
        for (Vaccine v : vaccines) {
            dtos.add(new VaccineDto(v));
        }

        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<VaccineDto> getVaccineById(@PathVariable Long id) {
        Vaccine vaccine = vaccineService.findById(id);
        if (vaccine == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(new VaccineDto(vaccine));
    }

    @GetMapping("/medical-record/{medicalRecordId}")
    public ResponseEntity<List<VaccineDto>> getVaccinesByMedicalRecordId(
            @PathVariable Long medicalRecordId) {

        List<Vaccine> vaccines =
                vaccineService.findByMedicalRecordIdAndDeletedFalse(medicalRecordId);

        List<VaccineDto> dtos = new ArrayList<>();
        for (Vaccine v : vaccines) {
            dtos.add(new VaccineDto(v));
        }

        return ResponseEntity.ok(dtos);
    }

    @PostMapping
    public ResponseEntity<VaccineDto> createVaccine(@RequestBody VaccineDto dto) {
        Vaccine vaccine = new Vaccine();
        vaccine.setName(dto.getName());
        vaccine.setDate(dto.getDate());
        vaccine.setNote(dto.getNote());

        Vaccine saved = vaccineService.save(dto.getMedicalRecordId(), vaccine);
        return new ResponseEntity<>(new VaccineDto(saved), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<VaccineDto> updateVaccine(
            @PathVariable Long id,
            @RequestBody VaccineDto dto) {

        Vaccine updated = new Vaccine();
        updated.setName(dto.getName());
        updated.setDate(dto.getDate());
        updated.setNote(dto.getNote());

        Vaccine result =
                vaccineService.update(id, dto.getMedicalRecordId(), updated);

        return ResponseEntity.ok(new VaccineDto(result));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<VaccineDto> deleteVaccine(@PathVariable Long id) {
        Vaccine deleted = vaccineService.softDelete(id);
        return ResponseEntity.ok(new VaccineDto(deleted));
    }
}
