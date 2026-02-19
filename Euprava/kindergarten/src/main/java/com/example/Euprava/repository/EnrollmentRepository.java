package com.example.Euprava.repository;

import com.example.Euprava.model.Enrollment;
import com.example.Euprava.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    boolean existsByChildIdAndKindergartenId(Long childId, Long kindergartenId);
    List<Enrollment> findByKindergartenIdAndDeletedFalse(Long kindergartenId);

    List<Enrollment> findByDeletedFalse();
    Optional<Enrollment> findByChildIdAndDeletedFalse(Long childId);
}
