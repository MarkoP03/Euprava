package com.example.Euprava.dto;

import com.example.Euprava.model.Notifications;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NotificationsDto {

    private String title;
    private String text;
    private LocalDateTime publishedAt;
    private LocalDateTime visibleTo;

    NotificationsDto(Notifications notifications) {
        this.title = notifications.getTitle();
        this.text = notifications.getText();
        this.publishedAt = notifications.getPublishedAt();
        this.visibleTo = notifications.getVisibleTo();
    }
}
