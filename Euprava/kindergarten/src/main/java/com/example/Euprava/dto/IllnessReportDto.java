package com.example.Euprava.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class IllnessReportDto {

    private Long id;
    private String status;
    private String problem;
    private String answer;
    private boolean urgent;
    private String createdAt;

}