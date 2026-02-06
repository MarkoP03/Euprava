package com.example.Euprava.service;

import com.example.Euprava.exception.BadRequestException;
import com.example.Euprava.model.Kindergarten;
import com.example.Euprava.model.User;
import com.example.Euprava.model.Works;
import com.example.Euprava.repository.KindergartenRepository;
import com.example.Euprava.repository.UserRepository;
import com.example.Euprava.repository.WorksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorksService {

    @Autowired
    private WorksRepository worksRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private KindergartenRepository kindergartenRepository;

    public List<Works> findAllActive() {
        return worksRepository.findByDeletedFalse();
    }

    public Works findById(Long id) {
        return worksRepository.findById(id).orElse(null);
    }

    public Works save(Long userId, Long kindergartenId, Works works) {
        if (works == null) {
            throw new BadRequestException("Works payload is required");
        }
        if (userId == null) {
            throw new BadRequestException("User is required");
        }
        if (kindergartenId == null) {
            throw new BadRequestException("Kindergarten is required");
        }
        if (works.getSalary() == null) {
            throw new BadRequestException("Salary is required");
        }

        // Dohvati User i Kindergarten iz baze
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            throw new BadRequestException("User with id " + userId + " not found");
        }

        Kindergarten kindergarten = kindergartenRepository.findById(kindergartenId).orElse(null);
        if (kindergarten == null) {
            throw new BadRequestException("Kindergarten with id " + kindergartenId + " not found");
        }

        works.setId(null);
        works.setUser(user);
        works.setKindergarten(kindergarten);
        works.setDeleted(false);

        return worksRepository.save(works);
    }

    public Works update(Long id, Long userId, Long kindergartenId, Works updated) {
        Works existing = worksRepository.findById(id).orElse(null);
        if (existing == null) {
            throw new BadRequestException("Works not found");
        }

        // Dohvati User i Kindergarten iz baze
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            throw new BadRequestException("User with id " + userId + " not found");
        }

        Kindergarten kindergarten = kindergartenRepository.findById(kindergartenId).orElse(null);
        if (kindergarten == null) {
            throw new BadRequestException("Kindergarten with id " + kindergartenId + " not found");
        }

        existing.setUser(user);
        existing.setKindergarten(kindergarten);
        existing.setSalary(updated.getSalary());

        return worksRepository.save(existing);
    }

    public Works softDelete(Long id) {
        Works works = worksRepository.findById(id).orElse(null);
        if (works == null) {
            throw new BadRequestException("Works not found");
        }

        works.setDeleted(true);
        return worksRepository.save(works);
    }
}