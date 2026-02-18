package com.example.health.repository;

import com.example.health.model.DoctorReport;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DoctorReportRepository extends JpaRepository<DoctorReport, Long> {

    List<DoctorReport> findByMedicalRecordId(Long medicalRecordId);
    List<DoctorReport> findByDeletedFalse();
    List<DoctorReport> findByMedicalRecordIdAndDeletedFalse(Long medicalRecordId);
    boolean existsByMedicalRecordIdAndDeletedFalse(Long medicalRecordId);
}