package com.example.Euprava.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AllergyDto {

    private Long id;
    private String type;
    private String description;
    private String severity;

}
