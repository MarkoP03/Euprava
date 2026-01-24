package com.example.health.repository;

import com.example.health.model.MedicalRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MedicalRecordRepository extends JpaRepository<MedicalRecord, Long> {

    Optional<MedicalRecord> findByChildId(Long childId);
    boolean existsByChildId(Long childId);
    List<MedicalRecord> findByDeletedFalse();
}
