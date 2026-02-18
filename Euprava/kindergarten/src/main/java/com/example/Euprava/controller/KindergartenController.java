package com.example.Euprava.controller;

import com.example.Euprava.dto.KindergartenDto;
import com.example.Euprava.dto.StatisticsResponse;
import com.example.Euprava.grpc.HealthGrpcClient;
import com.example.Euprava.model.Kindergarten;
import com.example.Euprava.service.KindergartenService;
import com.example.grpc.GetStatisticsResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

@RestController
@RequestMapping("/api/kindergartens")
public class KindergartenController {

    private final KindergartenService kindergartenService;
    private final HealthGrpcClient healthGrpcClient;

    @Autowired
    public KindergartenController(KindergartenService kindergartenService, HealthGrpcClient healthGrpcClient) {
        this.kindergartenService = kindergartenService;
        this.healthGrpcClient = healthGrpcClient;
    }

    @GetMapping
    public ResponseEntity<List<KindergartenDto>> getAllKindergartens() {
        List<Kindergarten> kindergartens = kindergartenService.findAllActive();

        List<KindergartenDto> dtos = new ArrayList<>();
        for (Kindergarten k : kindergartens) {
            dtos.add(new KindergartenDto(k));
        }

        return ResponseEntity.ok(dtos);
    }

    @PostMapping
    public ResponseEntity<KindergartenDto> createKindergarten(@RequestBody KindergartenDto dto) {
        Kindergarten kindergarten = mapToEntity(dto);
        Kindergarten saved = kindergartenService.save(kindergarten);
        return new ResponseEntity<>(new KindergartenDto(saved), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<KindergartenDto> updateKindergarten(
            @PathVariable Long id,
            @RequestBody KindergartenDto dto) {

        Kindergarten updated = mapToEntity(dto);
        Kindergarten result = kindergartenService.update(id, updated);

        if (result == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok(new KindergartenDto(result));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<KindergartenDto> deleteKindergarten(@PathVariable Long id) {
        Kindergarten deleted = kindergartenService.softDelete(id);
        if (deleted == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(new KindergartenDto(deleted));
    }

    private Kindergarten mapToEntity(KindergartenDto dto) {
        Kindergarten kindergarten = new Kindergarten();
        kindergarten.setName(dto.getName());
        kindergarten.setAddress(dto.getAddress());
        kindergarten.setLat(dto.getLat());
        kindergarten.setLng(dto.getLng());
        return kindergarten;
    }
    @GetMapping("/statistics")
    public ResponseEntity<StatisticsResponse> getStatistics() {
        GetStatisticsResponse grpcResponse = healthGrpcClient.getStatistics();

        StatisticsResponse response = mapGrpcToDto(grpcResponse);

        return ResponseEntity.ok(response);
    }


    private StatisticsResponse mapGrpcToDto(GetStatisticsResponse grpc) {
        StatisticsResponse dto = new StatisticsResponse();

        dto.setAllergiesByType(new LinkedHashMap<>(grpc.getAllergiesByTypeMap()));

        dto.setPercentageOfChildrenWithAllergy(grpc.getPercentageOfChildrenWithAllergy());

        dto.setUrgentIllnessByMonth(new LinkedHashMap<>(grpc.getUrgentIllnessByMonthMap()));

        dto.setVaccinesByMonth(new LinkedHashMap<>(grpc.getVaccinesByMonthMap()));

        return dto;
    }

}