package com.example.Euprava.service;

import com.example.Euprava.exception.BadRequestException;
import com.example.Euprava.model.Child;
import com.example.Euprava.model.Enrollment;
import com.example.Euprava.model.Kindergarten;
import com.example.Euprava.repository.ChildRepository;
import com.example.Euprava.repository.EnrollmentRepository;
import com.example.Euprava.repository.KindergartenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class EnrollmentService {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private ChildRepository childRepository;

    @Autowired
    private KindergartenRepository kindergartenRepository;

    public List<Enrollment> findAllActive() {
        return enrollmentRepository.findByDeletedFalse();
    }

    public Enrollment findById(Long id) {
        return enrollmentRepository.findById(id).orElse(null);
    }

    public List<Enrollment> findByKindergarten(Long kindergartenId) {
        return enrollmentRepository.findByKindergartenIdAndDeletedFalse(kindergartenId);
    }
    public Enrollment save(Long childId, Long kindergartenId, Enrollment enrollment) {
        if (enrollment == null) {
            throw new BadRequestException("Enrollment payload is required");
        }


        Child child = childRepository.findById(childId).orElse(null);
        if (child == null) {
            throw new BadRequestException("Child with id " + childId + " not found");
        }

        Kindergarten kindergarten = kindergartenRepository.findById(kindergartenId).orElse(null);
        if (kindergarten == null) {
            throw new BadRequestException("Kindergarten with id " + kindergartenId + " not found");
        }

        if (enrollmentRepository.existsByChildIdAndKindergartenId(childId, kindergartenId)) {
            throw new BadRequestException("Ovo dete je vec upisano u vric");
        }

        enrollment.setId(null);
        enrollment.setChild(child);
        enrollment.setKindergarten(kindergarten);
        enrollment.setCreatedAt(LocalDateTime.now());
        enrollment.setUpdatedAt(LocalDateTime.now());
        enrollment.setDeleted(false);

        return enrollmentRepository.save(enrollment);
    }

    public Enrollment update(Long id, Long childId, Long kindergartenId, Enrollment updated) {
        Enrollment existing = enrollmentRepository.findById(id).orElse(null);
        if (existing == null) {
            throw new BadRequestException("Enrollment not found");
        }

        Child child = childRepository.findById(childId).orElse(null);
        if (child == null) {
            throw new BadRequestException("Child with id " + childId + " not found");
        }

        Kindergarten kindergarten = kindergartenRepository.findById(kindergartenId).orElse(null);
        if (kindergarten == null) {
            throw new BadRequestException("Kindergarten with id " + kindergartenId + " not found");
        }

        existing.setChild(child);
        existing.setKindergarten(kindergarten);
        existing.setStatus(updated.getStatus());
        existing.setConfirmationHealthId(updated.getConfirmationHealthId());
        existing.setUpdatedAt(LocalDateTime.now());

        return enrollmentRepository.save(existing);
    }

    public Enrollment softDelete(Long id) {
        Enrollment enrollment = enrollmentRepository.findById(id).orElse(null);
        if (enrollment == null) {
            throw new BadRequestException("Enrollment not found");
        }

        enrollment.setDeleted(true);
        enrollment.setUpdatedAt(LocalDateTime.now());
        return enrollmentRepository.save(enrollment);
    }
}