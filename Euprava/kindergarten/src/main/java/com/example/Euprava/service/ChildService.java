package com.example.Euprava.service;

import com.example.Euprava.exception.BadRequestException;
import com.example.Euprava.model.Child;
import com.example.Euprava.repository.ChildRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ChildService {

    @Autowired
    private ChildRepository childRepository;

    public List<Child> findAllActive() {
        return childRepository.findByDeletedFalse();
    }

    public Child findById(Long id) {
        return childRepository.findById(id).orElse(null);
    }

    public Child save(Child child) {
        if (child == null || child.getJmbg() == null || child.getJmbg().isBlank()) {
            throw new BadRequestException("JMBG is required");
        }

        if (childRepository.existsByJmbg(child.getJmbg())) {
            throw new BadRequestException("JMBG already exists");
        }

        child.setId(null);
        child.setCreatedAt(LocalDateTime.now());
        child.setDeleted(false);

        return childRepository.save(child);
    }

    public Child update(Long id, Child updated) {
        Child existing = childRepository.findById(id).orElse(null);
        if (existing == null) {
            throw new BadRequestException("Child not found");
        }

        existing.setName(updated.getName());
        existing.setSurname(updated.getSurname());
        existing.setBirthDate(updated.getBirthDate());
        existing.setParentName(updated.getParentName());
        existing.setParentSurname(updated.getParentSurname());
        existing.setParentContact(updated.getParentContact());
        existing.setUpdatedAt(LocalDateTime.now());

        return childRepository.save(existing);
    }

    public Child softDelete(Long id) {
        Child child = childRepository.findById(id).orElse(null);
        if (child == null) {
            throw new BadRequestException("Child not found");
        }

        child.setDeleted(true);
        child.setUpdatedAt(LocalDateTime.now());
        return childRepository.save(child);
    }
}
