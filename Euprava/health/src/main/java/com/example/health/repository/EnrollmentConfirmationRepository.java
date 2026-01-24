package com.example.health.repository;

import com.example.health.model.EnrollmentConfirmation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EnrollmentConfirmationRepository extends JpaRepository<EnrollmentConfirmation, Long> {

    List<EnrollmentConfirmation> findByMedicalRecordId(Long medicalRecordId);
    List<EnrollmentConfirmation> findByDeletedFalse();
    List<EnrollmentConfirmation> findByMedicalRecordIdAndDeletedFalse(Long medicalRecordId);
    Optional<EnrollmentConfirmation> findTopByMedicalRecordIdOrderByIssuedAtDesc(Long medicalRecordId);
}
