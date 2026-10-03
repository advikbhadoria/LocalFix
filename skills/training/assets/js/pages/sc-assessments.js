/**
 * Mentor Skill Assessments & Verification Rubric Page
 */

import { assessmentService } from '../services/assessment-service.js';
import { appState } from '../state.js';
import { toast } from '../components/toast.js';

export const scAssessmentsPage = {
  async render(container) {
    const state = appState.getState();
    const isMentor = (state.currentRole === 'mentor');
    const assessments = await assessmentService.getAssessments();

    container.innerHTML = `
      <div class="animate-fade-in">
        <!-- Header -->
        <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:1rem; margin-bottom:1.5rem;">
          <div>
            <h1 style="font-size:1.75rem; color:#173B75; margin-bottom:0.25rem;">Skill Assessments & Verified Evaluations</h1>
            <p style="color:#64748B;">Standardized technical rubric scoring conducted by certified master mentors and board assessors.</p>
          </div>
          <div style="display:flex; align-items:center; gap:0.5rem;">
            <span class="badge ${isMentor ? 'badge-blue' : 'badge-green'}">
              ${isMentor ? 'Assessor / Mentor View' : 'Learner Progress View'}
            </span>
          </div>
        </div>

        ${isMentor ? this.renderMentorAssessmentForm(state) : this.renderLearnerAssessmentsList(assessments)}
      </div>
    `;

    if (window.lucide) {
      window.lucide.createIcons({ root: container });
    }

    this.bindEvents(container, isMentor);
  },

  renderMentorAssessmentForm(state) {
    return `
      <div class="assessment-layout">
        <!-- Learner Summary Column -->
        <div class="learner-summary-card">
          <div class="learner-profile-header">
            <img src="${state.currentUser.avatar}" alt="Learner" class="learner-avatar">
            <div>
              <h3 style="font-size:1.05rem; color:#173B75; margin-bottom:0.15rem;">Alex Rivera</h3>
              <span style="font-size:0.75rem; color:#64748B;">Candidate ID: wrk_9042</span>
            </div>
          </div>

          <div class="learner-stats-list">
            <div style="display:flex; justify-content:space-between;">
              <span style="color:#64748B;">Target Skill:</span>
              <strong style="color:#173B75;">Commercial 3-Phase Circuit Balancing</strong>
            </div>
            <div style="display:flex; justify-content:space-between;">
              <span style="color:#64748B;">Course Lessons:</span>
              <strong style="color:#16A34A;">6 of 6 Completed (100%)</strong>
            </div>
            <div style="display:flex; justify-content:space-between;">
              <span style="color:#64748B;">Practical Bench Lab:</span>
              <strong style="color:#2563EB;">Passed Safety Check</strong>
            </div>
            <div style="display:flex; justify-content:space-between;">
              <span style="color:#64748B;">Assessor:</span>
              <strong style="color:#173B75;">Marcus Vance (Master Electrician)</strong>
            </div>
          </div>

          <div style="background:#EFF6FF; border:1px solid #DBEAFE; border-radius:10px; padding:0.875rem; font-size:0.75rem; color:#1E40AF;">
            <i data-lucide="shield-check" style="width:14px;height:14px;margin-right:4px;"></i>
            <strong>Board Policy:</strong> Approving 'Competency Demonstrated' will instantly issue an official Level 1 Verified Credential to the learner's public profile and unlock commercial service requests.
          </div>
        </div>

        <!-- Rubric Scoring Form -->
        <div class="assessment-form-card">
          <h3 style="font-size:1.25rem; color:#173B75; margin-bottom:0.5rem;">Practical Competency Rubric</h3>
          <p style="font-size:0.8125rem; color:#64748B; margin-bottom:1.5rem;">Score the candidate's performance across standard trade criteria (1 to 5 Stars).</p>

          <form id="assessment-rubric-form" onsubmit="return false;">
            <div class="rubric-criteria-list">
              ${[
                { id: 'crit_1', title: '1. Tool & Instrument Identification', desc: 'Accurate selection of CAT III/IV multimeters, insulated probes, and PPE ratings.' },
                { id: 'crit_2', title: '2. Safety & Zero-Voltage Verification', desc: 'Flawless execution of Live-Dead-Live protocol before terminal contact.' },
                { id: 'crit_3', title: '3. Technical Procedure & Schematics', desc: 'Understanding phase balancing math and reading load distribution diagrams.' },
                { id: 'crit_4', title: '4. Practical Execution & Torque', desc: 'Clean wire dressing, clockwise hook bending, and calibrated torque spec compliance.' },
                { id: 'crit_5', title: '5. Problem & Fault Isolation', desc: 'Speed and accuracy in diagnosing overloaded neutral return wires.' },
                { id: 'crit_6', title: '6. Workspace Hygiene & Professionalism', desc: 'Tool containment, clean panel vacuuming, and clear homeowner communication.' }
              ].map(crit => `
                <div class="rubric-item">
                  <div class="rubric-info">
                    <div class="rubric-title">${crit.title}</div>
                    <div class="rubric-desc">${crit.desc}</div>
                  </div>
                  <div class="rubric-score-picker" data-criterion="${crit.id}">
                    <button type="button" class="score-star-btn" data-score="1">1</button>
                    <button type="button" class="score-star-btn" data-score="2">2</button>
                    <button type="button" class="score-star-btn" data-score="3">3</button>
                    <button type="button" class="score-star-btn" data-score="4">4</button>
                    <button type="button" class="score-star-btn selected" data-score="5">5</button>
                  </div>
                </div>
              `).join('')}
            </div>

            <!-- Written Feedback -->
            <div class="form-group">
              <label class="form-label">Key Strengths Demonstrated <span class="required">*</span></label>
              <input type="text" class="form-control" id="asm-strengths" value="Flawless adherence to PPE and the Live-Dead-Live zero-voltage testing procedure. Clean wire routing.">
            </div>

            <div class="form-group">
              <label class="form-label">Areas for Ongoing Improvement</label>
              <input type="text" class="form-control" id="asm-improvements" value="Continue practicing rapid digital clamp meter zeroing under high ambient temperatures.">
            </div>

            <!-- Final Verdict Selector -->
            <div class="form-group">
              <label class="form-label">Final Evaluation Verdict <span class="required">*</span></label>
              <div class="verdict-options-grid">
                <div class="verdict-option selected pass" data-verdict="competency-demonstrated">
                  <div style="font-weight:700; color:#15803D; font-size:0.95rem; margin-bottom:0.25rem;">✓ Competency Demonstrated</div>
                  <div style="font-size:0.75rem; color:#166534;">Issue Verified Skill Credential</div>
                </div>
                <div class="verdict-option practice" data-verdict="practice-required">
                  <div style="font-weight:700; color:#B45309; font-size:0.95rem; margin-bottom:0.25rem;">Additional Practice</div>
                  <div style="font-size:0.75rem; color:#92400E;">Requires 1 more bench lab</div>
                </div>
                <div class="verdict-option reassess" data-verdict="reassess">
                  <div style="font-weight:700; color:#B91C1C; font-size:0.95rem; margin-bottom:0.25rem;">Reassessment Required</div>
                  <div style="font-size:0.75rem; color:#991B1B;">Retake safety foundation</div>
                </div>
              </div>
            </div>

            <div style="display:flex; justify-content:flex-end; gap:1rem; border-top:1px solid #E2E8F0; padding-top:1.5rem;">
              <button type="button" class="btn btn-primary btn-lg" id="btn-submit-assessment-rubric">
                <i data-lucide="shield-check"></i> Sign & Submit Official Assessment
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
  },

  renderLearnerAssessmentsList(assessments) {
    return `
      <div style="display:flex; flex-direction:column; gap:1.5rem;">
        ${assessments.map(a => `
          <div class="card" style="padding:1.75rem;">
            <div style="display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:1rem; flex-wrap:wrap; gap:0.5rem;">
              <div>
                <span class="badge badge-blue" style="margin-bottom:0.35rem;">${a.category}</span>
                <h3 style="font-size:1.2rem; color:#173B75; margin-bottom:0.2rem;">${a.skill}</h3>
                <div style="font-size:0.8125rem; color:#64748B;">
                  Assessed by: <strong>${a.mentorName}</strong> • ${a.date}
                </div>
              </div>

              <span class="badge ${a.status === 'competency-demonstrated' ? 'badge-success' : 'badge-amber'}" style="font-size:0.8125rem; padding:0.35rem 0.75rem;">
                ${a.status === 'competency-demonstrated' ? '✓ Competency Verified' : 'In Progress / Review'}
              </span>
            </div>

            <!-- Criteria Scores Grid -->
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:0.75rem; margin-bottom:1.25rem;">
              ${a.criteria.map(c => `
                <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:8px; padding:0.6rem 0.875rem;">
                  <div style="font-size:0.75rem; color:#64748B; margin-bottom:0.2rem;">${c.name}</div>
                  <div style="display:flex; align-items:center; justify-content:space-between;">
                    <div class="star-rating">
                      ${Array(c.score).fill('<i data-lucide="star" style="width:12px;height:12px;fill:#F59E0B;color:#F59E0B;"></i>').join('')}
                    </div>
                    <span style="font-weight:700; font-size:0.8125rem; color:#173B75;">${c.score}/${c.max}</span>
                  </div>
                </div>
              `).join('')}
            </div>

            <div style="background:#EFF6FF; border:1px solid #DBEAFE; border-radius:10px; padding:1rem; font-size:0.8125rem; color:#1E40AF;">
              <div style="margin-bottom:0.35rem;"><strong>Strengths:</strong> ${a.strengths}</div>
              <div><strong>Recommendations:</strong> ${a.improvements}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  bindEvents(container, isMentor) {
    if (isMentor) {
      // Star scoring buttons
      const scoreGroups = container.querySelectorAll('.rubric-score-picker');
      scoreGroups.forEach(group => {
        const starBtns = group.querySelectorAll('.score-star-btn');
        starBtns.forEach(btn => {
          btn.onclick = () => {
            starBtns.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
          };
        });
      });

      // Verdict options
      const verdictOptions = container.querySelectorAll('.verdict-option');
      let selectedVerdict = 'competency-demonstrated';
      verdictOptions.forEach(opt => {
        opt.onclick = () => {
          verdictOptions.forEach(vo => vo.classList.remove('selected'));
          opt.classList.add('selected');
          selectedVerdict = opt.dataset.verdict;
        };
      });

      // Submit assessment
      const submitBtn = container.querySelector('#btn-submit-assessment-rubric');
      if (submitBtn) {
        submitBtn.onclick = () => {
          const strengths = container.querySelector('#asm-strengths').value;
          const improvements = container.querySelector('#asm-improvements').value;

          assessmentService.submitAssessment({
            skill: "Commercial 3-Phase Circuit Balancing",
            category: "Electrical Services",
            status: selectedVerdict,
            criteria: [
              { name: "Tool & Instrument Identification", score: 5, max: 5 },
              { name: "Safety & Zero-Voltage Verification", score: 5, max: 5 },
              { name: "Technical Procedure & Schematics", score: 5, max: 5 },
              { name: "Practical Execution & Torque", score: 5, max: 5 },
              { name: "Problem & Fault Isolation", score: 5, max: 5 },
              { name: "Workspace Hygiene & Professionalism", score: 5, max: 5 }
            ],
            strengths: strengths,
            improvements: improvements,
            verdict: "Competency Demonstrated • Verified Credential Issued"
          });

          toast.success("Assessment Submitted! 🏆", "Verified skill badge minted and added to Alex Rivera's public profile.");
          window.location.hash = '#/sc-my-skills';
        };
      }
    }
  }
};
