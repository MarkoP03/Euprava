package com.example.Euprava.service;

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

    public List<Kindergarten> getAll(){
        return kindergartenRepository.findAll();
    }

    public Kindergarten getById(long id){
        return kindergartenRepository.findById(id).orElse(null);
    }


    public Kindergarten findByAddress(String address){
        return kindergartenRepository.findByAddress(address);
    }

    public List<Kindergarten> findByDeletedFalse() {
        return kindergartenRepository.findByDeletedFalse();
    }

    public Kindergarten save(Kindergarten k){
        if (k == null || k.getAddress() == null) {
            throw new RuntimeException("Address is required.");
        }

        String address = k.getAddress();

        if (kindergartenRepository.existsByAddress(address)) {
            throw new RuntimeException("Address already exists!");
        }

        Kindergarten g = new Kindergarten();
        g.setName(k.getName());
        g.setAddress(k.getAddress());
        g.setLat(k.getLat());
        g.setLng(k.getLng());
        g.setCreatedAt(LocalDateTime.now());
        g.setUpdatedAt(LocalDateTime.now());
        g.setDeleted(false);

        return kindergartenRepository.save(g);
    }

    public Kindergarten deleted(Long id){
        Kindergarten g = kindergartenRepository.findById(id).orElse(null);
        if (g == null) {
            return null;
        }
        g.setDeleted(true);
        g.setUpdatedAt(LocalDateTime.now());
        kindergartenRepository.save(g);
        return g;
    }


}
