package com.example.Euprava.controller;


import com.example.Euprava.dto.AllergyDto;
import com.example.Euprava.dto.ChildDto;
import com.example.Euprava.dto.CreateIllnessReportDto;
import com.example.Euprava.dto.IllnessReportDto;
import com.example.Euprava.grpc.HealthGrpcClient;
import com.example.Euprava.model.Child;
import com.example.Euprava.service.ChildService;

import com.example.grpc.GetChildAllergiesResponse;
import com.example.grpc.GetChildIllnessReportsResponse;
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

    private final HealthGrpcClient healthGrpcClient;

    @Autowired
    public ChildController(ChildService childService, HealthGrpcClient healthGrpcClient) {
        this.childService = childService;
        this.healthGrpcClient = healthGrpcClient;
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

    @GetMapping("/{id}")
    public ResponseEntity<ChildDto> getChildById(@PathVariable Long id) {

        Child child = childService.findById(id);

        if (child == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok(new ChildDto(child));
    }


    @GetMapping("/{childId}/allergies")
    public ResponseEntity<List<AllergyDto>> getChildAllergies(@PathVariable Long childId) {

        GetChildAllergiesResponse grpcResponse =
                healthGrpcClient.getChildAllergies(childId);

        List<AllergyDto> allergies = grpcResponse.getAllergiesList()
                .stream()
                .map(a -> {
                    AllergyDto dto = new AllergyDto();
                    dto.setId(a.getId());
                    dto.setType(a.getType());
                    dto.setDescription(a.getDescription());
                    dto.setSeverity(a.getSeverity());
                    return dto;
                })
                .toList();

        return ResponseEntity.ok(allergies);
    }


    @GetMapping("/{childId}/illness-reports")
    public ResponseEntity<List<IllnessReportDto>> getChildIllnessReports(
            @PathVariable Long childId) {

        GetChildIllnessReportsResponse grpcResponse =
                healthGrpcClient.getChildIllnessReports(childId);

        List<IllnessReportDto> reports = grpcResponse.getReportsList()
                .stream()
                .map(r -> {
                    IllnessReportDto dto = new IllnessReportDto();
                    dto.setId(r.getId());
                    dto.setStatus(r.getStatus());
                    dto.setProblem(r.getProblem());
                    dto.setAnswer(r.getAnswer());
                    dto.setUrgent(r.getUrgent());
                    dto.setCreatedAt(r.getCreatedAt());
                    return dto;
                })
                .toList();

        return ResponseEntity.ok(reports);
    }

    @PostMapping("/{childId}/illness-reports")
    public ResponseEntity<Void> createIllnessReport(
            @PathVariable Long childId,
            @RequestBody CreateIllnessReportDto dto) {

        healthGrpcClient.createIllnessReport(
                childId,
                dto.getProblem(),
                dto.getUrgent()
        );

        return new ResponseEntity<>(HttpStatus.CREATED);
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
