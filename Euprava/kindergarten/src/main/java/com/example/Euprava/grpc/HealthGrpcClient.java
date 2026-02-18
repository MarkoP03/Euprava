package com.example.Euprava.grpc;

import com.example.grpc.*;
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

    public CheckEnrollmentEligibilityResponse checkEnrollmentEligibility(Long childId) {
        CheckEnrollmentEligibilityRequest request = CheckEnrollmentEligibilityRequest.newBuilder()
                .setChildId(childId)
                .build();

        return healthServiceStub.checkEnrollmentEligibility(request);
    }

    public GetChildAllergiesResponse getChildAllergies(Long childId) {
        GetChildAllergiesRequest request = GetChildAllergiesRequest.newBuilder()
                .setChildId(childId)
                .build();

        return healthServiceStub.getChildAllergies(request);
    }

    public GetChildIllnessReportsResponse getChildIllnessReports(Long childId) {
        GetChildIllnessReportsRequest request = GetChildIllnessReportsRequest.newBuilder()
                .setChildId(childId)
                .build();

        return healthServiceStub.getChildIllnessReports(request);
    }

    public CreateIllnessReportResponse createIllnessReport(Long childId, String problem, Boolean urgent) {
        CreateIllnessReportRequest request = CreateIllnessReportRequest.newBuilder()
                .setChildId(childId)
                .setProblem(problem)
                .setUrgent(urgent)
                .build();

        return healthServiceStub.createIllnessReport(request);
    }
}