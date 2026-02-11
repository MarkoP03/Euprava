package com.example.Euprava.controller;

import com.example.Euprava.dto.NotificationsDto;
import com.example.Euprava.model.Notifications;
import com.example.Euprava.service.NotificationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationsController {

    private final NotificationsService notificationsService;

    @Autowired
    public NotificationsController(NotificationsService notificationsService) {
        this.notificationsService = notificationsService;
    }

    @GetMapping
    public ResponseEntity<List<NotificationsDto>> getAllNotifications() {
        List<Notifications> notifications = notificationsService.findAll();

        List<NotificationsDto> dtos = new ArrayList<>();
        for (Notifications notification : notifications) {
            dtos.add(new NotificationsDto(notification));
        }

        return ResponseEntity.ok(dtos);
    }

    @PostMapping
    public ResponseEntity<NotificationsDto> createNotification(@RequestBody NotificationsDto dto) {
        Notifications notification = mapToEntity(dto);
        Notifications saved = notificationsService.save(notification);
        return new ResponseEntity<>(new NotificationsDto(saved), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<NotificationsDto> updateNotification(
            @PathVariable Long id,
            @RequestBody NotificationsDto dto) {

        Notifications updated = mapToEntity(dto);
        Notifications result = notificationsService.update(id, updated);

        if (result == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok(new NotificationsDto(result));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotification(@PathVariable Long id) {
        notificationsService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    private Notifications mapToEntity(NotificationsDto dto) {
        Notifications notification = new Notifications();
        notification.setTitle(dto.getTitle());
        notification.setText(dto.getText());
        notification.setVisibleTo(dto.getVisibleTo());
        return notification;
    }
}