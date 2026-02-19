package com.example.health.grpc;

import com.example.grpc.*;
import net.devh.boot.grpc.client.inject.GrpcClient;
import org.springframework.stereotype.Component;

@Component
public class KindergartenGrpcClient {

    @GrpcClient("kindergarten-service")
    private KindergartenServiceGrpc.KindergartenServiceBlockingStub kindergartenServiceStub;

    public GetAllNotificationsResponse getAllNotifications() {
        GetAllNotificationsRequest request = GetAllNotificationsRequest.newBuilder().build();

        GetAllNotificationsResponse response = kindergartenServiceStub.getAllNotifications(request);

        if (!response.getSuccess()) {
            throw new RuntimeException("Failed to fetch notifications: " + response.getMessage());
        }

        return response;
    }
    public CreateNotificationResponse createNotification(String title, String text, String visibleTo) {
        CreateNotificationRequest request = CreateNotificationRequest.newBuilder()
                .setTitle(title)
                .setText(text)
                .setVisibleTo(visibleTo != null ? visibleTo : "")
                .build();

        CreateNotificationResponse response = kindergartenServiceStub.createNotification(request);

        if (!response.getSuccess()) {
            throw new RuntimeException("Failed to create notification: " + response.getMessage());
        }

        return response;
    }

    public void suspendChild(Long childId) {
        SuspendChildRequest request = SuspendChildRequest.newBuilder()
                .setChildId(childId)
                .build();

        SuspendChildResponse response = kindergartenServiceStub.suspendChild(request);

        if (!response.getSuccess()) {
            throw new RuntimeException("Failed to suspend child: " + response.getMessage());
        }
    }

    public void reactivateChild(Long childId) {
        ReactivateChildRequest request = ReactivateChildRequest.newBuilder()
                .setChildId(childId)
                .build();

        ReactivateChildResponse response = kindergartenServiceStub.reactivateChild(request);

        if (!response.getSuccess()) {
            throw new RuntimeException("Failed to reactivate child: " + response.getMessage());
        }
    }
}