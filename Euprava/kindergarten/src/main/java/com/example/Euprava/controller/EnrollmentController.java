package com.example.Euprava.controller;

import com.example.Euprava.dto.EnrollmentDto;
import com.example.Euprava.model.Enrollment;
import com.example.Euprava.service.EnrollmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/enrollment")
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    @Autowired
    public EnrollmentController(EnrollmentService enrollmentService) {
        this.enrollmentService = enrollmentService;
    }

    @GetMapping
    public ResponseEntity<List<EnrollmentDto>> getAllEnrollments() {
        List<Enrollment> enrollments = enrollmentService.findAllActive();

        List<EnrollmentDto> dtos = new ArrayList<>();
        for (Enrollment enrollment : enrollments) {
            dtos.add(new EnrollmentDto(enrollment));
        }

        return ResponseEntity.ok(dtos);
    }

    @PostMapping
    public ResponseEntity<EnrollmentDto> createEnrollment(@RequestBody EnrollmentDto dto) {
        Enrollment enrollment = new Enrollment();
        enrollment.setStatus(dto.getStatus());
        enrollment.setConfirmationHealthId(dto.getConfirmationHealthId());

        Enrollment saved = enrollmentService.save(dto.getChildId(), dto.getKindergartenId(), enrollment);
        return new ResponseEntity<>(new EnrollmentDto(saved), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EnrollmentDto> updateEnrollment(
            @PathVariable Long id,
            @RequestBody EnrollmentDto dto) {

        Enrollment updated = new Enrollment();
        updated.setStatus(dto.getStatus());
        updated.setConfirmationHealthId(dto.getConfirmationHealthId());

        Enrollment result = enrollmentService.update(id, dto.getChildId(), dto.getKindergartenId(), updated);

        if (result == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok(new EnrollmentDto(result));
    }

    @DeleteMapping("/del/{id}")
    public ResponseEntity<EnrollmentDto> deleteEnrollment(@PathVariable Long id) {
        Enrollment deleted = enrollmentService.softDelete(id);
        if (deleted == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(new EnrollmentDto(deleted));
    }
}