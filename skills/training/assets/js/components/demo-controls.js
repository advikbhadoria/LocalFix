/**
 * Floating Demo Controls Component
 * Provides one-click testing shortcuts for the prototype
 */

import { appState } from '../state.js';
import { toast } from './toast.js';

export const demoControls = {
  render() {
    let dock = document.getElementById('demo-dock');
    if (!dock) {
      dock = document.createElement('div');
      dock.id = 'demo-dock';
      dock.className = 'demo-bar-dock animate-fade-in';
      document.body.appendChild(dock);
    }

    const state = appState.getState();
    const isMentor = (state.currentRole === 'mentor');

    dock.innerHTML = `
      <div class="demo-pill-label">
        <i data-lucide="sparkles"></i> Demo Controls
      </div>

      <button class="demo-action-btn" id="demo-toggle-role" title="Switch between Learner and Mentor view">
        <i data-lucide="user-check"></i> Role: ${isMentor ? 'Mentor' : 'Learner'}
      </button>

      <button class="demo-action-btn" id="demo-verify-skill" title="Instantly mint a verified Electrical skill badge">
        <i data-lucide="shield-check"></i> +Verify Skill
      </button>

      <button class="demo-action-btn" id="demo-add-booking" title="Add upcoming mock training session">
        <i data-lucide="calendar-plus"></i> +Quick Book
      </button>

      <button class="demo-action-btn" id="demo-approve-mentor" title="Simulate mentor application approval">
        <i data-lucide="award"></i> Approve Mentor
      </button>

      <button class="demo-action-btn" id="demo-reset-all" style="background:rgba(220, 38, 38, 0.4);" title="Reset all data to default mock state">
        <i data-lucide="rotate-ccw"></i> Reset
      </button>
    `;

    if (window.lucide) {
      window.lucide.createIcons({ root: dock });
    }

    this.bindEvents(dock);
  },

  bindEvents(dock) {
    const roleBtn = dock.querySelector('#demo-toggle-role');
    if (roleBtn) {
      roleBtn.onclick = () => {
        const current = appState.getRole();
        const next = current === 'learner' ? 'mentor' : 'learner';
        appState.setRole(next);
        toast.info("Role Switched", `Now viewing SkillConnect in ${next.toUpperCase()} mode.`);
      };
    }

    const verifyBtn = dock.querySelector('#demo-verify-skill');
    if (verifyBtn) {
      verifyBtn.onclick = () => {
        appState.instantVerifySkill("Commercial 3-Phase Wiring", "Electrical Services", "Marcus Vance");
        toast.success("Skill Verified! 🏆", "Commercial 3-Phase Wiring verified. Unlocked 8 high-paying job requests!");
      };
    }

    const bookBtn = dock.querySelector('#demo-add-booking');
    if (bookBtn) {
      bookBtn.onclick = () => {
        appState.bookTrainingSession({
          mentorId: "mnt_101",
          mentorName: "Marcus Vance",
          mentorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
          skill: "Circuit Breaker Tripping Diagnostics",
          category: "Electrical Services",
          date: "Oct 12, 2026",
          time: "11:30 AM",
          format: "online"
        });
        toast.success("Quick Booking Added", "New session scheduled with Marcus Vance.");
      };
    }

    const approveBtn = dock.querySelector('#demo-approve-mentor');
    if (approveBtn) {
      approveBtn.onclick = () => {
        appState.approveSimulatedMentor();
        toast.success("Mentor Status Approved", "Your mentor profile is now active and public!");
      };
    }

    const resetBtn = dock.querySelector('#demo-reset-all');
    if (resetBtn) {
      resetBtn.onclick = () => {
        if (confirm("Reset all SkillConnect progress and mock data to initial defaults?")) {
          appState.resetAllData();
          toast.warning("Demo Reset", "All data restored to default initial state.");
        }
      };
    }
  }
};
