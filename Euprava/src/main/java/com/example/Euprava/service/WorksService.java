package com.example.Euprava.service;


import com.example.Euprava.model.User;
import com.example.Euprava.model.Works;
import com.example.Euprava.repository.WorksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorksService {

    @Autowired
    private WorksRepository worksRepository;


    public List<Works> getAll(){
        return worksRepository.findAll();
    }

    public Works getById(long id){
        return worksRepository.findById(id).orElse(null);
    }


    public List<Works> findByDeletedFalse() {
        return worksRepository.findByDeletedFalse();
    }
    public Works findByUserIdAndKindergartenId(Long userId, Long kindergartenId){
        return worksRepository.findByUserIdAndKindergartenId(userId, kindergartenId);
    }

    public Works save(Works w){
        if (w == null) {
            throw new RuntimeException("Works payload is required.");
        }
        if (w.getUser() == null || w.getUser().getId() == null) {
            throw new RuntimeException("User is required.");
        }
        if (w.getKindergarten() == null || w.getKindergarten().getId() == null) {
            throw new RuntimeException("Kindergarten is required.");
        }
        if (w.getSalary() == null) {
            throw new RuntimeException("Salary is required.");
        }

        if (worksRepository.existsByUserIdAndKindergartenId(
                w.getUser().getId(), w.getKindergarten().getId())) {
            throw new RuntimeException("Works entry already exists for this user and kindergarten!");
        }

        Works nw = new Works();
        nw.setUser(w.getUser());
        nw.setKindergarten(w.getKindergarten());
        nw.setSalary(w.getSalary());
        nw.setDeleted(false);

        return worksRepository.save(nw);
    }

    public Works deleted(Long id){
        Works w = worksRepository.findById(id).orElse(null);
        if (w == null) {
            return null;
        }
        w.setDeleted(true);
        worksRepository.save(w);
        return w;
    }
}
