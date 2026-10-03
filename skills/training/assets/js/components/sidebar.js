/**
 * Sidebar Navigation Component
 * Integrated Worker Portal Navigation with 12 Primary Nav Items
 */

import { appState } from '../state.js';

export const sidebar = {
  render(currentRoute = 'sc-dashboard') {
    const sidebarEl = document.getElementById('app-sidebar');
    if (!sidebarEl) return;

    const state = appState.getState();
    const user = state.currentUser;
    const isSkillConnectActive = currentRoute.startsWith('sc-');

    const navItems = [
      { id: 'worker-dashboard', label: 'Dashboard', icon: 'layout-dashboard' },
      { id: 'worker-jobs', label: 'My Jobs', icon: 'briefcase', badge: '3' },
      { id: 'worker-requests', label: 'Job Requests', icon: 'inbox', badge: `${state.unlockedJobs.filter(j => j.isUnlocked).length} Unlocked` },
      { id: 'worker-services', label: 'Required Services', icon: 'layers' },
      { id: 'worker-wallet', label: 'Earnings & Wallet', icon: 'wallet' },
      { id: 'sc-dashboard', label: 'SkillConnect', icon: 'graduation-cap', isSkillConnect: true, badge: `${state.trainingSessions.filter(s => s.status === 'upcoming').length}` },
      { id: 'worker-performance', label: 'Performance', icon: 'bar-chart-2' },
      { id: 'worker-messages', label: 'Customer Messages', icon: 'message-square', badge: '2' },
      { id: 'worker-safety', label: 'Safety Center', icon: 'shield-alert' },
      { id: 'sc-notifications', label: 'Notifications', icon: 'bell', badge: `${state.notifications.filter(n => !n.read).length}` },
      { id: 'worker-profile', label: 'My Profile', icon: 'user' },
      { id: 'worker-settings', label: 'Settings', icon: 'settings' }
    ];

    sidebarEl.innerHTML = `
      <div class="sidebar-header">
        <a href="#/worker-dashboard" class="brand-logo" id="brand-home-link">
          <div class="brand-icon">
            <i data-lucide="wrench"></i>
          </div>
          <div class="brand-title">
            <span class="brand-name">PocketHelp</span>
            <span class="brand-subtitle">Worker Pro</span>
          </div>
        </a>
        <button class="sidebar-toggle-btn" id="sidebar-toggle-trigger" aria-label="Toggle sidebar">
          <i data-lucide="chevron-left"></i>
        </button>
      </div>

      <nav class="sidebar-nav">
        <div class="nav-section-label">Operations</div>
        ${navItems.slice(0, 5).map(item => this.renderNavItem(item, currentRoute)).join('')}

        <div class="nav-section-label" style="margin-top:0.5rem;">Skill Development</div>
        ${this.renderNavItem(navItems[5], currentRoute, isSkillConnectActive)}

        <div class="nav-section-label" style="margin-top:0.5rem;">Support & Account</div>
        ${navItems.slice(6).map(item => this.renderNavItem(item, currentRoute)).join('')}
      </nav>

      <div class="sidebar-footer">
        <div class="worker-quick-card" id="sidebar-worker-pill" style="cursor:pointer;">
          <div class="worker-avatar-container">
            <img src="${user.avatar}" alt="${user.name}" class="worker-avatar">
            <span class="status-indicator ${user.dutyStatus}"></span>
          </div>
          <div class="worker-quick-info">
            <div class="worker-name">${user.name}</div>
            <div class="worker-role-badge">
              <i data-lucide="star" style="width:12px;height:12px;color:#F59E0B;fill:#F59E0B;"></i>
              <span>${user.rating} (${user.reviewsCount})</span>
            </div>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) {
      window.lucide.createIcons({ root: sidebarEl });
    }

    this.bindEvents(sidebarEl);
  },

  renderNavItem(item, currentRoute, forceActive = false) {
    const isActive = forceActive || (currentRoute === item.id);
    const highlightClass = item.isSkillConnect ? 'highlight-skillconnect' : '';
    const activeClass = isActive ? 'active' : '';

    return `
      <a href="#/${item.id}" class="nav-item ${highlightClass} ${activeClass}" data-route="${item.id}">
        <span class="nav-icon">
          <i data-lucide="${item.icon}"></i>
        </span>
        <span class="nav-label">${item.label}</span>
        ${item.badge ? `<span class="nav-badge">${item.badge}</span>` : ''}
      </a>
    `;
  },

  bindEvents(sidebarEl) {
    const toggleBtn = sidebarEl.querySelector('#sidebar-toggle-trigger');
    if (toggleBtn) {
      toggleBtn.onclick = () => {
        document.body.classList.toggle('sidebar-collapsed');
      };
    }

    const workerPill = sidebarEl.querySelector('#sidebar-worker-pill');
    if (workerPill) {
      workerPill.onclick = () => {
        window.location.hash = '#/worker-profile';
      };
    }
  }
};
