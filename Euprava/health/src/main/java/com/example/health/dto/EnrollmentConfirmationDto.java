package com.example.health.dto;

import com.example.health.enums.ConfirmationStatus;
import com.example.health.model.EnrollmentConfirmation;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class EnrollmentConfirmationDto {

    private Long id;
    private Long medicalRecordId;
    private String childName;
    private LocalDateTime issuedAt;
    private LocalDateTime validUntil;
    private ConfirmationStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public EnrollmentConfirmationDto(EnrollmentConfirmation confirmation) {
        this.id = confirmation.getId();
        this.medicalRecordId = confirmation.getMedicalRecord().getId();
        this.childName = confirmation.getMedicalRecord().getChildFullName();
        this.issuedAt = confirmation.getIssuedAt();
        this.validUntil = confirmation.getValidUntil();
        this.status = confirmation.getStatus();
        this.createdAt = confirmation.getCreatedAt();
        this.updatedAt = confirmation.getUpdatedAt();
    }
}
