package com.example.health.dto;

import com.example.health.model.DoctorReport;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class DoctorReportDto {

    private Long id;
    private Long medicalRecordId;
    private String childName;
    private LocalDateTime date;
    private String diagnosis;
    private String recommendation;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public DoctorReportDto(DoctorReport report) {
        this.id = report.getId();
        this.medicalRecordId = report.getMedicalRecord().getId();
        this.childName = report.getMedicalRecord().getChildFullName();
        this.date = report.getDate();
        this.diagnosis = report.getDiagnosis();
        this.recommendation = report.getRecommendation();
        this.createdAt = report.getCreatedAt();
        this.updatedAt = report.getUpdatedAt();
    }
}
