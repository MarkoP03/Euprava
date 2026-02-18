package com.example.health.service;

import com.example.health.exception.BadRequestException;
import com.example.health.model.MedicalRecord;
import com.example.health.repository.MedicalRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MedicalRecordService {

    @Autowired
    private MedicalRecordRepository medicalRecordRepository;

    public List<MedicalRecord> findAllActive() {
        return medicalRecordRepository.findByDeletedFalse();
    }

    public MedicalRecord findById(Long id) {
        return medicalRecordRepository.findById(id).orElse(null);
    }

    public MedicalRecord findByChildId(Long childId) {
        return medicalRecordRepository.findByChildId(childId).orElse(null);
    }

    public MedicalRecord save(MedicalRecord medicalRecord) {
        if (medicalRecord == null || medicalRecord.getChildId() == null) {
            throw new BadRequestException("Child ID is required");
        }

        if (medicalRecordRepository.findByChildId(medicalRecord.getChildId()).isPresent()) {
            throw new BadRequestException("Medical record for child with id " + medicalRecord.getChildId() + " already exists");
        }

        medicalRecord.setId(null);
        medicalRecord.setCanJoinTheCollective(medicalRecord.getCanJoinTheCollective() != null ? medicalRecord.getCanJoinTheCollective() : false);
        medicalRecord.setCreatedAt(LocalDateTime.now());
        medicalRecord.setUpdatedAt(LocalDateTime.now());
        medicalRecord.setDeleted(false);

        return medicalRecordRepository.save(medicalRecord);
    }

    public MedicalRecord update(Long id, MedicalRecord updated) {
        MedicalRecord existing = medicalRecordRepository.findById(id).orElse(null);
        if (existing == null) {
            throw new BadRequestException("Medical record not found");
        }

        existing.setChildName(updated.getChildName());
        existing.setChildSurname(updated.getChildSurname());
        existing.setParentContact(updated.getParentContact());
        existing.setLastCheck(updated.getLastCheck());
        existing.setCanJoinTheCollective(updated.getCanJoinTheCollective());
        existing.setUpdatedAt(LocalDateTime.now());

        return medicalRecordRepository.save(existing);
    }

    public MedicalRecord softDelete(Long id) {
        MedicalRecord medicalRecord = medicalRecordRepository.findById(id).orElse(null);
        if (medicalRecord == null) {
            throw new BadRequestException("Medical record not found");
        }

        medicalRecord.setDeleted(true);
        medicalRecord.setUpdatedAt(LocalDateTime.now());
        return medicalRecordRepository.save(medicalRecord);
    }
}