package com.example.Euprava.service;


import com.example.Euprava.model.Enrollment;
import com.example.Euprava.model.User;
import com.example.Euprava.repository.EnrollmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class EnrollmentService {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    public Enrollment findById(Long id) {
        Enrollment enrollment = enrollmentRepository.findById(id).get();
        return enrollment;
    }

    public List<Enrollment> findAll() {
        return enrollmentRepository.findAll();
    }

    public List<Enrollment> findByDeletedFalse() {
        return enrollmentRepository.findByDeletedFalse();
    }

    public Enrollment save(Enrollment enrollment){
        if (enrollment == null) {
            throw new RuntimeException("Enrollment payload is required.");
        }
        if (enrollment.getChild() == null || enrollment.getChild().getId() == null) {
            throw new RuntimeException("Child is required.");
        }
        if (enrollment.getKindergarten() == null || enrollment.getKindergarten().getId() == null) {
            throw new RuntimeException("Kindergarten is required.");
        }
        if (enrollment.getStatus() == null) {
            throw new RuntimeException("Status is required.");
        }

        // analogno tvojoj provere JMBG-a: spreči duplikat Child+Kindergarten
        if (enrollmentRepository.existsByChildIdAndKindergartenId(
                enrollment.getChild().getId(), enrollment.getKindergarten().getId())) {
            throw new RuntimeException("Enrollment already exists for this child and kindergarten!");
        }

        Enrollment e = new Enrollment();
        e.setChild(enrollment.getChild());
        e.setKindergarten(enrollment.getKindergarten());
        e.setStatus(enrollment.getStatus());
        e.setConfirmationHealthId(enrollment.getConfirmationHealthId());
        e.setCreatedAt(LocalDateTime.now());
        e.setUpdatedAt(LocalDateTime.now());
        e.setDeleted(false);

        return enrollmentRepository.save(e);
    }

    public Enrollment deleted(Long id){
        Enrollment e = enrollmentRepository.findById(id).orElse(null);
        if (e == null) {
            return null;
        }
        e.setDeleted(true);
        e.setUpdatedAt(LocalDateTime.now());
        enrollmentRepository.save(e);
        return e;
    }

}
