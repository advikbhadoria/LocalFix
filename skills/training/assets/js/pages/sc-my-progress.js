/**
 * Learner Progress Tracking & Skill Development Roadmaps Page
 */

import { appState } from '../state.js';

export const scMyProgressPage = {
  charts: [],

  render(container) {
    const state = appState.getState();
    const user = state.currentUser;
    const stats = user.stats;

    container.innerHTML = `
      <div class="animate-fade-in">
        <!-- Page Header -->
        <div style="margin-bottom:1.5rem;">
          <h1 style="font-size:1.75rem; color:#173B75; margin-bottom:0.25rem;">My Skill Progress & Roadmaps</h1>
          <p style="color:#64748B;">Track your competency milestones from beginner foundation through practical training to master verification.</p>
        </div>

        <!-- 5-Stage Skill Development Roadmap -->
        <div class="roadmap-container">
          <div class="roadmap-header">
            <div>
              <span class="badge badge-blue" style="margin-bottom:0.35rem;">Active Roadmap</span>
              <h2 style="font-size:1.35rem; color:#173B75;">Commercial Electrical Technician Pathway</h2>
            </div>
            <span class="badge badge-warning" style="font-size:0.8125rem;">Stage 4 of 5 In Progress</span>
          </div>

          <!-- 5 Stepper Nodes -->
          <div class="roadmap-stepper">
            <div class="roadmap-step-item completed">
              <div class="roadmap-node-circle"><i data-lucide="check"></i></div>
              <div class="roadmap-step-title">1. Beginner</div>
              <div class="roadmap-step-desc">Core Safety & Tools</div>
            </div>

            <div class="roadmap-step-item completed">
              <div class="roadmap-node-circle"><i data-lucide="check"></i></div>
              <div class="roadmap-step-title">2. Foundation</div>
              <div class="roadmap-step-desc">6 Theory Courses</div>
            </div>

            <div class="roadmap-step-item completed">
              <div class="roadmap-node-circle"><i data-lucide="check"></i></div>
              <div class="roadmap-step-title">3. Practical Training</div>
              <div class="roadmap-step-desc">14 Bench Hours</div>
            </div>

            <div class="roadmap-step-item active">
              <div class="roadmap-node-circle">4</div>
              <div class="roadmap-step-title">4. Mentor Assessment</div>
              <div class="roadmap-step-desc">Live Evaluation</div>
            </div>

            <div class="roadmap-step-item">
              <div class="roadmap-node-circle">5</div>
              <div class="roadmap-step-title">5. Verified Credential</div>
              <div class="roadmap-step-desc">Unlock $82/hr Jobs</div>
            </div>
          </div>

          <!-- Pathway Detail Summary -->
          <div style="background:#F8FAFC; border:1px solid #DBEAFE; border-radius:12px; padding:1.25rem; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:1rem;">
            <div>
              <div style="font-weight:700; color:#173B75; font-size:0.95rem; margin-bottom:0.2rem;">Next Milestone: Practical 3-Phase Circuit Balancing Assessment</div>
              <div style="font-size:0.8125rem; color:#64748B;">Scheduled with Marcus Vance (Master Electrician) for tomorrow at 10:00 AM.</div>
            </div>
            <a href="#/sc-my-training" class="btn btn-primary btn-sm">
              <i data-lucide="calendar"></i> View Session
            </a>
          </div>
        </div>

        <!-- Analytics Charts Grid -->
        <div class="analytics-charts-grid">
          <!-- Chart 1: Training Hours -->
          <div class="chart-card">
            <div class="chart-card-header">
              <div>
                <h3 style="font-size:1.05rem; color:#173B75; margin-bottom:0.2rem;">Weekly Training Activity (Hours)</h3>
                <span style="font-size:0.75rem; color:#64748B;">Video lessons vs Practical bench simulation</span>
              </div>
              <span class="badge badge-green">Total: ${stats.trainingHours} hrs</span>
            </div>
            <div class="chart-canvas-container">
              <canvas id="chart-hours-canvas"></canvas>
            </div>
          </div>

          <!-- Chart 2: Competency Matrix -->
          <div class="chart-card">
            <div class="chart-card-header">
              <div>
                <h3 style="font-size:1.05rem; color:#173B75; margin-bottom:0.2rem;">Skill Competency Breakdown</h3>
                <span style="font-size:0.75rem; color:#64748B;">Assessed trade proficiencies</span>
              </div>
              <span class="badge badge-blue">Tier 2 Average</span>
            </div>
            <div class="chart-canvas-container">
              <canvas id="chart-radar-canvas"></canvas>
            </div>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) {
      window.lucide.createIcons({ root: container });
    }

    this.renderCharts();
  },

  renderCharts() {
    if (typeof window.Chart === 'undefined') return;

    // Destroy previous charts
    this.charts.forEach(c => c.destroy());
    this.charts = [];

    // Chart 1: Training Hours Bar Chart
    const hoursCanvas = document.getElementById('chart-hours-canvas');
    if (hoursCanvas) {
      const hoursChart = new window.Chart(hoursCanvas, {
        type: 'bar',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [
            {
              label: 'Theory & Video Lessons (hrs)',
              data: [1.2, 2.0, 0.8, 1.5, 2.4, 3.0, 1.0],
              backgroundColor: '#2563EB',
              borderRadius: 6
            },
            {
              label: 'Practical Lab & Mentorship (hrs)',
              data: [0.5, 1.5, 0.0, 2.0, 1.0, 2.5, 1.5],
              backgroundColor: '#60A5FA',
              borderRadius: 6
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom', labels: { boxWidth: 12, font: { family: 'Plus Jakarta Sans' } } }
          },
          scales: {
            x: { grid: { display: false } },
            y: { beginAtZero: true, grid: { color: '#F1F5F9' } }
          }
        }
      });
      this.charts.push(hoursChart);
    }

    // Chart 2: Competency Radar Chart
    const radarCanvas = document.getElementById('chart-radar-canvas');
    if (radarCanvas) {
      const radarChart = new window.Chart(radarCanvas, {
        type: 'radar',
        data: {
          labels: ['Safety Protocol', 'Diagnostics', 'Tool Handling', 'Code Compliance', 'Speed/Efficiency', 'Customer Comms'],
          datasets: [{
            label: 'Your Verified Level',
            data: [95, 80, 88, 75, 70, 92],
            backgroundColor: 'rgba(37, 99, 235, 0.2)',
            borderColor: '#2563EB',
            pointBackgroundColor: '#2563EB',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#2563EB'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            r: {
              angleLines: { color: '#E2E8F0' },
              grid: { color: '#E2E8F0' },
              pointLabels: { font: { size: 11, family: 'Plus Jakarta Sans' } },
              suggestedMin: 50,
              suggestedMax: 100
            }
          }
        }
      });
      this.charts.push(radarChart);
    }
  }
};
