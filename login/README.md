# LocalFix - Authentication & Role System

LocalFix is a two-sided marketplace platform connecting customers with verified local service workers (technicians, plumbers, electricians, carpenters, cleaners, etc.).

This repository contains the standalone, responsive **Authentication, Role Selection, Aadhaar Verification, and Onboarding System**.

---

## 🚀 How to Run the Website

Open [`index.html`](file:///Users/ayushdeepika/nova/index.html) directly in any browser (Chrome, Safari, Brave, Edge).

---

## 📱 User Flows & Features

### 1. Clean Phone Login Flow
1. **Enter Phone Number**:
   - Clean `+91` prefix with 10-digit mobile number input.
   - Click **Continue**.
2. **OTP Verification**:
   - Enter 6-digit OTP code (Demo mode: enter any 6 digits e.g. `123456`).
   - Countdown timer with Resend OTP button.
   - Click **Verify & Log In** to log the person in.
   - Existing accounts with configured roles are routed directly to their dashboard (`#/customer` or `#/worker`).

### 2. Sign Up with Aadhaar Verification (Untouched)
- Full Name, Mobile Number, Email Address.
- **Aadhaar Number Verification**:
  - Auto-spaced 12-digit format (`XXXX XXXX XXXX`).
  - Real-time `UIDAI Validated` security check badge.
- Password creation.
- Account role selection (Customer / Service Worker).

### 3. Comprehensive Worker Onboarding (Untouched)
- **Full Name** & **Aadhaar Verification status** (`UIDAI Verified`).
- **Service Type**: Dropdown (AC Technician & HVAC, Electrician & Wiring, Plumber & Pipe Fitter, Carpenter, Cleaning, Painter, Mason, Appliance Repair, Other).
- **Experience Level**: `< 1 Year`, `1–3 Years`, `3–5 Years`, `5+ Years (Master Craftsman)`.
- **Preferred Work Radius**: `5 km`, `10 km`, `20 km`, `35 km`.
- **Work Area**: Autocomplete suggestions for locality hubs.
- **Previous Work Experience**: Detailed description field for past projects and specializations.
- **Previous Work Photos & Portfolio**:
  - Multi-photo upload input (`JPG, PNG, WebP`).
  - Interactive thumbnail gallery with sample preview images, tags, and remove options.
- **Profile Photo**: Headshot upload with preview.

### 4. Prominent Log Out Options
- **Global Header**: Red **Log Out** button with icon visible on all authenticated screens.
- **Customer Dashboard**: Dedicated Log Out button in top greeting bar.
- **Worker Handoff**: Dedicated Log Out button.
- **Profile Page**: Dedicated Log Out button.
