package com.example.health.service;

import com.example.health.exception.BadRequestException;
import com.example.health.model.Allergy;
import com.example.health.model.MedicalRecord;
import com.example.health.repository.AllergyRepository;
import com.example.health.repository.MedicalRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AllergyService {

    @Autowired
    private AllergyRepository allergyRepository;

    @Autowired
    private MedicalRecordRepository medicalRecordRepository;

    public List<Allergy> findAllActive() {
        return allergyRepository.findByDeletedFalse();
    }

    public Allergy findById(Long id) {
        return allergyRepository.findById(id).orElse(null);
    }

    public List<Allergy> findByMedicalRecordIdAndDeletedFalse(Long medicalRecordId) {
        return allergyRepository.findByMedicalRecordIdAndDeletedFalse(medicalRecordId);
    }
    public List<Allergy> findByChildId(Long childId) {
        MedicalRecord medicalRecord = medicalRecordRepository.findByChildId(childId).orElse(null);

        if (medicalRecord == null) {
            return List.of();
        }

        return allergyRepository.findByMedicalRecordIdAndDeletedFalse(medicalRecord.getId());
    }

    public Allergy save(Long medicalRecordId, Allergy allergy) {
        if (allergy == null) {
            throw new BadRequestException("Allergy payload is required");
        }

        MedicalRecord medicalRecord = medicalRecordRepository.findById(medicalRecordId).orElse(null);
        if (medicalRecord == null) {
            throw new BadRequestException("Medical record with id " + medicalRecordId + " not found");
        }

        if (allergy.getType() == null) {
            throw new BadRequestException("Allergy type is required");
        }

        allergy.setId(null);
        allergy.setMedicalRecord(medicalRecord);
        allergy.setCreatedAt(LocalDateTime.now());
        allergy.setUpdatedAt(LocalDateTime.now());
        allergy.setDeleted(false);

        return allergyRepository.save(allergy);
    }

    public Allergy update(Long id, Long medicalRecordId, Allergy updated) {
        Allergy existing = allergyRepository.findById(id).orElse(null);
        if (existing == null) {
            throw new BadRequestException("Allergy not found");
        }

        MedicalRecord medicalRecord = medicalRecordRepository.findById(medicalRecordId).orElse(null);
        if (medicalRecord == null) {
            throw new BadRequestException("Medical record with id " + medicalRecordId + " not found");
        }

        existing.setMedicalRecord(medicalRecord);
        existing.setType(updated.getType());
        existing.setDescription(updated.getDescription());
        existing.setSeverity(updated.getSeverity());
        existing.setUpdatedAt(LocalDateTime.now());

        return allergyRepository.save(existing);
    }

    public Allergy softDelete(Long id) {
        Allergy allergy = allergyRepository.findById(id).orElse(null);
        if (allergy == null) {
            throw new BadRequestException("Allergy not found");
        }

        allergy.setDeleted(true);
        allergy.setUpdatedAt(LocalDateTime.now());
        return allergyRepository.save(allergy);
    }
}