// Application State
let state = {
    doctors: [],
    patients: [],
    appointments: [],
    billing: [],
    currentTheme: 'dark'
};

// API Base Endpoints
const API_BASE = '/api';
const ENDPOINTS = {
    stats: `${API_BASE}/stats`,
    doctors: `${API_BASE}/doctors`,
    patients: `${API_BASE}/patients`,
    appointments: `${API_BASE}/appointments`,
    billing: `${API_BASE}/billing`
};

// Document Ready
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

// Initialize Application
function initApp() {
    // Current date in top bar
    document.getElementById('currentDateStr').innerText = new Date().toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    // Theme Toggle Handler
    const themeBtn = document.getElementById('themeToggleBtn');
    themeBtn.addEventListener('click', toggleTheme);
    
    // Load local storage theme if available
    const savedTheme = localStorage.getItem('auraTheme');
    if (savedTheme === 'light') {
        toggleTheme();
    }

    // Sidebar navigation click routing
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('data-target');
            const panelTitle = item.querySelector('span').innerText;
            
            switchPanel(targetId, panelTitle);
            
            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Wire up modals buttons
    setupModalTriggers();

    // Wire up forms
    setupFormHandlers();

    // Wire up search & filters
    setupFilterHandlers();

    // Initial data load
    refreshAllData();
}

// Switching view panels
function switchPanel(panelId, title) {
    const panels = document.querySelectorAll('.tab-panel');
    panels.forEach(panel => {
        panel.classList.remove('active');
    });
    
    const targetPanel = document.getElementById(panelId);
    if (targetPanel) {
        targetPanel.classList.add('active');
    }
    
    document.getElementById('panelTitle').innerText = title === 'Dashboard' ? 'Dashboard Summary' : `${title} Administration`;
}

// Light / Dark Theme toggle
function toggleTheme() {
    const body = document.body;
    const themeText = document.getElementById('themeToggleText');
    
    if (body.classList.contains('dark-theme')) {
        body.classList.replace('dark-theme', 'light-theme');
        themeText.innerText = 'Dark Mode';
        state.currentTheme = 'light';
        localStorage.setItem('auraTheme', 'light');
    } else {
        body.classList.replace('light-theme', 'dark-theme');
        themeText.innerText = 'Light Mode';
        state.currentTheme = 'dark';
        localStorage.setItem('auraTheme', 'dark');
    }
}

// Refresh all cache
async function refreshAllData() {
    try {
        await Promise.all([
            loadStats(),
            loadDoctors(),
            loadPatients(),
            loadAppointments(),
            loadBilling()
        ]);
        
        // Render view components
        renderDashboardAppointments();
        renderDoctorsList();
        renderPatientsList();
        renderAppointmentsList();
        renderBillingList();

        // Update select lists
        populateDropdowns();
    } catch (err) {
        console.error('Failed to load application data:', err);
    }
}

// Load stats
async function loadStats() {
    try {
        const response = await fetch(ENDPOINTS.stats);
        if (!response.ok) throw new Error('Failed to fetch stats');
        const stats = await response.json();
        
        document.getElementById('stat-patients').innerText = stats.totalPatients;
        document.getElementById('stat-doctors').innerText = stats.totalDoctors;
        document.getElementById('stat-appointments').innerText = stats.totalAppointments;
        document.getElementById('stat-pending-apts').innerText = `${stats.pendingAppointments} pending`;
        document.getElementById('stat-revenue').innerText = `$${stats.totalRevenue.toFixed(2)}`;
        document.getElementById('stat-unpaid').innerText = `$${stats.unpaidInvoicesAmount.toFixed(2)} unpaid`;
        
        // Update top-bar alert badge with pending count
        document.getElementById('pendingAlertCount').innerText = stats.pendingAppointments;
    } catch (err) {
        console.error(err);
    }
}

// Load Doctors
async function loadDoctors() {
    const res = await fetch(ENDPOINTS.doctors);
    state.doctors = res.ok ? await res.json() : [];
}

// Load Patients
async function loadPatients() {
    const res = await fetch(ENDPOINTS.patients);
    state.patients = res.ok ? await res.json() : [];
}

// Load Appointments
async function loadAppointments() {
    const res = await fetch(ENDPOINTS.appointments);
    state.appointments = res.ok ? await res.json() : [];
}

// Load Billing
async function loadBilling() {
    const res = await fetch(ENDPOINTS.billing);
    state.billing = res.ok ? await res.json() : [];
}

// Populate drop-downs for booking, invoicing modals
function populateDropdowns() {
    // Booking Patients Select
    const aptPatientSelect = document.getElementById('aptPatientSelect');
    const billPatientSelect = document.getElementById('billPatientSelect');
    
    const patientOptions = `<option value="">Select Patient</option>` + 
        state.patients.map(p => `<option value="${p.id}">${p.name} (ID: ${p.id})</option>`).join('');
        
    aptPatientSelect.innerHTML = patientOptions;
    billPatientSelect.innerHTML = patientOptions;

    // Booking Doctors Select
    const aptDoctorSelect = document.getElementById('aptDoctorSelect');
    const doctorOptions = `<option value="">Select Doctor</option>` +
        state.doctors.map(d => `<option value="${d.id}">${d.name} (${d.specialty})</option>`).join('');
        
    aptDoctorSelect.innerHTML = doctorOptions;
}

// Modal handling helpers
window.openModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
    }
};

window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
    }
};

function setupModalTriggers() {
    // Quick Actions
    document.getElementById('dashBookAptBtn').addEventListener('click', () => {
        document.getElementById('appointmentForm').reset();
        document.getElementById('appointmentId').value = '';
        document.getElementById('appointmentModalTitle').innerText = 'Book Appointment';
        document.getElementById('clinicalDetailsSection').classList.add('hidden');
        openModal('appointmentModal');
    });

    document.getElementById('dashRegPatientBtn').addEventListener('click', () => {
        document.getElementById('patientForm').reset();
        document.getElementById('patientId').value = '';
        document.getElementById('patientModalTitle').innerText = 'Register New Patient';
        openModal('patientModal');
    });

    document.getElementById('dashAddDoctorBtn').addEventListener('click', () => {
        document.getElementById('doctorForm').reset();
        document.getElementById('doctorId').value = '';
        document.getElementById('doctorModalTitle').innerText = 'Add New Doctor';
        openModal('doctorModal');
    });

    // Page Specific controls
    document.getElementById('openAddDoctorModalBtn').addEventListener('click', () => {
        document.getElementById('doctorForm').reset();
        document.getElementById('doctorId').value = '';
        document.getElementById('doctorModalTitle').innerText = 'Add New Doctor';
        openModal('doctorModal');
    });

    document.getElementById('openAddPatientModalBtn').addEventListener('click', () => {
        document.getElementById('patientForm').reset();
        document.getElementById('patientId').value = '';
        document.getElementById('patientModalTitle').innerText = 'Register New Patient';
        openModal('patientModal');
    });

    document.getElementById('openBookAptModalBtn').addEventListener('click', () => {
        document.getElementById('appointmentForm').reset();
        document.getElementById('appointmentId').value = '';
        document.getElementById('appointmentModalTitle').innerText = 'Book Appointment';
        document.getElementById('clinicalDetailsSection').classList.add('hidden');
        openModal('appointmentModal');
    });

    document.getElementById('openCreateBillModalBtn').addEventListener('click', () => {
        document.getElementById('billingForm').reset();
        document.getElementById('billingId').value = '';
        document.getElementById('billingModalTitle').innerText = 'Generate Custom Invoice';
        document.getElementById('billDate').value = new Date().toISOString().substring(0, 10);
        openModal('billingModal');
    });

    // Listen to status select changes in appointment modal to show/hide diagnosis fields
    document.getElementById('aptStatus').addEventListener('change', (e) => {
        const section = document.getElementById('clinicalDetailsSection');
        if (e.target.value === 'COMPLETED') {
            section.classList.remove('hidden');
        } else {
            section.classList.add('hidden');
        }
    });
}

// Setup Form handlers for POST / PUT
function setupFormHandlers() {
    // 1. Doctor Form
    document.getElementById('doctorForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('doctorId').value;
        const payload = {
            name: document.getElementById('doctorName').value,
            specialty: document.getElementById('doctorSpecialty').value,
            email: document.getElementById('doctorEmail').value,
            phone: document.getElementById('doctorPhone').value,
            schedule: document.getElementById('doctorSchedule').value,
            roomNumber: document.getElementById('doctorRoom').value
        };

        try {
            let url = ENDPOINTS.doctors;
            let method = 'POST';
            if (id) {
                url += `/${id}`;
                method = 'PUT';
            }

            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                closeModal('doctorModal');
                refreshAllData();
            } else {
                const text = await response.text();
                alert(`Error saving doctor: ${text}`);
            }
        } catch (err) {
            console.error(err);
        }
    });

    // 2. Patient Form
    document.getElementById('patientForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('patientId').value;
        const payload = {
            name: document.getElementById('patientName').value,
            dateOfBirth: document.getElementById('patientDob').value,
            gender: document.getElementById('patientGender').value,
            email: document.getElementById('patientEmail').value,
            phone: document.getElementById('patientPhone').value,
            address: document.getElementById('patientAddress').value,
            medicalHistory: document.getElementById('patientHistory').value
        };

        try {
            let url = ENDPOINTS.patients;
            let method = 'POST';
            if (id) {
                url += `/${id}`;
                method = 'PUT';
            }

            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                closeModal('patientModal');
                refreshAllData();
            } else {
                const text = await response.text();
                alert(`Error saving patient: ${text}`);
            }
        } catch (err) {
            console.error(err);
        }
    });

    // 3. Appointment Form
    document.getElementById('appointmentForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('appointmentId').value;
        const payload = {
            patientId: parseInt(document.getElementById('aptPatientSelect').value),
            doctorId: parseInt(document.getElementById('aptDoctorSelect').value),
            appointmentDate: document.getElementById('aptDate').value.replace('T', ' '),
            status: document.getElementById('aptStatus').value,
            symptoms: document.getElementById('aptSymptoms').value,
            diagnosis: document.getElementById('aptDiagnosis').value,
            prescription: document.getElementById('aptPrescription').value
        };

        try {
            let url = ENDPOINTS.appointments;
            let method = 'POST';
            if (id) {
                url += `/${id}`;
                method = 'PUT';
            }

            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                closeModal('appointmentModal');
                refreshAllData();
            } else {
                const text = await response.text();
                alert(`Error booking appointment: ${text}`);
            }
        } catch (err) {
            console.error(err);
        }
    });

    // 4. Clinical consultation completion Form
    document.getElementById('clinicalForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const aptId = document.getElementById('clinicalAptId').value;
        const appointment = state.appointments.find(a => a.id == aptId);
        if (!appointment) return;

        const payload = {
            patientId: appointment.patient.id,
            doctorId: appointment.doctor.id,
            appointmentDate: appointment.appointmentDate,
            status: 'COMPLETED',
            symptoms: appointment.symptoms,
            diagnosis: document.getElementById('clinicalDiagnosis').value,
            prescription: document.getElementById('clinicalPrescription').value
        };

        try {
            const response = await fetch(`${ENDPOINTS.appointments}/${aptId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                closeModal('clinicalModal');
                refreshAllData();
            } else {
                const text = await response.text();
                alert(`Error completing appointment session: ${text}`);
            }
        } catch (err) {
            console.error(err);
        }
    });

    // 5. Billing / Invoice generation Form
    document.getElementById('billingForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('billingId').value;
        const payload = {
            patientId: parseInt(document.getElementById('billPatientSelect').value),
            amount: parseFloat(document.getElementById('billAmount').value),
            status: document.getElementById('billStatus').value,
            billingDate: document.getElementById('billDate').value,
            insuranceProvider: document.getElementById('billInsurance').value
        };

        try {
            let url = ENDPOINTS.billing;
            let method = 'POST';
            if (id) {
                url += `/${id}`;
                method = 'PUT';
            }

            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                closeModal('billingModal');
                refreshAllData();
            } else {
                const text = await response.text();
                alert(`Error generating invoice: ${text}`);
            }
        } catch (err) {
            console.error(err);
        }
    });
}

// Setup searching and filtering handlers
function setupFilterHandlers() {
    // Doctor Filter
    document.getElementById('doctorSearchInput').addEventListener('input', renderDoctorsList);

    // Patient Filter
    document.getElementById('patientSearchInput').addEventListener('input', renderPatientsList);

    // Appointment Filter & status selection
    document.getElementById('appointmentSearchInput').addEventListener('input', renderAppointmentsList);
    document.getElementById('appointmentStatusFilter').addEventListener('change', renderAppointmentsList);

    // Billing filter and payment state selection
    document.getElementById('billingSearchInput').addEventListener('input', renderBillingList);
    document.getElementById('billingStatusFilter').addEventListener('change', renderBillingList);
}

// Render Dashboard Appointments (only shows upcoming/today)
function renderDashboardAppointments() {
    const tbody = document.querySelector('#dashboard-appointments-table tbody');
    if (state.appointments.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" class="loading-cell">No appointments scheduled</td></tr>`;
        return;
    }

    // Sort: PENDING / CONFIRMED first, then by date descending
    const sorted = [...state.appointments].sort((a,b) => {
        if (a.status === 'PENDING' && b.status !== 'PENDING') return -1;
        if (a.status !== 'PENDING' && b.status === 'PENDING') return 1;
        return new Date(a.appointmentDate) - new Date(b.appointmentDate);
    }).slice(0, 5); // limit to top 5

    tbody.innerHTML = sorted.map(apt => `
        <tr>
            <td><strong>${apt.patient.name}</strong></td>
            <td>${apt.doctor.name}</td>
            <td>${apt.appointmentDate}</td>
            <td><span class="badge-status ${apt.status.toLowerCase()}">${apt.status}</span></td>
        </tr>
    `).join('');
}

// Render Doctors List Table
function renderDoctorsList() {
    const tbody = document.querySelector('#doctors-table tbody');
    const searchVal = document.getElementById('doctorSearchInput').value.toLowerCase();
    
    const filtered = state.doctors.filter(d => 
        d.name.toLowerCase().includes(searchVal) || 
        d.specialty.toLowerCase().includes(searchVal)
    );

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="loading-cell">No doctors match the search criteria</td></tr>`;
        return;
    }

    tbody.innerHTML = filtered.map(d => `
        <tr>
            <td><strong>${d.name}</strong></td>
            <td>${d.specialty}</td>
            <td><a href="mailto:${d.email}" style="color:var(--text-primary); text-decoration:none">${d.email}</a></td>
            <td>${d.phone}</td>
            <td>${d.schedule || 'Not Specified'}</td>
            <td><span style="font-family:monospace; font-weight:600">${d.roomNumber || '--'}</span></td>
            <td class="action-buttons-cell">
                <button class="btn btn-secondary btn-sm" onclick="editDoctor(${d.id})">Edit</button>
                <button class="btn btn-secondary btn-sm red-text" onclick="deleteDoctor(${d.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

// Edit Doctor trigger
window.editDoctor = function(id) {
    const doc = state.doctors.find(d => d.id == id);
    if (!doc) return;

    document.getElementById('doctorForm').reset();
    document.getElementById('doctorId').value = doc.id;
    document.getElementById('doctorName').value = doc.name;
    document.getElementById('doctorSpecialty').value = doc.specialty;
    document.getElementById('doctorRoom').value = doc.roomNumber || '';
    document.getElementById('doctorEmail').value = doc.email;
    document.getElementById('doctorPhone').value = doc.phone;
    document.getElementById('doctorSchedule').value = doc.schedule || '';
    
    document.getElementById('doctorModalTitle').innerText = 'Edit Doctor Details';
    openModal('doctorModal');
};

// Delete Doctor
window.deleteDoctor = async function(id) {
    if (!confirm('Are you sure you want to delete this doctor? All appointments linked to this doctor will need to be reassigned.')) return;
    
    try {
        const response = await fetch(`${ENDPOINTS.doctors}/${id}`, { method: 'DELETE' });
        if (response.ok) {
            refreshAllData();
        } else {
            alert('Could not delete doctor. It might be referenced by appointments.');
        }
    } catch (err) {
        console.error(err);
    }
};

// Render Patients List Table
function renderPatientsList() {
    const tbody = document.querySelector('#patients-table tbody');
    const searchVal = document.getElementById('patientSearchInput').value.toLowerCase();

    const filtered = state.patients.filter(p => 
        p.name.toLowerCase().includes(searchVal) || 
        p.phone.includes(searchVal)
    );

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" class="loading-cell">No patients found</td></tr>`;
        return;
    }

    tbody.innerHTML = filtered.map(p => `
        <tr>
            <td><strong>${p.name}</strong><br><small style="color:var(--text-muted)">ID: ${p.id}</small></td>
            <td>${p.dateOfBirth}</td>
            <td>${p.gender}</td>
            <td>${p.email || '--'}</td>
            <td>${p.phone}</td>
            <td>${p.address || '--'}</td>
            <td><div style="max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${p.medicalHistory || ''}">${p.medicalHistory || 'None'}</div></td>
            <td class="action-buttons-cell">
                <button class="btn btn-secondary btn-sm" onclick="editPatient(${p.id})">Edit</button>
                <button class="btn btn-secondary btn-sm red-text" onclick="deletePatient(${p.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

// Edit Patient trigger
window.editPatient = function(id) {
    const pat = state.patients.find(p => p.id == id);
    if (!pat) return;

    document.getElementById('patientForm').reset();
    document.getElementById('patientId').value = pat.id;
    document.getElementById('patientName').value = pat.name;
    document.getElementById('patientDob').value = pat.dateOfBirth;
    document.getElementById('patientGender').value = pat.gender;
    document.getElementById('patientEmail').value = pat.email || '';
    document.getElementById('patientPhone').value = pat.phone;
    document.getElementById('patientAddress').value = pat.address || '';
    document.getElementById('patientHistory').value = pat.medicalHistory || '';
    
    document.getElementById('patientModalTitle').innerText = 'Edit Patient Details';
    openModal('patientModal');
};

// Delete Patient
window.deletePatient = async function(id) {
    if (!confirm('Are you sure you want to remove this patient from database? All billing and appointment history will be removed.')) return;
    
    try {
        const response = await fetch(`${ENDPOINTS.patients}/${id}`, { method: 'DELETE' });
        if (response.ok) {
            refreshAllData();
        } else {
            alert('Failed to delete patient. Ensure there are no active dependencies.');
        }
    } catch (err) {
        console.error(err);
    }
};

// Render Appointments List Table
function renderAppointmentsList() {
    const tbody = document.querySelector('#appointments-table tbody');
    const searchVal = document.getElementById('appointmentSearchInput').value.toLowerCase();
    const statusVal = document.getElementById('appointmentStatusFilter').value;

    const filtered = state.appointments.filter(a => {
        const matchesSearch = a.patient.name.toLowerCase().includes(searchVal) || 
                              a.doctor.name.toLowerCase().includes(searchVal);
        const matchesStatus = statusVal === 'ALL' || a.status.toUpperCase() === statusVal.toUpperCase();
        return matchesSearch && matchesStatus;
    });

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" class="loading-cell">No appointments scheduled matching filters</td></tr>`;
        return;
    }

    tbody.innerHTML = filtered.map(a => {
        let actionButtons = '';
        if (a.status !== 'COMPLETED' && a.status !== 'CANCELLED') {
            actionButtons += `<button class="btn btn-accent btn-sm" onclick="openConsultationModal(${a.id})">Diagnose</button>`;
        }
        actionButtons += `
            <button class="btn btn-secondary btn-sm" onclick="editAppointment(${a.id})">Edit</button>
            <button class="btn btn-secondary btn-sm red-text" onclick="deleteAppointment(${a.id})">Cancel/Del</button>
        `;

        const diagStr = a.diagnosis ? `<strong>Diag:</strong> ${a.diagnosis}<br><strong>Rx:</strong> ${a.prescription}` : `<span style="font-style:italic;color:var(--text-muted)">Consultation pending</span>`;

        return `
            <tr>
                <td><strong>${a.patient.name}</strong></td>
                <td>${a.doctor.name}</td>
                <td>${a.doctor.specialty}</td>
                <td>${a.appointmentDate}</td>
                <td>${a.symptoms || '--'}</td>
                <td><span class="badge-status ${a.status.toLowerCase()}">${a.status}</span></td>
                <td><div style="font-size:0.8rem; max-width:220px">${diagStr}</div></td>
                <td class="action-buttons-cell">${actionButtons}</td>
            </tr>
        `;
    }).join('');
}

// Edit appointment trigger
window.editAppointment = function(id) {
    const apt = state.appointments.find(a => a.id == id);
    if (!apt) return;

    document.getElementById('appointmentForm').reset();
    document.getElementById('appointmentId').value = apt.id;
    document.getElementById('aptPatientSelect').value = apt.patient.id;
    document.getElementById('aptDoctorSelect').value = apt.doctor.id;
    
    // Formatting date-time for datetime-local value (needs YYYY-MM-DDTHH:MM)
    const rawDate = apt.appointmentDate.replace(' ', 'T').substring(0, 16);
    document.getElementById('aptDate').value = rawDate;
    document.getElementById('aptStatus').value = apt.status;
    document.getElementById('aptSymptoms').value = apt.symptoms || '';
    
    // Show clinical section if status is completed
    const section = document.getElementById('clinicalDetailsSection');
    if (apt.status === 'COMPLETED') {
        section.classList.remove('hidden');
        document.getElementById('aptDiagnosis').value = apt.diagnosis || '';
        document.getElementById('aptPrescription').value = apt.prescription || '';
    } else {
        section.classList.add('hidden');
    }

    document.getElementById('appointmentModalTitle').innerText = 'Reschedule / Update Appointment';
    openModal('appointmentModal');
};

// Open Quick Consultation Modal to complete appointment
window.openConsultationModal = function(id) {
    const apt = state.appointments.find(a => a.id == id);
    if (!apt) return;

    document.getElementById('clinicalForm').reset();
    document.getElementById('clinicalAptId').value = apt.id;
    document.getElementById('clinicalPatientName').innerText = apt.patient.name;
    document.getElementById('clinicalDoctorName').innerText = apt.doctor.name;
    document.getElementById('clinicalSymptoms').innerText = apt.symptoms || 'None reported';
    
    openModal('clinicalModal');
};

// Delete/Cancel Appointment
window.deleteAppointment = async function(id) {
    const apt = state.appointments.find(a => a.id == id);
    if (!apt) return;

    if (apt.status !== 'CANCELLED') {
        if (confirm('Do you want to mark this appointment as CANCELLED? (Choose Cancel to permanently delete instead)')) {
            // Update status to cancelled
            const payload = {
                patientId: apt.patient.id,
                doctorId: apt.doctor.id,
                appointmentDate: apt.appointmentDate,
                status: 'CANCELLED',
                symptoms: apt.symptoms,
                diagnosis: apt.diagnosis,
                prescription: apt.prescription
            };
            await fetch(`${ENDPOINTS.appointments}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            refreshAllData();
            return;
        }
    }

    if (confirm('Permanently delete this appointment record from log?')) {
        await fetch(`${ENDPOINTS.appointments}/${id}`, { method: 'DELETE' });
        refreshAllData();
    }
};

// Render Billing List Table
function renderBillingList() {
    const tbody = document.querySelector('#billing-table tbody');
    const searchVal = document.getElementById('billingSearchInput').value.toLowerCase();
    const statusVal = document.getElementById('billingStatusFilter').value;

    const filtered = state.billing.filter(b => {
        const matchesSearch = b.patient.name.toLowerCase().includes(searchVal);
        const matchesStatus = statusVal === 'ALL' || b.status.toUpperCase() === statusVal.toUpperCase();
        return matchesSearch && matchesStatus;
    });

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" class="loading-cell">No billing invoices found</td></tr>`;
        return;
    }

    tbody.innerHTML = filtered.map(b => {
        let actionButtons = '';
        if (b.status === 'UNPAID') {
            actionButtons += `<button class="btn btn-primary btn-sm" onclick="payInvoice(${b.id})">Mark Paid</button>`;
        }
        actionButtons += `
            <button class="btn btn-secondary btn-sm" onclick="editBilling(${b.id})">Edit</button>
            <button class="btn btn-secondary btn-sm red-text" onclick="deleteBilling(${b.id})">Delete</button>
        `;

        const aptDetails = b.appointment ? 
            `Apt date: ${b.appointment.appointmentDate}<br><small style="color:var(--text-muted)">Doc: ${b.appointment.doctor.name}</small>` : 
            `<span style="font-style:italic;color:var(--text-muted)">Direct Lab/Pharmacy Charge</span>`;

        return `
            <tr>
                <td><strong>#INV-2026-${String(b.id).padStart(4, '0')}</strong></td>
                <td><strong>${b.patient.name}</strong><br><small style="color:var(--text-muted)">ID: ${b.patient.id}</small></td>
                <td>${b.billingDate}</td>
                <td><strong style="font-family:monospace;font-size:0.95rem">$${b.amount.toFixed(2)}</strong></td>
                <td>${b.insuranceProvider || 'None'}</td>
                <td><span class="badge-status ${b.status.toLowerCase()}">${b.status}</span></td>
                <td><div style="font-size:0.8rem">${aptDetails}</div></td>
                <td class="action-buttons-cell">${actionButtons}</td>
            </tr>
        `;
    }).join('');
}

// Mark invoice as PAID
window.payInvoice = async function(id) {
    const bill = state.billing.find(b => b.id == id);
    if (!bill) return;

    const payload = {
        patientId: bill.patient.id,
        appointmentId: bill.appointment ? bill.appointment.id : null,
        amount: bill.amount,
        status: 'PAID',
        billingDate: bill.billingDate,
        insuranceProvider: bill.insuranceProvider || 'None'
    };

    try {
        const response = await fetch(`${ENDPOINTS.billing}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            refreshAllData();
        } else {
            alert('Failed to update payment status.');
        }
    } catch (err) {
        console.error(err);
    }
};

// Edit Billing trigger
window.editBilling = function(id) {
    const bill = state.billing.find(b => b.id == id);
    if (!bill) return;

    document.getElementById('billingForm').reset();
    document.getElementById('billingId').value = bill.id;
    document.getElementById('billPatientSelect').value = bill.patient.id;
    document.getElementById('billAmount').value = bill.amount;
    document.getElementById('billStatus').value = bill.status;
    document.getElementById('billDate').value = bill.billingDate;
    document.getElementById('billInsurance').value = bill.insuranceProvider || '';

    document.getElementById('billingModalTitle').innerText = 'Modify Invoice Record';
    openModal('billingModal');
};

// Delete Invoice Record
window.deleteBilling = async function(id) {
    if (!confirm('Permanently delete this invoice record from logs?')) return;
    
    try {
        const response = await fetch(`${ENDPOINTS.billing}/${id}`, { method: 'DELETE' });
        if (response.ok) {
            refreshAllData();
        } else {
            alert('Failed to delete invoice record.');
        }
    } catch (err) {
        console.error(err);
    }
};
