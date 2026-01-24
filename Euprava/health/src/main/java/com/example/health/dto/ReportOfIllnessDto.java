package com.example.health.dto;

import com.example.health.enums.ReportStatus;
import com.example.health.model.ReportOfIllness;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class ReportOfIllnessDto {

    private Long id;
    private Long medicalRecordId;
    private String childName;
    private ReportStatus status;
    private String problem;
    private String answer;
    private Boolean urgent;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public ReportOfIllnessDto(ReportOfIllness report) {
        this.id = report.getId();
        this.medicalRecordId = report.getMedicalRecord().getId();
        this.childName = report.getMedicalRecord().getChildFullName();
        this.status = report.getStatus();
        this.problem = report.getProblem();
        this.answer = report.getAnswer();
        this.urgent = report.getUrgent();
        this.createdAt = report.getCreatedAt();
        this.updatedAt = report.getUpdatedAt();
    }
}
