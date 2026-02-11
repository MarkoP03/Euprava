package com.example.health.service;

import com.example.health.exception.BadRequestException;
import com.example.health.model.EnrollmentConfirmation;
import com.example.health.model.MedicalRecord;
import com.example.health.repository.EnrollmentConfirmationRepository;
import com.example.health.repository.MedicalRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class EnrollmentConfirmationService {

    @Autowired
    private EnrollmentConfirmationRepository enrollmentConfirmationRepository;

    @Autowired
    private MedicalRecordRepository medicalRecordRepository;

    public List<EnrollmentConfirmation> findAllActive() {
        return enrollmentConfirmationRepository.findByDeletedFalse();
    }

    public EnrollmentConfirmation findById(Long id) {
        return enrollmentConfirmationRepository.findById(id).orElse(null);
    }

    public List<EnrollmentConfirmation> findByMedicalRecordIdAndDeletedFalse(Long medicalRecordId) {
        return enrollmentConfirmationRepository.findByMedicalRecordIdAndDeletedFalse(medicalRecordId);
    }

    public EnrollmentConfirmation findLatestByMedicalRecordId(Long medicalRecordId) {
        return enrollmentConfirmationRepository.findTopByMedicalRecordIdOrderByIssuedAtDesc(medicalRecordId).orElse(null);
    }

    public EnrollmentConfirmation save(Long medicalRecordId, EnrollmentConfirmation confirmation) {
        if (confirmation == null) {
            throw new BadRequestException("Enrollment confirmation payload is required");
        }

        MedicalRecord medicalRecord = medicalRecordRepository.findById(medicalRecordId).orElse(null);
        if (medicalRecord == null) {
            throw new BadRequestException("Medical record with id " + medicalRecordId + " not found");
        }

        if (confirmation.getIssuedAt() == null) {
            throw new BadRequestException("Issued date is required");
        }

        if (confirmation.getValidUntil() == null) {
            throw new BadRequestException("Valid until date is required");
        }

        confirmation.setId(null);
        confirmation.setMedicalRecord(medicalRecord);
        confirmation.setCreatedAt(LocalDateTime.now());
        confirmation.setUpdatedAt(LocalDateTime.now());
        confirmation.setDeleted(false);

        return enrollmentConfirmationRepository.save(confirmation);
    }

    public EnrollmentConfirmation update(Long id, Long medicalRecordId, EnrollmentConfirmation updated) {
        EnrollmentConfirmation existing = enrollmentConfirmationRepository.findById(id).orElse(null);
        if (existing == null) {
            throw new BadRequestException("Enrollment confirmation not found");
        }

        MedicalRecord medicalRecord = medicalRecordRepository.findById(medicalRecordId).orElse(null);
        if (medicalRecord == null) {
            throw new BadRequestException("Medical record with id " + medicalRecordId + " not found");
        }

        existing.setMedicalRecord(medicalRecord);
        existing.setIssuedAt(updated.getIssuedAt());
        existing.setValidUntil(updated.getValidUntil());
        existing.setStatus(updated.getStatus());
        existing.setUpdatedAt(LocalDateTime.now());

        return enrollmentConfirmationRepository.save(existing);
    }

    public EnrollmentConfirmation softDelete(Long id) {
        EnrollmentConfirmation confirmation = enrollmentConfirmationRepository.findById(id).orElse(null);
        if (confirmation == null) {
            throw new BadRequestException("Enrollment confirmation not found");
        }

        confirmation.setDeleted(true);
        confirmation.setUpdatedAt(LocalDateTime.now());
        return enrollmentConfirmationRepository.save(confirmation);
    }
}