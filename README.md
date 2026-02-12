# Medical Clinic WhatsApp AI Chatbot - Project Questionnaire

A professional, multi-section questionnaire website for collecting client requirements for WhatsApp-based AI chatbot development projects.

## 🌟 Features

### ✨ User Experience
- **Multi-step Form**: 9 comprehensive sections with smooth navigation
- **Progress Tracking**: Visual progress bar showing completion status
- **Form Validation**: Real-time validation with helpful error messages
- **Auto-save**: Automatically saves progress to localStorage
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Dark Theme**: Modern dark blue theme with glassmorphism effects
- **Smooth Animations**: Professional transitions and micro-interactions

### 📋 Form Sections

1. **Clinic Information**
   - Basic clinic details (name, owner, contact, address)
   - Operating hours (weekdays, weekends, holidays)
   - Services offered
   - Appointment details (duration, capacity, fees, cancellation policy)

2. **WhatsApp Bot Configuration**
   - Phone number setup (new or existing)
   - Welcome message customization
   - Emergency keyword triggers
   - FAQ setup with customizable responses

3. **Appointment Management**
   - Patient information collection preferences
   - Cancellation and rescheduling policies
   - Notice period requirements

4. **Multilingual Support**
   - Language selection (English, Hindi, Marathi, custom)
   - Translation table for key phrases

5. **Google Sheets Integration**
   - Data tracking preferences
   - Google account setup

6. **Admin Panel Access**
   - Admin credentials setup
   - Feature selection (calendar, reports, bulk messages, etc.)
   - Notification preferences (WhatsApp, Email, or Both)

7. **Additional Requirements**
   - Special features requests
   - Existing system integration needs

8. **Project Timeline & Support**
   - Completion date
   - Primary contact information
   - Communication preferences

9. **Payment & Terms Confirmation**
   - Terms agreement
   - Digital signature
   - Project cost: ₹7,000 (one-time)
   - Free modifications: 1 month

### 💾 Data Handling

- **Auto-save**: Form data is automatically saved to browser's localStorage
- **Download**: Upon submission, form data is formatted and downloaded as a text file
- **Format**: Clean, readable text format with all sections organized
- **Privacy**: All data stays on the client's device (no server submission by default)

### 🎨 Design Features

- **Glassmorphism**: Modern glass-effect cards with backdrop blur
- **Gradient Accents**: Beautiful gradient buttons and highlights
- **Animated Background**: Subtle radial gradient animations
- **Smooth Transitions**: All interactions have smooth animations
- **Professional Typography**: Inter font family for clean readability
- **Color Palette**: 
  - Primary: Indigo (#6366f1)
  - Secondary: Purple (#8b5cf6)
  - Success: Green (#10b981)
  - Background: Dark slate tones

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd "c:\Users\shivr\OneDrive\Attachments\questinanaire filling website"
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit:
```
http://localhost:5173/
```

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` folder, ready for deployment.

## 📱 Usage Instructions

### For Clients:

1. **Fill Out the Form**
   - Complete all 9 sections of the questionnaire
   - Required fields are marked with a red asterisk (*)
   - Use the "Next Section" and "Previous" buttons to navigate

2. **Auto-save**
   - Your progress is automatically saved
   - You can close the browser and return later
   - Data persists until you submit or clear browser data

3. **Submit**
   - Review all sections before submitting
   - Agree to the terms and conditions
   - Click "Submit Questionnaire"
   - A text file will automatically download with all your responses

4. **Send to Agency**
   - Email the downloaded text file to your agency contact
   - Or share via WhatsApp: +91 84688 45210

### For Agency:

1. **Receive Questionnaire**
   - Client submits and sends the downloaded text file
   - Review all sections for completeness

2. **Clarifications**
   - Contact client using provided contact information
   - Preferred communication method is indicated in Section 8

3. **Development**
   - Begin development within 3-5 business days
   - Follow the specifications exactly as provided

## 🔧 Customization

### Modifying Project Information

Edit the header section in `index.html`:

```html
<div class="info-item">
    <span class="label">One-time Cost:</span>
    <span class="value">₹7,000</span>
</div>
```

### Adding New Questions

1. Add the HTML input in the appropriate section in `index.html`
2. Update the `formatFormData()` function in `main.js` to include the new field
3. Add validation if required

### Changing Colors

Edit CSS variables in `style.css`:

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    /* ... other colors */
}
```

### Server Integration (Optional)

To send data to a server, uncomment and modify the `sendToServer()` function in `main.js`:

```javascript
function sendToServer(data) {
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
    });
}
```

## 📂 File Structure

```
questionnaire-filling-website/
├── index.html          # Main HTML structure
├── style.css           # All styling and animations
├── main.js             # Form logic and functionality
├── package.json        # Project dependencies
├── vite.config.js      # Vite configuration
└── README.md           # This file
```

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is proprietary software developed for agency use.

## 📞 Support

For technical support or questions:
- **WhatsApp**: +91 84688 45210
- **Project Type**: WhatsApp-based AI Chatbot with Google Sheets Integration

## 🎯 Project Details

- **One-time Cost**: ₹7,000
- **Free Modifications**: 1 month from project start
- **Development Time**: 3-5 business days after receiving completed questionnaire
- **Monthly System Charges**: As applicable (charged separately based on actual usage)

## ✅ Features Checklist

- [x] Multi-step form navigation
- [x] Progress tracking
- [x] Form validation
- [x] Auto-save functionality
- [x] Responsive design
- [x] Dark theme with glassmorphism
- [x] Data download as text file
- [x] Conditional field display
- [x] Success message on submission
- [x] Professional animations
- [x] Comprehensive FAQ section
- [x] Multilingual support setup
- [x] Admin panel configuration
- [x] Google Sheets integration setup

## 🚀 Deployment Options

### Option 1: Netlify
1. Build the project: `npm run build`
2. Drag and drop the `dist` folder to Netlify
3. Your site is live!

### Option 2: Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Option 3: GitHub Pages
1. Build the project: `npm run build`
2. Push the `dist` folder to a GitHub repository
3. Enable GitHub Pages in repository settings

## 📝 Notes

- All form data is stored locally in the browser until submission
- No data is sent to any server by default (privacy-first approach)
- The downloaded text file contains all questionnaire responses
- Passwords are hidden in the downloaded file for security
- Form can be printed for physical records

---

**Built with ❤️ for efficient client onboarding**
