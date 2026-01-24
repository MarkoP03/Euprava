package com.example.Euprava.controller;


import com.example.Euprava.dto.ChildDto;
import com.example.Euprava.model.Child;
import com.example.Euprava.service.ChildService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/api/children")
public class ChildController {
    private final ChildService childService;

    @Autowired
    public ChildController(ChildService childService) {
        this.childService = childService;
    }

    @GetMapping
    public ResponseEntity<List<ChildDto>> getAllChildren() {
        List<Child> children = childService.findByDeletedFalse();

        List<ChildDto> dtos = new ArrayList<>();
        for (Child c : children) {
            dtos.add(new ChildDto(c));
        }

        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @DeleteMapping("/del/{childId}")
    public ResponseEntity<ChildDto> deleteChild(@PathVariable Long childId) {
        Child child = childService.deleted(childId);
        if (child == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        ChildDto childDto = new ChildDto(child);
        return new ResponseEntity<>(childDto, HttpStatus.OK);
    }
}
