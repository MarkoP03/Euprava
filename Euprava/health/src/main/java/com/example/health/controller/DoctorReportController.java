package com.example.health.controller;

import com.example.health.dto.DoctorReportDto;
import com.example.health.model.DoctorReport;
import com.example.health.service.DoctorReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/doctor-reports")
public class DoctorReportController {

    private final DoctorReportService doctorReportService;

    @Autowired
    public DoctorReportController(DoctorReportService doctorReportService) {
        this.doctorReportService = doctorReportService;
    }

    @GetMapping
    public ResponseEntity<List<DoctorReportDto>> getAllDoctorReports() {
        List<DoctorReport> reports = doctorReportService.findByDeletedFalse();

        List<DoctorReportDto> dtos = new ArrayList<>();
        for (DoctorReport dr : reports) {
            dtos.add(new DoctorReportDto(dr));
        }

        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DoctorReportDto> getDoctorReportById(@PathVariable Long id) {
        DoctorReport report = doctorReportService.getById(id);
        if (report == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        DoctorReportDto dto = new DoctorReportDto(report);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @GetMapping("/medical-record/{medicalRecordId}")
    public ResponseEntity<List<DoctorReportDto>> getReportsByMedicalRecordId(@PathVariable Long medicalRecordId) {
        List<DoctorReport> reports = doctorReportService.findByMedicalRecordIdAndDeletedFalse(medicalRecordId);

        List<DoctorReportDto> dtos = new ArrayList<>();
        for (DoctorReport dr : reports) {
            dtos.add(new DoctorReportDto(dr));
        }

        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<DoctorReportDto> createDoctorReport(@RequestBody DoctorReport report) {
        try {
            DoctorReport created = doctorReportService.save(report);
            DoctorReportDto dto = new DoctorReportDto(created);
            return new ResponseEntity<>(dto, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<DoctorReportDto> updateDoctorReport(@PathVariable Long id, @RequestBody DoctorReport report) {
        DoctorReport updated = doctorReportService.update(id, report);
        if (updated == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        DoctorReportDto dto = new DoctorReportDto(updated);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @DeleteMapping("/del/{id}")
    public ResponseEntity<DoctorReportDto> deleteDoctorReport(@PathVariable Long id) {
        DoctorReport report = doctorReportService.deleted(id);
        if (report == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        DoctorReportDto dto = new DoctorReportDto(report);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }
}
