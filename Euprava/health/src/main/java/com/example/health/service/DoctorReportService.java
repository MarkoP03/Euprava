package com.example.health.service;

import com.example.health.model.DoctorReport;
import com.example.health.repository.DoctorReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class DoctorReportService {

    @Autowired
    private DoctorReportRepository doctorReportRepository;

    public List<DoctorReport> getAll() {
        return doctorReportRepository.findAll();
    }

    public DoctorReport getById(Long id) {
        return doctorReportRepository.findById(id).orElse(null);
    }

    public List<DoctorReport> findByMedicalRecordId(Long medicalRecordId) {
        return doctorReportRepository.findByMedicalRecordId(medicalRecordId);
    }

    public List<DoctorReport> findByDeletedFalse() {
        return doctorReportRepository.findByDeletedFalse();
    }

    public List<DoctorReport> findByMedicalRecordIdAndDeletedFalse(Long medicalRecordId) {
        return doctorReportRepository.findByMedicalRecordIdAndDeletedFalse(medicalRecordId);
    }

    public DoctorReport save(DoctorReport dr) {

        DoctorReport newDr = new DoctorReport();
        newDr.setMedicalRecord(dr.getMedicalRecord());
        newDr.setDate(dr.getDate());
        newDr.setDiagnosis(dr.getDiagnosis());
        newDr.setRecommendation(dr.getRecommendation());
        newDr.setCreatedAt(LocalDateTime.now());
        newDr.setUpdatedAt(LocalDateTime.now());
        newDr.setDeleted(false);

        return doctorReportRepository.save(newDr);
    }

    public DoctorReport update(Long id, DoctorReport dr) {
        DoctorReport existing = doctorReportRepository.findById(id).orElse(null);
        if (existing == null) {
            return null;
        }

        if (dr.getDate() != null) {
            existing.setDate(dr.getDate());
        }
        if (dr.getDiagnosis() != null) {
            existing.setDiagnosis(dr.getDiagnosis());
        }
        if (dr.getRecommendation() != null) {
            existing.setRecommendation(dr.getRecommendation());
        }

        existing.setUpdatedAt(LocalDateTime.now());
        return doctorReportRepository.save(existing);
    }

    public DoctorReport deleted(Long id) {
        DoctorReport dr = doctorReportRepository.findById(id).orElse(null);
        if (dr == null) {
            return null;
        }
        dr.setDeleted(true);
        dr.setUpdatedAt(LocalDateTime.now());
        return doctorReportRepository.save(dr);
    }
}
