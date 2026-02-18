package com.example.health.repository;

import com.example.health.model.Allergy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AllergyRepository extends JpaRepository<Allergy, Long> {

    List<Allergy> findByMedicalRecordId(Long medicalRecordId);
    List<Allergy> findByDeletedFalse();
    List<Allergy> findByMedicalRecordIdAndDeletedFalse(Long medicalRecordId);

    @Query("SELECT a.type, COUNT(a) FROM Allergy a WHERE a.deleted = false GROUP BY a.type")
    List<Object[]> countByType();


    @Query("SELECT COUNT(DISTINCT a.medicalRecord.id) FROM Allergy a WHERE a.deleted = false")
    long countDistinctMedicalRecords();

}
