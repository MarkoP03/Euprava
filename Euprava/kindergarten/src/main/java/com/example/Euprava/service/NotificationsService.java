package com.example.Euprava.service;

import com.example.Euprava.exception.BadRequestException;
import com.example.Euprava.model.Notifications;
import com.example.Euprava.repository.NotificationsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationsService {

    @Autowired
    private NotificationsRepository notificationsRepository;

    public List<Notifications> findAll() {
        return notificationsRepository.findAll();
    }

    public Notifications findById(Long id) {
        return notificationsRepository.findById(id).orElse(null);
    }

    public Notifications save(Notifications notification) {
        if (notification == null) {
            throw new BadRequestException("Notification payload is required");
        }
        if (notification.getTitle() == null || notification.getTitle().isBlank()) {
            throw new BadRequestException("Title is required");
        }
        if (notification.getText() == null || notification.getText().isBlank()) {
            throw new BadRequestException("Text is required");
        }

        notification.setId(null);
        notification.setPublishedAt(LocalDateTime.now());

        return notificationsRepository.save(notification);
    }

    public Notifications update(Long id, Notifications updated) {
        Notifications existing = notificationsRepository.findById(id).orElse(null);
        if (existing == null) {
            throw new BadRequestException("Notification not found");
        }

        existing.setTitle(updated.getTitle());
        existing.setText(updated.getText());
        existing.setVisibleTo(updated.getVisibleTo());

        return notificationsRepository.save(existing);
    }

    public void delete(Long id) {
        Notifications notification = notificationsRepository.findById(id).orElse(null);
        if (notification == null) {
            throw new BadRequestException("Notification not found");
        }

        notificationsRepository.delete(notification);
    }
}