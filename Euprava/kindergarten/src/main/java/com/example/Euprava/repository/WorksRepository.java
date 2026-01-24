package com.example.Euprava.repository;

import com.example.Euprava.model.User;
import com.example.Euprava.model.Works;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorksRepository extends JpaRepository<Works, Long> {

    Works findByUserIdAndKindergartenId(Long userId, Long kindergartenId);
    boolean existsByUserIdAndKindergartenId(Long userId, Long kindergartenId);

    List<Works> findByDeletedFalse();
}
