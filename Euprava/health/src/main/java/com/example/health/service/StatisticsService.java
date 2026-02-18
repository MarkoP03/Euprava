package com.example.health.service;

import org.springframework.stereotype.Service;
import com.example.health.dto.StatisticsResponse;
import com.example.health.repository.AllergyRepository;
import com.example.health.repository.MedicalRecordRepository;
import com.example.health.repository.ReportOfIllnessRepository;
import com.example.health.repository.VaccineRepository;

import java.time.LocalDate;
import java.time.Month;
import java.time.format.TextStyle;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

@Service
public class StatisticsService {

    private final AllergyRepository allergyRepository;
    private final MedicalRecordRepository medicalRecordRepository;
    private final ReportOfIllnessRepository reportOfIllnessRepository;
    private final VaccineRepository vaccineRepository;

    public StatisticsService(
            AllergyRepository allergyRepository,
            MedicalRecordRepository medicalRecordRepository,
            ReportOfIllnessRepository reportOfIllnessRepository,
            VaccineRepository vaccineRepository
    ) {
        this.allergyRepository = allergyRepository;
        this.medicalRecordRepository = medicalRecordRepository;
        this.reportOfIllnessRepository = reportOfIllnessRepository;
        this.vaccineRepository = vaccineRepository;
    }

    public StatisticsResponse getStatistics() {
        return new StatisticsResponse(
                getAllergiesByType(),
                getPercentageOfChildrenWithAllergy(),
                getUrgentIllnessByMonth(),
                getVaccinesByMonth()
        );
    }

    private Map<String, Long> getAllergiesByType() {
        List<Object[]> results = allergyRepository.countByType();
        Map<String, Long> map = new LinkedHashMap<>();
        for (Object[] row : results) {
            String type = row[0].toString();
            Long count = (Long) row[1];
            map.put(type, count);
        }
        return map;
    }

    private double getPercentageOfChildrenWithAllergy() {
        long totalChildren = medicalRecordRepository.count();
        if (totalChildren == 0) return 0.0;

        long childrenWithAllergy = allergyRepository.countDistinctMedicalRecords();
        return Math.round(((double) childrenWithAllergy / totalChildren) * 100.0 * 10) / 10.0;
    }

    private Map<String, Long> getUrgentIllnessByMonth() {
        int lastYear = LocalDate.now().getYear() - 1;
        List<Object[]> results = reportOfIllnessRepository.countUrgentByMonth(lastYear);
        return mapMonthResults(results);
    }

    private Map<String, Long> getVaccinesByMonth() {
        int lastYear = LocalDate.now().getYear() - 1;
        List<Object[]> results = vaccineRepository.countByMonth(lastYear);
        return mapMonthResults(results);
    }

    private Map<String, Long> mapMonthResults(List<Object[]> results) {
        Map<String, Long> map = new LinkedHashMap<>();
        Locale latinLocale = Locale.forLanguageTag("sr-Latn");

        for (Month m : Month.values()) {
            map.put(m.getDisplayName(TextStyle.FULL, latinLocale), 0L);
        }

        for (Object[] row : results) {
            int monthNumber = ((Number) row[0]).intValue();
            Long count = ((Number) row[1]).longValue();
            String monthName = Month.of(monthNumber)
                    .getDisplayName(TextStyle.FULL, latinLocale);
            map.put(monthName, count);
        }

        return map;
    }

}
