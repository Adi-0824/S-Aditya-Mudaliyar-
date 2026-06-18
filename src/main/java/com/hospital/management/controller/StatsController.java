package com.hospital.management.controller;

import com.hospital.management.model.Billing;
import com.hospital.management.repository.AppointmentRepository;
import com.hospital.management.repository.BillingRepository;
import com.hospital.management.repository.DoctorRepository;
import com.hospital.management.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/stats")
@CrossOrigin(origins = "*")
public class StatsController {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private BillingRepository billingRepository;

    @GetMapping
    public Map<String, Object> getStats() {
        Map<String, Object> stats = new HashMap<>();

        long totalPatients = patientRepository.count();
        long totalDoctors = doctorRepository.count();
        long totalAppointments = appointmentRepository.count();

        long pendingAppointments = appointmentRepository.findAll().stream()
                .filter(a -> "PENDING".equalsIgnoreCase(a.getStatus()))
                .count();

        List<Billing> billingRecords = billingRepository.findAll();
        double totalRevenue = billingRecords.stream()
                .filter(b -> "PAID".equalsIgnoreCase(b.getStatus()))
                .mapToDouble(Billing::getAmount)
                .sum();

        double unpaidInvoicesAmount = billingRecords.stream()
                .filter(b -> "UNPAID".equalsIgnoreCase(b.getStatus()))
                .mapToDouble(Billing::getAmount)
                .sum();

        stats.put("totalPatients", totalPatients);
        stats.put("totalDoctors", totalDoctors);
        stats.put("totalAppointments", totalAppointments);
        stats.put("pendingAppointments", pendingAppointments);
        stats.put("totalRevenue", totalRevenue);
        stats.put("unpaidInvoicesAmount", unpaidInvoicesAmount);

        return stats;
    }
}
