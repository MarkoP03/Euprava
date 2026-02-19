package com.example.health.controller;

import com.example.grpc.CreateNotificationResponse;
import com.example.grpc.GetAllNotificationsResponse;
import com.example.health.dto.NotificationDto;
import com.example.health.dto.NotificationRequest;
import com.example.health.grpc.KindergartenGrpcClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private KindergartenGrpcClient kindergartenGrpcClient;

    @GetMapping
    public ResponseEntity<?> getAllNotifications() {
        try {
            GetAllNotificationsResponse response = kindergartenGrpcClient.getAllNotifications();

            List<NotificationDto> notifications = response.getNotificationsList().stream()
                    .map(n -> new NotificationDto(
                            n.getId(),
                            n.getTitle(),
                            n.getText(),
                            n.getPublishedAt(),
                            n.getVisibleTo()
                    ))
                    .collect(Collectors.toList());

            return ResponseEntity.ok(notifications);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<Void> createNotification(@RequestBody NotificationRequest request) {
        try {
            kindergartenGrpcClient.createNotification(
                    request.getTitle(),
                    request.getText(),
                    request.getVisibleTo()
            );

            return ResponseEntity.ok().build();

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

}
