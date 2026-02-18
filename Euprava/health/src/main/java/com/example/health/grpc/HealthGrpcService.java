package com.example.health.grpc;

import com.example.grpc.*;
import com.example.health.enums.ConfirmationStatus;
import com.example.health.model.Allergy;
import com.example.health.model.EnrollmentConfirmation;
import com.example.health.model.MedicalRecord;
import com.example.health.model.ReportOfIllness;
import com.example.health.service.AllergyService;
import com.example.health.service.EnrollmentConfirmationService;
import com.example.health.service.MedicalRecordService;
import com.example.health.service.ReportOfIllnessService;
import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.server.service.GrpcService;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.List;

@GrpcService
public class HealthGrpcService extends HealthServiceGrpc.HealthServiceImplBase {

    @Autowired
    private MedicalRecordService medicalRecordService;

    @Autowired
    private EnrollmentConfirmationService enrollmentConfirmationService;

    @Autowired
    private AllergyService allergyService;

    @Autowired
    private ReportOfIllnessService reportOfIllnessService;

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

    @Override
    public void checkEnrollmentEligibility(CheckEnrollmentEligibilityRequest request,
                                           StreamObserver<CheckEnrollmentEligibilityResponse> responseObserver) {
        try {
            EnrollmentConfirmation confirmation = enrollmentConfirmationService.findByChildId(request.getChildId());

            if (confirmation == null) {
                CheckEnrollmentEligibilityResponse response = CheckEnrollmentEligibilityResponse.newBuilder()
                        .setEligible(false)
                        .setMessage("Potvrda za upis nije pronađena za ovo dete")
                        .build();
                responseObserver.onNext(response);
                responseObserver.onCompleted();
                return;
            }

            if (confirmation.getStatus() != ConfirmationStatus.ACTIVE) {
                CheckEnrollmentEligibilityResponse response = CheckEnrollmentEligibilityResponse.newBuilder()
                        .setEligible(false)
                        .setMessage("Potvrda za upis nije aktivna. Status: " + confirmation.getStatus())
                        .build();
                responseObserver.onNext(response);
                responseObserver.onCompleted();
                return;
            }

            if (confirmation.getValidUntil().isBefore(LocalDateTime.now())) {
                CheckEnrollmentEligibilityResponse response = CheckEnrollmentEligibilityResponse.newBuilder()
                        .setEligible(false)
                        .setMessage("Potvrda za upis je istekla. Važila do: " + confirmation.getValidUntil())
                        .build();
                responseObserver.onNext(response);
                responseObserver.onCompleted();
                return;
            }

            CheckEnrollmentEligibilityResponse response = CheckEnrollmentEligibilityResponse.newBuilder()
                    .setEligible(true)
                    .setMessage("Dete ispunjava uslove za upis u vrtić")
                    .setConfirmationId(confirmation.getId())
                    .build();

            responseObserver.onNext(response);
            responseObserver.onCompleted();

        } catch (Exception e) {
            CheckEnrollmentEligibilityResponse response = CheckEnrollmentEligibilityResponse.newBuilder()
                    .setEligible(false)
                    .setMessage("Greška pri proveri uslova za upis: " + e.getMessage())
                    .build();
            responseObserver.onNext(response);
            responseObserver.onCompleted();
        }
    }

    @Override
    public void getChildAllergies(GetChildAllergiesRequest request,
                                  StreamObserver<GetChildAllergiesResponse> responseObserver) {
        try {
            List<Allergy> allergies = allergyService.findByChildId(request.getChildId());

            if (allergies.isEmpty()) {
                GetChildAllergiesResponse response = GetChildAllergiesResponse.newBuilder()
                        .setSuccess(true)
                        .setMessage("Dete nema evidentirane alergije")
                        .build();
                responseObserver.onNext(response);
                responseObserver.onCompleted();
                return;
            }

            GetChildAllergiesResponse.Builder responseBuilder = GetChildAllergiesResponse.newBuilder()
                    .setSuccess(true)
                    .setMessage("Pronađeno " + allergies.size() + " alergija");

            for (Allergy allergy : allergies) {
                AllergyInfo allergyInfo = AllergyInfo.newBuilder()
                        .setId(allergy.getId())
                        .setType(allergy.getType().toString())
                        .setDescription(allergy.getDescription())
                        .setSeverity(allergy.getSeverity().toString())
                        .build();
                responseBuilder.addAllergies(allergyInfo);
            }

            responseObserver.onNext(responseBuilder.build());
            responseObserver.onCompleted();

        } catch (Exception e) {
            GetChildAllergiesResponse response = GetChildAllergiesResponse.newBuilder()
                    .setSuccess(false)
                    .setMessage("Greška pri učitavanju alergija: " + e.getMessage())
                    .build();
            responseObserver.onNext(response);
            responseObserver.onCompleted();
        }
    }



    @Override
    public void getChildIllnessReports(GetChildIllnessReportsRequest request,
                                       StreamObserver<GetChildIllnessReportsResponse> responseObserver) {
        try {
            List<ReportOfIllness> reports = reportOfIllnessService.findByChildId(request.getChildId());

            if (reports.isEmpty()) {
                GetChildIllnessReportsResponse response = GetChildIllnessReportsResponse.newBuilder()
                        .setSuccess(true)
                        .setMessage("Dete nema evidentirane prijave bolesti")
                        .build();
                responseObserver.onNext(response);
                responseObserver.onCompleted();
                return;
            }

            GetChildIllnessReportsResponse.Builder responseBuilder = GetChildIllnessReportsResponse.newBuilder()
                    .setSuccess(true)
                    .setMessage("Pronađeno " + reports.size() + " prijava");

            for (ReportOfIllness report : reports) {
                IllnessReportInfo reportInfo = IllnessReportInfo.newBuilder()
                        .setId(report.getId())
                        .setStatus(report.getStatus().toString())
                        .setProblem(report.getProblem())
                        .setAnswer(report.getAnswer() != null ? report.getAnswer() : "")
                        .setUrgent(report.getUrgent())
                        .setCreatedAt(report.getCreatedAt().toString())
                        .build();
                responseBuilder.addReports(reportInfo);
            }

            responseObserver.onNext(responseBuilder.build());
            responseObserver.onCompleted();

        } catch (Exception e) {
            GetChildIllnessReportsResponse response = GetChildIllnessReportsResponse.newBuilder()
                    .setSuccess(false)
                    .setMessage("Greška pri učitavanju prijava bolesti: " + e.getMessage())
                    .build();
            responseObserver.onNext(response);
            responseObserver.onCompleted();
        }
    }

    @Override
    public void createIllnessReport(CreateIllnessReportRequest request,
                                    StreamObserver<CreateIllnessReportResponse> responseObserver) {
        try {
            ReportOfIllness report = reportOfIllnessService.createForChild(
                    request.getChildId(),
                    request.getProblem(),
                    request.getUrgent()
            );

            CreateIllnessReportResponse response = CreateIllnessReportResponse.newBuilder()
                    .setSuccess(true)
                    .setMessage("Prijava bolesti uspešno kreirana")
                    .setReportId(report.getId())
                    .build();

            responseObserver.onNext(response);
            responseObserver.onCompleted();

        } catch (Exception e) {
            CreateIllnessReportResponse response = CreateIllnessReportResponse.newBuilder()
                    .setSuccess(false)
                    .setMessage("Greška pri kreiranju prijave bolesti: " + e.getMessage())
                    .build();
            responseObserver.onNext(response);
            responseObserver.onCompleted();
        }
    }
}