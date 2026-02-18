package com.example.health.service;

import com.example.health.exception.BadRequestException;
import com.example.health.model.MedicalRecord;
import com.example.health.model.Vaccine;
import com.example.health.repository.MedicalRecordRepository;
import com.example.health.repository.VaccineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
@Service
public class VaccineService {

    @Autowired
    private VaccineRepository vaccineRepository;

    @Autowired
    private MedicalRecordRepository medicalRecordRepository;

    public List<Vaccine> findAllActive() {
        return vaccineRepository.findByDeletedFalse();
    }

    public Vaccine findById(Long id) {
        return vaccineRepository.findById(id).orElse(null);
    }

    public List<Vaccine> findByMedicalRecordIdAndDeletedFalse(Long medicalRecordId) {
        return vaccineRepository
                .findByMedicalRecordIdAndDeletedFalse(medicalRecordId);
    }

    public Vaccine save(Long medicalRecordId, Vaccine vaccine) {
        if (vaccine == null) {
            throw new BadRequestException("Vaccine payload is required");
        }

        MedicalRecord medicalRecord =
                medicalRecordRepository.findById(medicalRecordId).orElse(null);

        if (medicalRecord == null) {
            throw new BadRequestException(
                    "Medical record with id " + medicalRecordId + " not found");
        }

        if (vaccine.getName() == null) {
            throw new BadRequestException("Vaccine name is required");
        }

        vaccine.setId(null);
        vaccine.setMedicalRecord(medicalRecord);
        vaccine.setCreatedAt(LocalDateTime.now());
        vaccine.setUpdatedAt(LocalDateTime.now());
        vaccine.setDeleted(false);

        return vaccineRepository.save(vaccine);
    }

    public Vaccine update(Long id, Long medicalRecordId, Vaccine updated) {
        Vaccine existing = vaccineRepository.findById(id).orElse(null);
        if (existing == null) {
            throw new BadRequestException("Vaccine not found");
        }

        MedicalRecord medicalRecord =
                medicalRecordRepository.findById(medicalRecordId).orElse(null);

        if (medicalRecord == null) {
            throw new BadRequestException(
                    "Medical record with id " + medicalRecordId + " not found");
        }

        existing.setMedicalRecord(medicalRecord);
        existing.setName(updated.getName());
        existing.setDate(updated.getDate());
        existing.setNote(updated.getNote());
        existing.setUpdatedAt(LocalDateTime.now());

        return vaccineRepository.save(existing);
    }

    public Vaccine softDelete(Long id) {
        Vaccine vaccine = vaccineRepository.findById(id).orElse(null);
        if (vaccine == null) {
            throw new BadRequestException("Vaccine not found");
        }

        vaccine.setDeleted(true);
        vaccine.setUpdatedAt(LocalDateTime.now());
        return vaccineRepository.save(vaccine);
    }
}

