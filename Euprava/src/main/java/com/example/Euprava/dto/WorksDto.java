package com.example.Euprava.dto;

import com.example.Euprava.model.Works;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WorksDto {

    private Long id;
    private Long userId;
    private Long kindergartenId;
    private Integer salary;

    public WorksDto(Works works) {
        this.id = works.getId();
        this.userId = works.getUser().getId();
        this.kindergartenId = works.getKindergarten().getId();
        this.salary = works.getSalary();
    }
}
