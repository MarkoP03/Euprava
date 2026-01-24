package com.example.Euprava.dto;

import com.example.Euprava.model.Child;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChildDto {

    private String jmbg;
    private String name;
    private String surname;
    private LocalDateTime birthDate;
    private String parentName;
    private String parentSurname;
    private String parentContact;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public ChildDto(Child child) {
        this.jmbg = child.getJmbg();
        this.name = child.getName();
        this.surname = child.getSurname();
        this.birthDate = child.getBirthDate();
        this.parentName = child.getParentName();
        this.parentSurname = child.getParentSurname();
        this.parentContact = child.getParentContact();
        this.createdAt = child.getCreatedAt();
        this.updatedAt = child.getUpdatedAt();
    }

}
