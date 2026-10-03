/**
 * SkillConnect Main Learning Dashboard Page
 */

import { appState } from '../state.js';
import { toast } from '../components/toast.js';
import { modal } from '../components/modal.js';

export const scDashboardPage = {
  render(container) {
    const state = appState.getState();
    const user = state.currentUser;
    const stats = user.stats;
    const upcomingSessions = state.trainingSessions.filter(s => s.status === 'upcoming');
    const inProgressCourses = state.courses.filter(c => c.progressPercent < 100);

    container.innerHTML = `
      <!-- A. Personalized Welcome Hero Banner -->
      <div class="sc-hero-banner animate-fade-in">
        <div class="hero-content">
          <div class="hero-badge-pill">
            <i data-lucide="graduation-cap"></i> Peer-to-Peer Learning & Skill Verification
          </div>
          <h1 class="hero-title">Welcome to SkillConnect, ${user.name}!</h1>
          <p class="hero-subtitle">
            Learn from master tradespeople, master high-voltage diagnostics, verify your practical skills, and unlock high-paying commercial service opportunities.
          </p>
          <div class="hero-actions">
            <a href="#/sc-learning-library" class="btn btn-primary btn-lg">
              <i data-lucide="compass"></i> Explore Courses
            </a>
            <a href="#/sc-find-mentor" class="btn btn-secondary btn-lg">
              <i data-lucide="users"></i> Find a Mentor
            </a>
            <a href="#/sc-mentor-registration" class="btn btn-secondary btn-lg" style="background:rgba(255,255,255,0.08); border-color:rgba(255,255,255,0.25);">
              <i data-lucide="award"></i> Become a Mentor
            </a>
          </div>
        </div>

        <div class="hero-graphic">
          <div class="hero-level-card">
            <div class="hero-level-badge">Current Tier</div>
            <div class="hero-level-name">${user.currentLearningLevel.split('•')[1] || 'Intermediate'}</div>
            <div class="hero-level-sub">${user.verifiedSkills.length} Verified Skills Active</div>
            <div style="margin-top:0.75rem;">
              <a href="#/sc-my-progress" class="btn btn-sm btn-outline-primary" style="color:#FFFFFF; border-color:#93C5FD; font-size:0.75rem;">
                View Roadmap →
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- B. Learning Statistics (4 Interactive Cards) -->
      <div class="stats-grid">
        <!-- Card 1: Skills Learning -->
        <div class="stat-card" onclick="window.location.hash='#/sc-learning-library'">
          <div>
            <div class="stat-card-header">
              <div class="stat-icon-wrapper">
                <i data-lucide="book-open"></i>
              </div>
              <span class="badge badge-blue">Active Path</span>
            </div>
            <div class="stat-value" id="stat-skills-count">${stats.skillsLearning} Skills</div>
            <div class="stat-label">Currently Learning</div>
          </div>
          <div class="stat-footer-detail">
            <span>${stats.skillsCompleted} Completed</span>
            <span class="stat-tag-positive"><i data-lucide="trending-up" style="width:14px;height:14px;"></i> +1 this month</span>
          </div>
        </div>

        <!-- Card 2: Training Hours -->
        <div class="stat-card" onclick="window.location.hash='#/sc-my-progress'">
          <div>
            <div class="stat-card-header">
              <div class="stat-icon-wrapper">
                <i data-lucide="clock"></i>
              </div>
              <span class="badge badge-green">Logged Time</span>
            </div>
            <div class="stat-value">${stats.trainingHours} hrs</div>
            <div class="stat-label">Total Learning Hours</div>
          </div>
          <div class="stat-footer-detail">
            <span>${stats.practicalHours} hrs practical training</span>
            <span class="stat-tag-positive">Weekly: 4.5 hrs</span>
          </div>
        </div>

        <!-- Card 3: Mentor Sessions -->
        <div class="stat-card" onclick="window.location.hash='#/sc-my-training'">
          <div>
            <div class="stat-card-header">
              <div class="stat-icon-wrapper">
                <i data-lucide="calendar"></i>
              </div>
              <span class="badge badge-amber">1-on-1 Sessions</span>
            </div>
            <div class="stat-value">${stats.upcomingSessions} Upcoming</div>
            <div class="stat-label">Mentorship Sessions</div>
          </div>
          <div class="stat-footer-detail">
            <span>${stats.mentorSessionsAttended} Completed sessions</span>
            <span style="color:#2563EB; font-weight:700;">View Schedule →</span>
          </div>
        </div>

        <!-- Card 4: Verified Skills -->
        <div class="stat-card" onclick="window.location.hash='#/sc-my-skills'">
          <div>
            <div class="stat-card-header">
              <div class="stat-icon-wrapper">
                <i data-lucide="shield-check"></i>
              </div>
              <span class="badge badge-verified">Credentials</span>
            </div>
            <div class="stat-value">${state.verifiedBadges.length} Verified</div>
            <div class="stat-label">Industry Certified Badges</div>
          </div>
          <div class="stat-footer-detail">
            <span>Next: Commercial 3-Phase</span>
            <span class="stat-tag-positive"><i data-lucide="unlock" style="width:14px;height:14px;"></i> Unlocks $82/hr jobs</span>
          </div>
        </div>
      </div>

      <!-- Main Dashboard 2-Column Section -->
      <div class="sc-dashboard-layout">
        <!-- Main Column (Continue Learning & Upcoming Sessions) -->
        <div class="dashboard-main-col">
          <!-- C. Continue Your Learning -->
          <div>
            <div class="section-header">
              <h2 class="section-title">
                <i data-lucide="play-circle" style="color:#2563EB;"></i> Continue Your Learning
              </h2>
              <a href="#/sc-learning-library" class="section-link">
                All Courses (${state.courses.length}) <i data-lucide="chevron-right" style="width:16px;height:16px;"></i>
              </a>
            </div>

            <div class="courses-grid-horizontal">
              ${inProgressCourses.slice(0, 2).map(course => `
                <div class="course-card-compact" onclick="if(confirm('AGREEMENT: You must complete 10 jobs related to this skill within one month of completion of the course from our site. Do you accept?')) { window.location.hash='#/sc-course-player?id=${course.id}'; }">
                  <div class="course-thumb-container">
                    <img src="${course.thumbnail}" alt="${course.title}" class="course-thumb-img">
                    <span class="course-category-badge">${course.category}</span>
                    <span class="course-duration-badge">${course.duration}</span>
                  </div>
                  <div class="course-card-body">
                    <div>
                      <h3 class="course-card-title">${course.title}</h3>
                      <div class="course-mentor-info">
                        <img src="${course.mentorAvatar}" alt="${course.mentorName}" style="width:20px;height:20px;border-radius:50%;">
                        <span>Mentor: <strong>${course.mentorName}</strong></span>
                      </div>
                    </div>

                    <div>
                      <div class="course-progress-section">
                        <div class="course-progress-meta">
                          <span>${course.completedLessons} of ${course.totalLessons} lessons</span>
                          <span style="color:#2563EB;">${course.progressPercent}%</span>
                        </div>
                        <div class="progress-bar-wrap">
                          <div class="progress-bar-fill" style="width:${course.progressPercent}%"></div>
                        </div>
                      </div>

                      <a href="#/sc-course-player?id=${course.id}" class="btn btn-primary" style="width:100%;" onclick="event.stopPropagation();">
                        <i data-lucide="play"></i> Continue Learning
                      </a>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- D. Upcoming Training Sessions -->
          <div>
            <div class="section-header">
              <h2 class="section-title">
                <i data-lucide="calendar-clock" style="color:#2563EB;"></i> Upcoming Mentorship Sessions
              </h2>
              <a href="#/sc-my-training" class="section-link">
                Manage Sessions <i data-lucide="chevron-right" style="width:16px;height:16px;"></i>
              </a>
            </div>

            <div class="upcoming-sessions-list">
              ${upcomingSessions.length > 0 ? upcomingSessions.slice(0, 2).map(session => `
                <div class="session-card-preview">
                  <div class="session-mentor-meta">
                    <img src="${session.mentorAvatar}" alt="${session.mentorName}" class="session-mentor-avatar">
                    <div class="session-info">
                      <h4>${session.skill}</h4>
                      <p>
                        <span><i data-lucide="user" style="width:14px;height:14px;"></i> ${session.mentorName}</span>
                        <span><i data-lucide="clock" style="width:14px;height:14px;"></i> ${session.dateTime} (${session.duration})</span>
                      </p>
                    </div>
                  </div>

                  <div style="display:flex; align-items:center; gap:0.75rem;">
                    <span class="session-format-pill ${session.format}">
                      <i data-lucide="${session.format === 'online' ? 'video' : 'map-pin'}" style="width:12px;height:12px;"></i>
                      ${session.format.toUpperCase()}
                    </span>

                    <a href="#/sc-my-training" class="btn btn-secondary btn-sm">
                      View Details
                    </a>
                  </div>
                </div>
              `).join('') : `
                <div class="empty-state" style="padding:2rem;">
                  <div class="empty-state-icon"><i data-lucide="calendar"></i></div>
                  <div class="empty-state-title">No Upcoming Sessions</div>
                  <div class="empty-state-desc">Book a 1-on-1 practical training session with an experienced mentor.</div>
                  <a href="#/sc-find-mentor" class="btn btn-primary">Find a Mentor</a>
                </div>
              `}
            </div>
          </div>

          <!-- E. Recommended Mentors Carousel -->
          <div>
            <div class="section-header">
              <h2 class="section-title">
                <i data-lucide="star" style="color:#F59E0B;fill:#F59E0B;"></i> Recommended Mentors For You
              </h2>
              <a href="#/sc-find-mentor" class="section-link">
                View All (${state.mentors.length}) <i data-lucide="chevron-right" style="width:16px;height:16px;"></i>
              </a>
            </div>

            <div class="mentors-carousel-wrapper">
              <div class="mentors-carousel">
                ${state.mentors.slice(0, 4).map(mentor => `
                  <div class="mentor-mini-card">
                    <img src="${mentor.avatar}" alt="${mentor.name}" class="mentor-mini-avatar">
                    <div class="mentor-mini-name">
                      ${mentor.name}
                      <i data-lucide="check-circle" style="width:14px;height:14px;color:#2563EB;"></i>
                    </div>
                    <div class="mentor-mini-skill">${mentor.primarySkill}</div>
                    <div class="mentor-mini-exp">${mentor.experienceYears} yrs exp • ★ ${mentor.rating} (${mentor.reviewsCount})</div>
                    <a href="#/sc-mentor-profile?id=${mentor.id}" class="btn btn-secondary btn-sm" style="width:100%;">
                      View Profile
                    </a>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar Column (Activity Timeline & Fast Track Pathways) -->
        <div class="dashboard-side-col">
          <!-- Fast Track Unlocked Jobs Callout -->
          <div class="card" style="padding:1.5rem; background:linear-gradient(180deg, #FFFFFF 0%, #EFF6FF 100%); border-color:#BFDBFE;">
            <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.75rem;">
              <span class="badge badge-green"><i data-lucide="zap" style="width:12px;height:12px;"></i> Earning Booster</span>
            </div>
            <h4 style="font-size:1.05rem; color:#173B75; margin-bottom:0.35rem;">Skill-Verified Job Matching</h4>
            <p style="font-size:0.8125rem; color:#64748B; margin-bottom:1rem;">
              Verified skills make you eligible for high-tier commercial service calls paying up to <strong>$93/hr</strong>.
            </p>
            <a href="#/worker-requests" class="btn btn-outline-primary btn-sm" style="width:100%;">
              Check Unlocked Jobs (${state.unlockedJobs.filter(j => j.isUnlocked).length}) →
            </a>
          </div>

          <!-- F. Learning Activity Timeline -->
          <div class="card" style="padding:1.5rem;">
            <h3 style="font-size:1.1rem; color:#173B75; margin-bottom:1.25rem; display:flex; align-items:center; gap:0.5rem;">
              <i data-lucide="activity" style="color:#2563EB;"></i> Recent Activity
            </h3>

            <div class="activity-timeline">
              <div class="timeline-item verified">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                  <h5>Plumbing Soldering Verified</h5>
                  <p>Assessor Elena Rostova approved practical competency.</p>
                  <div class="timeline-time">2 hours ago</div>
                </div>
              </div>

              <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                  <h5>Lesson Completed</h5>
                  <p>Single Phase vs 3-Phase Circuits in Electrical Maintenance.</p>
                  <div class="timeline-time">Yesterday</div>
                </div>
              </div>

              <div class="timeline-item booked">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                  <h5>Training Session Booked</h5>
                  <p>Commercial 3-Phase Balancing with Marcus Vance.</p>
                  <div class="timeline-time">2 days ago</div>
                </div>
              </div>

              <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                  <h5>Course Started</h5>
                  <p>Commercial HVAC Diagnostics & Heat Pumps.</p>
                  <div class="timeline-time">5 days ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) {
      window.lucide.createIcons({ root: container });
    }
  }
};
