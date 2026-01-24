package com.example.health.dto;

import com.example.health.model.Vaccine;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class VaccineDto {

    private Long id;
    private Long medicalRecordId;
    private String childName;
    private String name;
    private LocalDateTime date;
    private String note;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public VaccineDto(Vaccine vaccine) {
        this.id = vaccine.getId();
        this.medicalRecordId = vaccine.getMedicalRecord().getId();
        this.childName = vaccine.getMedicalRecord().getChildFullName();
        this.name = vaccine.getName();
        this.date = vaccine.getDate();
        this.note = vaccine.getNote();
        this.createdAt = vaccine.getCreatedAt();
        this.updatedAt = vaccine.getUpdatedAt();
    }
}
