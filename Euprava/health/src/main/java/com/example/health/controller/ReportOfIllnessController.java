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
        List<ReportOfIllness> reports =
                reportOfIllnessService.findAllActive();

        List<ReportOfIllnessDto> dtos = new ArrayList<>();
        for (ReportOfIllness roi : reports) {
            dtos.add(new ReportOfIllnessDto(roi));
        }

        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReportOfIllnessDto> getReportById(@PathVariable Long id) {
        ReportOfIllness report = reportOfIllnessService.findById(id);
        if (report == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(new ReportOfIllnessDto(report));
    }

    @GetMapping("/medical-record/{medicalRecordId}")
    public ResponseEntity<List<ReportOfIllnessDto>> getReportsByMedicalRecordId(
            @PathVariable Long medicalRecordId) {

        List<ReportOfIllness> reports =
                reportOfIllnessService
                        .findByMedicalRecordIdAndDeletedFalse(medicalRecordId);

        List<ReportOfIllnessDto> dtos = new ArrayList<>();
        for (ReportOfIllness roi : reports) {
            dtos.add(new ReportOfIllnessDto(roi));
        }

        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<ReportOfIllnessDto>> getReportsByStatus(
            @PathVariable ReportStatus status) {

        List<ReportOfIllness> reports =
                reportOfIllnessService.findByStatus(status);

        List<ReportOfIllnessDto> dtos = new ArrayList<>();
        for (ReportOfIllness roi : reports) {
            dtos.add(new ReportOfIllnessDto(roi));
        }

        return ResponseEntity.ok(dtos);
    }



    @PutMapping("/{id}")
    public ResponseEntity<ReportOfIllnessDto> updateReport(
            @PathVariable Long id,
            @RequestBody ReportOfIllnessDto dto) {

        ReportOfIllness updated = new ReportOfIllness();
        updated.setStatus(dto.getStatus());
        updated.setProblem(dto.getProblem());
        updated.setAnswer(dto.getAnswer());
        updated.setUrgent(dto.getUrgent());

        ReportOfIllness result =
                reportOfIllnessService.update(
                        id,
                        dto.getMedicalRecordId(),
                        updated
                );

        return ResponseEntity.ok(new ReportOfIllnessDto(result));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ReportOfIllnessDto> deleteReport(@PathVariable Long id) {
        ReportOfIllness deleted =
                reportOfIllnessService.softDelete(id);

        return ResponseEntity.ok(new ReportOfIllnessDto(deleted));
    }
}

