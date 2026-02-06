package com.example.Euprava.dto;

import com.example.Euprava.model.Notifications;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NotificationsDto {

    private Long id;
    private String title;
    private String text;
    private LocalDateTime publishedAt;
    private LocalDateTime visibleTo;

    public NotificationsDto(Notifications notification) {
        this.id = notification.getId();
        this.title = notification.getTitle();
        this.text = notification.getText();
        this.publishedAt = notification.getPublishedAt();
        this.visibleTo = notification.getVisibleTo();
    }
}