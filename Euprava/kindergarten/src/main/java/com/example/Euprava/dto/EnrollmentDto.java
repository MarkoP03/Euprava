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

    private Long childId;
    private Long kindergartenId;
    private EnrollmentStatus status;
    private Long confirmationHealthId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public EnrollmentDto(Enrollment enrollment) {
        this.childId=enrollment.getChild().getId();
        this.kindergartenId=enrollment.getKindergarten().getId();
        this.status=enrollment.getStatus();
        this.confirmationHealthId=enrollment.getConfirmationHealthId();
        this.createdAt=enrollment.getCreatedAt();
        this.updatedAt=enrollment.getUpdatedAt();
    }

}
