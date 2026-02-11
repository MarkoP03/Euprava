package com.example.Euprava.dto;

import com.example.Euprava.model.Works;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WorksDto {

    private Long id;
    private Long userId;
    private String userName;
    private String userSurname;
    private Long kindergartenId;
    private Integer salary;
    private LocalDate startDate;

    public WorksDto(Works works) {
        this.id = works.getId();
        this.userId = works.getUser().getId();
        this.userName = works.getUser().getName();
        this.userSurname = works.getUser().getSurname();
        this.kindergartenId = works.getKindergarten().getId();
        this.salary = works.getSalary();
        this.startDate = works.getStartDate();
    }
}