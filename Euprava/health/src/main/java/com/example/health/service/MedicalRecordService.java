package com.example.health.service;

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

    public List<MedicalRecord> getAll() {
        return medicalRecordRepository.findAll();
    }

    public MedicalRecord getById(Long id) {
        return medicalRecordRepository.findById(id).orElse(null);
    }

    public MedicalRecord findByChildId(Long childId) {
        return medicalRecordRepository.findByChildId(childId).orElse(null);
    }

    public List<MedicalRecord> findByDeletedFalse() {
        return medicalRecordRepository.findByDeletedFalse();
    }

    public MedicalRecord save(MedicalRecord mr) {
        if (mr == null) {
            throw new RuntimeException("MedicalRecord payload is required.");
        }


        MedicalRecord newMr = new MedicalRecord();
        newMr.setChildId(mr.getChildId());
        newMr.setChildName(mr.getChildName());
        newMr.setChildSurname(mr.getChildSurname());
        newMr.setParentContact(mr.getParentContact());
        newMr.setLastCheck(mr.getLastCheck());
        newMr.setCanJoinTheCollective(mr.getCanJoinTheCollective() != null ? mr.getCanJoinTheCollective() : false);
        newMr.setCreatedAt(LocalDateTime.now());
        newMr.setUpdatedAt(LocalDateTime.now());
        newMr.setDeleted(false);

        return medicalRecordRepository.save(newMr);
    }

    public MedicalRecord update(Long id, MedicalRecord mr) {
        MedicalRecord existing = medicalRecordRepository.findById(id).orElse(null);
        if (existing == null) {
            return null;
        }

        if (mr.getChildName() != null) {
            existing.setChildName(mr.getChildName());
        }
        if (mr.getChildSurname() != null) {
            existing.setChildSurname(mr.getChildSurname());
        }
        if (mr.getParentContact() != null) {
            existing.setParentContact(mr.getParentContact());
        }
        if (mr.getLastCheck() != null) {
            existing.setLastCheck(mr.getLastCheck());
        }
        if (mr.getCanJoinTheCollective() != null) {
            existing.setCanJoinTheCollective(mr.getCanJoinTheCollective());
        }

        existing.setUpdatedAt(LocalDateTime.now());
        return medicalRecordRepository.save(existing);
    }

    public MedicalRecord deleted(Long id) {
        MedicalRecord mr = medicalRecordRepository.findById(id).orElse(null);
        if (mr == null) {
            return null;
        }
        mr.setDeleted(true);
        mr.setUpdatedAt(LocalDateTime.now());
        return medicalRecordRepository.save(mr);
    }
}