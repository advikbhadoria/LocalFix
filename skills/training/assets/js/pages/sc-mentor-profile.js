/**
 * Detailed Mentor Public Profile Page
 */

import { mentorService } from '../services/mentor-service.js';
import { scFindMentorPage } from './sc-find-mentor.js';
import { toast } from '../components/toast.js';

export const scMentorProfilePage = {
  async render(container, queryParams = {}) {
    const mentorId = queryParams.id || 'mnt_101';
    const mentor = await mentorService.getMentorById(mentorId);

    if (!mentor) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon"><i data-lucide="user-x"></i></div>
          <div class="empty-state-title">Mentor Profile Not Found</div>
          <a href="#/sc-find-mentor" class="btn btn-primary">Back to Find Mentor</a>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons({ root: container });
      return;
    }

    container.innerHTML = `
      <div class="animate-fade-in" style="max-width:1080px; margin:0 auto;">
        <!-- Breadcrumb -->
        <div style="display:flex; align-items:center; gap:0.5rem; font-size:0.8125rem; color:#64748B; margin-bottom:1.5rem;">
          <a href="#/sc-dashboard">SkillConnect</a>
          <span>/</span>
          <a href="#/sc-find-mentor">Find a Mentor</a>
          <span>/</span>
          <span style="color:#173B75; font-weight:700;">${mentor.name}</span>
        </div>

        <!-- Main Profile Card -->
        <div class="card" style="padding:2rem; margin-bottom:2rem;">
          <div class="mentor-profile-header">
            <img src="${mentor.avatar}" alt="${mentor.name}" class="profile-lg-avatar">
            
            <div style="flex:1;">
              <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:1rem; margin-bottom:0.35rem;">
                <h1 style="font-size:1.75rem; color:#173B75; display:flex; align-items:center; gap:0.5rem;">
                  ${mentor.name}
                  <span class="badge badge-verified" style="font-size:0.75rem;">
                    <i data-lucide="shield-check" style="width:14px;height:14px;"></i> Verified Mentor
                  </span>
                </h1>

                <button class="btn btn-primary btn-lg" id="btn-profile-book-session">
                  <i data-lucide="calendar-plus"></i> Book Training Session
                </button>
              </div>

              <div style="font-size:1rem; font-weight:600; color:#2563EB; margin-bottom:0.75rem;">
                ${mentor.primarySkill} Specialist • ${mentor.location}
              </div>

              <div style="display:flex; align-items:center; gap:1.5rem; font-size:0.875rem; color:#64748B; flex-wrap:wrap;">
                <span class="star-rating">
                  <i data-lucide="star" style="width:16px;height:16px;fill:#F59E0B;color:#F59E0B;"></i>
                  <strong style="color:#173B75; margin-left:4px;">${mentor.rating}</strong> (${mentor.reviewsCount} learner reviews)
                </span>
                <span>• <strong>${mentor.experienceYears} Years</strong> Field Experience</span>
                <span>• <strong>${mentor.totalSessionsConducted}</strong> Sessions Completed</span>
                <span>• Languages: <strong>${mentor.languages.join(', ')}</strong></span>
              </div>
            </div>
          </div>

          <!-- Quick Stats Grid -->
          <div class="profile-detail-grid">
            <div class="profile-stat-box">
              <div class="num" style="font-size: 1.1rem; line-height:1.2;">10 Jobs</div>
              <div class="lbl">Within 1 month</div>
            </div>
            <div class="profile-stat-box">
              <div class="num">${mentor.trainingFormats.length} Formats</div>
              <div class="lbl">${mentor.trainingFormats.join(' • ')}</div>
            </div>
            <div class="profile-stat-box">
              <div class="num">${mentor.verifiedSkills.length} Skills</div>
              <div class="lbl">Assessed & Certified</div>
            </div>
          </div>

          <!-- Bio & Methodology -->
          <div style="margin-bottom:2rem;">
            <h3 style="font-size:1.15rem; color:#173B75; margin-bottom:0.75rem;">Professional Background</h3>
            <p style="color:#475569; line-height:1.6; margin-bottom:1.5rem;">${mentor.bio}</p>

            <h3 style="font-size:1.15rem; color:#173B75; margin-bottom:0.75rem;">Teaching Methodology</h3>
            <div style="background:#F0F5FF; border-left:4px solid #2563EB; padding:1rem 1.25rem; border-radius:8px; color:#1E40AF; font-size:0.9rem;">
              "${mentor.methodology}"
            </div>
          </div>

          <!-- Verified Skills Offered -->
          <div style="margin-bottom:2rem;">
            <h3 style="font-size:1.15rem; color:#173B75; margin-bottom:1rem;">Verified Competency Topics</h3>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1rem;">
              ${mentor.verifiedSkills.map(skill => `
                <div style="border:1px solid #DBEAFE; background:#FFFFFF; border-radius:12px; padding:1rem; display:flex; align-items:center; gap:0.75rem;">
                  <div style="width:36px; height:36px; border-radius:50%; background:#EFF6FF; color:#2563EB; display:flex; align-items:center; justify-content:center;">
                    <i data-lucide="check" style="width:18px;height:18px;"></i>
                  </div>
                  <div>
                    <div style="font-weight:700; color:#173B75; font-size:0.875rem;">${skill}</div>
                    <div style="font-size:0.75rem; color:#64748B;">Available for Assessment & Practical Coaching</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Learner Reviews -->
          <div>
            <h3 style="font-size:1.15rem; color:#173B75; margin-bottom:1rem;">Learner Reviews & Feedback (${mentor.reviews.length})</h3>
            <div class="mentor-reviews-list">
              ${mentor.reviews.length > 0 ? mentor.reviews.map(r => `
                <div class="review-item">
                  <div class="review-header">
                    <span class="reviewer-name">${r.learner}</span>
                    <span style="font-size:0.75rem; color:#94A3B8;">${r.date}</span>
                  </div>
                  <div style="display:flex; align-items:center; gap:2px; color:#F59E0B; margin-bottom:0.35rem;">
                    ${Array(r.rating).fill('<i data-lucide="star" style="width:12px;height:12px;fill:#F59E0B;"></i>').join('')}
                  </div>
                  <div class="review-comment">"${r.comment}"</div>
                </div>
              `).join('') : `
                <div style="font-size:0.875rem; color:#64748B; font-style:italic;">No written reviews yet for this mentor.</div>
              `}
            </div>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) {
      window.lucide.createIcons({ root: container });
    }

    const bookBtn = container.querySelector('#btn-profile-book-session');
    if (bookBtn) {
      bookBtn.onclick = () => {
        scFindMentorPage.openBookingWizard(mentor);
      };
    }
  }
};
