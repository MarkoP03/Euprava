package com.example.health.repository;

import com.example.health.model.Vaccine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VaccineRepository extends JpaRepository<Vaccine, Long> {

    List<Vaccine> findByMedicalRecordId(Long medicalRecordId);
    List<Vaccine> findByDeletedFalse();
    List<Vaccine> findByMedicalRecordIdAndDeletedFalse(Long medicalRecordId);
    boolean existsByMedicalRecordIdAndDeletedFalse(Long medicalRecordId);

    @Query("SELECT MONTH(v.date), COUNT(v) FROM Vaccine v WHERE YEAR(v.date) = :year GROUP BY MONTH(v.date)")
    List<Object[]> countByMonth(@Param("year") int year);
}