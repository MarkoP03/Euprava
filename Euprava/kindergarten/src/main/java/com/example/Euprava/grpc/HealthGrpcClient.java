package com.example.Euprava.grpc;

import com.example.grpc.CreateMedicalRecordRequest;
import com.example.grpc.CreateMedicalRecordResponse;
import com.example.grpc.HealthServiceGrpc;
import net.devh.boot.grpc.client.inject.GrpcClient;
import org.springframework.stereotype.Component;

@Component
public class HealthGrpcClient {

    @GrpcClient("health-service")
    private HealthServiceGrpc.HealthServiceBlockingStub healthServiceStub;

    public void createMedicalRecord(Long childId, String childName,
                                    String childSurname, String parentContact) {
        CreateMedicalRecordRequest request = CreateMedicalRecordRequest.newBuilder()
                .setChildId(childId)
                .setChildName(childName)
                .setChildSurname(childSurname)
                .setParentContact(parentContact)
                .build();

        CreateMedicalRecordResponse response = healthServiceStub.createMedicalRecord(request);

        if (!response.getSuccess()) {
            throw new RuntimeException("Failed to create medical record: " + response.getMessage());
        }
    }
}