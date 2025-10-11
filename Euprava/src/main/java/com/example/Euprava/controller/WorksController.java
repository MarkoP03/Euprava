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
        List<Works> worksList = worksService.findByDeletedFalse();

        List<WorksDto> dtos = new ArrayList<>();
        for (Works w : worksList) {
            dtos.add(new WorksDto(w));
        }

        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    // DELETE: obriši work po ID
    @DeleteMapping("/del/{worksId}")
    public ResponseEntity<WorksDto> deleteWorks(@PathVariable Long worksId) {
        Works works = worksService.deleted(worksId);
        if (works == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        WorksDto worksDto = new WorksDto(works);
        return new ResponseEntity<>(worksDto, HttpStatus.OK);
    }
}
