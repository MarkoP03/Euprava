package com.example.health.repository;

import com.example.health.enums.ReportStatus;
import com.example.health.model.ReportOfIllness;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReportOfIllnessRepository extends JpaRepository<ReportOfIllness, Long> {

    List<ReportOfIllness> findByMedicalRecordId(Long medicalRecordId);
    List<ReportOfIllness> findByDeletedFalse();
    List<ReportOfIllness> findByMedicalRecordIdAndDeletedFalse(Long medicalRecordId);
    List<ReportOfIllness> findByStatusAndDeletedFalse(ReportStatus status);
    List<ReportOfIllness> findByUrgentTrueAndDeletedFalse();

    @Query("SELECT MONTH(r.createdAt), COUNT(r) FROM ReportOfIllness r WHERE r.urgent = true AND YEAR(r.createdAt) = :year GROUP BY MONTH(r.createdAt)")
    List<Object[]> countUrgentByMonth(@Param("year") int year);
}
