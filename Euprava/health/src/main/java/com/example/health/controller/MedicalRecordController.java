package com.example.health.controller;

import com.example.health.dto.MedicalRecordDto;
import com.example.health.model.MedicalRecord;
import com.example.health.service.MedicalRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/medical-records")
public class MedicalRecordController {

    private final MedicalRecordService medicalRecordService;

    @Autowired
    public MedicalRecordController(MedicalRecordService medicalRecordService) {
        this.medicalRecordService = medicalRecordService;
    }

    @GetMapping
    public ResponseEntity<List<MedicalRecordDto>> getAllMedicalRecords() {
        List<MedicalRecord> medicalRecords = medicalRecordService.findByDeletedFalse();

        List<MedicalRecordDto> dtos = new ArrayList<>();
        for (MedicalRecord mr : medicalRecords) {
            dtos.add(new MedicalRecordDto(mr));
        }

        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicalRecordDto> getMedicalRecordById(@PathVariable Long id) {
        MedicalRecord medicalRecord = medicalRecordService.getById(id);
        if (medicalRecord == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        MedicalRecordDto dto = new MedicalRecordDto(medicalRecord);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @GetMapping("/child/{childId}")
    public ResponseEntity<MedicalRecordDto> getMedicalRecordByChildId(@PathVariable Long childId) {
        MedicalRecord medicalRecord = medicalRecordService.findByChildId(childId);
        if (medicalRecord == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        MedicalRecordDto dto = new MedicalRecordDto(medicalRecord);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<MedicalRecordDto> createMedicalRecord(@RequestBody MedicalRecord medicalRecord) {
        try {
            MedicalRecord created = medicalRecordService.save(medicalRecord);
            MedicalRecordDto dto = new MedicalRecordDto(created);
            return new ResponseEntity<>(dto, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<MedicalRecordDto> updateMedicalRecord(@PathVariable Long id, @RequestBody MedicalRecord medicalRecord) {
        MedicalRecord updated = medicalRecordService.update(id, medicalRecord);
        if (updated == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        MedicalRecordDto dto = new MedicalRecordDto(updated);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @DeleteMapping("/del/{id}")
    public ResponseEntity<MedicalRecordDto> deleteMedicalRecord(@PathVariable Long id) {
        MedicalRecord medicalRecord = medicalRecordService.deleted(id);
        if (medicalRecord == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        MedicalRecordDto dto = new MedicalRecordDto(medicalRecord);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }
}
