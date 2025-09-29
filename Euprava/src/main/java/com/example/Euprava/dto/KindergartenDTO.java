package com.example.Euprava.dto;

import com.example.Euprava.model.Kindergarten;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class KindergartenDTO {

    private String name;
    private String address;
    private Double lat;
    private Double lng;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    KindergartenDTO(Kindergarten kindergarten) {
        this.name = kindergarten.getName();
        this.address = kindergarten.getAddress();
        this.lat = kindergarten.getLat();
        this.lng = kindergarten.getLng();
        this.createdAt = kindergarten.getCreatedAt();
        this.updatedAt = kindergarten.getUpdatedAt();
    }
}
