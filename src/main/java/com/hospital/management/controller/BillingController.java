package com.hospital.management.controller;

import com.hospital.management.model.Appointment;
import com.hospital.management.model.Billing;
import com.hospital.management.model.Patient;
import com.hospital.management.repository.AppointmentRepository;
import com.hospital.management.repository.BillingRepository;
import com.hospital.management.repository.PatientRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/billing")
@CrossOrigin(origins = "*")
public class BillingController {

    @Autowired
    private BillingRepository billingRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @GetMapping
    public List<Billing> getAllBillingRecords() {
        return billingRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Billing> getBillingById(@PathVariable Long id) {
        return billingRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createBillingRecord(@Valid @RequestBody BillingRequest request) {
        Optional<Patient> patientOpt = patientRepository.findById(request.getPatientId());
        if (patientOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Patient not found with ID: " + request.getPatientId());
        }

        Appointment appointment = null;
        if (request.getAppointmentId() != null) {
            Optional<Appointment> appointmentOpt = appointmentRepository.findById(request.getAppointmentId());
            if (appointmentOpt.isPresent()) {
                appointment = appointmentOpt.get();
            }
        }

        Billing billing = new Billing();
        billing.setPatient(patientOpt.get());
        billing.setAppointment(appointment);
        billing.setAmount(request.getAmount());
        billing.setStatus(request.getStatus());
        billing.setBillingDate(request.getBillingDate() != null ? request.getBillingDate() : LocalDate.now().toString());
        billing.setInsuranceProvider(request.getInsuranceProvider() != null ? request.getInsuranceProvider() : "None");

        Billing savedBilling = billingRepository.save(billing);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedBilling);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateBillingRecord(@PathVariable Long id, @Valid @RequestBody BillingRequest request) {
        return billingRepository.findById(id)
                .map(billing -> {
                    Optional<Patient> patientOpt = patientRepository.findById(request.getPatientId());
                    if (patientOpt.isEmpty()) {
                        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Patient not found");
                    }

                    Appointment appointment = null;
                    if (request.getAppointmentId() != null) {
                        Optional<Appointment> appointmentOpt = appointmentRepository.findById(request.getAppointmentId());
                        if (appointmentOpt.isPresent()) {
                            appointment = appointmentOpt.get();
                        }
                    }

                    billing.setPatient(patientOpt.get());
                    billing.setAppointment(appointment);
                    billing.setAmount(request.getAmount());
                    billing.setStatus(request.getStatus());
                    billing.setBillingDate(request.getBillingDate());
                    billing.setInsuranceProvider(request.getInsuranceProvider());

                    Billing updatedBilling = billingRepository.save(billing);
                    return ResponseEntity.ok(updatedBilling);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBillingRecord(@PathVariable Long id) {
        if (billingRepository.existsById(id)) {
            billingRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // DTO for Request Body
    public static class BillingRequest {
        @NotNull(message = "Patient ID is required")
        private Long patientId;

        private Long appointmentId;

        @NotNull(message = "Amount is required")
        private Double amount;

        @NotNull(message = "Status is required")
        private String status; // PAID, UNPAID

        private String billingDate;
        private String insuranceProvider;

        // Getters and Setters
        public Long getPatientId() { return patientId; }
        public void setPatientId(Long patientId) { this.patientId = patientId; }

        public Long getAppointmentId() { return appointmentId; }
        public void setAppointmentId(Long appointmentId) { this.appointmentId = appointmentId; }

        public Double getAmount() { return amount; }
        public void setAmount(Double amount) { this.amount = amount; }

        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }

        public String getBillingDate() { return billingDate; }
        public void setBillingDate(String billingDate) { this.billingDate = billingDate; }

        public String getInsuranceProvider() { return insuranceProvider; }
        public void setInsuranceProvider(String insuranceProvider) { this.insuranceProvider = insuranceProvider; }
    }
}
