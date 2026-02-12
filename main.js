// Form Navigation and Progress Tracking
let currentSection = 1;
const totalSections = 9;

// Update progress bar
function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const currentStepEl = document.getElementById('currentStep');
    const percentage = (currentSection / totalSections) * 100;

    progressFill.style.width = `${percentage}%`;
    currentStepEl.textContent = currentSection;
}

// Show specific section
function showSection(sectionNumber) {
    // Hide all sections
    document.querySelectorAll('.form-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show target section
    const targetSection = document.querySelector(`[data-section="${sectionNumber}"]`);
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = sectionNumber;
        updateProgress();

        // Scroll to top smoothly
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Initialize form navigation
function initFormNavigation() {
    // Next buttons
    document.querySelectorAll('.next-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const nextSection = parseInt(this.getAttribute('data-next'));

            // Validate current section before proceeding
            const currentSectionEl = document.querySelector(`[data-section="${currentSection}"]`);
            const requiredFields = currentSectionEl.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim() && field.type !== 'checkbox' && field.type !== 'radio') {
                    isValid = false;
                    field.style.borderColor = 'var(--danger-color)';

                    // Reset border color after 2 seconds
                    setTimeout(() => {
                        field.style.borderColor = '';
                    }, 2000);
                } else if (field.type === 'radio') {
                    const radioGroup = currentSectionEl.querySelectorAll(`[name="${field.name}"]`);
                    const isChecked = Array.from(radioGroup).some(radio => radio.checked);
                    if (!isChecked) {
                        isValid = false;
                        field.closest('.radio-group').style.borderColor = 'var(--danger-color)';

                        setTimeout(() => {
                            field.closest('.radio-group').style.borderColor = '';
                        }, 2000);
                    }
                }
            });

            if (isValid) {
                showSection(nextSection);
            } else {
                // Show error message
                showNotification('Please fill in all required fields', 'error');
            }
        });
    });

    // Previous buttons
    document.querySelectorAll('.prev-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const prevSection = parseInt(this.getAttribute('data-prev'));
            showSection(prevSection);
        });
    });
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'error' ? 'var(--danger-color)' : 'var(--success-color)'};
        color: white;
        border-radius: var(--radius-sm);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Form submission
function initFormSubmission() {
    const form = document.getElementById('questionnaireForm');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Collect all form data
        const formData = new FormData(form);
        const data = {};

        // Convert FormData to object
        for (let [key, value] of formData.entries()) {
            if (data[key]) {
                // If key already exists, convert to array
                if (Array.isArray(data[key])) {
                    data[key].push(value);
                } else {
                    data[key] = [data[key], value];
                }
            } else {
                data[key] = value;
            }
        }

        // Add checkboxes that weren't checked
        const checkboxes = form.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            if (!checkbox.checked && !data[checkbox.name]) {
                data[checkbox.name] = 'No';
            } else if (checkbox.checked && !data[checkbox.name]) {
                data[checkbox.name] = 'Yes';
            }
        });

        // Log data to console (for development)
        console.log('Form Data:', data);

        // Create formatted text output
        const formattedData = formatFormData(data);

        // Download as text file
        downloadFormData(formattedData);

        // Show success message
        document.getElementById('successMessage').classList.add('show');

        // Optional: Send to server
        // sendToServer(data);
    });
}

// Format form data for download
function formatFormData(data) {
    let output = '='.repeat(80) + '\n';
    output += 'MEDICAL CLINIC WHATSAPP AI CHATBOT - PROJECT QUESTIONNAIRE\n';
    output += '='.repeat(80) + '\n\n';
    output += `Submission Date: ${new Date().toLocaleString()}\n\n`;

    output += '-'.repeat(80) + '\n';
    output += 'SECTION 1: CLINIC INFORMATION\n';
    output += '-'.repeat(80) + '\n';
    output += `Clinic Name: ${data.clinicName || 'N/A'}\n`;
    output += `Owner/Doctor Name: ${data.ownerName || 'N/A'}\n`;
    output += `Contact Email: ${data.contactEmail || 'N/A'}\n`;
    output += `Clinic Address: ${data.clinicAddress || 'N/A'}\n`;
    output += `City/State: ${data.cityState || 'N/A'}\n`;
    output += `Pincode: ${data.pincode || 'N/A'}\n\n`;

    // Helper function to format time from select dropdowns
    const formatTime = (hour, minute, period) => {
        if (!hour || !minute || !period) return 'N/A';
        return `${hour}:${minute} ${period}`;
    };

    output += 'Operating Hours:\n';
    output += `  Monday-Friday: ${formatTime(data.mondayFridayFromHour, data.mondayFridayFromMinute, data.mondayFridayFromPeriod)} to ${formatTime(data.mondayFridayToHour, data.mondayFridayToMinute, data.mondayFridayToPeriod)}\n`;
    output += `  Saturday: ${data.saturdayClosed ? 'Closed' : `${formatTime(data.saturdayFromHour, data.saturdayFromMinute, data.saturdayFromPeriod)} to ${formatTime(data.saturdayToHour, data.saturdayToMinute, data.saturdayToPeriod)}`}\n`;
    output += `  Sunday: ${data.sundayClosed ? 'Closed' : `${formatTime(data.sundayFromHour, data.sundayFromMinute, data.sundayFromPeriod)} to ${formatTime(data.sundayToHour, data.sundayToMinute, data.sundayToPeriod)}`}\n`;
    output += `  Holiday Dates: ${data.holidayDates || 'N/A'}\n\n`;

    output += `Services Offered: ${data.servicesOffered || 'N/A'}\n`;
    output += `Appointment Duration: ${data.appointmentDuration || 'N/A'} minutes\n`;
    output += `Max Appointments/Day: ${data.maxAppointments || 'N/A'}\n`;
    output += `Consultation Fee: ₹${data.consultationFee || 'N/A'}\n`;
    output += `Cancellation Policy: ${data.cancellationPolicy || 'N/A'}\n\n`;

    output += '-'.repeat(80) + '\n';
    output += 'SECTION 2: WHATSAPP BOT CONFIGURATION\n';
    output += '-'.repeat(80) + '\n';
    output += `WhatsApp Number Type: ${data.whatsappNumberType || 'N/A'}\n`;
    output += `Existing Number: ${data.existingNumber || 'N/A'}\n`;
    output += `Welcome Message: ${data.welcomeMessage || 'N/A'}\n`;
    output += `Emergency Keywords: ${data.emergencyKeywords || 'N/A'}\n`;
    output += `Doctor's WhatsApp: ${data.doctorWhatsApp || 'N/A'}\n`;
    output += `Doctor's Email: ${data.doctorEmailAlert || 'N/A'}\n`;
    output += `Patient Notification: ${data.patientNotification || 'N/A'}\n\n`;

    output += 'FAQ Responses:\n';
    output += `  Timings: ${data.faqTimings || 'N/A'}\n`;
    output += `  Fee: ${data.faqFee || 'N/A'}\n`;
    output += `  Address: ${data.faqAddress || 'N/A'}\n`;
    output += `  Services: ${data.faqServices || 'N/A'}\n`;
    output += `  Online Consultations: ${data.faqOnlineConsult || 'N/A'}\n`;
    output += `  Documents: ${data.faqDocuments || 'N/A'}\n`;
    output += `  Prescription: ${data.faqPrescription || 'N/A'}\n`;
    output += `  Parking: ${data.faqParking || 'N/A'}\n`;
    if (data.faqOther1) output += `  Other 1: ${data.faqOther1}\n`;
    if (data.faqOther2) output += `  Other 2: ${data.faqOther2}\n`;
    output += '\n';

    output += '-'.repeat(80) + '\n';
    output += 'SECTION 3: APPOINTMENT MANAGEMENT\n';
    output += '-'.repeat(80) + '\n';
    output += 'Patient Information to Collect:\n';
    output += `  Full Name: ${data.collectFullName || 'No'}\n`;
    output += `  Age: ${data.collectAge || 'No'}\n`;
    output += `  Phone: ${data.collectPhone || 'No'}\n`;
    output += `  Email: ${data.collectEmail || 'No'}\n`;
    output += `  Gender: ${data.collectGender || 'No'}\n`;
    output += `  Symptoms: ${data.collectSymptoms || 'No'}\n`;
    output += `  First-time Patient: ${data.collectFirstTime || 'No'}\n`;
    output += `  Insurance: ${data.collectInsurance || 'No'}\n`;
    if (data.collectOther) output += `  Other: ${data.collectOther}\n`;
    output += '\n';

    output += `Cancel/Reschedule Policy: ${data.cancelReschedule || 'N/A'}\n`;
    output += `Cancel Hours Limit: ${data.cancelHours || 'N/A'}\n`;
    output += `Notice Required: ${data.noticeRequired || 'N/A'} hours\n\n`;

    output += '-'.repeat(80) + '\n';
    output += 'SECTION 4: MULTILINGUAL SUPPORT\n';
    output += '-'.repeat(80) + '\n';
    output += 'Languages:\n';
    output += `  English: ${data.langEnglish || 'No'}\n`;
    output += `  Hindi: ${data.langHindi || 'No'}\n`;
    output += `  Marathi: ${data.langMarathi || 'No'}\n`;
    if (data.langOther) output += `  Other: ${data.langOther}\n`;
    output += '\n';

    output += '-'.repeat(80) + '\n';
    output += 'SECTION 5: GOOGLE SHEETS INTEGRATION\n';
    output += '-'.repeat(80) + '\n';
    output += `Google Account Email: ${data.googleEmail || 'N/A'}\n`;
    output += 'Data to Track:\n';
    output += `  Name: ${data.trackName || 'No'}\n`;
    output += `  Phone: ${data.trackPhone || 'No'}\n`;
    output += `  Date/Time: ${data.trackDateTime || 'No'}\n`;
    output += `  Service: ${data.trackService || 'No'}\n`;
    output += `  Status: ${data.trackStatus || 'No'}\n`;
    output += `  Age: ${data.trackAge || 'No'}\n`;
    output += `  Email: ${data.trackEmail || 'No'}\n`;
    output += `  Symptoms: ${data.trackSymptoms || 'No'}\n`;
    if (data.trackOther) output += `  Other: ${data.trackOther}\n`;
    output += '\n';

    output += '-'.repeat(80) + '\n';
    output += 'SECTION 6: ADMIN PANEL ACCESS\n';
    output += '-'.repeat(80) + '\n';
    output += `Admin Email: ${data.adminEmail || 'N/A'}\n`;
    output += `Admin Password: ${data.adminPassword ? '***HIDDEN***' : 'N/A'}\n\n`;

    output += 'Admin Features:\n';
    output += `  Calendar View: ${data.featureViewCalendar || 'No'}\n`;
    output += `  Manual Add/Edit: ${data.featureManualAdd || 'No'}\n`;
    output += `  Update Info: ${data.featureUpdateInfo || 'No'}\n`;
    output += `  Emergency History: ${data.featureEmergencyHistory || 'No'}\n`;
    output += `  Bulk Messages: ${data.featureBulkMessages || 'No'}\n`;
    output += `  Reports: ${data.featureReports || 'No'}\n`;
    if (data.featureOther) output += `  Other: ${data.featureOther}\n`;
    output += '\n';

    output += 'Notification Preferences:\n';
    output += `  New Appointments: ${data.notifyNewAppt || 'N/A'}\n`;
    output += `  Cancellations: ${data.notifyCancellation || 'N/A'}\n`;
    output += `  Emergency: ${data.notifyEmergency || 'N/A'}\n\n`;

    output += '-'.repeat(80) + '\n';
    output += 'SECTION 7: ADDITIONAL REQUIREMENTS\n';
    output += '-'.repeat(80) + '\n';
    output += `Special Features: ${data.specialFeatures || 'N/A'}\n`;
    output += `Existing System Integration: ${data.existingSystem || 'N/A'}\n`;
    output += `System Details: ${data.systemDetails || 'N/A'}\n\n`;

    output += '-'.repeat(80) + '\n';
    output += 'SECTION 8: PROJECT TIMELINE & SUPPORT\n';
    output += '-'.repeat(80) + '\n';
    output += `Completion Date: ${data.completionDate || 'N/A'}\n`;
    output += `Primary Contact: ${data.primaryContact || 'N/A'}\n`;
    output += 'Communication Methods:\n';
    output += `  WhatsApp: ${data.commWhatsApp || 'No'}\n`;
    output += `  Phone: ${data.commPhone || 'No'}\n`;
    output += `  Email: ${data.commEmail || 'No'}\n\n`;

    output += '-'.repeat(80) + '\n';
    output += 'SECTION 9: PAYMENT & TERMS\n';
    output += '-'.repeat(80) + '\n';
    output += `Terms Agreed: ${data.agreeTerms || 'No'}\n`;
    output += `Client Signature: ${data.clientSignature || 'N/A'}\n`;
    output += `Signature Date: ${data.signatureDate || 'N/A'}\n\n`;

    output += '='.repeat(80) + '\n';
    output += 'END OF QUESTIONNAIRE\n';
    output += '='.repeat(80) + '\n';

    return output;
}

// Download form data as text file
function downloadFormData(formattedData) {
    const blob = new Blob([formattedData], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    a.href = url;
    a.download = `Questionnaire_${timestamp}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Optional: Send data to server
function sendToServer(data) {
    // Uncomment and modify this section when you have a server endpoint
    /*
    fetch('/api/submit-questionnaire', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);
    })
    .catch(error => {
        console.error('Error:', error);
        showNotification('Failed to submit. Please try again.', 'error');
    });
    */
}

// Auto-save to localStorage
function initAutoSave() {
    const form = document.getElementById('questionnaireForm');
    const inputs = form.querySelectorAll('input, textarea, select');

    // Load saved data
    inputs.forEach(input => {
        const savedValue = localStorage.getItem(`form_${input.name}`);
        if (savedValue && input.type !== 'password') {
            if (input.type === 'checkbox' || input.type === 'radio') {
                input.checked = savedValue === 'true';
            } else {
                input.value = savedValue;
            }
        }
    });

    // Save on change
    inputs.forEach(input => {
        input.addEventListener('change', function () {
            if (this.type === 'checkbox' || this.type === 'radio') {
                localStorage.setItem(`form_${this.name}`, this.checked);
            } else {
                localStorage.setItem(`form_${this.name}`, this.value);
            }
        });
    });
}

// Clear auto-save data after successful submission
function clearAutoSave() {
    const form = document.getElementById('questionnaireForm');
    const inputs = form.querySelectorAll('input, textarea, select');

    inputs.forEach(input => {
        localStorage.removeItem(`form_${input.name}`);
    });
}

// Handle conditional fields
function initConditionalFields() {
    // Show/hide existing number field based on radio selection
    const whatsappRadios = document.querySelectorAll('[name="whatsappNumberType"]');
    const existingNumberField = document.getElementById('existingNumber');

    whatsappRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            if (this.value === 'existing') {
                existingNumberField.parentElement.style.display = 'block';
                existingNumberField.required = true;
            } else {
                existingNumberField.parentElement.style.display = 'none';
                existingNumberField.required = false;
            }
        });
    });

    // Show/hide cancel hours field
    const cancelRadios = document.querySelectorAll('[name="cancelReschedule"]');
    const cancelHoursField = document.getElementById('cancelHours');

    cancelRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            if (this.value === 'conditional') {
                cancelHoursField.parentElement.style.display = 'block';
                cancelHoursField.required = true;
            } else {
                cancelHoursField.parentElement.style.display = 'none';
                cancelHoursField.required = false;
            }
        });
    });

    // Show/hide system details field
    const systemRadios = document.querySelectorAll('[name="existingSystem"]');
    const systemDetailsField = document.getElementById('systemDetails');

    systemRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            if (this.value === 'yes') {
                systemDetailsField.parentElement.style.display = 'block';
            } else {
                systemDetailsField.parentElement.style.display = 'none';
            }
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    initFormNavigation();
    initFormSubmission();
    initAutoSave();
    initConditionalFields();
    updateProgress();

    // Set default date to today
    const signatureDate = document.getElementById('signatureDate');
    if (signatureDate) {
        signatureDate.valueAsDate = new Date();
    }

    console.log('Questionnaire form initialized successfully!');
});
