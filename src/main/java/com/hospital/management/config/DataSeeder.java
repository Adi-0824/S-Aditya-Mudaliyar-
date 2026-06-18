package com.hospital.management.config;

import com.hospital.management.model.Appointment;
import com.hospital.management.model.Billing;
import com.hospital.management.model.Doctor;
import com.hospital.management.model.Patient;
import com.hospital.management.repository.AppointmentRepository;
import com.hospital.management.repository.BillingRepository;
import com.hospital.management.repository.DoctorRepository;
import com.hospital.management.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private BillingRepository billingRepository;

    @Override
    public void run(String... args) throws Exception {
        if (doctorRepository.count() == 0) {
            seedData();
        }
    }

    private void seedData() {
        // 1. Seed Doctors
        Doctor doc1 = new Doctor("Dr. Sarah Connor", "Cardiology", "sarah@hospital.com", "555-0199", "Mon-Wed: 9 AM - 4 PM", "A-101");
        Doctor doc2 = new Doctor("Dr. John Watson", "Pediatrics", "watson@hospital.com", "555-0144", "Tue-Thu: 10 AM - 5 PM", "B-205");
        Doctor doc3 = new Doctor("Dr. Gregory House", "Neurology", "house@hospital.com", "555-0188", "Mon-Fri: 1 PM - 6 PM", "C-310");
        Doctor doc4 = new Doctor("Dr. Meredith Grey", "General Medicine", "grey@hospital.com", "555-0122", "Mon-Fri: 8 AM - 3 PM", "A-105");
        Doctor doc5 = new Doctor("Dr. Stephen Strange", "Orthopedics", "strange@hospital.com", "555-0177", "Wed-Fri: 11 AM - 5 PM", "D-404");

        List<Doctor> doctors = doctorRepository.saveAll(Arrays.asList(doc1, doc2, doc3, doc4, doc5));

        // 2. Seed Patients
        Patient pat1 = new Patient("James Smith", "1980-05-15", "Male", "james@gmail.com", "555-0211", "123 Elm St, NY", "Chronic hypertension, mild asthma.");
        Patient pat2 = new Patient("Emily Davis", "1995-11-22", "Female", "emily@gmail.com", "555-0222", "456 Oak Ave, NJ", "Penicillin allergy, recent tonsillectomy.");
        Patient pat3 = new Patient("Robert Johnson", "1965-03-08", "Male", "robert@gmail.com", "555-0233", "789 Pine Rd, PA", "Type 2 Diabetes, hyperlipidemia.");
        Patient pat4 = new Patient("Linda Taylor", "2002-07-19", "Female", "linda@gmail.com", "555-0244", "101 Maple Dr, CT", "General checkup, no chronic diseases.");
        Patient pat5 = new Patient("Michael Brown", "1988-12-05", "Male", "michael@gmail.com", "555-0255", "202 Birch Ln, NY", "Severe seasonal allergies, history of migraine.");

        List<Patient> patients = patientRepository.saveAll(Arrays.asList(pat1, pat2, pat3, pat4, pat5));

        // 3. Seed Appointments
        Appointment app1 = new Appointment(patients.get(0), doctors.get(0), LocalDate.now().minusDays(5).toString() + " 10:00 AM", "COMPLETED", "Chest discomfort and palpitations");
        app1.setDiagnosis("Mild arrhythmia aggravated by stress and caffeine intake.");
        app1.setPrescription("Metoprolol 25mg daily, limit caffeine intake, follow up in 2 weeks.");

        Appointment app2 = new Appointment(patients.get(1), doctors.get(1), LocalDate.now().minusDays(3).toString() + " 02:00 PM", "COMPLETED", "Persistent dry cough and sore throat");
        app2.setDiagnosis("Acute bronchitis");
        app2.setPrescription("Azithromycin 500mg daily (5 days), cough syrup, warm fluids. Avoid penicillin due to allergy.");

        Appointment app3 = new Appointment(patients.get(2), doctors.get(3), LocalDate.now().minusDays(1).toString() + " 09:30 AM", "COMPLETED", "Routine blood sugar review");
        app3.setDiagnosis("Controlled Type 2 Diabetes");
        app3.setPrescription("Metformin 850mg twice daily, continue diabetic diet, walk 30 mins daily.");

        Appointment app4 = new Appointment(patients.get(3), doctors.get(2), LocalDate.now().plusDays(1).toString() + " 11:00 AM", "PENDING", "Intermittent muscle spasms in lower back");
        Appointment app5 = new Appointment(patients.get(4), doctors.get(4), LocalDate.now().plusDays(2).toString() + " 03:30 PM", "PENDING", "Knee pain after running 5k");

        List<Appointment> appointments = appointmentRepository.saveAll(Arrays.asList(app1, app2, app3, app4, app5));

        // 4. Seed Billing
        Billing bill1 = new Billing(patients.get(0), appointments.get(0), 150.00, "PAID", LocalDate.now().minusDays(5).toString(), "Blue Cross");
        Billing bill2 = new Billing(patients.get(1), appointments.get(1), 150.00, "UNPAID", LocalDate.now().minusDays(3).toString(), "None");
        Billing bill3 = new Billing(patients.get(2), appointments.get(2), 150.00, "PAID", LocalDate.now().minusDays(1).toString(), "Aetna");
        
        // Let's add an independent utility bill (e.g. lab work invoice)
        Billing bill4 = new Billing(patients.get(0), null, 75.00, "UNPAID", LocalDate.now().minusDays(2).toString(), "Blue Cross");

        billingRepository.saveAll(Arrays.asList(bill1, bill2, bill3, bill4));
    }
}
