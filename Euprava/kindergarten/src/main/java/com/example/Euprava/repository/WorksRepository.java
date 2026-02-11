package com.example.Euprava.repository;

import com.example.Euprava.model.User;
import com.example.Euprava.model.Works;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WorksRepository extends JpaRepository<Works, Long> {

    List<Works> findByDeletedFalse();

    List<Works> findByKindergartenIdAndDeletedFalse(Long kindergartenId);

    Optional<Works> findByUserIdAndKindergartenIdAndDeletedFalse(Long userId, Long kindergartenId);
}
