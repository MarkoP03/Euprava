package com.example.Euprava.grpc;

import com.example.Euprava.service.EnrollmentService;
import com.example.grpc.*;
import com.example.Euprava.model.Notifications;
import com.example.Euprava.service.NotificationsService;
import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.server.service.GrpcService;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.List;

@GrpcService
public class KindergartenGrpcService extends KindergartenServiceGrpc.KindergartenServiceImplBase {

    @Autowired
    private NotificationsService notificationsService;

    @Autowired
    private EnrollmentService enrollmentService;

    @Override
    public void getAllNotifications(GetAllNotificationsRequest request,
                                    StreamObserver<GetAllNotificationsResponse> responseObserver) {
        try {
            List<Notifications> notifications = notificationsService.findAll();

            GetAllNotificationsResponse.Builder responseBuilder = GetAllNotificationsResponse.newBuilder()
                    .setSuccess(true)
                    .setMessage("Pronađeno " + notifications.size() + " notifikacija");

            for (Notifications notification : notifications) {
                NotificationInfo info = NotificationInfo.newBuilder()
                        .setId(notification.getId())
                        .setTitle(notification.getTitle())
                        .setText(notification.getText())
                        .setPublishedAt(notification.getPublishedAt().toString())
                        .setVisibleTo(notification.getVisibleTo() != null ? notification.getVisibleTo().toString() : "")
                        .build();
                responseBuilder.addNotifications(info);
            }

            responseObserver.onNext(responseBuilder.build());
            responseObserver.onCompleted();

        } catch (Exception e) {
            GetAllNotificationsResponse response = GetAllNotificationsResponse.newBuilder()
                    .setSuccess(false)
                    .setMessage("Greška pri učitavanju notifikacija: " + e.getMessage())
                    .build();
            responseObserver.onNext(response);
            responseObserver.onCompleted();
        }
    }

    @Override
    public void createNotification(CreateNotificationRequest request,
                                   StreamObserver<CreateNotificationResponse> responseObserver) {
        try {
            Notifications notification = new Notifications();
            notification.setTitle(request.getTitle());
            notification.setText(request.getText());

            if (request.getVisibleTo() != null && !request.getVisibleTo().isBlank()) {
                notification.setVisibleTo(LocalDateTime.parse(request.getVisibleTo()));
            }

            Notifications saved = notificationsService.save(notification);

            CreateNotificationResponse response = CreateNotificationResponse.newBuilder()
                    .setSuccess(true)
                    .setMessage("Notification created successfully")
                    .setId(saved.getId())
                    .build();

            responseObserver.onNext(response);
            responseObserver.onCompleted();

        } catch (Exception e) {
            CreateNotificationResponse response = CreateNotificationResponse.newBuilder()
                    .setSuccess(false)
                    .setMessage("Error creating notification: " + e.getMessage())
                    .build();
            responseObserver.onNext(response);
            responseObserver.onCompleted();
        }
    }

    @Override
    public void suspendChild(SuspendChildRequest request,
                             StreamObserver<SuspendChildResponse> responseObserver) {
        try {
            enrollmentService.suspendChild(request.getChildId());

            SuspendChildResponse response = SuspendChildResponse.newBuilder()
                    .setSuccess(true)
                    .setMessage("Dete uspešno suspendovano")
                    .build();

            responseObserver.onNext(response);
            responseObserver.onCompleted();

        } catch (Exception e) {
            SuspendChildResponse response = SuspendChildResponse.newBuilder()
                    .setSuccess(false)
                    .setMessage("Greška pri suspenziji deteta: " + e.getMessage())
                    .build();
            responseObserver.onNext(response);
            responseObserver.onCompleted();
        }
    }

    @Override
    public void reactivateChild(ReactivateChildRequest request,
                                StreamObserver<ReactivateChildResponse> responseObserver) {
        try {
            enrollmentService.reactivateChild(request.getChildId());

            ReactivateChildResponse response = ReactivateChildResponse.newBuilder()
                    .setSuccess(true)
                    .setMessage("Dete uspešno reaktivirano")
                    .build();

            responseObserver.onNext(response);
            responseObserver.onCompleted();

        } catch (Exception e) {
            ReactivateChildResponse response = ReactivateChildResponse.newBuilder()
                    .setSuccess(false)
                    .setMessage("Greška pri reaktivaciji deteta: " + e.getMessage())
                    .build();
            responseObserver.onNext(response);
            responseObserver.onCompleted();
        }
    }
}