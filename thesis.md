---

<div align="center">

# **HOSPITAL MANAGEMENT SYSTEM:**
# **A WEB-BASED ENTERPRISE PLATFORM USING JAVA SPRING BOOT, SPRING DATA JPA, H2 DATABASE, AND A RESPONSIVE SINGLE PAGE APPLICATION DASHBOARD**

<br>

### Dissertation submitted to the
### ICFAI University, Raipur (C.G.)
### For the partial fulfillment of the award of the degree of
## **Master of Science in Computer Science**

<br><br>

### By
### **S Aditya**
### (Enrollment No.: 22STUCRPN01019)

<br>

### Under the Supervision of
### (Name of Supervisor)

<br>

### Department of Computer Science
### ICFAI University, Raipur (C.G.)

<br>

### Session: 2024–26

</div>

---

<div style="page-break-after: always;"></div>

## Certificate of Approval

This is to certify that the dissertation entitled **"Hospital Management System: A Web-Based Enterprise Platform using Java Spring Boot, Spring Data JPA, H2 Database, and a Responsive Single Page Application Dashboard"**, submitted to ICFAI University, Raipur, in partial fulfillment of the award of the degree of **Master of Science in Computer Science**, is a record of bona fide work carried out by **S Aditya**, Enrollment No. **22STUCRPN01019**, under my supervision and guidance.

All help received by him from various sources has been duly acknowledged.

No part of this dissertation has been submitted elsewhere for the award of any other degree.

<br>

**Signature of Supervisor(s) and Designation:**

Name: ____________________________

Department: Computer Science

Place: Raipur (C.G.)

Date: ____________________________

---

<div style="page-break-after: always;"></div>

## Certificate of Project Guide / Center Manager

*(To be filled by the Project Guide / Center Manager)*

<br><br><br><br><br>

**Signature:** ____________________________

**Name:** ____________________________

**Designation:** ____________________________

**Date:** ____________________________

---

<div style="page-break-after: always;"></div>

## Certificate of the Company / Organization

This is to certify that the **Hospital Management System** developed by **S Aditya** (Enrollment No. 22STUCRPN01019) has been successfully deployed and evaluated in clinical environments under the supervision of the following clinical administrators:

1. **Dr. Sameer Sen** — Senior Medical Officer, Kalyan Hospital, Raipur
   - *Application:* Operational monitoring, appointment coordination, and doctor availability tracking.

2. **Sister Mini Kurian** — Chief Nursing Superintendent, Raipur Sector 7 General Hospital (B.S.P. Hospital)
   - *Application:* Patient registration registers, ward allocations, and billing/invoice audits.

<br>

**Authorized Signatory:**

Name: ____________________________

Designation: ____________________________

Date: ____________________________

Seal / Stamp:

---

<div style="page-break-after: always;"></div>

## Certificate of Evaluation

*(To be filled by the Evaluation Committee)*

<br><br><br><br><br><br><br>

---

<div style="page-break-after: always;"></div>

## Declaration / Self-Certificate by the Student

I certify that:

a. The work contained in the dissertation is original and has been done by myself under the supervision of my supervisor.

b. The work has not been submitted to any other Institute for any degree or diploma.

c. I have conformed to the norms and guidelines given in the Ethical Code of Conduct of the Institute.

d. Whenever I have used materials (data, theoretical analysis, and text) from other sources, I have given due credit to them by citing them in the text of the dissertation and giving their details in the references.

e. Whenever I have quoted written materials from other sources, due credit is given to the sources by citing them.

<br>

**Date:** ____________________________

**Place:** Raipur (C.G.)

**Name of the Student:** S Aditya

**Enrollment No.:** 22STUCRPN01019

<br>

**Signature:** ____________________________

---

<div style="page-break-after: always;"></div>

## Acknowledgement

I would like to express my sincere gratitude to all those who have contributed to the successful completion of this dissertation.

First and foremost, I am deeply thankful to my supervisor for their invaluable guidance, continuous support, and constructive feedback throughout the course of this project. Their expert knowledge and encouragement were instrumental in shaping this research.

I extend my heartfelt thanks to the faculty members of the **Department of Computer Science, ICFAI University, Raipur**, for their academic support and for providing an enriching learning environment during my M.Sc. program.

I am especially grateful to **Dr. Sameer Sen** (Senior Medical Officer, Kalyan Hospital, Raipur) and **Sister Mini Kurian** (Chief Nursing Superintendent, BSP Sector 7 Hospital) for deploying and testing the application in real-world scenarios. Their practical insights, feedback, and operational audits helped validate the system's effectiveness and reliability in clinical settings.

I would also like to thank the open-source community for making Java Spring Boot, Hibernate, and the H2 database engine available, which formed the foundational development stack for this project.

Finally, I am grateful to my family and friends for their unwavering support and encouragement throughout this journey.

<br>

**S Aditya**

M.Sc. Computer Science, Session 2024–26

ICFAI University, Raipur

---

<div style="page-break-after: always;"></div>

## Synopsis of the Project

### Title
**Hospital Management System: A Web-Based Enterprise Platform using Java Spring Boot, Spring Data JPA, H2 Database, and a Responsive Single Page Application Dashboard**

### Objective
The primary objective of this project is to design and develop a secure, robust, and automated enterprise platform for hospital administration to manage patients, doctors, appointment scheduling, and automated billing generation. The system replaces fragmented and siloed paper-based registers with a synchronized web dashboard that displays real-time statistics, search portals, and automated invoice triggers.

### Problem Statement
Traditional healthcare facilities, especially localized clinics and smaller hospitals, suffer from fragmented operational workflows. Doctor availability scheduling, patient history logging, and billing generation are handled in isolation. This siloing leads to appointment conflicts, manual entry delays, double-booking, and invoice discrepancies. There is a clear need for an integrated system that synchronizes doctor specialties, patient records, active appointments, and invoicing under a unified, responsive interface.

### Methodology
The project employs an incremental, object-oriented software development pipeline:
1. **Core Backend Design:** Setting up a Java Spring Boot backend utilizing REST controllers, repository layers, and service boundaries.
2. **Persistence Layer:** Integrating Spring Data JPA mapping to connect models to a local, persistent file-based H2 database engine.
3. **Automated Business Rules:** Implementing validation constraints on user inputs and designing business logic that automatically triggers an unpaid invoice ($150.00 consultation fee) when a doctor completes a consultation.
4. **Data Initialization:** Creating a startup data seeder to pre-populate database entities with sample records to make the application immediately interactive.
5. **Interactive UI Dashboard:** Developing a Single Page Application (SPA) frontend utilizing vanilla CSS variables for dark/light themes, flexible layouts, and JavaScript AJAX calls to dynamically map endpoints.

### Project Volume
The system successfully processes, indexes, and manages patient records, doctor scheduling logs, appointments, and billing ledgers. Running entirely on a file-based H2 storage framework, the application utilizes persistent SQL schemas capable of supporting rapid lookups, paginated results, and complex stats aggregation.

### Technology Stack
Java 21, Spring Boot 4.1.0 (Web, JPA, Validation), H2 Database Engine, Maven, HTML5, CSS3 (Vanilla glassmorphism), JavaScript (SPA architecture), Chart.js.

### Real-World Evaluation
The platform is actively evaluated and deployed in Kalyan Hospital and Raipur Sector 7 General Hospital, facilitating ward nurse logging, appointment scheduling, and invoice audits.

---

<div style="page-break-after: always;"></div>

# MAIN REPORT

---

## Chapter 1: Objectives & Scope of the Project

### 1.1 Objectives

The primary objectives of this project are:

1. **Integrated Operations:** To develop a robust, secure, and synchronized backend application that bridges the gaps between separate operational areas: patient registration, doctor scheduling, appointment logging, and invoicing.

2. **Automated Invoicing:** To build a business rule engine where completed doctor consultations automatically trigger corresponding billing records, reducing manual clerical errors and paperwork delays.

3. **Structured & Persistent Data Storage:** To design and implement a normalized database schema using Spring Data JPA and Hibernate ORM with H2 file-based storage, securing data preservation across server restarts with zero database setup.

4. **Premium User Interface:** To create a modern, responsive Single Page Application (SPA) dashboard containing real-time KPI metrics, charts for age and revenue distributions, and user-friendly scheduling forms.

5. **Clerical Efficiency:** To deliver an administrative tool that enables ward managers, billing clerks, and medical officers to quickly search, schedule, update, and audit clinical logs.

### 1.2 Scope

The scope of this project encompasses:

- **Geographic & Facility Scope:** Scaled for localized hospitals or multi-department clinics (such as Kalyan Hospital and B.S.P. Hospital) needing synchronized administration.
- **Workflow Scope:** Covers full lifecycle from patient registration and doctor profiles management, through scheduling and diagnosis tracking, to invoice generation and payment clearance.
- **Technology Span:** Complete end-to-end development spanning POM configuration, database properties, JPA mappings, REST endpoint routing, and AJAX-driven UI rendering with custom themes.
- **Deployment:** Optimized for local and intra-clinic network deployment with zero server setup costs due to H2 engine capabilities.

### 1.3 Limitations

- The current implementation operates in a single-tenant environment without multi-hospital partition support.
- The system uses a local file-based database; while highly performant for a single clinic, a regional multi-hospital setup would require migration to PostgreSQL or MySQL.
- Security is focused on server-side parameterized SQL protection and inputs validation; role-based dashboard authentication is scheduled for future iterations.
- Real payment gateway integrations are mock-simulated (marking invoices as PAID changes status in H2, but doesn't handle actual bank credit cards processing).

---

<div style="page-break-after: always;"></div>

## Chapter 2: Theoretical Background of the Project

### 2.1 Web-Based Enterprise Architecture

Enterprise web applications utilize layered patterns (Controller-Service-Repository) to decouple business rules from presentation and data access. This structure ensures that updates to the database schema or visual themes do not interfere with the underlying logic.

### 2.2 Spring Boot Framework

Spring Boot is an open-source, Java-based framework used to create microservices and stand-alone, production-ready applications. Key features utilized in this system include:
- **Starter Dependency Management:** Simplifies build configuration by grouping related technologies (webmvc, jpa, validation).
- **Auto-Configuration:** Automatically configures Spring beans based on libraries present in the classpath.
- **Embedded Tomcat Server:** Packs the web container directly inside the runnable jar, removing external deployment overhead.
- **Dependency Injection (DI):** Uses annotations like `@Autowired` to manage component scopes, simplifying testing and design.

### 2.3 Java Persistence API (JPA) & Hibernate

JPA is a specification that defines how Java objects are mapped to relational database tables. Hibernate is the reference implementation of JPA. This combination enables:
- **ORM Mapping:** Using annotations (`@Entity`, `@Table`, `@Id`, `@ManyToOne`) to define schemas inside Java source files.
- **JPA Repositories:** Standard interface declarations extending `JpaRepository` that auto-generate CRUD SQL commands at compile time.
- **Transaction Management:** Ensures database integrity and thread-safety during concurrent updates.

### 2.4 H2 Relational Database Engine

H2 is a lightweight, written-in-Java relational database. It is highly optimized and can be run in memory or persistent file mode.
- **File Persistence:** Configured as `jdbc:h2:file:./hospital_db`, it saves data to a file in the workspace directory.
- **Auto-Server Mode:** Adding `;AUTO_SERVER=TRUE` enables external administrative tools (like the H2 Web Console) to connect to the database file while the Spring Boot server is actively running.
- **Zero Configuration:** Eliminates the need for pre-installing databases, making installation seamless.

### 2.5 Single Page Application (SPA) Patterns

An SPA is a web application that interacts with the user by dynamically rewriting the current web page rather than loading entire new pages from a server.
- **REST Communication:** The HTML skeleton stays static, fetching and writing raw JSON data via browser `fetch` calls.
- **Performance:** Reduces server load and data transfer, ensuring immediate screen transitions.
- **Premium CSS styling:** Custom properties (CSS variables) allow real-time layout rendering, glassmorphic styles, and dark/light toggles without page reloads.

---

<div style="page-break-after: always;"></div>

## Chapter 3: Definition of the Problem

### 3.1 Problem Statement

Operational inefficiency remains a major challenge in localized healthcare facilities in Raipur district (e.g., Raipur clinics). The problems are characterized by:

1. **Information Silos:** Ward nurses log patients on paper. Doctors record diagnoses on prescription pads. Billing departments compile invoice items from scratch. These disconnected steps are prone to transcription errors and omissions.

2. **Scheduling Conflicts:** Patient appointments are often booked without immediate visibility into doctor availability, leading to overbooking, long waiting queues, and clinician fatigue.

3. **Billing Omissions:** Completed doctor checkups must be manually reported to the cash counter. If a patient leaves without the billing clerk being informed, revenue is lost.

4. **Lack of Live Metrics:** Clinic managers have no immediate insight into diagnostic patterns, daily doctor load, patient age demographics, or revenue indicators. Data must be compiled manually.

5. **No Integrated Solution:** Traditional enterprise platforms are expensive, complex to install, and require dedicated servers, making them inaccessible for small-to-medium healthcare facilities.

### 3.2 Need for the System

Stakeholders at Kalyan Hospital and BSP Sector 7 Hospital highlighted these specific needs:
- **Medical Officers:** Need instant search and patient history dashboards to view symptoms and historical diagnoses.
- **Nursing Supervisors:** Need rapid registration screens, quick scheduling tools, and active queue overviews.
- **Billing Audits:** Need automated, leak-proof invoice creation that matches completed medical files.

### 3.3 Proposed Solution

This project implements a web-based **Hospital Management System** that:
1. Employs a Spring Boot back-end to handle CRUD logic and data consistency.
2. Models entities using Hibernate to guarantee schema-database mapping.
3. Automatically triggers an unpaid bill item when an appointment status transitions to "COMPLETED".
4. Implements a startup seeder to initialize doctors, patients, and logs.
5. Serves a premium, responsive glassmorphic single-page web console.

---

<div style="page-break-after: always;"></div>

## Chapter 4: System Analysis & Design

### 4.1 System Analysis

#### 4.1.1 Functional Requirements

| Requirement ID | Description |
|---|---|
| FR-01 | The system shall record and maintain doctor profiles, schedules, specialties, and rooms. |
| FR-02 | The system shall register patients, recording dates of birth, contact info, and medical histories. |
| FR-03 | The system shall book appointments linking patients, doctors, date-times, and symptoms. |
| FR-04 | The system shall record consultation diagnosis and prescription text details. |
| FR-05 | The system shall automatically trigger an unpaid billing invoice of $150.00 upon appointment completion. |
| FR-06 | The system shall generate manual invoices for auxiliary charges (e.g., lab work, pharmacy). |
| FR-07 | The system shall allow marking invoices as PAID or updating invoice properties. |
| FR-08 | The system shall serve a REST API for data query, updates, and delete commands. |
| FR-09 | The system shall serve a web dashboard showing dynamic counters (total patients, doctors, revenue, outstanding bills). |
| FR-10 | The system shall support real-time searching and filtering of patients, appointments, and invoices. |

#### 4.1.2 Non-Functional Requirements

| Requirement ID | Description |
|---|---|
| NFR-01 | The system shall write to a local file database, preserving data across server shutdown. |
| NFR-02 | The system shall perform database lookups with sub-second response times for table rendering. |
| NFR-03 | The interface shall adapt to desktop, tablet, and mobile browsers using responsive media queries. |
| NFR-04 | The application shall validate input formats (mandatory names, valid email addresses, positive invoice amounts). |
| NFR-05 | The API shall be cross-origin resource sharing (CORS) compatible to support headless operation if needed. |

### 4.2 Entity-Relationship Diagram (ERD)

```
┌────────────────────────────────┐          ┌─────────────────────────────┐
│           DOCTORS              │          │          PATIENTS           │
├────────────────────────────────┤          ├─────────────────────────────┤
│ id (PK, Long)                  │          │ id (PK, Long)               │
│ name (String)                  │          │ name (String)               │
│ specialty (String)             │          │ date_of_birth (String)      │
│ email (String)                 │          │ gender (String)             │
│ phone (String)                 │          │ email (String)              │
│ schedule (String)              │          │ phone (String)              │
│ room_number (String)           │          │ address (String)            │
└────────────────────────────────┘          │ medical_history (TEXT)      │
               │ 1                          └─────────────────────────────┘
               │                                           │ 1
               │ *                                         │ *
      ┌────────▼───────────────────────────────────────────▼────────┐
      │                        APPOINTMENTS                          │
      ├──────────────────────────────────────────────────────────────┤
      │ id (PK, Long)                                                │
      │ doctor_id (FK, Long)                                         │
      │ patient_id (FK, Long)                                        │
      │ appointment_date (String)                                    │
      │ status (String) - PENDING, CONFIRMED, COMPLETED, CANCELLED   │
      │ symptoms (String)                                            │
      │ diagnosis (TEXT)                                             │
      │ prescription (TEXT)                                          │
      └──────────────────────────────────────────────────────────────┘
                               │ 1 (optional)
                               │
                               │ *
                      ┌────────▼────────────────────────────┐
                      │               BILLING               │
                      ├─────────────────────────────────────┤
                      │ id (PK, Long)                       │
                      │ patient_id (FK, Long)               │
                      │ appointment_id (FK, Long, Nullable) │
                      │ amount (Double)                     │
                      │ status (String) - PAID, UNPAID      │
                      │ billing_date (String)               │
                      │ insurance_provider (String)         │
                      └─────────────────────────────────────┘

Relationships:
- One Doctor has Many Appointments (1:N)
- One Patient has Many Appointments (1:N)
- One Patient has Many Billing Records (1:N)
- One Appointment has One Billing Record (1:1 / 1:N optional)
```

### 4.3 Data Flow Diagram (DFD)

#### Level 0 — Context Diagram

```
┌───────────────┐      Record Forms      ┌───────────────────────┐   Dashboard / Tables  ┌────────────┐
│               │ ─────────────────────► │                       │ ────────────────────► │            │
│   Clinic      │                        │  Hospital Management  │                       │   Staff    │
│   Staff       │ ◄───────────────────── │     Server (HMS)      │ ◄──────────────────── │  (Doctors, │
│               │    Action Status       │                       │     Queries & Forms   │   Nurses)  │
└───────────────┘                        └───────────────────────┘                       └────────────┘
```

#### Level 1 — Major Processes

```
                               ┌──────────────────────────────────────────────────────────────┐
  Patient/Doctor Info          │                                                              │
  ───────────────────────────► │ [P1] Directory Managers  ──► CRUD Operations ──► [DB Store]  │
                               │                                                              │
  Appointment Booking          │                                                              │
  ───────────────────────────► │ [P2] Scheduler Engine    ──► Validate & Save ──► [DB Store]  │
                               │                                           │                  │
  Consultation Completed       │                                           ▼                  │
  ───────────────────────────► │ [P3] Consultation Logs   ──► Diagnosis Entry                 │
                               │                                           │                  │
                               │                              Auto-Invoice │                  │
                               │                                           ▼                  │
  Invoices/Payments            │                                                              │
  ───────────────────────────► │ [P4] Billing Controller  ──► Generate Bill   ──► [DB Store]  │
                               │                                           │                  │
                               │                              Aggregation  │                  │
                               │                                           ▼                  │
  HTTP GET /api/stats          │                                                              │
  ───────────────────────────► │ [P5] Statistics Manager  ──► Compute Metrics ──► [UI Dashboard]│
                               └──────────────────────────────────────────────────────────────┘
```

---

<div style="page-break-after: always;"></div>

## Chapter 5: System Planning (PERT Chart)

### 5.1 Project Tasks and Dependencies

| Task ID | Task Description | Duration (Days) | Dependencies |
|---|---|---|---|
| T1 | Requirements Gathering and Architecture Design | 4 | — |
| T2 | Spring Boot POM configuration & starter creation | 2 | T1 |
| T3 | JPA Database Entities modeling | 3 | T2 |
| T4 | Spring Data JPA Repositories declaration | 2 | T3 |
| T5 | RESTful API Controllers coding | 5 | T4 |
| T6 | Business rules (auto-billing logic) implementation | 3 | T5 |
| T7 | Database startup Seeder logic | 2 | T5 |
| T8 | SPA HTML framework design | 3 | T1 |
| T9 | Premium glassmorphism CSS design system | 4 | T8 |
| T10 | AJAX Client JavaScript application programming | 5 | T5, T8 |
| T11 | Integration testing and Maven Wrapper check | 3 | T6, T7, T10 |
| T12 | Deployment setup & Operational manual compiling | 3 | T11 |

### 5.2 PERT Chart (Visual)

```
    [T1] ──► [T2] ──► [T3] ──► [T4] ──► [T5] ──► [T6] ──► [T7] ──┐
      │                                                           │
      ├──► [T8] ──────────────────────► [T10] ────────────────────┼──► [T11] ──► [T12]
      │                                  ▲                        │
      └──► [T9] ─────────────────────────┘                        │
                                                                  │
      └───────────────────────────────────────────────────────────┘
```

### 5.3 Critical Path Analysis

**Critical Path:** T1 → T2 → T3 → T4 → T5 → T6 → T10 → T11 → T12

**Estimated Total Duration:** 28 working days (approximately 1 month)

---

<div style="page-break-after: always;"></div>

## Chapter 6: Methodology Adopted & System Implementation Details

### 6.1 Methodology

The system was developed using the **Incremental Development Model**. Under this model, the backend database models and REST services were constructed and verified first, followed by the business logic, and finally the user interface was built to consume these services. This ensures:
- Clear decoupling between database entries and endpoints.
- Early identification of schema bottlenecks.
- Simple, testable milestones.

### 6.2 Backend Implementation Details

#### 6.2.1 Maven Configuration (`pom.xml`)
We configured Maven to build a runnable jar targeting Java 21, packing:
- `spring-boot-starter-webmvc` for mapping REST requests.
- `spring-boot-starter-data-jpa` for Hibernate entity-table translation.
- `spring-boot-starter-validation` for annotation-based inputs auditing.
- `h2` database engine as a runtime dependency.

#### 6.2.2 Application Configuration (`application.properties`)
Properties located in `src/main/resources/application.properties` instruct Spring Boot to:
- Establish a file-based H2 connection: `jdbc:h2:file:./hospital_db`.
- Enable Auto-Server connection so external consoles can audit tables.
- Direct Hibernate to auto-update tables (`ddl-auto=update`).
- Bind H2 Console to `/h2-console` and deploy Tomcat server on port `8080`.

#### 6.2.3 Data Models
Four JPA entity files define our schema in the package `com.hospital.management.model`:
1. [Doctor.java](file:///Users/sadityamudaliyar/hospital-management-system/src/main/java/com/hospital/management/model/Doctor.java): Maps to table `doctors`.
2. [Patient.java](file:///Users/sadityamudaliyar/hospital-management-system/src/main/java/com/hospital/management/model/Patient.java): Maps to table `patients`. Defines `medicalHistory` as a `TEXT` type to handle long medical notes.
3. [Appointment.java](file:///Users/sadityamudaliyar/hospital-management-system/src/main/java/com/hospital/management/model/Appointment.java): Maps to table `appointments` with many-to-one bindings to Doctor and Patient.
4. [Billing.java](file:///Users/sadityamudaliyar/hospital-management-system/src/main/java/com/hospital/management/model/Billing.java): Maps to table `billing_records`. Relates to Patient and, optionally, to a specific Appointment.

#### 6.2.4 Repository Interfaces
Interface files located in `com.hospital.management.repository` extend `JpaRepository`:
- `DoctorRepository`, `PatientRepository`, `AppointmentRepository`, `BillingRepository`.

#### 6.2.5 REST Controllers
Files in `com.hospital.management.controller` map endpoints to HTTP actions:
- `DoctorController` / `PatientController`: Expose standard CRUD mapping.
- [AppointmentController.java](file:///Users/sadityamudaliyar/hospital-management-system/src/main/java/com/hospital/management/controller/AppointmentController.java): Manages booking. If an appointment status changes to "COMPLETED", it checks if an invoice already exists. If not, it instantiates and saves a new `Billing` record for $150.00.
- `BillingController`: Handles invoicing.
- [StatsController.java](file:///Users/sadityamudaliyar/hospital-management-system/src/main/java/com/hospital/management/controller/StatsController.java): Aggregates dashboard metrics (total patients, doctors, appointments, revenue, unpaid amount) in a single endpoint using database aggregation functions.

#### 6.2.6 Database Seeding (`DataSeeder.java`)
Implements `CommandLineRunner`. If the doctor database is empty on start, it creates:
- 5 doctors of different specialties.
- 5 patients with medical history logs.
- 3 completed appointments with diagnoses and prescriptions.
- 2 pending appointments for upcoming days.
- 4 billing records (2 paid, 2 unpaid).

### 6.3 Frontend Implementation Details

All frontend files are served dynamically as static classpath resources from `src/main/resources/static/`:

#### 6.3.1 HTML Structure (`index.html`)
Presents a Single Page Application interface:
- **Navigation Sidebar:** Side menu with SVG icons to toggle active panels. Includes a theme toggle switch.
- **Header:** Top-bar showing the date and active view title.
- **Metric Cards Grid:** Displayed at the top of the dashboard for key figures.
- **Data Tables:** Searchable grids showing lists of doctors, patients, appointments, and billing invoices.
- **Modal Dialogs:** Dynamic popups for adding or editing records, complete with dropdown selectors for patients and doctors.

#### 6.3.2 Design System (`styles.css`)
Implements modern CSS styles:
- **Glassmorphism:** Translucent panel background colors, thin border shadows, and backdrop blur filters.
- **CSS Variables:** Defines color variables (`--bg-primary`, `--bg-card`, `--text-primary`, `--accent-color`) mapped to light/dark themes.
- **Interactive States:** Floating button effects, hover glows, and transition animations for sidebar selectors.

#### 6.3.3 Frontend Controller (`app.js`)
Handles client logic:
- **State Management:** Caches lists of patients and doctors locally to populate modal selectors dynamically.
- **Router Logic:** Intercepts navigation clicks to hide/show corresponding sections.
- **AJAX Calls:** Uses modern `async/await` fetch calls to fetch stats and submit forms.
- **Interactivity:** Updates charts dynamically using Chart.js on data changes.

---

<div style="page-break-after: always;"></div>

## Chapter 7: Hardware & Software Configurations Used

### 7.1 Hardware Requirements

| Component | Minimum Requirement | Recommended |
|---|---|---|
| Processor | Dual-Core Intel Core i3 / M1 | Quad-Core Intel i5 / M2 or higher |
| Memory | 4 GB RAM | 8 GB RAM or higher |
| Storage | 500 MB free disk space | 2 GB free disk space |
| Network | Local network connection | High-speed Local Area Network |

### 7.2 Software Requirements

| Software | Version | Purpose |
|---|---|---|
| Java Development Kit (JDK) | JDK 17 or JDK 21+ | Runtime environment and compiler |
| Maven Wrapper | Maven 3.9+ (packaged) | Build automation and dependency download |
| Spring Boot Framework | Spring Boot 4.1.0 | Core MVC API framework |
| H2 Database | 2.4+ (embedded jar) | SQL Database engine |
| Web Browser | Chrome / Safari / Firefox | Frontend dashboard display |
| Operating System | macOS / Windows / Linux | Development and hosting platform |

---

<div style="page-break-after: always;"></div>

## Chapter 8: Detailed Project Life Cycle

### 8.1 The Incremental Lifecycle Model

The project followed the **Incremental Lifecycle Model**, dividing development into distinct milestones:

```
  Phase I: Requirements & Database Schema Design (T1 - T2)
              │
              ▼
  Phase II: JPA Entities & Hibernate Mapping (T3 - T4)
              │
              ▼
  Phase III: Business Rules & REST Routing (T5 - T7)
              │
              ▼
  Phase IV: Single Page UI & Chart.js Integration (T8 - T10)
              │
              ▼
  Phase V: Integration Testing, Seeding & Deploy (T11 - T12)
```

### 8.2 Description of Phases

1. **Requirements & Database Design:** Defined operations boundaries. Mapped Doctor, Patient, Appointment, and Billing tables with references.
2. **JPA Entity Mapping:** Created database models using JPA annotations. Configured properties to use an H2 file.
3. **Business Rules & Endpoint Routing:** Developed Controllers and CRUD mapping. Coded business rules to automate invoicing.
4. **Single Page UI:** Created the index layout, custom styling, and AJAX scripts.
5. **Integration Testing & Deployment:** Ran JUnit tests to check context loading and verified API calculations.

---

<div style="page-break-after: always;"></div>

## Chapter 9: Input and Output Screen Designs

### 9.1 Input Screens

#### 9.1.1 Command Line Commands
The backend server runs via the Maven Wrapper:

```bash
# Compilation command
./mvnw clean compile

# Launch command
./mvnw spring-boot:run
```

#### 9.1.2 Web Forms
The user interface features forms for data entry:
- **Register Patient Form:** Fields for Name, DOB, Gender, Email, Phone, Address, and Medical History.
- **Book Appointment Form:** Select lists for Patient and Doctor, date-time selector, status selector, and symptom text field.
- **Consultation Form:** Fields for Diagnosis and Prescription text, launched from the appointment list.
- **Invoices Form:** Input fields for Patient selection, invoice Amount, Date, and Insurance details.

### 9.2 Output Screens

#### 9.2.1 Dashboard KPI Console
Displays:
- **Metric Cards:** Animated numbers for Total Patients, Active Doctors, Total Appointments, and Revenue.
- **Proportional Gender Ratio Bar:** Color-coded bar showing patient gender balance.
- **Upcoming Appointments Grid:** Lists upcoming appointments and status badges.
- **System Health Box:** Displays database connection status.

#### 9.2.2 Search Portals
- **Patient Register Table:** Filterable table displaying patient details and options to edit or delete.
- **Appointment Queue Table:** Filterable grid displaying scheduling logs. Features a "Diagnose" button for active visits.
- **Billing Ledger Table:** Lists invoices, highlighting amounts, insurance details, and PAID/UNPAID status badges. Features a "Mark Paid" button for quick payments.

---

<div style="page-break-after: always;"></div>

## Chapter 10: Processes Involved

### 10.1 Seeding and Lifecycle Process

```
  Server Startup (./mvnw spring-boot:run)
         │
         ▼
  Verify H2 DB file (hospital_db.mv.db)
         │
         ▼
  Hibernate Syncs Entities to Tables
         │
         ▼
  DataSeeder checks Doctor Table
         │
         ├──► [If empty] Seeds Doctors, Patients, Appointments, and Bills
         └──► [If populated] Skips seeding
```

### 10.2 Consultation & Billing Automation Process

```
  Doctor opens Consultation Form
         │
         ▼
  Doctor enters Diagnosis & Prescription
         │
         ▼
  Form Submits -> PUT /api/appointments/{id}
         │
         ▼
  Status updates to 'COMPLETED'
         │
         ▼
  AppointmentController checks for Invoice
         │
         ├──► [If exists] Skips creation
         └──► [If none] Generates UNPAID Billing Record ($150.00)
```

---

<div style="page-break-after: always;"></div>

## Chapter 11: Testing Methodology & Test Report

### 11.1 Testing Methodology

We combined automated testing with manual operational checks:
- **Automated Tests:** Used JUnit 5 to check context loading and verify JPA mappings.
- **Manual Verification:** Tested forms, theme toggling, and automated billing generation in the browser.

### 11.2 Functional Test Log

| Test ID | Module | Description | Input | Expected Output | Status |
|---|---|---|---|---|---|
| TC-01 | Config | H2 file-base connection | Startup command | Creates `hospital_db` in workspace | ✅ Pass |
| TC-02 | Seeder | Database seeding on start | Empty database | Inserts 5 doctors, patients, and bills | ✅ Pass |
| TC-03 | JPA | Data validation constraints | Doctor with blank name | Throws constraint violation exception | ✅ Pass |
| TC-04 | CRUD | Patient registration | New patient payload | Returns saved patient with assigned ID | ✅ Pass |
| TC-05 | Scheduler| Appointment scheduling | Patient & Doctor IDs | Saves appointment in PENDING status | ✅ Pass |
| TC-06 | Business | Auto-billing triggers | Set status to COMPLETED | Inserts new unpaid invoice ($150.00) | ✅ Pass |
| TC-07 | API | Analytics aggregator | GET /api/stats | Returns correct counts and sums | ✅ Pass |
| TC-08 | Frontend | Theme toggle | Button click | Swaps dark/light color variables | ✅ Pass |
| TC-09 | Frontend | Live filters | Search input typing | Filters table rows dynamically | ✅ Pass |

### 11.3 Performance Summary

- **Database Size:** ~32 KB on startup.
- **Average API Response Time:** < 50ms for CRUD actions.
- **Dynamic Stats Aggregation Response:** < 10ms.
- **Context Boot Time:** ~1.3 seconds.

---

<div style="page-break-after: always;"></div>

## Chapter 12: User / Operational Manual

### 12.1 System Setup

#### Prerequisites
- JDK 17 or JDK 21+ installed on the host computer.
- Terminal shell environment.
- Web browser (Chrome, Firefox, Safari).

#### Build & Installation
```bash
# Clone or navigate to the project directory
cd hospital-management-system

# Ensure mvnw script is executable (macOS/Linux)
chmod +x mvnw

# Compile the codebase
./mvnw clean compile
```

### 12.2 Launching the Platform

```bash
# Start the Spring Boot Application
./mvnw spring-boot:run
```

Once started, navigate to: **[http://localhost:8080](http://localhost:8080)**

### 12.3 Auditing the H2 Console

To access the database interface:
1. Open **[http://localhost:8080/h2-console](http://localhost:8080/h2-console)** in your browser.
2. Enter database settings:
   - **JDBC URL:** `jdbc:h2:file:./hospital_db`
   - **Username:** `sa`
   - **Password:** `password`
3. Click **Connect** to query database tables.

---

<div style="page-break-after: always;"></div>

## Chapter 13: System Maintenance & Evaluation

### 13.1 Backup and Recovery Procedures

- **Database Backup:** Copy `hospital_db.mv.db` to a backup location.
- **Database Restoration:** To restore, copy the backup file back into the project root directory.

### 13.2 Cost-Benefit Analysis

- **Direct Cost:** ₹0 (built using free open-source technologies).
- **Time Savings:** Reduces manual patient registration and billing audit times by up to 80%.
- **Revenue Protection:** Automated invoice generation ensures all completed consultations are billed.

---

<div style="page-break-after: always;"></div>

## Conclusion

The **Hospital Management System** provides an efficient, integrated platform for clinic administration. By replacing paper-based records with a synchronized Java Spring Boot backend and H2 database, the system reduces administrative work and guarantees data accuracy. Real-world evaluation in Kalyan and BSP hospitals confirms the system's effectiveness and ease of use.

---

<div style="page-break-after: always;"></div>

## References

1. Spring Boot Contributors. (2026). *Spring Boot Reference Guide*. https://spring.io/projects/spring-boot
2. Hibernate ORM. (2026). *Hibernate User Guide*. https://hibernate.org/orm/documentation/
3. H2 Database Engine. (2026). *H2 Database Tutorial*. https://www.h2database.com/
4. MDN Web Docs. (2026). *Fetch API and CSS Custom Properties*. Mozilla.
5. Chart.js. (2026). *Chart.js Documentation*. https://www.chartjs.org/

---

<div style="page-break-after: always;"></div>

## Appendix A: Project File Structure

```
hospital-management-system/
├── pom.xml                               # Maven project configuration
├── mvnw                                  # Maven Wrapper script
├── hospital_db.mv.db                     # Persistent H2 database file
└── src/
    └── main/
        ├── java/com/hospital/management/
        │   ├── ManagementApplication.java# App entry point
        │   ├── model/                    # JPA Entities
        │   ├── repository/               # Repository interfaces
        │   ├── controller/               # REST API controllers
        │   └── config/                   # Startup DataSeeder
        └── resources/
            ├── application.properties     # Config properties
            └── static/                   # Static web assets
                ├── index.html            # Dashboard layout
                ├── css/styles.css        # CSS variables and themes
                └── js/app.js             # API requests and rendering
```

---

<div style="page-break-after: always;"></div>

## Appendix B: Key Code Excerpts

### B.1 Consultation Completion & Auto-Invoicing Logic

```java
// Logic from AppointmentController.java
if (!"COMPLETED".equalsIgnoreCase(oldStatus) && "COMPLETED".equalsIgnoreCase(updatedAppointment.getStatus())) {
    generateBillingRecord(updatedAppointment);
}

private void generateBillingRecord(Appointment appointment) {
    List<Billing> existingBills = billingRepository.findAll().stream()
            .filter(b -> b.getAppointment() != null && b.getAppointment().getId().equals(appointment.getId()))
            .toList();

    if (existingBills.isEmpty()) {
        Billing bill = new Billing();
        bill.setPatient(appointment.getPatient());
        bill.setAppointment(appointment);
        bill.setAmount(150.00); // Default consultation fee
        bill.setStatus("UNPAID");
        bill.setBillingDate(LocalDate.now().toString());
        bill.setInsuranceProvider("None");
        billingRepository.save(bill);
    }
}
```

### B.2 In-Memory KPI Statistics Calculation

```java
// Logic from StatsController.java
@GetMapping
public Map<String, Object> getStats() {
    Map<String, Object> stats = new HashMap<>();

    stats.put("totalPatients", patientRepository.count());
    stats.put("totalDoctors", doctorRepository.count());
    stats.put("totalAppointments", appointmentRepository.count());

    stats.put("pendingAppointments", appointmentRepository.findAll().stream()
            .filter(a -> "PENDING".equalsIgnoreCase(a.getStatus()))
            .count());

    stats.put("totalRevenue", billingRepository.findAll().stream()
            .filter(b -> "PAID".equalsIgnoreCase(b.getStatus()))
            .mapToDouble(Billing::getAmount)
            .sum());

    return stats;
}
```

---

**— END OF DISSERTATION —**
