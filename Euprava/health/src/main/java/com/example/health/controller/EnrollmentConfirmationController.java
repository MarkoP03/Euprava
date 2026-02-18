package com.example.health.controller;

import com.example.health.dto.EnrollmentConfirmationDto;
import com.example.health.model.EnrollmentConfirmation;
import com.example.health.service.EnrollmentConfirmationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/enrollment-confirmations")
public class EnrollmentConfirmationController {

    private final EnrollmentConfirmationService enrollmentConfirmationService;

    @Autowired
    public EnrollmentConfirmationController(EnrollmentConfirmationService enrollmentConfirmationService) {
        this.enrollmentConfirmationService = enrollmentConfirmationService;
    }

    @GetMapping
    public ResponseEntity<List<EnrollmentConfirmationDto>> getAllEnrollmentConfirmations() {
        List<EnrollmentConfirmation> confirmations = enrollmentConfirmationService.findAllActive();

        List<EnrollmentConfirmationDto> dtos = new ArrayList<>();
        for (EnrollmentConfirmation confirmation : confirmations) {
            dtos.add(new EnrollmentConfirmationDto(confirmation));
        }

        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EnrollmentConfirmationDto> getEnrollmentConfirmationById(@PathVariable Long id) {
        EnrollmentConfirmation confirmation = enrollmentConfirmationService.findById(id);
        if (confirmation == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(new EnrollmentConfirmationDto(confirmation));
    }

    @GetMapping("/medical-record/{medicalRecordId}")
    public ResponseEntity<List<EnrollmentConfirmationDto>> getConfirmationsByMedicalRecordId(@PathVariable Long medicalRecordId) {
        List<EnrollmentConfirmation> confirmations = enrollmentConfirmationService.findByMedicalRecordIdAndDeletedFalse(medicalRecordId);

        List<EnrollmentConfirmationDto> dtos = new ArrayList<>();
        for (EnrollmentConfirmation confirmation : confirmations) {
            dtos.add(new EnrollmentConfirmationDto(confirmation));
        }

        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/medical-record/{medicalRecordId}/latest")
    public ResponseEntity<EnrollmentConfirmationDto> getLatestConfirmation(@PathVariable Long medicalRecordId) {
        EnrollmentConfirmation confirmation = enrollmentConfirmationService.findLatestByMedicalRecordId(medicalRecordId);
        if (confirmation == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(new EnrollmentConfirmationDto(confirmation));
    }

    @PostMapping
    public ResponseEntity<EnrollmentConfirmationDto> createEnrollmentConfirmation(@RequestBody EnrollmentConfirmationDto dto) {
        EnrollmentConfirmation confirmation = new EnrollmentConfirmation();
        confirmation.setIssuedAt(dto.getIssuedAt());
        confirmation.setValidUntil(dto.getValidUntil());
        confirmation.setStatus(dto.getStatus());

        EnrollmentConfirmation saved = enrollmentConfirmationService.save(dto.getMedicalRecordId(), confirmation);
        return new ResponseEntity<>(new EnrollmentConfirmationDto(saved), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EnrollmentConfirmationDto> updateEnrollmentConfirmation(
            @PathVariable Long id,
            @RequestBody EnrollmentConfirmationDto dto) {

        EnrollmentConfirmation updated = new EnrollmentConfirmation();
        updated.setIssuedAt(dto.getIssuedAt());
        updated.setValidUntil(dto.getValidUntil());
        updated.setStatus(dto.getStatus());

        EnrollmentConfirmation result = enrollmentConfirmationService.update(id, dto.getMedicalRecordId(), updated);

        if (result == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok(new EnrollmentConfirmationDto(result));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<EnrollmentConfirmationDto> deleteEnrollmentConfirmation(@PathVariable Long id) {
        EnrollmentConfirmation deleted = enrollmentConfirmationService.softDelete(id);
        if (deleted == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(new EnrollmentConfirmationDto(deleted));
    }
}