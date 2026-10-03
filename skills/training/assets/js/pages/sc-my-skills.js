/**
 * My Skills, Verified Credentials & Unlocked Job Opportunities Page
 */

import { appState } from '../state.js';
import { certificateModal } from '../components/certificate-modal.js';
import { toast } from '../components/toast.js';

export const scMySkillsPage = {
  render(container) {
    const state = appState.getState();
    const user = state.currentUser;
    const badges = state.verifiedBadges;
    const unlockedJobs = state.unlockedJobs;

    container.innerHTML = `
      <div class="animate-fade-in">
        <!-- Page Header -->
        <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:1rem; margin-bottom:1.5rem;">
          <div>
            <h1 style="font-size:1.75rem; color:#173B75; margin-bottom:0.25rem;">My Verified Skills & Credentials</h1>
            <p style="color:#64748B;">Official trade certifications verified through hands-on mentor assessments and practical labs.</p>
          </div>

          <!-- Public Visibility Toggle -->
          <div class="profile-visibility-card" style="margin:0; padding:0.6rem 1.25rem;">
            <div style="display:flex; align-items:center; gap:0.5rem; font-size:0.8125rem; font-weight:700; color:#173B75;">
              <i data-lucide="globe" style="width:16px;height:16px;color:#2563EB;"></i>
              <span>Public Profile Visibility</span>
            </div>
            <label class="checkbox-label" style="margin-left:1rem; cursor:pointer;">
              <input type="checkbox" id="public-cred-toggle" checked style="display:none;">
              <span class="checkbox-custom"></span>
              <span style="font-size:0.75rem; color:#16A34A; font-weight:700;">Active (Visible to Clients)</span>
            </label>
          </div>
        </div>

        <!-- Verified Badges Grid -->
        <h2 style="font-size:1.25rem; color:#173B75; margin-bottom:1rem; display:flex; align-items:center; gap:0.5rem;">
          <i data-lucide="shield-check" style="color:#2563EB;"></i> Verified Badges (${badges.length})
        </h2>

        <div class="verified-badges-grid" style="margin-bottom:2.5rem;">
          ${badges.map(b => `
            <div class="skill-credential-card">
              <div>
                <div class="credential-header">
                  <div class="credential-badge-icon">
                    <i data-lucide="${b.icon || 'shield-check'}"></i>
                  </div>
                  <div class="credential-title-info">
                    <span class="badge badge-verified" style="font-size:0.65rem; margin-bottom:0.25rem;">${b.level}</span>
                    <h4 style="font-size:1.05rem; color:#173B75; line-height:1.3;">${b.skillName}</h4>
                  </div>
                </div>

                <div class="credential-meta-list">
                  <div><strong>Category:</strong> ${b.category}</div>
                  <div><strong>Credential ID:</strong> <span style="font-family:monospace; color:#2563EB;">${b.credentialId}</span></div>
                  <div><strong>Issued:</strong> ${b.issuedDate}</div>
                  <div><strong>Assessor:</strong> ${b.assessorName}</div>
                </div>
              </div>

              <div style="border-top:1px solid #F1F5F9; padding-top:1rem; display:flex; align-items:center; justify-content:space-between;">
                <div style="font-size:0.75rem; color:#16A34A; font-weight:700; display:flex; align-items:center; gap:0.25rem;">
                  <i data-lucide="unlock" style="width:13px;height:13px;"></i> Unlocks ${b.unlockedJobsCount || 8} Jobs
                </div>
                <button class="btn btn-primary btn-sm btn-view-cert" data-badge-id="${b.id}">
                  <i data-lucide="award"></i> View Certificate
                </button>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Unlocked High-Paying Jobs Showcase -->
        <div class="card" style="padding:2rem;">
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:1.25rem; flex-wrap:wrap; gap:0.5rem;">
            <div>
              <span class="badge badge-green" style="margin-bottom:0.25rem;">Career Earning Impact</span>
              <h3 style="font-size:1.25rem; color:#173B75;">Commercial Service Requests Unlocked By Your Skills</h3>
            </div>
            <a href="#/worker-requests" class="btn btn-outline-primary btn-sm">
              View All Job Requests →
            </a>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:1.25rem;">
            ${unlockedJobs.map(job => `
              <div style="background:#F8FAFC; border:1px solid ${job.isUnlocked ? '#BBF7D0' : '#E2E8F0'}; border-radius:12px; padding:1.25rem; display:flex; flex-direction:column; justify-content:space-between;">
                <div>
                  <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:0.5rem;">
                    <span class="badge ${job.isUnlocked ? 'badge-success' : 'badge-amber'}">${job.status}</span>
                    <span style="font-size:0.75rem; color:#94A3B8;">${job.urgency}</span>
                  </div>
                  <h4 style="font-size:1rem; color:#173B75; margin-bottom:0.25rem;">${job.title}</h4>
                  <div style="font-size:0.8125rem; color:#64748B; margin-bottom:0.75rem;">${job.client} • ${job.location}</div>
                  <div style="font-size:0.75rem; color:#1E40AF; background:#EFF6FF; padding:0.35rem 0.6rem; border-radius:6px; display:inline-block; margin-bottom:1rem;">
                    Required Skill: <strong>${job.requiredVerifiedSkill}</strong>
                  </div>
                </div>

                <div style="border-top:1px solid #E2E8F0; padding-top:0.75rem; display:flex; align-items:center; justify-content:space-between;">
                  <div style="font-size:1.05rem; font-weight:800; color:#173B75;">${job.payout}</div>
                  <button class="btn ${job.isUnlocked ? 'btn-success' : 'btn-secondary'} btn-sm" ${!job.isUnlocked ? 'disabled' : ''}>
                    ${job.isUnlocked ? 'Apply Job' : 'Locked'}
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    if (window.lucide) {
      window.lucide.createIcons({ root: container });
    }

    this.bindEvents(container, badges);
  },

  bindEvents(container, badges) {
    const certBtns = container.querySelectorAll('.btn-view-cert');
    certBtns.forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.badgeId;
        const badge = badges.find(b => b.id === id);
        if (badge) {
          certificateModal.open(badge, appState.getState().currentUser.name);
        }
      };
    });

    const toggle = container.querySelector('#public-cred-toggle');
    if (toggle) {
      toggle.onchange = () => {
        toast.info("Visibility Updated", toggle.checked ? "Verified credentials are now visible on public search." : "Credentials hidden from public search.");
      };
    }
  }
};
