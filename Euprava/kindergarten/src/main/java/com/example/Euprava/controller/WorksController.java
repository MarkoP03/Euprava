package com.example.Euprava.controller;

import com.example.Euprava.dto.WorksDto;
import com.example.Euprava.model.Works;
import com.example.Euprava.service.WorksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/works")
public class WorksController {

    private final WorksService worksService;

    @Autowired
    public WorksController(WorksService worksService) {
        this.worksService = worksService;
    }

    @GetMapping
    public ResponseEntity<List<WorksDto>> getAllWorks() {
        List<Works> works = worksService.findAllActive();

        List<WorksDto> dtos = new ArrayList<>();
        for (Works work : works) {
            dtos.add(new WorksDto(work));
        }

        return ResponseEntity.ok(dtos);
    }
    @GetMapping("/kindergarten/{kindergartenId}")
    public ResponseEntity<List<WorksDto>> getWorksByKindergarten(@PathVariable Long kindergartenId) {
        List<Works> works = worksService.findByKindergarten(kindergartenId);

        List<WorksDto> dtos = new ArrayList<>();
        for (Works work : works) {
            dtos.add(new WorksDto(work));
        }

        return ResponseEntity.ok(dtos);
    }

    @PostMapping
    public ResponseEntity<WorksDto> createWorks(@RequestBody WorksDto dto) {
        Works works = new Works();
        works.setSalary(dto.getSalary());

        Works saved = worksService.save(dto.getUserId(), dto.getKindergartenId(), works);
        return new ResponseEntity<>(new WorksDto(saved), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorksDto> updateWorks(
            @PathVariable Long id,
            @RequestBody WorksDto dto) {

        Works updated = new Works();
        updated.setSalary(dto.getSalary());

        Works result = worksService.update(id, dto.getUserId(), dto.getKindergartenId(), updated);

        if (result == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok(new WorksDto(result));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<WorksDto> deleteWorks(@PathVariable Long id) {
        Works deleted = worksService.softDelete(id);
        if (deleted == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(new WorksDto(deleted));
    }
}