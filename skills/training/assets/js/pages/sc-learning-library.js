/**
 * Learning Library Course Catalog Page
 */

import { learningService } from '../services/learning-service.js';

export const scLearningLibraryPage = {
  async render(container, queryParams = {}) {
    const filters = {
      searchQuery: queryParams.search || '',
      category: queryParams.category || 'all',
      difficulty: queryParams.difficulty || 'all'
    };

    const courses = await learningService.getCourses(filters);

    container.innerHTML = `
      <div class="animate-fade-in">
        <!-- Page Header -->
        <div style="margin-bottom:1.5rem;">
          <h1 style="font-size:1.75rem; color:#173B75; margin-bottom:0.25rem;">Learning Library & Technical Courses</h1>
          <p style="color:#64748B;">Watch high-definition technical walkthroughs, complete practical safety checklists, and prepare for mentor assessments.</p>
        </div>

        <!-- Filter & Search Toolbar -->
        <div class="courses-filter-bar">
          <div style="display:flex; align-items:center; gap:0.5rem; overflow-x:auto;">
            ${[
              { id: 'all', label: 'All Courses' },
              { id: 'Electrical', label: '⚡ Electrical' },
              { id: 'Plumbing', label: '🔧 Plumbing' },
              { id: 'HVAC', label: '❄️ HVAC' },
              { id: 'Appliance', label: '🔌 Appliances' },
              { id: 'Customer', label: '💬 Customer Service' },
              { id: 'Safety', label: '🦺 OSHA Safety' }
            ].map(c => `
              <button class="category-chip ${filters.category.toLowerCase() === c.id.toLowerCase() ? 'active' : ''}" data-cat="${c.id}">
                ${c.label}
              </button>
            `).join('')}
          </div>

          <div style="display:flex; align-items:center; gap:0.75rem;">
            <select class="filter-select" id="library-diff-select">
              <option value="all" ${filters.difficulty === 'all' ? 'selected' : ''}>Difficulty: All</option>
              <option value="beginner" ${filters.difficulty === 'beginner' ? 'selected' : ''}>Beginner</option>
              <option value="intermediate" ${filters.difficulty === 'intermediate' ? 'selected' : ''}>Intermediate</option>
              <option value="advanced" ${filters.difficulty === 'advanced' ? 'selected' : ''}>Advanced</option>
            </select>
          </div>
        </div>

        <!-- Course Cards Grid -->
        <div class="courses-grid-cards">
          ${courses.map(course => `
            <div class="course-full-card" onclick="if(confirm('AGREEMENT: You must complete 10 jobs related to this skill within one month of completion of the course from our site. Do you accept?')) { window.location.hash='#/sc-course-player?id=${course.id}'; }">
              <div class="course-media-wrap">
                <img src="${course.thumbnail}" alt="${course.title}" class="course-media-img">
                <div class="play-overlay-icon">
                  <i data-lucide="play" style="margin-left:3px;"></i>
                </div>
                <span class="course-category-badge">${course.category}</span>
                <span class="course-duration-badge">${course.duration}</span>
              </div>

              <div class="course-content-body">
                <div>
                  <div class="course-card-tags">
                    <span class="course-difficulty-badge ${course.difficulty}">${course.difficulty}</span>
                    <span style="font-size:0.75rem; color:#64748B; font-weight:600;">${course.totalLessons} Lessons</span>
                  </div>

                  <h3 style="font-size:1.05rem; font-weight:700; color:#173B75; margin-bottom:0.5rem; line-height:1.35;">
                    ${course.title}
                  </h3>

                  <p style="font-size:0.8125rem; color:#64748B; margin-bottom:1rem; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">
                    ${course.description}
                  </p>

                  <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:1.25rem;">
                    <img src="${course.mentorAvatar}" alt="${course.mentorName}" style="width:24px;height:24px;border-radius:50%;">
                    <span style="font-size:0.8125rem; color:#173B75; font-weight:600;">Instructor: ${course.mentorName}</span>
                  </div>
                </div>

                <div>
                  <div class="course-progress-section">
                    <div class="course-progress-meta">
                      <span>${course.completedLessons} / ${course.totalLessons} completed</span>
                      <span style="color:#2563EB; font-weight:700;">${course.progressPercent}%</span>
                    </div>
                    <div class="progress-bar-wrap">
                      <div class="progress-bar-fill" style="width:${course.progressPercent}%"></div>
                    </div>
                  </div>

                  <button class="btn ${course.progressPercent > 0 ? 'btn-primary' : 'btn-secondary'}" style="width:100%;">
                    <i data-lucide="${course.progressPercent > 0 ? 'play' : 'book-open'}"></i>
                    ${course.progressPercent === 100 ? 'Review Course' : course.progressPercent > 0 ? 'Continue Learning' : 'Start Course'}
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    if (window.lucide) {
      window.lucide.createIcons({ root: container });
    }

    this.bindEvents(container, filters);
  },

  bindEvents(container, filters) {
    const chips = container.querySelectorAll('.category-chip');
    chips.forEach(chip => {
      chip.onclick = () => {
        const cat = chip.dataset.cat;
        window.location.hash = `#/sc-learning-library?category=${cat}`;
      };
    });

    const diffSelect = container.querySelector('#library-diff-select');
    if (diffSelect) {
      diffSelect.onchange = () => {
        window.location.hash = `#/sc-learning-library?category=${filters.category}&difficulty=${diffSelect.value}`;
      };
    }
  }
};
