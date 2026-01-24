package com.example.health.repository;

import com.example.health.model.Allergy;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AllergyRepository extends JpaRepository<Allergy, Long> {

    List<Allergy> findByMedicalRecordId(Long medicalRecordId);
    List<Allergy> findByDeletedFalse();
    List<Allergy> findByMedicalRecordIdAndDeletedFalse(Long medicalRecordId);
}
