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
        List<DoctorReport> reports = doctorReportService.findAllActive();

        List<DoctorReportDto> dtos = new ArrayList<>();
        for (DoctorReport report : reports) {
            dtos.add(new DoctorReportDto(report));
        }

        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DoctorReportDto> getDoctorReportById(@PathVariable Long id) {
        DoctorReport report = doctorReportService.findById(id);
        if (report == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(new DoctorReportDto(report));
    }

    @GetMapping("/medical-record/{medicalRecordId}")
    public ResponseEntity<List<DoctorReportDto>> getReportsByMedicalRecordId(@PathVariable Long medicalRecordId) {
        List<DoctorReport> reports = doctorReportService.findByMedicalRecordIdAndDeletedFalse(medicalRecordId);

        List<DoctorReportDto> dtos = new ArrayList<>();
        for (DoctorReport report : reports) {
            dtos.add(new DoctorReportDto(report));
        }

        return ResponseEntity.ok(dtos);
    }

    @PostMapping
    public ResponseEntity<DoctorReportDto> createDoctorReport(@RequestBody DoctorReportDto dto) {
        DoctorReport report = new DoctorReport();
        report.setDate(dto.getDate());
        report.setDiagnosis(dto.getDiagnosis());
        report.setRecommendation(dto.getRecommendation());

        DoctorReport saved = doctorReportService.save(dto.getMedicalRecordId(), report);
        return new ResponseEntity<>(new DoctorReportDto(saved), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DoctorReportDto> updateDoctorReport(
            @PathVariable Long id,
            @RequestBody DoctorReportDto dto) {

        DoctorReport updated = new DoctorReport();
        updated.setDate(dto.getDate());
        updated.setDiagnosis(dto.getDiagnosis());
        updated.setRecommendation(dto.getRecommendation());

        DoctorReport result = doctorReportService.update(id, dto.getMedicalRecordId(), updated);

        if (result == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok(new DoctorReportDto(result));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<DoctorReportDto> deleteDoctorReport(@PathVariable Long id) {
        DoctorReport deleted = doctorReportService.softDelete(id);
        if (deleted == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(new DoctorReportDto(deleted));
    }
}