package com.example.health.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "MEDICAL_RECORD")
public class MedicalRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "child_id", nullable = false)
    private Long childId;

    @Column(name = "child_name", nullable = false)
    private String childName;

    @Column(name = "child_surname", nullable = false)
    private String childSurname;

    @Column(name = "parent_contact", nullable = false)
    private String parentContact;

    @Column(name = "last_check")
    private LocalDateTime lastCheck;

    @Column(name = "can_join_collective", nullable = false)
    private Boolean canJoinTheCollective;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Column(name = "deleted")
    private Boolean deleted;

    public String getChildFullName() {
        return childName + " " + childSurname;
    }
}