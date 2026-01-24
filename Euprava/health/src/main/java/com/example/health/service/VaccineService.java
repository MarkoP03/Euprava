package com.example.health.service;

import com.example.health.model.Vaccine;
import com.example.health.repository.VaccineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class VaccineService {

    @Autowired
    private VaccineRepository vaccineRepository;

    public List<Vaccine> getAll() {
        return vaccineRepository.findAll();
    }

    public Vaccine getById(Long id) {
        return vaccineRepository.findById(id).orElse(null);
    }

    public List<Vaccine> findByMedicalRecordId(Long medicalRecordId) {
        return vaccineRepository.findByMedicalRecordId(medicalRecordId);
    }

    public List<Vaccine> findByDeletedFalse() {
        return vaccineRepository.findByDeletedFalse();
    }

    public List<Vaccine> findByMedicalRecordIdAndDeletedFalse(Long medicalRecordId) {
        return vaccineRepository.findByMedicalRecordIdAndDeletedFalse(medicalRecordId);
    }

    public Vaccine save(Vaccine v) {


        Vaccine newV = new Vaccine();
        newV.setMedicalRecord(v.getMedicalRecord());
        newV.setName(v.getName());
        newV.setDate(v.getDate());
        newV.setNote(v.getNote());
        newV.setCreatedAt(LocalDateTime.now());
        newV.setUpdatedAt(LocalDateTime.now());
        newV.setDeleted(false);

        return vaccineRepository.save(newV);
    }

    public Vaccine update(Long id, Vaccine v) {
        Vaccine existing = vaccineRepository.findById(id).orElse(null);
        if (existing == null) {
            return null;
        }

        if (v.getName() != null) {
            existing.setName(v.getName());
        }
        if (v.getDate() != null) {
            existing.setDate(v.getDate());
        }
        if (v.getNote() != null) {
            existing.setNote(v.getNote());
        }

        existing.setUpdatedAt(LocalDateTime.now());
        return vaccineRepository.save(existing);
    }

    public Vaccine deleted(Long id) {
        Vaccine v = vaccineRepository.findById(id).orElse(null);
        if (v == null) {
            return null;
        }
        v.setDeleted(true);
        v.setUpdatedAt(LocalDateTime.now());
        return vaccineRepository.save(v);
    }
}
