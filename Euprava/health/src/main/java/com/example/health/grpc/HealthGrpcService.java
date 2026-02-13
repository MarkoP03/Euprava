package com.example.health.grpc;

import com.example.grpc.CreateMedicalRecordRequest;
import com.example.grpc.CreateMedicalRecordResponse;
import com.example.grpc.HealthServiceGrpc;
import com.example.health.model.MedicalRecord;
import com.example.health.service.MedicalRecordService;
import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.server.service.GrpcService;
import org.springframework.beans.factory.annotation.Autowired;

@GrpcService
public class HealthGrpcService extends HealthServiceGrpc.HealthServiceImplBase {

    @Autowired
    private MedicalRecordService medicalRecordService;

    @Override
    public void createMedicalRecord(CreateMedicalRecordRequest request,
                                    StreamObserver<CreateMedicalRecordResponse> responseObserver) {
        try {
            MedicalRecord record = new MedicalRecord();
            record.setChildId(request.getChildId());
            record.setChildName(request.getChildName());
            record.setChildSurname(request.getChildSurname());
            record.setParentContact(request.getParentContact());

            MedicalRecord saved = medicalRecordService.save(record);

            CreateMedicalRecordResponse response = CreateMedicalRecordResponse.newBuilder()
                    .setId(saved.getId())
                    .setChildId(saved.getChildId())
                    .setSuccess(true)
                    .setMessage("Medical record created successfully")
                    .build();

            responseObserver.onNext(response);
            responseObserver.onCompleted();

        } catch (Exception e) {
            CreateMedicalRecordResponse response = CreateMedicalRecordResponse.newBuilder()
                    .setSuccess(false)
                    .setMessage(e.getMessage())
                    .build();
            responseObserver.onNext(response);
            responseObserver.onCompleted();
        }
    }
}