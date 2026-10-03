/**
 * Interactive Course Player Page
 * Houses Technical Video Player, Lesson Playlist, Practical Checklists, and Quizzes
 */

import { learningService } from '../services/learning-service.js';
import { TechnicalVideoPlayer } from '../components/video-player.js';
import { appState } from '../state.js';
import { toast } from '../components/toast.js';
import { scFindMentorPage } from './sc-find-mentor.js';
import { mentorService } from '../services/mentor-service.js';

export const scCoursePlayerPage = {
  playerInstance: null,

  async render(container, queryParams = {}) {
    const courseId = queryParams.id || 'crs_1';
    const course = await learningService.getCourseById(courseId);

    if (!course) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-title">Course Not Found</div>
          <a href="#/sc-learning-library" class="btn btn-primary">Back to Library</a>
        </div>
      `;
      return;
    }

    const currentLessonId = queryParams.lessonId || course.lessons[0].id;
    const currentLesson = course.lessons.find(l => l.id === currentLessonId) || course.lessons[0];
    const activeTab = queryParams.tab || 'overview';

    container.innerHTML = `
      <div class="animate-fade-in">
        <!-- Breadcrumb & Top Header -->
        <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:1rem; margin-bottom:1.5rem;">
          <div style="display:flex; align-items:center; gap:0.5rem; font-size:0.8125rem; color:#64748B;">
            <a href="#/sc-learning-library">Learning Library</a>
            <span>/</span>
            <span style="color:#173B75; font-weight:700;">${course.title}</span>
          </div>

          <div style="display:flex; align-items:center; gap:0.75rem;">
            <span class="badge badge-blue">${course.category}</span>
            <button class="btn btn-secondary btn-sm" id="btn-player-book-instructor">
              <i data-lucide="calendar"></i> Book 1-on-1 with ${course.mentorName}
            </button>
          </div>
        </div>

        <!-- 2-Column Player Layout -->
        <div class="player-page-layout">
          <!-- Main Col: Video & Tabs -->
          <div class="player-main-col">
            <!-- Video Player Host Container -->
            <div id="video-player-root"></div>

            <!-- Content Tabs Navigation -->
            <div class="card" style="padding:1.5rem;">
              <div style="display:flex; align-items:center; gap:1.5rem; border-bottom:1px solid #E2E8F0; padding-bottom:0.75rem; margin-bottom:1.5rem;">
                <button class="sc-tab-link ${activeTab === 'overview' ? 'active' : ''}" data-player-tab="overview">
                  <i data-lucide="book-open"></i> Lesson Notes
                </button>
                <button class="sc-tab-link ${activeTab === 'checklist' ? 'active' : ''}" data-player-tab="checklist">
                  <i data-lucide="check-square"></i> Practical Checklist (${course.practicalChecklist ? course.practicalChecklist.length : 0})
                </button>
                <button class="sc-tab-link ${activeTab === 'quiz' ? 'active' : ''}" data-player-tab="quiz">
                  <i data-lucide="help-circle"></i> Knowledge Quiz
                </button>
              </div>

              <!-- TAB 1: Lesson Notes -->
              <div id="tab-pane-overview" style="display:${activeTab === 'overview' ? 'block' : 'none'};">
                <h3 style="font-size:1.15rem; color:#173B75; margin-bottom:0.5rem;">${currentLesson.title}</h3>
                <p style="color:#475569; line-height:1.6; margin-bottom:1.25rem;">${currentLesson.summary}</p>

                <div style="background:#F0F5FF; border:1px solid #DBEAFE; border-radius:10px; padding:1rem; margin-bottom:1.5rem;">
                  <h4 style="font-size:0.875rem; color:#1E40AF; margin-bottom:0.35rem; display:flex; align-items:center; gap:0.35rem;">
                    <i data-lucide="shield-alert" style="width:16px;height:16px;"></i> Critical Safety Rule
                  </h4>
                  <p style="font-size:0.8125rem; color:#1E3A8A; margin:0;">
                    Always de-energize circuits, apply lockout/tagout (LOTO), and perform the Live-Dead-Live verification on a calibrated non-contact voltage tester before touching electrical components.
                  </p>
                </div>

                <div style="display:flex; align-items:center; justify-content:space-between; border-top:1px solid #F1F5F9; padding-top:1rem;">
                  <button class="btn btn-secondary btn-sm" id="btn-prev-lesson">
                    <i data-lucide="chevron-left"></i> Previous Lesson
                  </button>
                  <button class="btn btn-primary btn-sm" id="btn-next-lesson">
                    Next Lesson <i data-lucide="chevron-right"></i>
                  </button>
                </div>
              </div>

              <!-- TAB 2: Practical Skill Checklist -->
              <div id="tab-pane-checklist" style="display:${activeTab === 'checklist' ? 'block' : 'none'};">
                <div class="checklist-header-row">
                  <div>
                    <h3 style="font-size:1.15rem; color:#173B75; margin-bottom:0.25rem;">Practical Hands-On Tasks</h3>
                    <p style="font-size:0.8125rem; color:#64748B;">Complete each step during your bench simulation or mentor-supervised workshop.</p>
                  </div>
                  <span class="badge badge-blue">Interactive Checklist</span>
                </div>

                <div class="checklist-tasks-list">
                  ${course.practicalChecklist ? course.practicalChecklist.map(chk => `
                    <div class="checklist-task-card">
                      <div class="task-checkbox-wrap">
                        <label class="checkbox-label">
                          <input type="checkbox" class="chk-item-toggle" data-chk-id="${chk.id}" ${chk.learnerCompleted ? 'checked' : ''} style="display:none;">
                          <span class="checkbox-custom"></span>
                        </label>
                      </div>

                      <div class="task-content-details">
                        <div class="task-title-line">
                          <span class="task-title">${chk.task}</span>
                          ${chk.mentorVerified ? `
                            <span class="badge badge-verified" style="font-size:0.65rem;">
                              <i data-lucide="shield-check" style="width:12px;height:12px;"></i> Mentor Verified
                            </span>
                          ` : `
                            <span class="badge badge-neutral" style="font-size:0.65rem;">Self-Checked</span>
                          `}
                        </div>

                        ${chk.safetyWarning ? `
                          <div class="task-safety-warning" style="margin-bottom:0.5rem;">
                            <i data-lucide="alert-triangle" style="width:12px;height:12px;"></i> ${chk.safetyWarning}
                          </div>
                        ` : ''}

                        <div class="task-tools-required">
                          <i data-lucide="wrench" style="width:13px;height:13px;color:#2563EB;"></i>
                          <span>Required Tools: <strong>${chk.requiredTools ? chk.requiredTools.join(', ') : 'Standard Toolset'}</strong></span>
                        </div>
                      </div>
                    </div>
                  `).join('') : '<p>No checklists available for this course.</p>'}
                </div>
              </div>

              <!-- TAB 3: Interactive Knowledge Quiz -->
              <div id="tab-pane-quiz" style="display:${activeTab === 'quiz' ? 'block' : 'none'};">
                <div class="quiz-box" id="quiz-container-box">
                  ${this.renderQuizSection(course.quiz)}
                </div>
              </div>

            </div>
          </div>

          <!-- Side Col: Playlist & Progress -->
          <div>
            <div class="playlist-card">
              <div class="playlist-header">
                <div>
                  <div class="playlist-title">Course Lessons</div>
                  <div style="font-size:0.75rem; color:#64748B;">${course.completedLessons} of ${course.totalLessons} Completed (${course.progressPercent}%)</div>
                </div>
                <span class="badge badge-blue">${course.duration}</span>
              </div>

              <div class="playlist-lessons-list">
                ${course.lessons.map((les, idx) => `
                  <div class="playlist-item ${les.id === currentLesson.id ? 'active' : ''}" data-lesson-id="${les.id}">
                    <div class="lesson-check-icon ${les.completed ? 'completed' : 'pending'}">
                      <i data-lucide="${les.completed ? 'check' : 'play'}"></i>
                    </div>
                    <div class="lesson-meta-text">
                      <div class="lesson-meta-title">${les.title}</div>
                      <div class="lesson-meta-time">${les.duration}</div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Instructor Quick Info -->
            <div class="card" style="padding:1.25rem; margin-top:1.5rem;">
              <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:0.75rem;">
                <img src="${course.mentorAvatar}" alt="${course.mentorName}" style="width:44px;height:44px;border-radius:50%;object-fit:cover;">
                <div>
                  <div style="font-weight:700; color:#173B75; font-size:0.95rem;">${course.mentorName}</div>
                  <div style="font-size:0.75rem; color:#2563EB; font-weight:600;">Verified Master Instructor</div>
                </div>
              </div>
              <p style="font-size:0.8125rem; color:#64748B; margin-bottom:1rem;">
                Need hands-on guidance with this course material? Schedule a 1-on-1 practical lab or supervised session.
              </p>
              <button class="btn btn-secondary btn-sm" id="btn-book-course-mentor" style="width:100%;">
                <i data-lucide="calendar"></i> Book Session with ${course.mentorName}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) {
      window.lucide.createIcons({ root: container });
    }

    // Initialize Interactive Video Player
    if (this.playerInstance) {
      this.playerInstance.destroy();
    }

    this.playerInstance = new TechnicalVideoPlayer(
      'video-player-root',
      course,
      currentLesson,
      (cId, lId) => {
        learningService.markLessonCompleted(cId, lId);
        this.render(container, { id: cId, lessonId: lId, tab: activeTab });
      }
    );

    this.bindEvents(container, course, currentLesson, activeTab);
  },

  renderQuizSection(quiz) {
    if (!quiz) return `<p>No quiz configured for this course.</p>`;

    return `
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:1rem;">
        <span class="badge badge-blue">Knowledge Check</span>
        <span style="font-size:0.75rem; color:#64748B;">1 Question • 100% Passing Required</span>
      </div>

      <h4 class="quiz-question-title">${quiz.question}</h4>

      <div class="quiz-options-list" id="quiz-options-group">
        ${quiz.options.map((opt, idx) => `
          <label class="quiz-option-label" data-index="${idx}">
            <input type="radio" name="quiz-ans" value="${idx}" style="display:none;">
            <span class="radio-custom"></span>
            <span>${opt}</span>
          </label>
        `).join('')}
      </div>

      <div id="quiz-feedback-box" style="display:none;"></div>

      <div style="display:flex; align-items:center; justify-content:space-between;">
        <button class="btn btn-primary" id="btn-submit-quiz">Submit Answer</button>
        <button class="btn btn-secondary btn-sm" id="btn-retry-quiz" style="display:none;">Retry Quiz</button>
      </div>
    `;
  },

  bindEvents(container, course, currentLesson, currentTab) {
    // Playlist item clicks
    const playlistItems = container.querySelectorAll('.playlist-item');
    playlistItems.forEach(item => {
      item.onclick = () => {
        const lId = item.dataset.lessonId;
        window.location.hash = `#/sc-course-player?id=${course.id}&lessonId=${lId}&tab=${currentTab}`;
      };
    });

    // Tab buttons
    const tabBtns = container.querySelectorAll('.sc-tab-link');
    tabBtns.forEach(btn => {
      btn.onclick = () => {
        const tab = btn.dataset.playerTab;
        window.location.hash = `#/sc-course-player?id=${course.id}&lessonId=${currentLesson.id}&tab=${tab}`;
      };
    });

    // Checklist toggles
    const chkToggles = container.querySelectorAll('.chk-item-toggle');
    chkToggles.forEach(toggle => {
      toggle.onchange = () => {
        const chkId = toggle.dataset.chkId;
        learningService.toggleChecklist(course.id, chkId);
        toast.info("Checklist Updated", "Practical task status saved.");
      };
    });

    // Quiz Submission
    const submitQuizBtn = container.querySelector('#btn-submit-quiz');
    const retryQuizBtn = container.querySelector('#btn-retry-quiz');
    const feedbackBox = container.querySelector('#quiz-feedback-box');
    const optionLabels = container.querySelectorAll('.quiz-option-label');

    if (submitQuizBtn && course.quiz) {
      submitQuizBtn.onclick = () => {
        const selected = container.querySelector('input[name="quiz-ans"]:checked');
        if (!selected) {
          toast.warning("Select an Answer", "Please choose an option before submitting.");
          return;
        }

        const chosenIdx = parseInt(selected.value, 10);
        const isCorrect = (chosenIdx === course.quiz.correctIndex);

        optionLabels.forEach((lbl, idx) => {
          if (idx === course.quiz.correctIndex) {
            lbl.classList.add('correct');
          } else if (idx === chosenIdx && !isCorrect) {
            lbl.classList.add('incorrect');
          }
        });

        feedbackBox.style.display = 'block';
        feedbackBox.innerHTML = `
          <div class="quiz-explanation-box">
            <div style="font-weight:700; color:${isCorrect ? '#15803D' : '#B91C1C'}; margin-bottom:0.25rem;">
              ${isCorrect ? '✓ Correct Answer!' : '✗ Incorrect'}
            </div>
            <div>${course.quiz.explanation}</div>
          </div>
        `;

        submitQuizBtn.style.display = 'none';
        if (retryQuizBtn) retryQuizBtn.style.display = 'inline-flex';

        if (isCorrect) {
          toast.success("Quiz Passed! 🎯", "Great job testing your technical understanding.");
        }
      };
    }

    if (retryQuizBtn) {
      retryQuizBtn.onclick = () => {
        const qContainer = container.querySelector('#quiz-container-box');
        if (qContainer) {
          qContainer.innerHTML = this.renderQuizSection(course.quiz);
          if (window.lucide) window.lucide.createIcons({ root: qContainer });
          this.bindEvents(container, course, currentLesson, currentTab);
        }
      };
    }

    // Book with Instructor CTA
    const bookBtns = [container.querySelector('#btn-player-book-instructor'), container.querySelector('#btn-book-course-mentor')];
    bookBtns.forEach(b => {
      if (b) {
        b.onclick = async () => {
          const mentors = await mentorService.getAllMentors();
          const mentor = mentors.find(m => m.name.toLowerCase().includes(course.mentorName.toLowerCase())) || mentors[0];
          scFindMentorPage.openBookingWizard(mentor);
        };
      }
    });

    // Next / Prev Lesson buttons
    const nextBtn = container.querySelector('#btn-next-lesson');
    const prevBtn = container.querySelector('#btn-prev-lesson');

    const curIdx = course.lessons.findIndex(l => l.id === currentLesson.id);

    if (nextBtn) {
      nextBtn.onclick = () => {
        if (curIdx < course.lessons.length - 1) {
          const nextL = course.lessons[curIdx + 1];
          window.location.hash = `#/sc-course-player?id=${course.id}&lessonId=${nextL.id}&tab=${currentTab}`;
        } else {
          toast.info("Course Complete", "You have reached the final lesson of this course.");
        }
      };
    }

    if (prevBtn) {
      prevBtn.onclick = () => {
        if (curIdx > 0) {
          const prevL = course.lessons[curIdx - 1];
          window.location.hash = `#/sc-course-player?id=${course.id}&lessonId=${prevL.id}&tab=${currentTab}`;
        }
      };
    }
  }
};
