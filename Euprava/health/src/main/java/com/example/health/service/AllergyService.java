package com.example.health.service;

import com.example.health.model.Allergy;
import com.example.health.repository.AllergyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AllergyService {

    @Autowired
    private AllergyRepository allergyRepository;

    public List<Allergy> getAll() {
        return allergyRepository.findAll();
    }

    public Allergy getById(Long id) {
        return allergyRepository.findById(id).orElse(null);
    }

    public List<Allergy> findByMedicalRecordId(Long medicalRecordId) {
        return allergyRepository.findByMedicalRecordId(medicalRecordId);
    }

    public List<Allergy> findByDeletedFalse() {
        return allergyRepository.findByDeletedFalse();
    }

    public List<Allergy> findByMedicalRecordIdAndDeletedFalse(Long medicalRecordId) {
        return allergyRepository.findByMedicalRecordIdAndDeletedFalse(medicalRecordId);
    }

    public Allergy save(Allergy a) {

        Allergy newA = new Allergy();
        newA.setMedicalRecord(a.getMedicalRecord());
        newA.setType(a.getType());
        newA.setDescription(a.getDescription());
        newA.setSeverity(a.getSeverity());
        newA.setCreatedAt(LocalDateTime.now());
        newA.setUpdatedAt(LocalDateTime.now());
        newA.setDeleted(false);

        return allergyRepository.save(newA);
    }

    public Allergy update(Long id, Allergy a) {
        Allergy existing = allergyRepository.findById(id).orElse(null);
        if (existing == null) {
            return null;
        }

        if (a.getType() != null) {
            existing.setType(a.getType());
        }
        if (a.getDescription() != null) {
            existing.setDescription(a.getDescription());
        }
        if (a.getSeverity() != null) {
            existing.setSeverity(a.getSeverity());
        }

        existing.setUpdatedAt(LocalDateTime.now());
        return allergyRepository.save(existing);
    }

    public Allergy deleted(Long id) {
        Allergy a = allergyRepository.findById(id).orElse(null);
        if (a == null) {
            return null;
        }
        a.setDeleted(true);
        a.setUpdatedAt(LocalDateTime.now());
        return allergyRepository.save(a);
    }
}
