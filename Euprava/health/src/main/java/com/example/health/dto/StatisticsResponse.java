package com.example.health.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
public class StatisticsResponse {
    private Map<String, Long> allergiesByType;
    private double percentageOfChildrenWithAllergy;
    private Map<String, Long> urgentIllnessByMonth;
    private Map<String, Long> vaccinesByMonth;


    public StatisticsResponse(
            Map<String, Long> allergiesByType,
            double percentageOfChildrenWithAllergy,
            Map<String, Long> urgentIllnessByMonth,
            Map<String, Long> vaccinesByMonth
    ) {
        this.allergiesByType = allergiesByType;
        this.percentageOfChildrenWithAllergy = percentageOfChildrenWithAllergy;
        this.urgentIllnessByMonth = urgentIllnessByMonth;
        this.vaccinesByMonth = vaccinesByMonth;
    }

}
