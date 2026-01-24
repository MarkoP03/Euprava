package com.example.health.service;

import com.example.health.enums.ReportStatus;
import com.example.health.model.ReportOfIllness;
import com.example.health.repository.ReportOfIllnessRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReportOfIllnessService {

    @Autowired
    private ReportOfIllnessRepository reportOfIllnessRepository;

    public List<ReportOfIllness> getAll() {
        return reportOfIllnessRepository.findAll();
    }

    public ReportOfIllness getById(Long id) {
        return reportOfIllnessRepository.findById(id).orElse(null);
    }

    public List<ReportOfIllness> findByMedicalRecordId(Long medicalRecordId) {
        return reportOfIllnessRepository.findByMedicalRecordId(medicalRecordId);
    }

    public List<ReportOfIllness> findByDeletedFalse() {
        return reportOfIllnessRepository.findByDeletedFalse();
    }

    public List<ReportOfIllness> findByMedicalRecordIdAndDeletedFalse(Long medicalRecordId) {
        return reportOfIllnessRepository.findByMedicalRecordIdAndDeletedFalse(medicalRecordId);
    }

    public List<ReportOfIllness> findByStatus(ReportStatus status) {
        return reportOfIllnessRepository.findByStatusAndDeletedFalse(status);
    }

    public List<ReportOfIllness> findUrgent() {
        return reportOfIllnessRepository.findByUrgentTrueAndDeletedFalse();
    }

    public ReportOfIllness save(ReportOfIllness roi) {

        ReportOfIllness newRoi = new ReportOfIllness();
        newRoi.setMedicalRecord(roi.getMedicalRecord());
        newRoi.setStatus(roi.getStatus());
        newRoi.setProblem(roi.getProblem());
        newRoi.setAnswer(roi.getAnswer());
        newRoi.setUrgent(roi.getUrgent());
        newRoi.setCreatedAt(LocalDateTime.now());
        newRoi.setUpdatedAt(LocalDateTime.now());
        newRoi.setDeleted(false);

        return reportOfIllnessRepository.save(newRoi);
    }

    public ReportOfIllness update(Long id, ReportOfIllness roi) {
        ReportOfIllness existing = reportOfIllnessRepository.findById(id).orElse(null);
        if (existing == null) {
            return null;
        }

        if (roi.getStatus() != null) {
            existing.setStatus(roi.getStatus());
        }
        if (roi.getProblem() != null) {
            existing.setProblem(roi.getProblem());
        }
        if (roi.getAnswer() != null) {
            existing.setAnswer(roi.getAnswer());
        }
        if (roi.getUrgent() != null) {
            existing.setUrgent(roi.getUrgent());
        }

        existing.setUpdatedAt(LocalDateTime.now());
        return reportOfIllnessRepository.save(existing);
    }

    public ReportOfIllness deleted(Long id) {
        ReportOfIllness roi = reportOfIllnessRepository.findById(id).orElse(null);
        if (roi == null) {
            return null;
        }
        roi.setDeleted(true);
        roi.setUpdatedAt(LocalDateTime.now());
        return reportOfIllnessRepository.save(roi);
    }
}
