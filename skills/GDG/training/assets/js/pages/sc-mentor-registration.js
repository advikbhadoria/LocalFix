/**
 * Mentor Registration Wizard & Skill Verification Status Dashboard
 */

import { appState } from '../state.js';
import { toast } from '../components/toast.js';

export const scMentorRegistrationPage = {
  render(container) {
    const state = appState.getState();
    const regState = state.mentorRegistrationState;

    if (regState.status === 'under_review' || regState.status === 'verified') {
      this.renderVerificationStatus(container, regState);
    } else {
      this.renderRegistrationWizard(container, regState);
    }
  },

  renderRegistrationWizard(container, regState) {
    const user = regState.data;
    let step = regState.step || 1;

    container.innerHTML = `
      <div class="animate-fade-in" style="max-width:820px; margin:0 auto;">
        <!-- Header -->
        <div style="margin-bottom:2rem; text-align:center;">
          <span class="badge badge-blue" style="margin-bottom:0.5rem;">SkillConnect Mentorship Network</span>
          <h1 style="font-size:2rem; color:#173B75; margin-bottom:0.35rem;">Become a Verified Mentor</h1>
          <p style="color:#64748B;">Share your field expertise, train junior workers, conduct skill assessments, and earn mentorship fees.</p>
        </div>

        <!-- Wizard Stepper -->
        <div class="stepper-header" style="margin-bottom:2.5rem;">
          <div class="stepper-progress-bar">
            <div class="stepper-progress-fill" style="width:${((step - 1) / 4) * 100}%"></div>
          </div>
          <div class="step-node ${step >= 1 ? (step === 1 ? 'active' : 'completed') : ''}">
            <div class="step-circle">${step > 1 ? '<i data-lucide="check" style="width:16px;height:16px;"></i>' : '1'}</div>
            <div class="step-title">Personal</div>
          </div>
          <div class="step-node ${step >= 2 ? (step === 2 ? 'active' : 'completed') : ''}">
            <div class="step-circle">${step > 2 ? '<i data-lucide="check" style="width:16px;height:16px;"></i>' : '2'}</div>
            <div class="step-title">Experience</div>
          </div>
          <div class="step-node ${step >= 3 ? (step === 3 ? 'active' : 'completed') : ''}">
            <div class="step-circle">${step > 3 ? '<i data-lucide="check" style="width:16px;height:16px;"></i>' : '3'}</div>
            <div class="step-title">Verification</div>
          </div>
          <div class="step-node ${step >= 4 ? (step === 4 ? 'active' : 'completed') : ''}">
            <div class="step-circle">${step > 4 ? '<i data-lucide="check" style="width:16px;height:16px;"></i>' : '4'}</div>
            <div class="step-title">Preferences</div>
          </div>
          <div class="step-node ${step >= 5 ? 'active' : ''}">
            <div class="step-circle">5</div>
            <div class="step-title">Review</div>
          </div>
        </div>

        <!-- Wizard Form Container -->
        <div class="card" style="padding:2.5rem; margin-bottom:2rem;">
          <form id="mentor-reg-form" onsubmit="return false;">
            
            <!-- STEP 1: Personal Information -->
            <div class="wizard-step-pane" id="pane-step-1" style="display:${step === 1 ? 'block' : 'none'};">
              <h3 style="font-size:1.25rem; color:#173B75; margin-bottom:0.5rem;">Step 1: Personal Information</h3>
              <p style="font-size:0.875rem; color:#64748B; margin-bottom:1.5rem;">Pre-filled from your verified worker profile.</p>

              <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.25rem;">
                <div class="form-group">
                  <label class="form-label">Full Name <span class="required">*</span></label>
                  <input type="text" class="form-control" id="reg-name" value="${user.fullName}">
                </div>
                <div class="form-group">
                  <label class="form-label">Phone Number <span class="required">*</span></label>
                  <input type="text" class="form-control" id="reg-phone" value="${user.phone}">
                </div>
              </div>

              <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.25rem;">
                <div class="form-group">
                  <label class="form-label">Primary Trade Category <span class="required">*</span></label>
                  <select class="form-select" id="reg-category">
                    <option value="Electrical Services" selected>Electrical Services</option>
                    <option value="Plumbing & Piping">Plumbing & Piping</option>
                    <option value="HVAC & Climate Control">HVAC & Climate Control</option>
                    <option value="Appliance Repair">Appliance Repair</option>
                    <option value="Carpentry & Joinery">Carpentry & Joinery</option>
                    <option value="Customer Service">Customer Service</option>
                    <option value="Workplace Safety">Workplace Safety</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Service Area / Metro <span class="required">*</span></label>
                  <input type="text" class="form-control" id="reg-location" value="Austin, Texas (Greater Metro)">
                </div>
              </div>
            </div>

            <!-- STEP 2: Professional Experience -->
            <div class="wizard-step-pane" id="pane-step-2" style="display:${step === 2 ? 'block' : 'none'};">
              <h3 style="font-size:1.25rem; color:#173B75; margin-bottom:0.5rem;">Step 2: Professional Experience</h3>
              <p style="font-size:0.875rem; color:#64748B; margin-bottom:1.5rem;">Highlight your trade mastery and teaching topics.</p>

              <div class="form-group">
                <label class="form-label">Years of Professional Field Experience <span class="required">*</span></label>
                <input type="number" class="form-control" id="reg-exp" value="${user.experienceYears}" min="1" max="50">
              </div>

              <div class="form-group">
                <label class="form-label">Select Skills You Can Teach & Assess (Multiple) <span class="required">*</span></label>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; margin-top:0.5rem;">
                  ${[
                    "Basic Electrical Maintenance",
                    "Circuit Breakers & Faults",
                    "GFCI Receptacle Wiring",
                    "Commercial 3-Phase Wiring",
                    "Multimeter & Safety Diagnostics",
                    "Copper Pipe Soldering"
                  ].map(sk => `
                    <label class="checkbox-label" style="background:#F8FAFC; border:1px solid #E2E8F0; padding:0.6rem 0.875rem; border-radius:8px;">
                      <input type="checkbox" name="reg_skills" value="${sk}" checked style="display:none;">
                      <span class="checkbox-custom"></span>
                      <span style="font-size:0.8125rem; font-weight:600; color:#173B75;">${sk}</span>
                    </label>
                  `).join('')}
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Short Professional Introduction / Bio</label>
                <textarea class="form-textarea" id="reg-bio">${user.bio}</textarea>
              </div>
            </div>

            <!-- STEP 3: Skill Verification & Documents -->
            <div class="wizard-step-pane" id="pane-step-3" style="display:${step === 3 ? 'block' : 'none'};">
              <h3 style="font-size:1.25rem; color:#173B75; margin-bottom:0.5rem;">Step 3: Skill Verification Evidence</h3>
              <p style="font-size:0.875rem; color:#64748B; margin-bottom:1.5rem;">Upload proof of license, apprentice cards, certificates, or work samples.</p>

              <div class="dropzone" id="reg-dropzone">
                <div class="dropzone-icon">
                  <i data-lucide="upload-cloud"></i>
                </div>
                <div style="font-weight:700; color:#173B75; margin-bottom:0.25rem;">Click to upload licenses or drag files here</div>
                <div style="font-size:0.75rem; color:#64748B;">Supported: PDF, JPG, PNG (Max 15MB each)</div>
              </div>

              <div style="margin-top:1.25rem;">
                <div style="font-size:0.8125rem; font-weight:700; color:#173B75; margin-bottom:0.5rem;">Attached Evidence (2 Files):</div>
                <div style="display:flex; flex-direction:column; gap:0.5rem;">
                  <div style="display:flex; align-items:center; justify-content:space-between; background:#F8FAFC; border:1px solid #DBEAFE; padding:0.6rem 1rem; border-radius:8px;">
                    <span style="font-size:0.8125rem; color:#173B75; font-weight:600;"><i data-lucide="file-text" style="width:14px;height:14px;color:#2563EB;"></i> State_Apprentice_Electrician_Card.pdf</span>
                    <span class="badge badge-blue">Ready for Audit</span>
                  </div>
                  <div style="display:flex; align-items:center; justify-content:space-between; background:#F8FAFC; border:1px solid #DBEAFE; padding:0.6rem 1rem; border-radius:8px;">
                    <span style="font-size:0.8125rem; color:#173B75; font-weight:600;"><i data-lucide="file-text" style="width:14px;height:14px;color:#2563EB;"></i> OSHA10_Safety_Card.pdf</span>
                    <span class="badge badge-blue">Ready for Audit</span>
                  </div>
                </div>
              </div>

              <div style="margin-top:1.5rem; background:#EFF6FF; border:1px solid #BFDBFE; border-radius:10px; padding:1rem;">
                <label class="checkbox-label">
                  <input type="checkbox" id="reg-req-practical" checked style="display:none;">
                  <span class="checkbox-custom"></span>
                  <span style="font-weight:600; color:#1E40AF; font-size:0.8125rem;">
                    I agree to perform a live 30-minute practical assessment with a Senior Assessor if requested.
                  </span>
                </label>
              </div>
            </div>

            <!-- STEP 4: Mentorship Preferences -->
            <div class="wizard-step-pane" id="pane-step-4" style="display:${step === 4 ? 'block' : 'none'};">
              <h3 style="font-size:1.25rem; color:#173B75; margin-bottom:0.5rem;">Step 4: Mentorship Preferences & Availability</h3>
              <p style="font-size:0.875rem; color:#64748B; margin-bottom:1.5rem;">Configure your training formats, languages, and hourly mentoring rate.</p>

              <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.25rem;">
                <div class="form-group">
                  <label class="form-label">Mentoring Hourly Fee ($ USD)</label>
                  <input type="number" class="form-control" id="reg-fee" value="${user.hourlyFee}" placeholder="0 for Community / Volunteer">
                  <div class="form-hint">Set to 0 to offer free community mentoring.</div>
                </div>
                <div class="form-group">
                  <label class="form-label">Preferred Teaching Formats</label>
                  <select class="form-select" id="reg-formats">
                    <option value="both" selected>Online & In-Person Practical</option>
                    <option value="online">Online Classroom Only</option>
                    <option value="in-person">In-Person Workshop Only</option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Available Teaching Days</label>
                <div style="display:flex; gap:0.5rem; flex-wrap:wrap; margin-top:0.35rem;">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(d => `
                    <span class="badge badge-blue" style="cursor:pointer; padding:0.4rem 0.75rem;">${d}</span>
                  `).join('')}
                </div>
              </div>
            </div>

            <!-- STEP 5: Review & Submit -->
            <div class="wizard-step-pane" id="pane-step-5" style="display:${step === 5 ? 'block' : 'none'};">
              <h3 style="font-size:1.25rem; color:#173B75; margin-bottom:0.5rem;">Step 5: Review Your Application</h3>
              <p style="font-size:0.875rem; color:#64748B; margin-bottom:1.5rem;">Please confirm all details before submitting to the Certification Board.</p>

              <div class="booking-summary-card">
                <div class="summary-row"><span class="label">Applicant:</span><span class="val">${user.fullName}</span></div>
                <div class="summary-row"><span class="label">Trade Category:</span><span class="val">${user.primaryCategory}</span></div>
                <div class="summary-row"><span class="label">Experience:</span><span class="val">${user.experienceYears} Years Field Experience</span></div>
                <div class="summary-row"><span class="label">Skills to Teach:</span><span class="val">${user.selectedSkills.join(', ')}</span></div>
                <div class="summary-row"><span class="label">Mentoring Rate:</span><span class="val">$${user.hourlyFee}/hr</span></div>
                <div class="summary-row"><span class="label">Evidence Attached:</span><span class="val">2 Verified Credentials Attached</span></div>
              </div>

              <div style="font-size:0.75rem; color:#64748B; margin-top:1rem;">
                By submitting, you certify that all information and credentials provided are accurate and understand that simulated verification audits ensure quality across the SkillConnect network.
              </div>
            </div>

            <!-- Wizard Navigation Footer -->
            <div style="display:flex; align-items:center; justify-content:space-between; margin-top:2.5rem; padding-top:1.5rem; border-top:1px solid #E2E8F0;">
              <div>
                ${step > 1 ? `
                  <button type="button" class="btn btn-secondary" id="btn-reg-prev">
                    <i data-lucide="chevron-left"></i> Previous
                  </button>
                ` : ''}
              </div>

              <div>
                ${step < 5 ? `
                  <button type="button" class="btn btn-primary" id="btn-reg-next">
                    Next Step <i data-lucide="chevron-right"></i>
                  </button>
                ` : `
                  <button type="button" class="btn btn-success btn-lg" id="btn-reg-submit">
                    <i data-lucide="shield-check"></i> Submit for Verification
                  </button>
                `}
              </div>
            </div>

          </form>
        </div>
      </div>
    `;

    if (window.lucide) {
      window.lucide.createIcons({ root: container });
    }

    this.bindWizardEvents(container, step);
  },

  bindWizardEvents(container, currentStep) {
    const nextBtn = container.querySelector('#btn-reg-next');
    const prevBtn = container.querySelector('#btn-reg-prev');
    const submitBtn = container.querySelector('#btn-reg-submit');

    if (nextBtn) {
      nextBtn.onclick = () => {
        appState.state.mentorRegistrationState.step = currentStep + 1;
        this.render(container);
      };
    }

    if (prevBtn) {
      prevBtn.onclick = () => {
        appState.state.mentorRegistrationState.step = currentStep - 1;
        this.render(container);
      };
    }

    if (submitBtn) {
      submitBtn.onclick = () => {
        appState.submitMentorRegistration();
        toast.success("Application Submitted! 📋", "Your mentor verification is now being processed.");
        this.render(container);
      };
    }

    const dropzone = container.querySelector('#reg-dropzone');
    if (dropzone) {
      dropzone.onclick = () => {
        toast.info("Document Uploaded", "Simulated certificate attached successfully.");
      };
    }
  },

  renderVerificationStatus(container, regState) {
    const isApproved = regState.status === 'verified';

    container.innerHTML = `
      <div class="animate-fade-in" style="max-width:820px; margin:0 auto;">
        <div style="margin-bottom:2rem;">
          <h1 style="font-size:1.75rem; color:#173B75; margin-bottom:0.25rem;">Mentor Verification Status</h1>
          <p style="color:#64748B;">Tracking ID: <strong>${regState.trackingId}</strong> • Submitted ${regState.submittedDate || 'Recently'}</p>
        </div>

        <div class="card" style="padding:2rem; margin-bottom:2rem;">
          <!-- Status Banner -->
          <div style="background:${isApproved ? '#DCFCE7' : '#EFF6FF'}; border:1px solid ${isApproved ? '#86EFAC' : '#BFDBFE'}; border-radius:12px; padding:1.25rem; display:flex; align-items:center; gap:1rem; margin-bottom:2rem;">
            <div style="width:48px; height:48px; border-radius:50%; background:${isApproved ? '#16A34A' : '#2563EB'}; color:#FFFFFF; display:flex; align-items:center; justify-content:center; font-size:1.25rem;">
              <i data-lucide="${isApproved ? 'award' : 'clock'}"></i>
            </div>
            <div>
              <h3 style="font-size:1.1rem; color:${isApproved ? '#14532D' : '#1E40AF'}; margin-bottom:0.15rem;">
                ${isApproved ? 'Verified Mentor Status Active' : 'Application Under Board Review'}
              </h3>
              <p style="font-size:0.8125rem; color:${isApproved ? '#15803D' : '#1E3A8A'}; margin:0;">
                ${isApproved ? 'You are officially certified to mentor workers, conduct assessments, and earn fees.' : 'Our Technical Review Board is evaluating your submitted trade qualifications and credentials.'}
              </p>
            </div>
          </div>

          <!-- Workflow Visual Stepper -->
          <h4 style="color:#173B75; margin-bottom:1rem;">Verification Workflow Steps</h4>
          <div style="display:flex; flex-direction:column; gap:1rem; margin-bottom:2rem;">
            <div style="display:flex; align-items:center; justify-content:space-between; background:#F8FAFC; padding:1rem 1.25rem; border-radius:10px; border:1px solid #E2E8F0;">
              <div style="display:flex; align-items:center; gap:0.75rem;">
                <i data-lucide="check-circle" style="color:#16A34A;"></i>
                <span style="font-weight:700; color:#173B75; font-size:0.875rem;">1. Worker Profile & Identity Audit</span>
              </div>
              <span class="badge badge-success">Completed</span>
            </div>

            <div style="display:flex; align-items:center; justify-content:space-between; background:#F8FAFC; padding:1rem 1.25rem; border-radius:10px; border:1px solid #E2E8F0;">
              <div style="display:flex; align-items:center; gap:0.75rem;">
                <i data-lucide="check-circle" style="color:#16A34A;"></i>
                <span style="font-weight:700; color:#173B75; font-size:0.875rem;">2. Document & Certificate Validation</span>
              </div>
              <span class="badge badge-success">Completed</span>
            </div>

            <div style="display:flex; align-items:center; justify-content:space-between; background:#F8FAFC; padding:1rem 1.25rem; border-radius:10px; border:1px solid #E2E8F0;">
              <div style="display:flex; align-items:center; gap:0.75rem;">
                <i data-lucide="${isApproved ? 'check-circle' : 'clock'}" style="color:${isApproved ? '#16A34A' : '#F59E0B'};"></i>
                <span style="font-weight:700; color:#173B75; font-size:0.875rem;">3. Practical Demonstration & Safety Audit</span>
              </div>
              <span class="badge ${isApproved ? 'badge-success' : 'badge-warning'}">${isApproved ? 'Completed' : 'Scheduled'}</span>
            </div>

            <div style="display:flex; align-items:center; justify-content:space-between; background:#F8FAFC; padding:1rem 1.25rem; border-radius:10px; border:1px solid #E2E8F0;">
              <div style="display:flex; align-items:center; gap:0.75rem;">
                <i data-lucide="${isApproved ? 'check-circle' : 'circle'}" style="color:${isApproved ? '#16A34A' : '#94A3B8'};"></i>
                <span style="font-weight:700; color:#173B75; font-size:0.875rem;">4. Mentor Badge & Public Directory Listing</span>
              </div>
              <span class="badge ${isApproved ? 'badge-success' : 'badge-neutral'}">${isApproved ? 'Active' : 'Pending'}</span>
            </div>
          </div>

          <!-- Actions -->
          <div style="display:flex; align-items:center; justify-content:space-between; padding-top:1.5rem; border-top:1px solid #E2E8F0;">
            ${!isApproved ? `
              <button class="btn btn-primary" id="btn-simulate-approval">
                <i data-lucide="sparkles"></i> Simulate Instant Approval (Demo Action)
              </button>
            ` : `
              <a href="#/sc-mentor-profile?id=mnt_${appState.getState().currentUser.id}" class="btn btn-primary">
                <i data-lucide="eye"></i> View My Public Mentor Profile
              </a>
            `}

            <button class="btn btn-secondary" id="btn-restart-app">
              <i data-lucide="edit"></i> Edit Application
            </button>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) {
      window.lucide.createIcons({ root: container });
    }

    const approveBtn = container.querySelector('#btn-simulate-approval');
    if (approveBtn) {
      approveBtn.onclick = () => {
        appState.approveSimulatedMentor();
        this.render(container);
      };
    }

    const restartBtn = container.querySelector('#btn-restart-app');
    if (restartBtn) {
      restartBtn.onclick = () => {
        appState.state.mentorRegistrationState.status = 'not_submitted';
        appState.state.mentorRegistrationState.step = 1;
        this.render(container);
      };
    }
  }
};
