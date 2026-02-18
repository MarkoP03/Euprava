package com.example.health.service;

import com.example.health.enums.ConfirmationStatus;
import com.example.health.exception.BadRequestException;
import com.example.health.model.EnrollmentConfirmation;
import com.example.health.model.MedicalRecord;
import com.example.health.repository.DoctorReportRepository;
import com.example.health.repository.EnrollmentConfirmationRepository;
import com.example.health.repository.MedicalRecordRepository;
import com.example.health.repository.VaccineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class EnrollmentConfirmationService {

    @Autowired
    private EnrollmentConfirmationRepository enrollmentConfirmationRepository;

    @Autowired
    private MedicalRecordRepository medicalRecordRepository;

    @Autowired
    private DoctorReportRepository doctorReportRepository;

    @Autowired
    private VaccineRepository vaccineRepository;

    public List<EnrollmentConfirmation> findAllActive() {
        return enrollmentConfirmationRepository.findByDeletedFalse();
    }

    public EnrollmentConfirmation findById(Long id) {
        return enrollmentConfirmationRepository.findById(id).orElse(null);
    }
    public EnrollmentConfirmation findByChildId(Long childId) {
        MedicalRecord medicalRecord = medicalRecordRepository.findByChildId(childId).orElse(null);

        if (medicalRecord == null) {
            return null;
        }

        return enrollmentConfirmationRepository.findTopByMedicalRecordIdOrderByIssuedAtDesc(medicalRecord.getId()).orElse(null);
    }

    public List<EnrollmentConfirmation> findByMedicalRecordIdAndDeletedFalse(Long medicalRecordId) {
        return enrollmentConfirmationRepository.findByMedicalRecordIdAndDeletedFalse(medicalRecordId);
    }

    public EnrollmentConfirmation findLatestByMedicalRecordId(Long medicalRecordId) {
        return enrollmentConfirmationRepository.findTopByMedicalRecordIdOrderByIssuedAtDesc(medicalRecordId).orElse(null);
    }

    public EnrollmentConfirmation save(Long medicalRecordId, EnrollmentConfirmation confirmation) {

        if (confirmation == null) {
            throw new BadRequestException("Podaci za potvrdu upisa su obavezni");
        }

        MedicalRecord medicalRecord = medicalRecordRepository.findById(medicalRecordId).orElse(null);
        if (medicalRecord == null) {
            throw new BadRequestException("Zdravstveni karton sa ID " + medicalRecordId + " ne postoji");
        }

        boolean hasDoctorReport =
                doctorReportRepository.existsByMedicalRecordIdAndDeletedFalse(medicalRecordId);

        boolean hasVaccine =
                vaccineRepository.existsByMedicalRecordIdAndDeletedFalse(medicalRecordId);

        if (!hasDoctorReport) {
            throw new BadRequestException(
                    "Nije moguće izdati potvrdu za upis jer dete nema evidentiran lekarski pregled"
            );
        }

        if (!hasVaccine) {
            throw new BadRequestException(
                    "Nije moguće izdati potvrdu za upis jer dete nema evidentiranu vakcinaciju"
            );
        }

        confirmation.setId(null);
        confirmation.setMedicalRecord(medicalRecord);
        confirmation.setCreatedAt(LocalDateTime.now());
        confirmation.setUpdatedAt(LocalDateTime.now());
        confirmation.setDeleted(false);
        confirmation.setStatus(ConfirmationStatus.ACTIVE);

        return enrollmentConfirmationRepository.save(confirmation);
    }

    public EnrollmentConfirmation update(Long id, Long medicalRecordId, EnrollmentConfirmation updated) {
        EnrollmentConfirmation existing = enrollmentConfirmationRepository.findById(id).orElse(null);
        if (existing == null) {
            throw new BadRequestException("Potvrda za upis nije pronađena");
        }

        MedicalRecord medicalRecord = medicalRecordRepository.findById(medicalRecordId).orElse(null);
        if (medicalRecord == null) {
            throw new BadRequestException("Zdravstveni karton sa ID " + medicalRecordId + " ne postoji");
        }

        existing.setMedicalRecord(medicalRecord);
        existing.setIssuedAt(updated.getIssuedAt());
        existing.setValidUntil(updated.getValidUntil());
        existing.setStatus(updated.getStatus());
        existing.setUpdatedAt(LocalDateTime.now());

        return enrollmentConfirmationRepository.save(existing);
    }

    public EnrollmentConfirmation softDelete(Long id) {
        EnrollmentConfirmation confirmation = enrollmentConfirmationRepository.findById(id).orElse(null);
        if (confirmation == null) {
            throw new BadRequestException("Potvrda za upis nije pronađena");
        }

        confirmation.setDeleted(true);
        confirmation.setUpdatedAt(LocalDateTime.now());
        return enrollmentConfirmationRepository.save(confirmation);
    }
}
