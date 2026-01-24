package com.example.health.repository;

import com.example.health.enums.ReportStatus;
import com.example.health.model.ReportOfIllness;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReportOfIllnessRepository extends JpaRepository<ReportOfIllness, Long> {

    List<ReportOfIllness> findByMedicalRecordId(Long medicalRecordId);
    List<ReportOfIllness> findByDeletedFalse();
    List<ReportOfIllness> findByMedicalRecordIdAndDeletedFalse(Long medicalRecordId);
    List<ReportOfIllness> findByStatusAndDeletedFalse(ReportStatus status);
    List<ReportOfIllness> findByUrgentTrueAndDeletedFalse();
}
