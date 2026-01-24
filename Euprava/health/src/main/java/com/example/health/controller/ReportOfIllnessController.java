package com.example.health.controller;

import com.example.health.dto.ReportOfIllnessDto;
import com.example.health.enums.ReportStatus;
import com.example.health.model.ReportOfIllness;
import com.example.health.service.ReportOfIllnessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/illness-reports")
public class ReportOfIllnessController {

    private final ReportOfIllnessService reportOfIllnessService;

    @Autowired
    public ReportOfIllnessController(ReportOfIllnessService reportOfIllnessService) {
        this.reportOfIllnessService = reportOfIllnessService;
    }

    @GetMapping
    public ResponseEntity<List<ReportOfIllnessDto>> getAllReports() {
        List<ReportOfIllness> reports = reportOfIllnessService.findByDeletedFalse();

        List<ReportOfIllnessDto> dtos = new ArrayList<>();
        for (ReportOfIllness roi : reports) {
            dtos.add(new ReportOfIllnessDto(roi));
        }

        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReportOfIllnessDto> getReportById(@PathVariable Long id) {
        ReportOfIllness report = reportOfIllnessService.getById(id);
        if (report == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        ReportOfIllnessDto dto = new ReportOfIllnessDto(report);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @GetMapping("/medical-record/{medicalRecordId}")
    public ResponseEntity<List<ReportOfIllnessDto>> getReportsByMedicalRecordId(@PathVariable Long medicalRecordId) {
        List<ReportOfIllness> reports = reportOfIllnessService.findByMedicalRecordIdAndDeletedFalse(medicalRecordId);

        List<ReportOfIllnessDto> dtos = new ArrayList<>();
        for (ReportOfIllness roi : reports) {
            dtos.add(new ReportOfIllnessDto(roi));
        }

        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<ReportOfIllnessDto>> getReportsByStatus(@PathVariable ReportStatus status) {
        List<ReportOfIllness> reports = reportOfIllnessService.findByStatus(status);

        List<ReportOfIllnessDto> dtos = new ArrayList<>();
        for (ReportOfIllness roi : reports) {
            dtos.add(new ReportOfIllnessDto(roi));
        }

        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @GetMapping("/urgent")
    public ResponseEntity<List<ReportOfIllnessDto>> getUrgentReports() {
        List<ReportOfIllness> reports = reportOfIllnessService.findUrgent();

        List<ReportOfIllnessDto> dtos = new ArrayList<>();
        for (ReportOfIllness roi : reports) {
            dtos.add(new ReportOfIllnessDto(roi));
        }

        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ReportOfIllnessDto> createReport(@RequestBody ReportOfIllness report) {
        try {
            ReportOfIllness created = reportOfIllnessService.save(report);
            ReportOfIllnessDto dto = new ReportOfIllnessDto(created);
            return new ResponseEntity<>(dto, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReportOfIllnessDto> updateReport(@PathVariable Long id, @RequestBody ReportOfIllness report) {
        ReportOfIllness updated = reportOfIllnessService.update(id, report);
        if (updated == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        ReportOfIllnessDto dto = new ReportOfIllnessDto(updated);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @DeleteMapping("/del/{id}")
    public ResponseEntity<ReportOfIllnessDto> deleteReport(@PathVariable Long id) {
        ReportOfIllness report = reportOfIllnessService.deleted(id);
        if (report == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        ReportOfIllnessDto dto = new ReportOfIllnessDto(report);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }
}
