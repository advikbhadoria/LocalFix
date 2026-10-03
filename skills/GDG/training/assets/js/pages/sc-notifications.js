/**
 * Notifications & Reminders Center Page
 */

import { notificationService } from '../services/notification-service.js';
import { appState } from '../state.js';
import { toast } from '../components/toast.js';

export const scNotificationsPage = {
  async render(container, queryParams = {}) {
    const currentTab = queryParams.tab || 'all';
    const notifications = await notificationService.getNotifications();

    const filtered = notifications.filter(n => {
      if (currentTab === 'all') return true;
      if (currentTab === 'unread') return !n.read;
      return n.type === currentTab;
    });

    container.innerHTML = `
      <div class="animate-fade-in" style="max-width:960px; margin:0 auto;">
        <!-- Header -->
        <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:1rem; margin-bottom:1.5rem;">
          <div>
            <h1 style="font-size:1.75rem; color:#173B75; margin-bottom:0.25rem;">Notifications & Training Reminders</h1>
            <p style="color:#64748B;">Stay informed on upcoming 1-on-1 practical labs, assessment verifications, and newly unlocked job requests.</p>
          </div>

          <div style="display:flex; align-items:center; gap:0.75rem;">
            <button class="btn btn-secondary btn-sm" id="btn-mark-all-read">
              <i data-lucide="check-check"></i> Mark All as Read
            </button>
            <button class="btn btn-primary btn-sm" id="btn-simulate-notif">
              <i data-lucide="plus"></i> Test Alert
            </button>
          </div>
        </div>

        <!-- Filter Tabs -->
        <div class="sessions-tabs-nav" style="margin-bottom:1.5rem;">
          <button class="sessions-tab ${currentTab === 'all' ? 'active' : ''}" data-notif-tab="all">
            All (${notifications.length})
          </button>
          <button class="sessions-tab ${currentTab === 'unread' ? 'active' : ''}" data-notif-tab="unread">
            Unread (${notifications.filter(n => !n.read).length})
          </button>
          <button class="sessions-tab ${currentTab === 'session' ? 'active' : ''}" data-notif-tab="session">
            Training Sessions
          </button>
          <button class="sessions-tab ${currentTab === 'badge' ? 'active' : ''}" data-notif-tab="badge">
            Skill Badges
          </button>
          <button class="sessions-tab ${currentTab === 'job' ? 'active' : ''}" data-notif-tab="job">
            Unlocked Jobs
          </button>
        </div>

        <!-- Notifications List -->
        <div style="display:flex; flex-direction:column; gap:0.875rem; margin-bottom:2.5rem;">
          ${filtered.length > 0 ? filtered.map(n => `
            <div class="card" style="padding:1.25rem 1.5rem; display:flex; align-items:flex-start; justify-content:space-between; gap:1rem; ${!n.read ? 'border-left:4px solid #2563EB; background:#FAFCFF;' : ''}">
              <div style="display:flex; align-items:flex-start; gap:1rem;">
                <div style="width:40px; height:40px; border-radius:50%; background:#EFF6FF; color:#2563EB; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                  <i data-lucide="${n.icon || 'bell'}"></i>
                </div>
                <div>
                  <div style="font-weight:700; color:#173B75; font-size:0.95rem; margin-bottom:0.2rem;">
                    ${n.title}
                    ${!n.read ? '<span class="badge badge-blue" style="font-size:0.65rem; margin-left:6px;">New</span>' : ''}
                  </div>
                  <p style="font-size:0.8125rem; color:#64748B; margin-bottom:0.35rem;">${n.message}</p>
                  <div style="font-size:0.75rem; color:#94A3B8;">${n.time}</div>
                </div>
              </div>

              <div>
                ${!n.read ? `
                  <button class="btn btn-ghost btn-sm btn-mark-single-read" data-notif-id="${n.id}" title="Mark as read">
                    <i data-lucide="check"></i>
                  </button>
                ` : ''}
              </div>
            </div>
          `).join('') : `
            <div class="empty-state">
              <div class="empty-state-icon"><i data-lucide="bell-off"></i></div>
              <div class="empty-state-title">No notifications in this tab</div>
              <div class="empty-state-desc">You are completely up to date with all training events.</div>
            </div>
          `}
        </div>

        <!-- Notification Preferences Section -->
        <div class="card" style="padding:1.75rem;">
          <h3 style="font-size:1.15rem; color:#173B75; margin-bottom:1rem;">Notification & Reminder Preferences</h3>
          
          <div style="display:flex; flex-direction:column; gap:1rem;">
            <div style="display:flex; align-items:center; justify-content:space-between;">
              <div>
                <div style="font-weight:700; color:#173B75; font-size:0.875rem;">Training Session Reminders (24h & 1h prior)</div>
                <div style="font-size:0.75rem; color:#64748B;">SMS and in-app alerts before practical mentorship sessions start.</div>
              </div>
              <label class="checkbox-label"><input type="checkbox" checked style="display:none;"><span class="checkbox-custom"></span></label>
            </div>

            <div style="display:flex; align-items:center; justify-content:space-between; border-top:1px solid #F1F5F9; padding-top:0.75rem;">
              <div>
                <div style="font-weight:700; color:#173B75; font-size:0.875rem;">Assessment Review Results & Badges</div>
                <div style="font-size:0.75rem; color:#64748B;">Immediate notification when an assessor submits practical feedback.</div>
              </div>
              <label class="checkbox-label"><input type="checkbox" checked style="display:none;"><span class="checkbox-custom"></span></label>
            </div>

            <div style="display:flex; align-items:center; justify-content:space-between; border-top:1px solid #F1F5F9; padding-top:0.75rem;">
              <div>
                <div style="font-weight:700; color:#173B75; font-size:0.875rem;">High-Paying Job Matches from Unlocked Skills</div>
                <div style="font-size:0.75rem; color:#64748B;">Alerts when commercial service requests matching your verified skills become available.</div>
              </div>
              <label class="checkbox-label"><input type="checkbox" checked style="display:none;"><span class="checkbox-custom"></span></label>
            </div>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) {
      window.lucide.createIcons({ root: container });
    }

    this.bindEvents(container);
  },

  bindEvents(container) {
    const tabs = container.querySelectorAll('.sessions-tab');
    tabs.forEach(tab => {
      tab.onclick = () => {
        const t = tab.dataset.notifTab;
        window.location.hash = `#/sc-notifications?tab=${t}`;
      };
    });

    const markAllBtn = container.querySelector('#btn-mark-all-read');
    if (markAllBtn) {
      markAllBtn.onclick = () => {
        notificationService.markAllRead();
        toast.success("Notifications Cleared", "All notifications marked as read.");
        this.render(container);
      };
    }

    const testBtn = container.querySelector('#btn-simulate-notif');
    if (testBtn) {
      testBtn.onclick = () => {
        notificationService.pushAlert(
          "Master Electrician Marcus Vance sent feedback",
          "Marcus posted remarks on your Phase Balancing practical test.",
          "session",
          "message-square"
        );
        toast.info("Test Notification Generated", "New alert added to notification center.");
        this.render(container);
      };
    }

    const singleBtns = container.querySelectorAll('.btn-mark-single-read');
    singleBtns.forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.notifId;
        notificationService.markAsRead(id);
        this.render(container);
      };
    });
  }
};
