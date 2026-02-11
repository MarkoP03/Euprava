package com.example.health.service;

import com.example.health.exception.BadRequestException;
import com.example.health.model.DoctorReport;
import com.example.health.model.MedicalRecord;
import com.example.health.repository.DoctorReportRepository;
import com.example.health.repository.MedicalRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class DoctorReportService {

    @Autowired
    private DoctorReportRepository doctorReportRepository;

    @Autowired
    private MedicalRecordRepository medicalRecordRepository;

    public List<DoctorReport> findAllActive() {
        return doctorReportRepository.findByDeletedFalse();
    }

    public DoctorReport findById(Long id) {
        return doctorReportRepository.findById(id).orElse(null);
    }

    public List<DoctorReport> findByMedicalRecordIdAndDeletedFalse(Long medicalRecordId) {
        return doctorReportRepository.findByMedicalRecordIdAndDeletedFalse(medicalRecordId);
    }

    public DoctorReport save(Long medicalRecordId, DoctorReport report) {
        if (report == null) {
            throw new BadRequestException("Doctor report payload is required");
        }

        MedicalRecord medicalRecord = medicalRecordRepository.findById(medicalRecordId).orElse(null);
        if (medicalRecord == null) {
            throw new BadRequestException("Medical record with id " + medicalRecordId + " not found");
        }

        if (report.getDate() == null) {
            throw new BadRequestException("Report date is required");
        }

        report.setId(null);
        report.setMedicalRecord(medicalRecord);
        report.setCreatedAt(LocalDateTime.now());
        report.setUpdatedAt(LocalDateTime.now());
        report.setDeleted(false);

        return doctorReportRepository.save(report);
    }

    public DoctorReport update(Long id, Long medicalRecordId, DoctorReport updated) {
        DoctorReport existing = doctorReportRepository.findById(id).orElse(null);
        if (existing == null) {
            throw new BadRequestException("Doctor report not found");
        }

        MedicalRecord medicalRecord = medicalRecordRepository.findById(medicalRecordId).orElse(null);
        if (medicalRecord == null) {
            throw new BadRequestException("Medical record with id " + medicalRecordId + " not found");
        }

        existing.setMedicalRecord(medicalRecord);
        existing.setDate(updated.getDate());
        existing.setDiagnosis(updated.getDiagnosis());
        existing.setRecommendation(updated.getRecommendation());
        existing.setUpdatedAt(LocalDateTime.now());

        return doctorReportRepository.save(existing);
    }

    public DoctorReport softDelete(Long id) {
        DoctorReport report = doctorReportRepository.findById(id).orElse(null);
        if (report == null) {
            throw new BadRequestException("Doctor report not found");
        }

        report.setDeleted(true);
        report.setUpdatedAt(LocalDateTime.now());
        return doctorReportRepository.save(report);
    }
}