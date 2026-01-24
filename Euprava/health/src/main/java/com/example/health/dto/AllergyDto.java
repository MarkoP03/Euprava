package com.example.health.dto;

import com.example.health.enums.AllergyType;
import com.example.health.model.Allergy;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class AllergyDto {

    private Long id;
    private Long medicalRecordId;
    private String childName;
    private AllergyType type;
    private String description;
    private String severity;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public AllergyDto(Allergy allergy) {
        this.id = allergy.getId();
        this.medicalRecordId = allergy.getMedicalRecord().getId();
        this.childName = allergy.getMedicalRecord().getChildFullName();
        this.type = allergy.getType();
        this.description = allergy.getDescription();
        this.severity = allergy.getSeverity();
        this.createdAt = allergy.getCreatedAt();
        this.updatedAt = allergy.getUpdatedAt();
    }
}
