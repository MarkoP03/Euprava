package com.example.health.dto;

import com.example.health.model.MedicalRecord;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class MedicalRecordDto {

    private Long id;
    private Long childId;
    private String childName;
    private String childSurname;
    private String childFullName;
    private String parentContact;
    private LocalDateTime lastCheck;
    private Boolean canJoinTheCollective;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public MedicalRecordDto(MedicalRecord medicalRecord) {
        this.id = medicalRecord.getId();
        this.childId = medicalRecord.getChildId();
        this.childName = medicalRecord.getChildName();
        this.childSurname = medicalRecord.getChildSurname();
        this.childFullName = medicalRecord.getChildFullName();
        this.parentContact = medicalRecord.getParentContact();
        this.lastCheck = medicalRecord.getLastCheck();
        this.canJoinTheCollective = medicalRecord.getCanJoinTheCollective();
        this.createdAt = medicalRecord.getCreatedAt();
        this.updatedAt = medicalRecord.getUpdatedAt();
    }
}
