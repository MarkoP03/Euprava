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
        List<EnrollmentConfirmation> confirmations = enrollmentConfirmationService.findByDeletedFalse();

        List<EnrollmentConfirmationDto> dtos = new ArrayList<>();
        for (EnrollmentConfirmation ec : confirmations) {
            dtos.add(new EnrollmentConfirmationDto(ec));
        }

        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EnrollmentConfirmationDto> getEnrollmentConfirmationById(@PathVariable Long id) {
        EnrollmentConfirmation confirmation = enrollmentConfirmationService.getById(id);
        if (confirmation == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        EnrollmentConfirmationDto dto = new EnrollmentConfirmationDto(confirmation);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @GetMapping("/medical-record/{medicalRecordId}")
    public ResponseEntity<List<EnrollmentConfirmationDto>> getConfirmationsByMedicalRecordId(@PathVariable Long medicalRecordId) {
        List<EnrollmentConfirmation> confirmations = enrollmentConfirmationService.findByMedicalRecordIdAndDeletedFalse(medicalRecordId);

        List<EnrollmentConfirmationDto> dtos = new ArrayList<>();
        for (EnrollmentConfirmation ec : confirmations) {
            dtos.add(new EnrollmentConfirmationDto(ec));
        }

        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @GetMapping("/medical-record/{medicalRecordId}/latest")
    public ResponseEntity<EnrollmentConfirmationDto> getLatestConfirmation(@PathVariable Long medicalRecordId) {
        EnrollmentConfirmation confirmation = enrollmentConfirmationService.findLatestByMedicalRecordId(medicalRecordId);
        if (confirmation == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        EnrollmentConfirmationDto dto = new EnrollmentConfirmationDto(confirmation);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<EnrollmentConfirmationDto> createEnrollmentConfirmation(@RequestBody EnrollmentConfirmation confirmation) {
        try {
            EnrollmentConfirmation created = enrollmentConfirmationService.save(confirmation);
            EnrollmentConfirmationDto dto = new EnrollmentConfirmationDto(created);
            return new ResponseEntity<>(dto, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<EnrollmentConfirmationDto> updateEnrollmentConfirmation(@PathVariable Long id, @RequestBody EnrollmentConfirmation confirmation) {
        EnrollmentConfirmation updated = enrollmentConfirmationService.update(id, confirmation);
        if (updated == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        EnrollmentConfirmationDto dto = new EnrollmentConfirmationDto(updated);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @DeleteMapping("/del/{id}")
    public ResponseEntity<EnrollmentConfirmationDto> deleteEnrollmentConfirmation(@PathVariable Long id) {
        EnrollmentConfirmation confirmation = enrollmentConfirmationService.deleted(id);
        if (confirmation == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        EnrollmentConfirmationDto dto = new EnrollmentConfirmationDto(confirmation);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }
}
