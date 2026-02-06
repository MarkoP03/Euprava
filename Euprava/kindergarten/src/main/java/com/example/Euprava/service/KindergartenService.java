package com.example.Euprava.service;

import com.example.Euprava.exception.BadRequestException;
import com.example.Euprava.model.Kindergarten;
import com.example.Euprava.model.User;
import com.example.Euprava.repository.KindergartenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
@Service
public class KindergartenService {

    @Autowired
    private KindergartenRepository kindergartenRepository;

    public List<Kindergarten> findAllActive() {
        return kindergartenRepository.findByDeletedFalse();
    }

    public List<Kindergarten> getAll() {
        return kindergartenRepository.findAll();
    }

    public Kindergarten getById(Long id) {
        return kindergartenRepository.findById(id).orElse(null);
    }

    public Kindergarten findByAddress(String address) {
        return kindergartenRepository.findByAddress(address);
    }

    public Kindergarten save(Kindergarten k) {
        if (k == null || k.getAddress() == null || k.getAddress().isBlank()) {
            throw new BadRequestException("Address is required");
        }


        k.setId(null);
        k.setCreatedAt(LocalDateTime.now());
        k.setUpdatedAt(LocalDateTime.now());
        k.setDeleted(false);

        return kindergartenRepository.save(k);
    }

    public Kindergarten update(Long id, Kindergarten updated) {
        Kindergarten existing = kindergartenRepository.findById(id).orElse(null);
        if (existing == null) {
            throw new BadRequestException("Kindergarten not found");
        }

        existing.setName(updated.getName());
        existing.setAddress(updated.getAddress());
        existing.setLat(updated.getLat());
        existing.setLng(updated.getLng());
        existing.setUpdatedAt(LocalDateTime.now());

        return kindergartenRepository.save(existing);
    }

    public Kindergarten softDelete(Long id) {
        Kindergarten g = kindergartenRepository.findById(id).orElse(null);
        if (g == null) {
            throw new BadRequestException("Kindergarten not found");
        }

        g.setDeleted(true);
        g.setUpdatedAt(LocalDateTime.now());
        return kindergartenRepository.save(g);
    }
}

