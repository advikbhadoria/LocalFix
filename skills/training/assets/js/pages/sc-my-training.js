/**
 * My Training Sessions Page - Upcoming, Completed, and Interactive Simulated Video Classroom
 */

import { bookingService } from '../services/booking-service.js';
import { appState } from '../state.js';
import { modal } from '../components/modal.js';
import { toast } from '../components/toast.js';

export const scMyTrainingPage = {
  async render(container, queryParams = {}) {
    const currentTab = queryParams.tab || 'upcoming';
    const allSessions = await bookingService.getMySessions('all');
    const filteredSessions = allSessions.filter(s => {
      if (currentTab === 'all') return true;
      return s.status === currentTab;
    });

    container.innerHTML = `
      <div class="animate-fade-in">
        <!-- Page Header -->
        <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:1rem; margin-bottom:1.5rem;">
          <div>
            <h1 style="font-size:1.75rem; color:#173B75; margin-bottom:0.25rem;">My Mentorship & Training Sessions</h1>
            <p style="color:#64748B;">Manage your scheduled 1-on-1 coaching, field training, and review completed mentor assessments.</p>
          </div>
          <a href="#/sc-find-mentor" class="btn btn-primary">
            <i data-lucide="plus"></i> Book New Session
          </a>
        </div>

        <!-- Sessions Tabs -->
        <div class="sessions-tabs-nav">
          <button class="sessions-tab ${currentTab === 'upcoming' ? 'active' : ''}" data-tab="upcoming">
            Upcoming (${allSessions.filter(s => s.status === 'upcoming').length})
          </button>
          <button class="sessions-tab ${currentTab === 'completed' ? 'active' : ''}" data-tab="completed">
            Completed (${allSessions.filter(s => s.status === 'completed').length})
          </button>
          <button class="sessions-tab ${currentTab === 'cancelled' ? 'active' : ''}" data-tab="cancelled">
            Cancelled (${allSessions.filter(s => s.status === 'cancelled').length})
          </button>
          <button class="sessions-tab ${currentTab === 'all' ? 'active' : ''}" data-tab="all">
            All Sessions (${allSessions.length})
          </button>
        </div>

        <!-- Sessions Grid -->
        <div class="sessions-grid">
          ${this.renderSessionCards(filteredSessions, currentTab)}
        </div>
      </div>
    `;

    if (window.lucide) {
      window.lucide.createIcons({ root: container });
    }

    this.bindEvents(container);
  },

  renderSessionCards(sessions, currentTab) {
    if (sessions.length === 0) {
      return `
        <div class="empty-state" style="grid-column:1/-1;">
          <div class="empty-state-icon"><i data-lucide="calendar"></i></div>
          <div class="empty-state-title">No ${currentTab} sessions found</div>
          <div class="empty-state-desc">You don't have any sessions in this category at the moment.</div>
          <a href="#/sc-find-mentor" class="btn btn-primary">Browse Available Mentors</a>
        </div>
      `;
    }

    return sessions.map(s => {
      const isUpcoming = (s.status === 'upcoming');
      const isCompleted = (s.status === 'completed');
      const isCancelled = (s.status === 'cancelled');

      return `
        <div class="session-card-detailed">
          <div>
            <div class="session-header-row">
              <div class="session-mentor-profile">
                <img src="${s.mentorAvatar}" alt="${s.mentorName}" class="session-avatar">
                <div>
                  <h4 style="font-size:0.95rem; color:#173B75; margin-bottom:0.15rem;">${s.mentorName}</h4>
                  <span style="font-size:0.75rem; color:#64748B;">Mentor & Assessor</span>
                </div>
              </div>

              <span class="badge ${isUpcoming ? 'badge-blue' : isCompleted ? 'badge-success' : 'badge-red'}">
                ${s.status.toUpperCase()}
              </span>
            </div>

            <div class="session-topic-title">${s.skill}</div>

            <div class="session-details-list">
              <div class="detail-item">
                <i data-lucide="clock" style="width:14px;height:14px;color:#2563EB;"></i>
                <span><strong>${s.dateTime}</strong> (${s.duration})</span>
              </div>
              <div class="detail-item">
                <i data-lucide="${s.format === 'online' ? 'video' : 'map-pin'}" style="width:14px;height:14px;color:#2563EB;"></i>
                <span>Format: <strong style="text-transform:capitalize;">${s.format}</strong> • ${s.location}</span>
              </div>
            </div>

            ${isCompleted && s.mentorFeedback ? `
              <div style="background:#F0FDF4; border:1px solid #BBF7D0; border-radius:8px; padding:0.75rem 1rem; margin-bottom:1rem; font-size:0.8125rem; color:#14532D;">
                <strong>Mentor Verdict:</strong> "${s.mentorFeedback.comment}"
              </div>
            ` : ''}
          </div>

          <div style="display:flex; align-items:center; justify-content:space-between; border-top:1px solid #F1F5F9; padding-top:1rem; gap:0.5rem; flex-wrap:wrap;">
            <button class="btn btn-secondary btn-sm btn-session-details" data-session-id="${s.id}">
              <i data-lucide="info"></i> Details
            </button>

            <div style="display:flex; align-items:center; gap:0.5rem;">
              ${isUpcoming ? `
                ${s.format === 'online' ? `
                  <button class="btn btn-primary btn-sm btn-join-online-room" data-session-id="${s.id}">
                    <i data-lucide="video"></i> Join Classroom
                  </button>
                ` : `
                  <button class="btn btn-primary btn-sm btn-view-map-loc" data-session-id="${s.id}">
                    <i data-lucide="map-pin"></i> Directions
                  </button>
                `}
                <button class="btn btn-ghost btn-sm btn-reschedule-session" data-session-id="${s.id}" title="Reschedule Session">
                  <i data-lucide="calendar"></i>
                </button>
                <button class="btn btn-ghost btn-sm btn-cancel-session" data-session-id="${s.id}" title="Cancel Session" style="color:#DC2626;">
                  <i data-lucide="trash-2"></i>
                </button>
              ` : ''}

              ${isCompleted ? `
                <a href="#/sc-assessments" class="btn btn-outline-primary btn-sm">
                  View Assessment
                </a>
              ` : ''}
            </div>
          </div>
        </div>
      `;
    }).join('');
  },

  bindEvents(container) {
    const tabs = container.querySelectorAll('.sessions-tab');
    tabs.forEach(tab => {
      tab.onclick = () => {
        const t = tab.dataset.tab;
        window.location.hash = `#/sc-my-training?tab=${t}`;
      };
    });

    // Details Modal
    const detailBtns = container.querySelectorAll('.btn-session-details');
    detailBtns.forEach(btn => {
      btn.onclick = async () => {
        const id = btn.dataset.sessionId;
        const session = await bookingService.getSessionById(id);
        if (session) this.openDetailsModal(session);
      };
    });

    // Join Online Classroom Modal
    const joinBtns = container.querySelectorAll('.btn-join-online-room');
    joinBtns.forEach(btn => {
      btn.onclick = async () => {
        const id = btn.dataset.sessionId;
        const session = await bookingService.getSessionById(id);
        if (session) this.openVideoClassroomModal(session);
      };
    });

    // View In-Person Location Modal
    const locBtns = container.querySelectorAll('.btn-view-map-loc');
    locBtns.forEach(btn => {
      btn.onclick = async () => {
        const id = btn.dataset.sessionId;
        const session = await bookingService.getSessionById(id);
        if (session) this.openLocationModal(session);
      };
    });

    // Reschedule
    const reschedBtns = container.querySelectorAll('.btn-reschedule-session');
    reschedBtns.forEach(btn => {
      btn.onclick = async () => {
        const id = btn.dataset.sessionId;
        const session = await bookingService.getSessionById(id);
        if (session) this.openRescheduleModal(session);
      };
    });

    // Cancel
    const cancelBtns = container.querySelectorAll('.btn-cancel-session');
    cancelBtns.forEach(btn => {
      btn.onclick = async () => {
        const id = btn.dataset.sessionId;
        const session = await bookingService.getSessionById(id);
        if (session) this.openCancelModal(session);
      };
    });
  },

  openDetailsModal(session) {
    const bodyHtml = `
      <div>
        <div style="display:flex; align-items:center; gap:1rem; margin-bottom:1.5rem; padding-bottom:1rem; border-bottom:1px solid #E2E8F0;">
          <img src="${session.mentorAvatar}" alt="${session.mentorName}" style="width:60px; height:60px; border-radius:50%; object-fit:cover;">
          <div>
            <h3 style="color:#173B75; font-size:1.1rem; margin-bottom:0.2rem;">${session.skill}</h3>
            <p style="font-size:0.8125rem; color:#64748B;">Mentor: <strong>${session.mentorName}</strong></p>
          </div>
        </div>

        <!-- Session Progress Stepper Timeline -->
        <h4 style="font-size:0.9rem; color:#173B75; margin-bottom:0.75rem;">Session Lifecycle Timeline</h4>
        <div style="display:flex; align-items:center; justify-content:space-between; background:#F8FAFC; padding:1rem; border-radius:10px; border:1px solid #E2E8F0; margin-bottom:1.5rem;">
          <div style="text-align:center; font-size:0.75rem; font-weight:700; color:#16A34A;">
            <i data-lucide="check-circle" style="display:block; margin:0 auto 4px;"></i> Requested
          </div>
          <div style="height:2px; flex:1; background:#16A34A; margin:0 8px;"></div>
          <div style="text-align:center; font-size:0.75rem; font-weight:700; color:#16A34A;">
            <i data-lucide="check-circle" style="display:block; margin:0 auto 4px;"></i> Confirmed
          </div>
          <div style="height:2px; flex:1; background:${session.status === 'completed' ? '#16A34A' : '#CBD5E1'}; margin:0 8px;"></div>
          <div style="text-align:center; font-size:0.75rem; font-weight:700; color:${session.status === 'completed' ? '#16A34A' : '#64748B'};">
            <i data-lucide="play-circle" style="display:block; margin:0 auto 4px;"></i> In Progress
          </div>
          <div style="height:2px; flex:1; background:${session.status === 'completed' ? '#16A34A' : '#CBD5E1'}; margin:0 8px;"></div>
          <div style="text-align:center; font-size:0.75rem; font-weight:700; color:${session.status === 'completed' ? '#16A34A' : '#64748B'};">
            <i data-lucide="award" style="display:block; margin:0 auto 4px;"></i> Assessed
          </div>
        </div>

        <div class="booking-summary-card">
          <div class="summary-row"><span class="label">Date & Time:</span><span class="val">${session.dateTime}</span></div>
          <div class="summary-row"><span class="label">Duration:</span><span class="val">${session.duration}</span></div>
          <div class="summary-row"><span class="label">Format:</span><span class="val" style="text-transform:uppercase;">${session.format}</span></div>
          <div class="summary-row"><span class="label">Location:</span><span class="val">${session.location}</span></div>
          <div class="summary-row"><span class="label">Required Tools:</span><span class="val">${session.requiredTools ? session.requiredTools.join(', ') : 'Standard Toolset'}</span></div>
          <div class="summary-row"><span class="label">Prep Notes:</span><span class="val">${session.notes || 'None'}</span></div>
        </div>
      </div>
    `;

    modal.open({
      title: '<i data-lucide="calendar" style="color:#2563EB;"></i> Training Session Details',
      bodyHtml: bodyHtml,
      maxWidth: '600px'
    });
  },

  openVideoClassroomModal(session) {
    const bodyHtml = `
      <div class="video-classroom-container">
        <div class="video-stage">
          <!-- Mentor Main Feed -->
          <div class="video-main-stream">
            <img src="${session.mentorAvatar}" alt="${session.mentorName}" style="width:100%; height:100%; object-fit:cover; opacity:0.9;">
            <div class="video-stream-overlay">
              <span style="width:8px; height:8px; border-radius:50%; background:#16A34A; display:inline-block;"></span>
              <span>${session.mentorName} (Master Instructor)</span>
            </div>
          </div>

          <!-- Learner Self-view & Schematics PIP -->
          <div class="video-pip-stream">
            <div class="pip-box">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" style="width:100%; height:100%; object-fit:cover;">
              <div style="position:absolute; bottom:4px; left:6px; background:rgba(0,0,0,0.6); color:#FFF; font-size:0.65rem; padding:1px 4px; border-radius:3px;">
                You (Alex Rivera)
              </div>
            </div>
            <div class="pip-box" style="background:#0F172A; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#93C5FD; font-size:0.75rem; text-align:center; padding:0.5rem;">
              <i data-lucide="monitor" style="margin-bottom:4px;"></i>
              <span>Shared Schematic View (Active)</span>
            </div>
          </div>
        </div>

        <!-- Video Controls Bar -->
        <div class="video-controls-bar">
          <div style="display:flex; align-items:center; gap:0.5rem;">
            <button class="media-control-btn" id="vc-mic-toggle" title="Mute/Unmute Mic"><i data-lucide="mic"></i></button>
            <button class="media-control-btn" id="vc-cam-toggle" title="Turn Camera On/Off"><i data-lucide="video"></i></button>
            <button class="media-control-btn" id="vc-screen-toggle" title="Share Screen"><i data-lucide="share-2"></i></button>
          </div>

          <div style="color:#FFFFFF; font-size:0.8125rem; font-family:monospace;">
            <span style="color:#EF4444;">● REC</span> 00:14:22 • HD 1080p
          </div>

          <div>
            <button class="btn btn-danger btn-sm" id="vc-leave-call">
              <i data-lucide="phone-off"></i> Leave Room
            </button>
          </div>
        </div>
      </div>
    `;

    modal.open({
      title: `<i data-lucide="video" style="color:#2563EB;"></i> Online Training Room • ${session.skill}`,
      bodyHtml: bodyHtml,
      maxWidth: '860px'
    });

    const leaveBtn = document.getElementById('vc-leave-call');
    if (leaveBtn) {
      leaveBtn.onclick = () => {
        modal.close();
        toast.info("Classroom Left", "You disconnected from the simulated video session.");
      };
    }
  },

  openLocationModal(session) {
    const bodyHtml = `
      <div>
        <div style="height:220px; background:#1E293B; border-radius:12px; position:relative; overflow:hidden; display:flex; align-items:center; justify-content:center; color:#FFFFFF; margin-bottom:1.5rem;">
          <div style="text-align:center;">
            <i data-lucide="map-pin" style="width:40px;height:40px;color:#EF4444;margin:0 auto 0.5rem;"></i>
            <div style="font-weight:700; font-size:1.1rem;">Austin Pro Training Bay 3</div>
            <div style="font-size:0.8125rem; color:#94A3B8;">1800 Industrial Blvd, Austin, TX 78745</div>
          </div>
        </div>

        <h4 style="color:#173B75; margin-bottom:0.5rem;">Workshop Access Instructions</h4>
        <p style="font-size:0.8125rem; color:#64748B; margin-bottom:1.25rem;">
          Check in with the front desk receptionist using your Worker ID (<strong>wrk_9042</strong>). Eye protection and steel-toe boots are mandatory on the training floor.
        </p>

        <div style="background:#EFF6FF; border:1px solid #DBEAFE; border-radius:10px; padding:1rem;">
          <div style="font-weight:700; color:#1E40AF; font-size:0.8125rem; margin-bottom:0.25rem;">Required Equipment Checklist:</div>
          <div style="font-size:0.75rem; color:#1E3A8A;">• Digital Multimeter (CAT III) • Level 4 Cut Gloves • Safety Glasses</div>
        </div>
      </div>
    `;

    modal.open({
      title: `<i data-lucide="map-pin" style="color:#2563EB;"></i> Training Location & Directions`,
      bodyHtml: bodyHtml,
      maxWidth: '600px'
    });
  },

  openRescheduleModal(session) {
    const bodyHtml = `
      <div>
        <p style="font-size:0.875rem; color:#64748B; margin-bottom:1.25rem;">
          Select a new date and time for your session with <strong>${session.mentorName}</strong>.
        </p>
        <div class="form-group">
          <label class="form-label">Select New Date</label>
          <input type="date" class="form-control" id="resched-date" value="2026-10-12">
        </div>
        <div class="form-group">
          <label class="form-label">Select Time Slot</label>
          <select class="form-select" id="resched-time">
            <option value="10:00 AM">10:00 AM (Morning)</option>
            <option value="01:30 PM">01:30 PM (Afternoon)</option>
            <option value="04:30 PM">04:30 PM (Evening)</option>
          </select>
        </div>
      </div>
    `;

    const footerHtml = `
      <button class="btn btn-secondary" onclick="document.getElementById('global-modal-close-btn').click()">Cancel</button>
      <button class="btn btn-primary" id="btn-confirm-reschedule">Confirm Reschedule</button>
    `;

    modal.open({
      title: `<i data-lucide="calendar" style="color:#2563EB;"></i> Reschedule Session`,
      bodyHtml: bodyHtml,
      footerHtml: footerHtml,
      maxWidth: '500px'
    });

    const confirmBtn = document.getElementById('btn-confirm-reschedule');
    if (confirmBtn) {
      confirmBtn.onclick = () => {
        const d = document.getElementById('resched-date').value;
        const t = document.getElementById('resched-time').value;
        appState.rescheduleSession(session.id, d, t);
        modal.close();
        toast.success("Session Rescheduled", `Moved to ${d} at ${t}`);
        this.render(document.getElementById('page-view-container'), { tab: 'upcoming' });
      };
    }
  },

  openCancelModal(session) {
    const bodyHtml = `
      <div>
        <p style="font-size:0.875rem; color:#64748B; margin-bottom:1.25rem;">
          Are you sure you want to cancel your mentorship session for <strong>'${session.skill}'</strong> with ${session.mentorName}?
        </p>
        <div class="form-group">
          <label class="form-label">Reason for cancellation (optional)</label>
          <textarea class="form-textarea" id="cancel-reason" placeholder="e.g., Schedule conflict with emergency job..."></textarea>
        </div>
      </div>
    `;

    const footerHtml = `
      <button class="btn btn-secondary" onclick="document.getElementById('global-modal-close-btn').click()">Keep Session</button>
      <button class="btn btn-danger" id="btn-confirm-cancel">Yes, Cancel Session</button>
    `;

    modal.open({
      title: `<i data-lucide="alert-circle" style="color:#DC2626;"></i> Cancel Training Session`,
      bodyHtml: bodyHtml,
      footerHtml: footerHtml,
      maxWidth: '500px'
    });

    const confirmBtn = document.getElementById('btn-confirm-cancel');
    if (confirmBtn) {
      confirmBtn.onclick = () => {
        const reason = document.getElementById('cancel-reason').value;
        appState.cancelSession(session.id, reason);
        modal.close();
        toast.warning("Session Cancelled", "The training session has been cancelled.");
        this.render(document.getElementById('page-view-container'), { tab: 'cancelled' });
      };
    }
  }
};
