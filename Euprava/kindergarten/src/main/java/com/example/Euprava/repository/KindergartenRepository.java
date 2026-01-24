package com.example.Euprava.repository;

import com.example.Euprava.model.Kindergarten;
import com.example.Euprava.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface KindergartenRepository extends JpaRepository<Kindergarten, Long> {

    Kindergarten findByAddress(String address);
    boolean existsByAddress(String address);
    List<Kindergarten> findByDeletedFalse();
}
