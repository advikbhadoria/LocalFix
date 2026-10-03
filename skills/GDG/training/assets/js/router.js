/**
 * SPA Router & Sub-Navigation Controller
 */

import { sidebar } from './components/sidebar.js';
import { topbar } from './components/topbar.js';
import { scDashboardPage } from './pages/sc-dashboard.js';
import { scFindMentorPage } from './pages/sc-find-mentor.js';
import { scMentorProfilePage } from './pages/sc-mentor-profile.js';
import { scMentorRegistrationPage } from './pages/sc-mentor-registration.js';
import { scMyTrainingPage } from './pages/sc-my-training.js';
import { scLearningLibraryPage } from './pages/sc-learning-library.js';
import { scCoursePlayerPage } from './pages/sc-course-player.js';
import { scMyProgressPage } from './pages/sc-my-progress.js';
import { scAssessmentsPage } from './pages/sc-assessments.js';
import { scMySkillsPage } from './pages/sc-my-skills.js';
import { scNotificationsPage } from './pages/sc-notifications.js';
import { workerViews } from './pages/worker-views.js';
import { appState } from './state.js';

class Router {
  constructor() {
    this.container = null;
    this.subnavEl = null;
    this.init();
  }

  init() {
    this.container = document.getElementById('page-view-container');
    this.subnavEl = document.getElementById('sc-subnav-bar');

    window.addEventListener('hashchange', () => this.handleRoute());
  }

  parseHash() {
    const hash = window.location.hash.slice(2) || 'sc-dashboard';
    const [path, queryString] = hash.split('?');
    const queryParams = {};

    if (queryString) {
      const urlParams = new URLSearchParams(queryString);
      for (const [key, value] of urlParams.entries()) {
        queryParams[key] = value;
      }
    }

    return { path, queryParams };
  }

  handleRoute() {
    const { path, queryParams } = this.parseHash();

    // Re-render sidebar & topbar active items
    sidebar.render(path);
    topbar.render();

    // Render SkillConnect Sub-Navigation if on SkillConnect route
    const isSkillConnect = path.startsWith('sc-');
    this.renderSubnav(isSkillConnect, path);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Route dispatch
    switch (path) {
      case 'sc-dashboard':
        scDashboardPage.render(this.container);
        break;
      case 'sc-find-mentor':
        scFindMentorPage.render(this.container, queryParams);
        break;
      case 'sc-mentor-profile':
        scMentorProfilePage.render(this.container, queryParams);
        break;
      case 'sc-mentor-registration':
        scMentorRegistrationPage.render(this.container);
        break;
      case 'sc-my-training':
        scMyTrainingPage.render(this.container, queryParams);
        break;
      case 'sc-learning-library':
        scLearningLibraryPage.render(this.container, queryParams);
        break;
      case 'sc-course-player':
        scCoursePlayerPage.render(this.container, queryParams);
        break;
      case 'sc-my-progress':
        scMyProgressPage.render(this.container);
        break;
      case 'sc-assessments':
        scAssessmentsPage.render(this.container);
        break;
      case 'sc-my-skills':
        scMySkillsPage.render(this.container);
        break;
      case 'sc-notifications':
        scNotificationsPage.render(this.container, queryParams);
        break;

      // Non-SkillConnect Worker Portal Pages
      case 'worker-dashboard':
        workerViews.renderDashboard(this.container);
        break;
      case 'worker-jobs':
        workerViews.renderJobs(this.container);
        break;
      case 'worker-requests':
        workerViews.renderRequests(this.container);
        break;
      case 'worker-wallet':
        workerViews.renderWallet(this.container);
        break;
      case 'worker-profile':
        workerViews.renderProfile(this.container);
        break;

      default:
        scDashboardPage.render(this.container);
        break;
    }
  }

  renderSubnav(isSkillConnect, currentPath) {
    if (!this.subnavEl) return;

    if (!isSkillConnect) {
      this.subnavEl.style.display = 'none';
      return;
    }

    this.subnavEl.style.display = 'flex';
    const state = appState.getState();

    const subTabs = [
      { id: 'sc-dashboard', label: 'Learning Dashboard', icon: 'layout-grid' },
      { id: 'sc-find-mentor', label: 'Find a Mentor', icon: 'search' },
      { id: 'sc-mentor-registration', label: 'Become a Mentor', icon: 'award' },
      { id: 'sc-my-training', label: 'My Training', icon: 'calendar', badge: `${state.trainingSessions.filter(s => s.status === 'upcoming').length}` },
      { id: 'sc-learning-library', label: 'Learning Library', icon: 'play-circle' },
      { id: 'sc-my-progress', label: 'My Progress', icon: 'trending-up' },
      { id: 'sc-assessments', label: 'Skill Assessments', icon: 'clipboard-check' },
      { id: 'sc-my-skills', label: 'My Skills & Badges', icon: 'shield-check' }
    ];

    this.subnavEl.innerHTML = subTabs.map(tab => {
      const isActive = (currentPath === tab.id || (tab.id === 'sc-learning-library' && currentPath === 'sc-course-player') || (tab.id === 'sc-find-mentor' && currentPath === 'sc-mentor-profile'));
      return `
        <a href="#/${tab.id}" class="sc-tab-link ${isActive ? 'active' : ''}">
          <i data-lucide="${tab.icon}" style="width:16px;height:16px;"></i>
          <span>${tab.label}</span>
          ${tab.badge ? `<span class="sc-tab-badge">${tab.badge}</span>` : ''}
        </a>
      `;
    }).join('');

    if (window.lucide) {
      window.lucide.createIcons({ root: this.subnavEl });
    }
  }
}

export const router = new Router();
