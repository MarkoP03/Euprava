package com.example.Euprava.service;

import com.example.Euprava.model.Child;
import com.example.Euprava.model.User;
import com.example.Euprava.repository.ChildRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ChildService {

    @Autowired
    private ChildRepository childRepository;

    public List<Child> getAll(){
        return childRepository.findAll();
    };

    public Child getById(long id){
        return childRepository.findById(id).orElse(null);
    }

    public Child findByJmbg(String jmbg){
        return childRepository.findByJmbg(jmbg);
    }

    public List<Child> findByDeletedFalse() {
        return childRepository.findByDeletedFalse();
    }

    public Child save(Child child){
        if (child == null || child.getJmbg() == null) {
            throw new RuntimeException("JMBG is required.");
        }

        String jmbg = child.getJmbg();

        if (childRepository.existsByJmbg(jmbg)) {
            throw new RuntimeException("JMBG already exists!");
        }

        Child ch =new Child();
        ch.setJmbg(child.getJmbg());
        ch.setName(child.getName());
        ch.setSurname(child.getSurname());
        ch.setBirthDate(child.getBirthDate());
        ch.setParentName(child.getParentName());
        ch.setParentSurname(child.getParentSurname());
        ch.setParentContact(child.getParentContact());
        ch.setCreatedAt(LocalDateTime.now());
        ch.setDeleted(false);
        return childRepository.save(ch);
    }

    public Child deleted (Long id){
        Child ch = childRepository.findById(id).orElse(null);
        if (ch == null) {
           return null;
        }
        ch.setDeleted(true);
        childRepository.save(ch);
        return ch;

    }

}
