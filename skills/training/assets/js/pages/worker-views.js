/**
 * Worker Portal Views - Dashboard, Jobs, Wallet, Profile & Unlocked Requests
 * Integrates SkillConnect seamlessly into the complete Worker Service App
 */

import { appState } from '../state.js';
import { toast } from '../components/toast.js';
import { certificateModal } from '../components/certificate-modal.js';

export const workerViews = {
  renderDashboard(container) {
    const state = appState.getState();
    const user = state.currentUser;

    container.innerHTML = `
      <div class="animate-fade-in">
        <!-- Worker Top Welcome Row -->
        <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:1rem; margin-bottom:1.75rem;">
          <div>
            <h1 style="font-size:1.75rem; color:#173B75; margin-bottom:0.25rem;">Worker Operations Dashboard</h1>
            <p style="color:#64748B;">Welcome back, <strong>${user.name}</strong> • ${user.role} (${user.location})</p>
          </div>
          <div style="display:flex; align-items:center; gap:0.75rem;">
            <a href="#/sc-dashboard" class="btn btn-primary">
              <i data-lucide="graduation-cap"></i> Open SkillConnect Hub
            </a>
          </div>
        </div>

        <!-- Quick Stats Row -->
        <div class="stats-grid" style="margin-bottom:2rem;">
          <div class="stat-card">
            <div class="stat-card-header">
              <div class="stat-icon-wrapper" style="background:#EFF6FF; color:#2563EB;"><i data-lucide="dollar-sign"></i></div>
              <span class="badge badge-green">Today</span>
            </div>
            <div class="stat-value">$345.00</div>
            <div class="stat-label">Today's Completed Payout</div>
            <div class="stat-footer-detail">
              <span>3 Completed Jobs</span>
              <span class="stat-tag-positive">+18% vs avg</span>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-card-header">
              <div class="stat-icon-wrapper" style="background:#F0FDF4; color:#16A34A;"><i data-lucide="briefcase"></i></div>
              <span class="badge badge-blue">Active</span>
            </div>
            <div class="stat-value">2 Jobs</div>
            <div class="stat-label">In Progress Today</div>
            <div class="stat-footer-detail">
              <span>Next: 2:00 PM (South Austin)</span>
              <span style="color:#2563EB; font-weight:600;">View →</span>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-card-header">
              <div class="stat-icon-wrapper" style="background:#FFFBEB; color:#D97706;"><i data-lucide="star"></i></div>
              <span class="badge badge-amber">Rating</span>
            </div>
            <div class="stat-value">${user.rating} ★</div>
            <div class="stat-label">Customer Satisfaction</div>
            <div class="stat-footer-detail">
              <span>${user.reviewsCount} 5-Star Reviews</span>
              <span class="stat-tag-positive">Top 5% Worker</span>
            </div>
          </div>

          <div class="stat-card" onclick="window.location.hash='#/sc-my-skills'" style="border-color:#BFDBFE; background:#F8FAFF;">
            <div class="stat-card-header">
              <div class="stat-icon-wrapper" style="background:#EFF6FF; color:#2563EB;"><i data-lucide="shield-check"></i></div>
              <span class="badge badge-verified">SkillConnect</span>
            </div>
            <div class="stat-value">${state.verifiedBadges.length} Skills</div>
            <div class="stat-label">Verified Capabilities</div>
            <div class="stat-footer-detail">
              <span>Commercial Rate: Up to $93/hr</span>
              <span style="color:#2563EB; font-weight:700;">Boost Skills →</span>
            </div>
          </div>
        </div>

        <!-- SkillConnect Promotional Integration Banner -->
        <div class="card" style="padding:1.5rem 2rem; background:linear-gradient(135deg, #173B75 0%, #2563EB 100%); color:#FFFFFF; margin-bottom:2rem; border-radius:16px;">
          <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:1.5rem;">
            <div style="max-width:580px;">
              <span class="badge" style="background:rgba(255,255,255,0.2); color:#FFFFFF; margin-bottom:0.5rem;">
                <i data-lucide="trending-up" style="width:13px;height:13px;"></i> SkillConnect Opportunity
              </span>
              <h2 style="font-size:1.4rem; color:#FFFFFF; margin-bottom:0.35rem;">Unlock Commercial 3-Phase Service Calls ($82.50/hr)</h2>
              <p style="color:#DBEAFE; font-size:0.875rem;">
                Complete your scheduled assessment with Master Electrician Marcus Vance to automatically unlock high-paying commercial job dispatches in Austin.
              </p>
            </div>
            <a href="#/sc-dashboard" class="btn btn-primary" style="background:#FFFFFF; color:#173B75; font-weight:700;">
              <i data-lucide="graduation-cap"></i> Go to SkillConnect
            </a>
          </div>
        </div>

        <!-- Today's Job Queue -->
        <h3 style="font-size:1.2rem; color:#173B75; margin-bottom:1rem;">Today's Assigned Jobs</h3>
        <div style="display:flex; flex-direction:column; gap:1rem;">
          <div class="job-ticket-card">
            <div class="job-ticket-info">
              <div class="job-category-icon"><i data-lucide="droplet"></i></div>
              <div>
                <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.2rem;">
                  <span style="font-weight:700; color:#173B75; font-size:1rem;">Kitchen Sink Copper Soldering & Trap Replacement</span>
                  <span class="badge badge-success">In Progress</span>
                </div>
                <div style="font-size:0.8125rem; color:#64748B;">Client: Robert Chen • 4812 Barton Springs Rd, Austin • Slot: 11:00 AM - 1:00 PM</div>
              </div>
            </div>
            <div style="display:flex; align-items:center; gap:1.25rem;">
              <div class="job-price-tag">$145.00</div>
              <button class="btn btn-secondary btn-sm" onclick="alert('Viewing job details and customer directions...')">Manage Job</button>
            </div>
          </div>

          <div class="job-ticket-card">
            <div class="job-ticket-info">
              <div class="job-category-icon"><i data-lucide="zap"></i></div>
              <div>
                <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.2rem;">
                  <span style="font-weight:700; color:#173B75; font-size:1rem;">GFCI Outlet Tripping Diagnostic & Replacement</span>
                  <span class="badge badge-blue">Upcoming (2:30 PM)</span>
                </div>
                <div style="font-size:0.8125rem; color:#64748B;">Client: Sarah Jenkins • 7201 Burnet Rd, Austin • Slot: 2:30 PM - 4:00 PM</div>
              </div>
            </div>
            <div style="display:flex; align-items:center; gap:1.25rem;">
              <div class="job-price-tag">$110.00</div>
              <button class="btn btn-secondary btn-sm" onclick="alert('Viewing job details...')">Manage Job</button>
            </div>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons({ root: container });
  },

  renderJobs(container) {
    container.innerHTML = `
      <div class="animate-fade-in">
        <h1 style="font-size:1.75rem; color:#173B75; margin-bottom:0.25rem;">My Active Jobs</h1>
        <p style="color:#64748B; margin-bottom:1.5rem;">Manage ongoing customer service appointments, diagnostic logs, and job completion reports.</p>

        <div style="display:flex; flex-direction:column; gap:1rem;">
          <div class="card" style="padding:1.5rem; border-left:4px solid #2563EB;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem;">
              <div>
                <span class="badge badge-blue" style="margin-bottom:0.35rem;">Active Job #JB-8821</span>
                <h3 style="color:#173B75;">Emergency PEX Leak Repair & Valve Replacement</h3>
                <p style="font-size:0.8125rem; color:#64748B;">4812 Barton Springs Rd, Austin • Customer: Robert Chen (+1 555-0192)</p>
              </div>
              <div style="font-size:1.35rem; font-weight:800; color:#173B75;">$145.00</div>
            </div>
            <div style="display:flex; justify-content:flex-end; gap:0.75rem;">
              <button class="btn btn-secondary btn-sm" onclick="alert('Calling customer...')"><i data-lucide="phone"></i> Call Client</button>
              <button class="btn btn-success btn-sm" onclick="alert('Job marked completed! Payout credited.')"><i data-lucide="check"></i> Complete & Invoice</button>
            </div>
          </div>
        </div>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons({ root: container });
  },

  renderRequests(container) {
    const state = appState.getState();
    container.innerHTML = `
      <div class="animate-fade-in">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; flex-wrap:wrap; gap:1rem;">
          <div>
            <h1 style="font-size:1.75rem; color:#173B75; margin-bottom:0.25rem;">Available Job Requests</h1>
            <p style="color:#64748B;">High-value dispatch requests in your area. Skills verified through SkillConnect unlock premium commercial jobs.</p>
          </div>
          <a href="#/sc-my-skills" class="btn btn-secondary btn-sm"><i data-lucide="shield-check"></i> View My Verified Skills</a>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:1.5rem;">
          ${state.unlockedJobs.map(job => `
            <div class="card" style="padding:1.5rem; display:flex; flex-direction:column; justify-content:space-between; border-color:${job.isUnlocked ? '#86EFAC' : '#DBEAFE'};">
              <div>
                <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
                  <span class="skill-requirement-badge ${job.isUnlocked ? 'unlocked' : 'locked'}">
                    <i data-lucide="${job.isUnlocked ? 'check' : 'lock'}" style="width:12px;height:12px;"></i>
                    ${job.isUnlocked ? 'Skill Requirement Met' : 'Requires Skill Verification'}
                  </span>
                  <span style="font-size:0.75rem; color:#64748B;">${job.urgency}</span>
                </div>
                <h3 style="font-size:1.1rem; color:#173B75; margin-bottom:0.35rem;">${job.title}</h3>
                <p style="font-size:0.8125rem; color:#64748B; margin-bottom:0.75rem;">${job.client} • ${job.location}</p>
                
                <div style="background:#F0F5FF; border:1px solid #DBEAFE; border-radius:8px; padding:0.6rem 0.875rem; margin-bottom:1rem;">
                  <span style="font-size:0.75rem; color:#1E40AF;">Required Skill: <strong>${job.requiredVerifiedSkill}</strong></span>
                </div>
              </div>

              <div style="border-top:1px solid #F1F5F9; padding-top:1rem; display:flex; align-items:center; justify-content:space-between;">
                <div style="font-size:1.15rem; font-weight:800; color:#173B75;">${job.payout}</div>
                ${job.isUnlocked ? `
                  <button class="btn btn-success btn-sm" onclick="alert('Job Request Accepted! Dispatch confirmed.')">
                    Accept Job
                  </button>
                ` : `
                  <a href="#/sc-dashboard" class="btn btn-primary btn-sm">
                    Verify Skill
                  </a>
                `}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons({ root: container });
  },

  renderWallet(container) {
    container.innerHTML = `
      <div class="animate-fade-in">
        <h1 style="font-size:1.75rem; color:#173B75; margin-bottom:0.25rem;">Earnings & Wallet</h1>
        <p style="color:#64748B; margin-bottom:1.5rem;">Track your payouts, tips, and the direct ROI of your verified SkillConnect credentials.</p>

        <div class="stats-grid" style="margin-bottom:2rem;">
          <div class="stat-card">
            <div class="stat-label">Available Balance</div>
            <div class="stat-value" style="color:#16A34A;">$1,842.50</div>
            <button class="btn btn-primary btn-sm" style="margin-top:0.75rem;" onclick="alert('Initiating direct bank transfer...')">Instant Payout</button>
          </div>
          <div class="stat-card">
            <div class="stat-label">This Month's Earnings</div>
            <div class="stat-value">$4,920.00</div>
            <div class="stat-tag-positive">+32% higher after Skill Verification</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Hourly Rate Increase</div>
            <div class="stat-value">+$24.00/hr</div>
            <span class="badge badge-green">Level 2 Impact</span>
          </div>
        </div>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons({ root: container });
  },

  renderProfile(container) {
    const state = appState.getState();
    const user = state.currentUser;

    container.innerHTML = `
      <div class="animate-fade-in" style="max-width:960px; margin:0 auto;">
        <h1 style="font-size:1.75rem; color:#173B75; margin-bottom:0.25rem;">Worker Profile & Verified Capabilities</h1>
        <p style="color:#64748B; margin-bottom:1.5rem;">Your official service profile and verifiable SkillConnect credentials.</p>

        <div class="card" style="padding:2rem; margin-bottom:2rem;">
          <div style="display:flex; align-items:center; gap:1.5rem; margin-bottom:1.5rem;">
            <img src="${user.avatar}" alt="${user.name}" style="width:84px; height:84px; border-radius:50%; object-fit:cover; border:3px solid #DBEAFE;">
            <div>
              <h2 style="font-size:1.4rem; color:#173B75; margin-bottom:0.2rem;">${user.name}</h2>
              <div style="color:#2563EB; font-weight:600; margin-bottom:0.35rem;">${user.currentLearningLevel}</div>
              <div style="font-size:0.8125rem; color:#64748B;">Austin, Texas • ${user.rating} ★ (${user.reviewsCount} reviews) • Member since 2024</div>
            </div>
          </div>

          <h3 style="font-size:1.15rem; color:#173B75; margin-bottom:1rem;">Verified SkillConnect Credentials (${state.verifiedBadges.length})</h3>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:1rem;">
            ${state.verifiedBadges.map(b => `
              <div style="border:1px solid #DBEAFE; background:#F8FAFF; border-radius:12px; padding:1rem;">
                <div style="font-weight:700; color:#173B75; font-size:0.95rem; margin-bottom:0.25rem;">${b.skillName}</div>
                <div style="font-size:0.75rem; color:#64748B; margin-bottom:0.75rem;">Verified on ${b.issuedDate} • ID: ${b.credentialId}</div>
                <button class="btn btn-outline-primary btn-sm btn-prof-cert" data-badge-id="${b.id}" style="width:100%;">
                  <i data-lucide="award"></i> View Official Certificate
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons({ root: container });

    const certBtns = container.querySelectorAll('.btn-prof-cert');
    certBtns.forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.badgeId;
        const b = state.verifiedBadges.find(bg => bg.id === id);
        if (b) certificateModal.open(b, user.name);
      };
    });
  }
};
