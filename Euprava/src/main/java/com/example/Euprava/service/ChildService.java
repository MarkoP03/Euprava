package com.example.Euprava.service;

import com.example.Euprava.model.Child;
import com.example.Euprava.repository.ChildRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ChildService {

    @Autowired
    private ChildRepository childRepository;

    public List<Child> getAll(){
        return childRepository.findAll();
    };



}
