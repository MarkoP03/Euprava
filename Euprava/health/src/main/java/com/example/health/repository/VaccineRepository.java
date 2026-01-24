package com.example.health.repository;

import com.example.health.model.Vaccine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VaccineRepository extends JpaRepository<Vaccine, Long> {

    List<Vaccine> findByMedicalRecordId(Long medicalRecordId);
    List<Vaccine> findByDeletedFalse();
    List<Vaccine> findByMedicalRecordIdAndDeletedFalse(Long medicalRecordId);
}