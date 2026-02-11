package com.example.Euprava.dto;

import com.example.Euprava.enums.EnrollmentStatus;
import com.example.Euprava.model.Enrollment;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EnrollmentDto {
    private Long id;
    private Long childId;
    private String childName;
    private String childSurname;
    private Long kindergartenId;
    private String kindergartenName;
    private EnrollmentStatus status;
    private Long confirmationHealthId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public EnrollmentDto(Enrollment enrollment) {
        this.id = enrollment.getId();
        this.childId=enrollment.getChild().getId();
        this.childName = enrollment.getChild().getName();
        this.childSurname = enrollment.getChild().getSurname();
        this.kindergartenId=enrollment.getKindergarten().getId();
        this.kindergartenName = enrollment.getKindergarten().getName();
        this.status=enrollment.getStatus();
        this.confirmationHealthId=enrollment.getConfirmationHealthId();
        this.createdAt=enrollment.getCreatedAt();
        this.updatedAt=enrollment.getUpdatedAt();
    }

}
