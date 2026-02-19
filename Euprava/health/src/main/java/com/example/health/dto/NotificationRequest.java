package com.example.health.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class NotificationRequest {
    private String title;
    private String text;
    private String visibleTo; // optional ISO datetime, e.g. "2025-06-01T00:00:00"
}