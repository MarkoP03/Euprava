package com.example.health.controller;

import com.example.health.grpc.KindergartenGrpcClient;
import com.example.health.service.MedicalRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/children")
public class ChildStatusController {

    @Autowired
    private KindergartenGrpcClient kindergartenGrpcClient;

    @Autowired
    private MedicalRecordService medicalRecordService;

    @PutMapping("/{childId}/suspend")
    public ResponseEntity<?> suspendChild(@PathVariable Long childId) {
        try {
            kindergartenGrpcClient.suspendChild(childId);
            medicalRecordService.suspendChild(childId);
            return ResponseEntity.ok("Dete uspešno suspendovano");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{childId}/reactivate")
    public ResponseEntity<?> reactivateChild(@PathVariable Long childId) {
        try {
            kindergartenGrpcClient.reactivateChild(childId);
            medicalRecordService.reactivateChild(childId);
            return ResponseEntity.ok("Dete uspešno reaktivirano");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}