package com.example.Euprava.controller;

import com.example.Euprava.dto.EnrollmentDto;
import com.example.Euprava.dto.UserDto;
import com.example.Euprava.model.Enrollment;
import com.example.Euprava.model.User;
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

    private EnrollmentService enrollmentService;

    @Autowired
    public EnrollmentController(EnrollmentService enrollmentService) {
        this.enrollmentService = enrollmentService;
    }

    @GetMapping
    public ResponseEntity<List<EnrollmentDto>> getAllUsers() {
        List<Enrollment> enrollments = enrollmentService.findByDeletedFalse();

        List<EnrollmentDto> dtos = new ArrayList<>();
        for (Enrollment enrollment : enrollments) {
            dtos.add(new EnrollmentDto(enrollment));
        }
        return  new ResponseEntity<>(dtos, HttpStatus.OK);

    }



    @DeleteMapping("/del/{enrollmentId}")
    public ResponseEntity<EnrollmentDto> deleteEnrolment(@PathVariable Long userId){
        Enrollment enrollment = enrollmentService.deleted(userId);
        if(enrollment == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        EnrollmentDto enrollmentDto = new EnrollmentDto(enrollment);
        return new ResponseEntity<>(enrollmentDto, HttpStatus.OK);
    }
}
