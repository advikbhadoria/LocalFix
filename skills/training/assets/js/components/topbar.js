/**
 * Topbar Component
 * Header actions, duty status toggle, role switcher, search, and notification popover
 */

import { appState } from '../state.js';
import { toast } from './toast.js';

export const topbar = {
  render() {
    const topbarEl = document.getElementById('app-topbar');
    if (!topbarEl) return;

    const state = appState.getState();
    const user = state.currentUser;
    const isMentor = (state.currentRole === 'mentor');
    const unreadNotifs = state.notifications.filter(n => !n.read);

    topbarEl.innerHTML = `
      <div class="topbar-left">
        <button class="mobile-menu-btn" id="mobile-menu-trigger" aria-label="Open navigation">
          <i data-lucide="menu"></i>
        </button>

        <div class="topbar-search-box">
          <i data-lucide="search" class="search-icon-inside"></i>
          <input type="text" class="topbar-search-input" id="global-search-input" placeholder="Search skills, mentors, courses, jobs...">
        </div>
      </div>

      <div class="topbar-right">
        <!-- Duty Status Toggle -->
        <div class="duty-status-toggle" id="topbar-duty-toggle" title="Click to cycle status: Online, Busy, Offline">
          <span class="duty-dot" style="background:${user.dutyStatus === 'online' ? '#16A34A' : user.dutyStatus === 'busy' ? '#F59E0B' : '#94A3B8'}"></span>
          <span style="text-transform:capitalize;">${user.dutyStatus}</span>
        </div>

        <!-- Role Switcher (Learner vs Mentor) -->
        <div class="role-switch-container">
          <button class="role-tab-btn ${!isMentor ? 'active' : ''}" id="topbar-role-learner" title="View as Learner">
            <i data-lucide="book-open" style="width:14px;height:14px;"></i> Learner
          </button>
          <button class="role-tab-btn ${isMentor ? 'active' : ''}" id="topbar-role-mentor" title="View as Mentor/Assessor">
            <i data-lucide="award" style="width:14px;height:14px;"></i> Mentor
          </button>
        </div>

        <!-- Notification Bell -->
        <div style="position:relative;">
          <button class="action-icon-btn" id="topbar-notif-btn" aria-label="View notifications">
            <i data-lucide="bell"></i>
            ${unreadNotifs.length > 0 ? `<span class="action-badge-count">${unreadNotifs.length}</span>` : ''}
          </button>

          <!-- Notification Dropdown Menu -->
          <div class="dropdown-menu" id="notif-dropdown-menu">
            <div style="padding:0.5rem 0.875rem; border-bottom:1px solid #E2E8F0; display:flex; justify-content:space-between; align-items:center;">
              <span style="font-weight:700; color:#173B75; font-size:0.875rem;">Notifications</span>
              <a href="#/sc-notifications" style="font-size:0.75rem; font-weight:600;">View All</a>
            </div>
            <div style="max-height:280px; overflow-y:auto;">
              ${state.notifications.slice(0, 4).map(n => `
                <div class="dropdown-item" style="border-bottom:1px solid #F8FAFC; ${!n.read ? 'background:#EFF6FF;' : ''}" onclick="window.location.hash='#/sc-notifications'">
                  <i data-lucide="${n.icon || 'bell'}" style="color:#2563EB; width:16px; height:16px; flex-shrink:0;"></i>
                  <div style="flex:1; min-width:0;">
                    <div style="font-size:0.8125rem; font-weight:700; color:#173B75; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${n.title}</div>
                    <div style="font-size:0.75rem; color:#64748B; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${n.message}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Profile Avatar Link -->
        <a href="#/worker-profile" style="display:flex; align-items:center; gap:0.5rem; text-decoration:none;">
          <img src="${user.avatar}" alt="${user.name}" style="width:38px; height:38px; border-radius:50%; object-fit:cover; border:2px solid #DBEAFE;">
        </a>
      </div>
    `;

    if (window.lucide) {
      window.lucide.createIcons({ root: topbarEl });
    }

    this.bindEvents(topbarEl);
  },

  bindEvents(topbarEl) {
    // Duty Toggle
    const dutyToggle = topbarEl.querySelector('#topbar-duty-toggle');
    if (dutyToggle) {
      dutyToggle.onclick = () => {
        const newStatus = appState.toggleDutyStatus();
        toast.info("Duty Status Changed", `You are now marked as ${newStatus.toUpperCase()}`);
      };
    }

    // Role Buttons
    const learnerBtn = topbarEl.querySelector('#topbar-role-learner');
    const mentorBtn = topbarEl.querySelector('#topbar-role-mentor');

    if (learnerBtn) {
      learnerBtn.onclick = () => {
        appState.setRole('learner');
        toast.info("Switched to Learner Mode", "Browsing courses, mentors, and personal progress.");
      };
    }
    if (mentorBtn) {
      mentorBtn.onclick = () => {
        appState.setRole('mentor');
        toast.info("Switched to Mentor Mode", "Viewing learner assessments, verification status, and teaching schedule.");
      };
    }

    // Notification Dropdown
    const notifBtn = topbarEl.querySelector('#topbar-notif-btn');
    const notifMenu = topbarEl.querySelector('#notif-dropdown-menu');
    if (notifBtn && notifMenu) {
      notifBtn.onclick = (e) => {
        e.stopPropagation();
        notifMenu.classList.toggle('show');
      };
      document.addEventListener('click', () => {
        notifMenu.classList.remove('show');
      });
    }

    // Global Search
    const searchInput = topbarEl.querySelector('#global-search-input');
    if (searchInput) {
      searchInput.onkeydown = (e) => {
        if (e.key === 'Enter') {
          const val = searchInput.value.trim();
          if (val) {
            window.location.hash = `#/sc-find-mentor?search=${encodeURIComponent(val)}`;
          }
        }
      };
    }

    // Mobile menu trigger
    const mobileMenu = topbarEl.querySelector('#mobile-menu-trigger');
    if (mobileMenu) {
      mobileMenu.onclick = () => {
        const sb = document.getElementById('app-sidebar');
        if (sb) sb.classList.toggle('open');
      };
    }
  }
};
