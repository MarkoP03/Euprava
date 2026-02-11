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
        List<Child> children = childService.findAllActive();

        List<ChildDto> dtos = new ArrayList<>();
        for (Child child : children) {
            dtos.add(new ChildDto(child));
        }

        return ResponseEntity.ok(dtos);
    }

    @PostMapping
    public ResponseEntity<ChildDto> createChild(@RequestBody ChildDto dto) {
        Child child = mapToEntity(dto);
        Child saved = childService.save(child);
        return new ResponseEntity<>(new ChildDto(saved), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ChildDto> updateChild(
            @PathVariable Long id,
            @RequestBody ChildDto dto) {

        Child updated = mapToEntity(dto);
        Child result = childService.update(id, updated);

        if (result == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok(new ChildDto(result));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ChildDto> deleteChild(@PathVariable Long id) {
        Child deleted = childService.softDelete(id);
        if (deleted == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(new ChildDto(deleted));
    }

    private Child mapToEntity(ChildDto dto) {
        Child child = new Child();
        child.setJmbg(dto.getJmbg());
        child.setName(dto.getName());
        child.setSurname(dto.getSurname());
        child.setBirthDate(dto.getBirthDate());
        child.setParentName(dto.getParentName());
        child.setParentSurname(dto.getParentSurname());
        child.setParentContact(dto.getParentContact());
        return child;
    }
}
