package com.example.health.service;

import com.example.health.enums.ReportStatus;
import com.example.health.exception.BadRequestException;
import com.example.health.model.MedicalRecord;
import com.example.health.model.ReportOfIllness;
import com.example.health.repository.MedicalRecordRepository;
import com.example.health.repository.ReportOfIllnessRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
@Service
public class ReportOfIllnessService {

    @Autowired
    private ReportOfIllnessRepository reportOfIllnessRepository;

    @Autowired
    private MedicalRecordRepository medicalRecordRepository;

    public List<ReportOfIllness> findAllActive() {
        return reportOfIllnessRepository.findByDeletedFalse();
    }

    public ReportOfIllness findById(Long id) {
        return reportOfIllnessRepository.findById(id).orElse(null);
    }

    public List<ReportOfIllness> findByMedicalRecordIdAndDeletedFalse(Long medicalRecordId) {
        return reportOfIllnessRepository
                .findByMedicalRecordIdAndDeletedFalse(medicalRecordId);
    }

    public List<ReportOfIllness> findByStatus(ReportStatus status) {
        return reportOfIllnessRepository
                .findByStatusAndDeletedFalse(status);
    }

    public List<ReportOfIllness> findUrgent() {
        return reportOfIllnessRepository
                .findByUrgentTrueAndDeletedFalse();
    }

    public ReportOfIllness save(Long medicalRecordId, ReportOfIllness report) {
        if (report == null) {
            throw new BadRequestException("Report payload is required");
        }

        MedicalRecord medicalRecord =
                medicalRecordRepository.findById(medicalRecordId).orElse(null);

        if (medicalRecord == null) {
            throw new BadRequestException(
                    "Medical record with id " + medicalRecordId + " not found");
        }

        if (report.getProblem() == null) {
            throw new BadRequestException("Problem description is required");
        }

        report.setId(null);
        report.setMedicalRecord(medicalRecord);
        report.setStatus(
                report.getStatus() != null
                        ? report.getStatus()
                        : ReportStatus.PENDING
        );
        report.setCreatedAt(LocalDateTime.now());
        report.setUpdatedAt(LocalDateTime.now());
        report.setDeleted(false);

        return reportOfIllnessRepository.save(report);
    }

    public ReportOfIllness update(
            Long id,
            Long medicalRecordId,
            ReportOfIllness updated) {

        ReportOfIllness existing =
                reportOfIllnessRepository.findById(id).orElse(null);

        if (existing == null) {
            throw new BadRequestException("Report not found");
        }

        MedicalRecord medicalRecord =
                medicalRecordRepository.findById(medicalRecordId).orElse(null);

        if (medicalRecord == null) {
            throw new BadRequestException(
                    "Medical record with id " + medicalRecordId + " not found");
        }

        existing.setMedicalRecord(medicalRecord);
        existing.setStatus(updated.getStatus());
        existing.setProblem(updated.getProblem());
        existing.setAnswer(updated.getAnswer());
        existing.setUrgent(updated.getUrgent());
        existing.setUpdatedAt(LocalDateTime.now());

        return reportOfIllnessRepository.save(existing);
    }

    public ReportOfIllness softDelete(Long id) {
        ReportOfIllness report =
                reportOfIllnessRepository.findById(id).orElse(null);

        if (report == null) {
            throw new BadRequestException("Report not found");
        }

        report.setDeleted(true);
        report.setUpdatedAt(LocalDateTime.now());
        return reportOfIllnessRepository.save(report);
    }
}

