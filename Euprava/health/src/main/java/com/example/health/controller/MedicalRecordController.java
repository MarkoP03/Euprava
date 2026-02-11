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
        List<MedicalRecord> medicalRecords = medicalRecordService.findAllActive();

        List<MedicalRecordDto> dtos = new ArrayList<>();
        for (MedicalRecord medicalRecord : medicalRecords) {
            dtos.add(new MedicalRecordDto(medicalRecord));
        }

        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicalRecordDto> getMedicalRecordById(@PathVariable Long id) {
        MedicalRecord medicalRecord = medicalRecordService.findById(id);
        if (medicalRecord == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(new MedicalRecordDto(medicalRecord));
    }

    @GetMapping("/child/{childId}")
    public ResponseEntity<MedicalRecordDto> getMedicalRecordByChildId(@PathVariable Long childId) {
        MedicalRecord medicalRecord = medicalRecordService.findByChildId(childId);
        if (medicalRecord == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(new MedicalRecordDto(medicalRecord));
    }

    @PostMapping
    public ResponseEntity<MedicalRecordDto> createMedicalRecord(@RequestBody MedicalRecordDto dto) {
        MedicalRecord medicalRecord = mapToEntity(dto);
        MedicalRecord saved = medicalRecordService.save(medicalRecord);
        return new ResponseEntity<>(new MedicalRecordDto(saved), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MedicalRecordDto> updateMedicalRecord(
            @PathVariable Long id,
            @RequestBody MedicalRecordDto dto) {

        MedicalRecord updated = mapToEntity(dto);
        MedicalRecord result = medicalRecordService.update(id, updated);

        if (result == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok(new MedicalRecordDto(result));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MedicalRecordDto> deleteMedicalRecord(@PathVariable Long id) {
        MedicalRecord deleted = medicalRecordService.softDelete(id);
        if (deleted == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(new MedicalRecordDto(deleted));
    }

    private MedicalRecord mapToEntity(MedicalRecordDto dto) {
        MedicalRecord medicalRecord = new MedicalRecord();
        medicalRecord.setChildId(dto.getChildId());
        medicalRecord.setChildName(dto.getChildName());
        medicalRecord.setChildSurname(dto.getChildSurname());
        medicalRecord.setParentContact(dto.getParentContact());
        medicalRecord.setLastCheck(dto.getLastCheck());
        medicalRecord.setCanJoinTheCollective(dto.getCanJoinTheCollective());
        return medicalRecord;
    }
}