package com.hospital.management.controller;

import com.hospital.management.model.Appointment;
import com.hospital.management.model.Billing;
import com.hospital.management.model.Doctor;
import com.hospital.management.model.Patient;
import com.hospital.management.repository.AppointmentRepository;
import com.hospital.management.repository.BillingRepository;
import com.hospital.management.repository.DoctorRepository;
import com.hospital.management.repository.PatientRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "*")
public class AppointmentController {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private BillingRepository billingRepository;

    @GetMapping
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable Long id) {
        return appointmentRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createAppointment(@Valid @RequestBody AppointmentRequest request) {
        Optional<Patient> patientOpt = patientRepository.findById(request.getPatientId());
        if (patientOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Patient not found with ID: " + request.getPatientId());
        }

        Optional<Doctor> doctorOpt = doctorRepository.findById(request.getDoctorId());
        if (doctorOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Doctor not found with ID: " + request.getDoctorId());
        }

        Appointment appointment = new Appointment();
        appointment.setPatient(patientOpt.get());
        appointment.setDoctor(doctorOpt.get());
        appointment.setAppointmentDate(request.getAppointmentDate());
        appointment.setStatus(request.getStatus());
        appointment.setSymptoms(request.getSymptoms());
        appointment.setDiagnosis(request.getDiagnosis());
        appointment.setPrescription(request.getPrescription());

        Appointment savedAppointment = appointmentRepository.save(appointment);

        // Auto-generate invoice if created directly as COMPLETED
        if ("COMPLETED".equalsIgnoreCase(savedAppointment.getStatus())) {
            generateBillingRecord(savedAppointment);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(savedAppointment);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateAppointment(@PathVariable Long id, @Valid @RequestBody AppointmentRequest request) {
        return appointmentRepository.findById(id)
                .map(appointment -> {
                    Optional<Patient> patientOpt = patientRepository.findById(request.getPatientId());
                    Optional<Doctor> doctorOpt = doctorRepository.findById(request.getDoctorId());

                    if (patientOpt.isEmpty() || doctorOpt.isEmpty()) {
                        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Patient or Doctor not found");
                    }

                    String oldStatus = appointment.getStatus();

                    appointment.setPatient(patientOpt.get());
                    appointment.setDoctor(doctorOpt.get());
                    appointment.setAppointmentDate(request.getAppointmentDate());
                    appointment.setStatus(request.getStatus());
                    appointment.setSymptoms(request.getSymptoms());
                    appointment.setDiagnosis(request.getDiagnosis());
                    appointment.setPrescription(request.getPrescription());

                    Appointment updatedAppointment = appointmentRepository.save(appointment);

                    // If status transitioned to COMPLETED, auto-generate invoice
                    if (!"COMPLETED".equalsIgnoreCase(oldStatus) && "COMPLETED".equalsIgnoreCase(updatedAppointment.getStatus())) {
                        generateBillingRecord(updatedAppointment);
                    }

                    return ResponseEntity.ok(updatedAppointment);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable Long id) {
        if (appointmentRepository.existsById(id)) {
            appointmentRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    private void generateBillingRecord(Appointment appointment) {
        // Double check if billing record already exists for this appointment
        List<Billing> existingBills = billingRepository.findAll().stream()
                .filter(b -> b.getAppointment() != null && b.getAppointment().getId().equals(appointment.getId()))
                .toList();

        if (existingBills.isEmpty()) {
            Billing bill = new Billing();
            bill.setPatient(appointment.getPatient());
            bill.setAppointment(appointment);
            bill.setAmount(150.00); // Standard consultation fee
            bill.setStatus("UNPAID");
            bill.setBillingDate(LocalDate.now().toString());
            bill.setInsuranceProvider("None");
            billingRepository.save(bill);
        }
    }

    // DTO for Request Body
    public static class AppointmentRequest {
        @NotNull(message = "Patient ID is required")
        private Long patientId;

        @NotNull(message = "Doctor ID is required")
        private Long doctorId;

        @NotBlank(message = "Appointment date is required")
        private String appointmentDate;

        @NotBlank(message = "Status is required")
        private String status;

        private String symptoms;
        private String diagnosis;
        private String prescription;

        // Getters and Setters
        public Long getPatientId() { return patientId; }
        public void setPatientId(Long patientId) { this.patientId = patientId; }

        public Long getDoctorId() { return doctorId; }
        public void setDoctorId(Long doctorId) { this.doctorId = doctorId; }

        public String getAppointmentDate() { return appointmentDate; }
        public void setAppointmentDate(String appointmentDate) { this.appointmentDate = appointmentDate; }

        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }

        public String getSymptoms() { return symptoms; }
        public void setSymptoms(String symptoms) { this.symptoms = symptoms; }

        public String getDiagnosis() { return diagnosis; }
        public void setDiagnosis(String diagnosis) { this.diagnosis = diagnosis; }

        public String getPrescription() { return prescription; }
        public void setPrescription(String prescription) { this.prescription = prescription; }
    }
}
