package com.example.health.service;

import com.example.health.model.EnrollmentConfirmation;
import com.example.health.repository.EnrollmentConfirmationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class EnrollmentConfirmationService {

    @Autowired
    private EnrollmentConfirmationRepository enrollmentConfirmationRepository;

    public List<EnrollmentConfirmation> getAll() {
        return enrollmentConfirmationRepository.findAll();
    }

    public EnrollmentConfirmation getById(Long id) {
        return enrollmentConfirmationRepository.findById(id).orElse(null);
    }

    public List<EnrollmentConfirmation> findByMedicalRecordId(Long medicalRecordId) {
        return enrollmentConfirmationRepository.findByMedicalRecordId(medicalRecordId);
    }

    public List<EnrollmentConfirmation> findByDeletedFalse() {
        return enrollmentConfirmationRepository.findByDeletedFalse();
    }

    public List<EnrollmentConfirmation> findByMedicalRecordIdAndDeletedFalse(Long medicalRecordId) {
        return enrollmentConfirmationRepository.findByMedicalRecordIdAndDeletedFalse(medicalRecordId);
    }

    public EnrollmentConfirmation findLatestByMedicalRecordId(Long medicalRecordId) {
        return enrollmentConfirmationRepository.findTopByMedicalRecordIdOrderByIssuedAtDesc(medicalRecordId).orElse(null);
    }

    public EnrollmentConfirmation save(EnrollmentConfirmation ec) {
        if (ec == null) {
            throw new RuntimeException("EnrollmentConfirmation payload is required.");
        }


        EnrollmentConfirmation newEc = new EnrollmentConfirmation();
        newEc.setMedicalRecord(ec.getMedicalRecord());
        newEc.setIssuedAt(ec.getIssuedAt());
        newEc.setValidUntil(ec.getValidUntil());
        newEc.setStatus(ec.getStatus());
        newEc.setCreatedAt(LocalDateTime.now());
        newEc.setUpdatedAt(LocalDateTime.now());
        newEc.setDeleted(false);

        return enrollmentConfirmationRepository.save(newEc);
    }

    public EnrollmentConfirmation update(Long id, EnrollmentConfirmation ec) {
        EnrollmentConfirmation existing = enrollmentConfirmationRepository.findById(id).orElse(null);
        if (existing == null) {
            return null;
        }

        if (ec.getIssuedAt() != null) {
            existing.setIssuedAt(ec.getIssuedAt());
        }
        if (ec.getValidUntil() != null) {
            existing.setValidUntil(ec.getValidUntil());
        }
        if (ec.getStatus() != null) {
            existing.setStatus(ec.getStatus());
        }

        existing.setUpdatedAt(LocalDateTime.now());
        return enrollmentConfirmationRepository.save(existing);
    }

    public EnrollmentConfirmation deleted(Long id) {
        EnrollmentConfirmation ec = enrollmentConfirmationRepository.findById(id).orElse(null);
        if (ec == null) {
            return null;
        }
        ec.setDeleted(true);
        ec.setUpdatedAt(LocalDateTime.now());
        return enrollmentConfirmationRepository.save(ec);
    }
}