/**
 * Find a Mentor - Discovery & Search Page
 */

import { mentorService } from '../services/mentor-service.js';
import { appState } from '../state.js';
import { toast } from '../components/toast.js';
import { modal } from '../components/modal.js';

export const scFindMentorPage = {
  async render(container, queryParams = {}) {
    const filters = {
      searchQuery: queryParams.search || '',
      category: queryParams.category || 'all',
      minExperience: queryParams.exp || '',
      minRating: queryParams.rating || '',
      format: queryParams.format || 'all',
      language: queryParams.lang || 'all',
      pricing: queryParams.pricing || 'all',
      sortBy: queryParams.sort || 'relevant'
    };

    const mentors = await mentorService.getAllMentors(filters);

    container.innerHTML = `
      <div class="animate-fade-in">
        <!-- Page Header -->
        <div style="margin-bottom:1.5rem;">
          <h1 style="font-size:1.75rem; color:#173B75; margin-bottom:0.25rem;">Find an Experienced Worker Mentor</h1>
          <p style="color:#64748B;">Connect 1-on-1 with verified journeymen and master tradespeople for practical coaching and skill assessment.</p>
        </div>

        <!-- Search & Filters Container -->
        <div class="mentors-search-header">
          <!-- Main Search Bar -->
          <div class="search-main-row">
            <div class="search-input-wrapper">
              <i data-lucide="search"></i>
              <input type="text" class="mentor-search-input" id="mentor-search-bar" value="${filters.searchQuery}" placeholder="Search mentors by skill, name, bio or expertise...">
            </div>
            <button class="btn btn-primary" id="btn-run-search" style="height:48px; padding:0 1.5rem;">
              <i data-lucide="search"></i> Search Mentors
            </button>
          </div>

          <!-- Category Chips -->
          <div class="category-chips-row" id="category-chips">
            ${[
              { id: 'all', label: 'All Trades' },
              { id: 'Electrical', label: '⚡ Electrical Services' },
              { id: 'Plumbing', label: '🔧 Plumbing & Piping' },
              { id: 'HVAC', label: '❄️ HVAC & Climate Control' },
              { id: 'Appliance', label: '🔌 Appliance Repair' },
              { id: 'Carpentry', label: '🪚 Carpentry' },
              { id: 'Customer', label: '💬 Customer Service' },
              { id: 'Safety', label: '🦺 Workplace Safety' }
            ].map(cat => `
              <button class="category-chip ${filters.category.toLowerCase() === cat.id.toLowerCase() ? 'active' : ''}" data-cat="${cat.id}">
                ${cat.label}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Filter & Sort Toolbar -->
        <div class="mentors-filter-toolbar">
          <div class="filter-results-count">
            Showing <span id="mentor-count-num">${mentors.length}</span> Verified Mentors Available
          </div>

          <div class="filter-controls-group">
            <!-- Format Filter -->
            <select class="filter-select" id="filter-format-select">
              <option value="all" ${filters.format === 'all' ? 'selected' : ''}>Format: All Types</option>
              <option value="online" ${filters.format === 'online' ? 'selected' : ''}>Online Classroom</option>
              <option value="in-person" ${filters.format === 'in-person' ? 'selected' : ''}>In-Person Practical</option>
              <option value="supervised-field" ${filters.format === 'supervised-field' ? 'selected' : ''}>Supervised Field</option>
            </select>

            <!-- Experience Filter -->
            <select class="filter-select" id="filter-exp-select">
              <option value="" ${!filters.minExperience ? 'selected' : ''}>Experience: Any</option>
              <option value="5" ${filters.minExperience === '5' ? 'selected' : ''}>5+ Years</option>
              <option value="10" ${filters.minExperience === '10' ? 'selected' : ''}>10+ Years</option>
              <option value="15" ${filters.minExperience === '15' ? 'selected' : ''}>15+ Years (Master)</option>
            </select>

            <!-- Pricing Filter -->
            <select class="filter-select" id="filter-pricing-select">
              <option value="all" ${filters.pricing === 'all' ? 'selected' : ''}>Fee: Any</option>
              <option value="all">All Mentors</option>
              <option value="paid" ${filters.pricing === 'paid' ? 'selected' : ''}>Paid Sessions</option>
            </select>

            <!-- Sort By -->
            <select class="filter-select" id="filter-sort-select">
              <option value="relevant" ${filters.sortBy === 'relevant' ? 'selected' : ''}>Sort: Most Relevant</option>
              <option value="rating" ${filters.sortBy === 'rating' ? 'selected' : ''}>Highest Rated</option>
              <option value="experience" ${filters.sortBy === 'experience' ? 'selected' : ''}>Most Experienced</option>
              <option value="fee_low" ${filters.sortBy === 'fee_low' ? 'selected' : ''}>Lowest Fee</option>
              <option value="sessions" ${filters.sortBy === 'sessions' ? 'selected' : ''}>Most Sessions</option>
            </select>

            <button class="btn btn-ghost btn-sm" id="btn-clear-filters" style="color:#DC2626;">
              <i data-lucide="x"></i> Clear
            </button>
          </div>
        </div>

        <!-- Mentors Grid -->
        <div class="mentors-grid" id="mentors-cards-container">
          ${this.renderMentorCards(mentors)}
        </div>
      </div>
    `;

    if (window.lucide) {
      window.lucide.createIcons({ root: container });
    }

    this.bindEvents(container, filters);
  },

  renderMentorCards(mentors) {
    if (mentors.length === 0) {
      return `
        <div class="empty-state" style="grid-column:1/-1;">
          <div class="empty-state-icon"><i data-lucide="user-x"></i></div>
          <div class="empty-state-title">No Mentors Matched Your Filters</div>
          <div class="empty-state-desc">Try clearing selected filters or searching for broader skills like Electrical, Plumbing, or HVAC.</div>
          <button class="btn btn-primary" id="btn-reset-filters-empty">Show All Mentors</button>
        </div>
      `;
    }

    return mentors.map(m => `
      <div class="mentor-card">
        <div>
          <div class="mentor-card-top">
            <img src="${m.avatar}" alt="${m.name}" class="mentor-card-avatar">
            <div class="mentor-card-header-info">
              <div class="mentor-card-name">
                ${m.name}
                <span class="badge badge-verified" style="font-size:0.65rem; padding:2px 6px;">
                  <i data-lucide="shield-check" style="width:12px;height:12px;"></i> Verified
                </span>
              </div>
              <span class="mentor-card-skill-tag">${m.primarySkill}</span>
              <div class="mentor-card-meta">
                <span class="star-rating">
                  <i data-lucide="star" style="width:13px;height:13px;fill:#F59E0B;color:#F59E0B;"></i>
                  <span class="star-rating-score">${m.rating}</span>
                  <span class="star-rating-count">(${m.reviewsCount})</span>
                </span>
                <span>• ${m.experienceYears} yrs exp</span>
              </div>
            </div>
          </div>

          <div class="mentor-card-bio">${m.bio}</div>

          <div class="mentor-skills-tags">
            ${m.verifiedSkills.slice(0, 3).map(skill => `
              <span class="mentor-skill-pill">${skill}</span>
            `).join('')}
          </div>
        </div>

        <div class="mentor-card-footer">
          <div class="mentor-pricing-info">

            <div class="mentor-fee-sub">${m.trainingFormats.join(', ')}</div>
          </div>

          <div class="mentor-card-actions">
            <a href="#/sc-mentor-profile?id=${m.id}" class="btn btn-secondary btn-sm">
              Profile
            </a>
            <button class="btn btn-primary btn-sm btn-quick-book-mentor" data-mentor-id="${m.id}">
              <i data-lucide="calendar-plus"></i> Book
            </button>
          </div>
        </div>
      </div>
    `).join('');
  },

  bindEvents(container, currentFilters) {
    const searchBar = container.querySelector('#mentor-search-bar');
    const searchBtn = container.querySelector('#btn-run-search');
    const formatSelect = container.querySelector('#filter-format-select');
    const expSelect = container.querySelector('#filter-exp-select');
    const pricingSelect = container.querySelector('#filter-pricing-select');
    const sortSelect = container.querySelector('#filter-sort-select');
    const clearBtn = container.querySelector('#btn-clear-filters');

    const applyFilters = () => {
      const q = searchBar.value.trim();
      const params = new URLSearchParams();
      if (q) params.set('search', q);
      if (currentFilters.category && currentFilters.category !== 'all') params.set('category', currentFilters.category);
      if (formatSelect.value !== 'all') params.set('format', formatSelect.value);
      if (expSelect.value) params.set('exp', expSelect.value);
      if (pricingSelect.value !== 'all') params.set('pricing', pricingSelect.value);
      if (sortSelect.value !== 'relevant') params.set('sort', sortSelect.value);

      window.location.hash = `#/sc-find-mentor?${params.toString()}`;
    };

    if (searchBtn) searchBtn.onclick = applyFilters;
    if (searchBar) {
      searchBar.onkeydown = (e) => {
        if (e.key === 'Enter') applyFilters();
      };
    }

    if (formatSelect) formatSelect.onchange = applyFilters;
    if (expSelect) expSelect.onchange = applyFilters;
    if (pricingSelect) pricingSelect.onchange = applyFilters;
    if (sortSelect) sortSelect.onchange = applyFilters;

    if (clearBtn) {
      clearBtn.onclick = () => {
        window.location.hash = '#/sc-find-mentor';
      };
    }

    // Category chips
    const chipBtns = container.querySelectorAll('.category-chip');
    chipBtns.forEach(btn => {
      btn.onclick = () => {
        const cat = btn.dataset.cat;
        currentFilters.category = cat;
        applyFilters();
      };
    });

    // Quick Book Button on Mentor Cards
    const bookButtons = container.querySelectorAll('.btn-quick-book-mentor');
    bookButtons.forEach(btn => {
      btn.onclick = async () => {
        const mentorId = btn.dataset.mentorId;
        const mentor = await mentorService.getMentorById(mentorId);
        if (mentor) {
          this.openBookingWizard(mentor);
        }
      };
    });

    const resetEmpty = container.querySelector('#btn-reset-filters-empty');
    if (resetEmpty) {
      resetEmpty.onclick = () => {
        window.location.hash = '#/sc-find-mentor';
      };
    }
  },

  openBookingWizard(mentor) {
    let currentStep = 1;
    let bookingData = {
      mentorId: mentor.id,
      mentorName: mentor.name,
      mentorAvatar: mentor.avatar,
      skill: mentor.verifiedSkills[0] || mentor.primarySkill,
      category: mentor.primarySkill,
      format: mentor.trainingFormats[0] || 'online',
      date: 'Tomorrow',
      time: mentor.availability.slots[0] || '10:00 AM',
      duration: '60 mins',
      fee: mentor.isFree || mentor.hourlyRate === 0 ? 'Free' : `$${mentor.hourlyRate}.00`,
      notes: ''
    };

    const renderWizardStep = () => {
      const stepHtml = `
        <div class="stepper-header">
          <div class="stepper-progress-bar">
            <div class="stepper-progress-fill" style="width:${((currentStep - 1) / 4) * 100}%"></div>
          </div>
          <div class="step-node ${currentStep >= 1 ? (currentStep === 1 ? 'active' : 'completed') : ''}">
            <div class="step-circle">${currentStep > 1 ? '<i data-lucide="check" style="width:16px;height:16px;"></i>' : '1'}</div>
            <div class="step-title">Skill</div>
          </div>
          <div class="step-node ${currentStep >= 2 ? (currentStep === 2 ? 'active' : 'completed') : ''}">
            <div class="step-circle">${currentStep > 2 ? '<i data-lucide="check" style="width:16px;height:16px;"></i>' : '2'}</div>
            <div class="step-title">Format</div>
          </div>
          <div class="step-node ${currentStep >= 3 ? (currentStep === 3 ? 'active' : 'completed') : ''}">
            <div class="step-circle">${currentStep > 3 ? '<i data-lucide="check" style="width:16px;height:16px;"></i>' : '3'}</div>
            <div class="step-title">Schedule</div>
          </div>
          <div class="step-node ${currentStep >= 4 ? (currentStep === 4 ? 'active' : 'completed') : ''}">
            <div class="step-circle">${currentStep > 4 ? '<i data-lucide="check" style="width:16px;height:16px;"></i>' : '4'}</div>
            <div class="step-title">Details</div>
          </div>
          <div class="step-node ${currentStep >= 5 ? 'active' : ''}">
            <div class="step-circle">5</div>
            <div class="step-title">Confirm</div>
          </div>
        </div>

        <!-- Step 1: Select Skill -->
        <div class="booking-wizard-step ${currentStep === 1 ? 'active' : ''}">
          <h4 style="color:#173B75; margin-bottom:0.5rem;">Select Topic / Skill to Learn</h4>
          <p style="font-size:0.8125rem; color:#64748B; margin-bottom:1.25rem;">Choose from ${mentor.name}'s verified areas of technical expertise.</p>
          <div style="display:flex; flex-direction:column; gap:0.75rem;">
            ${mentor.verifiedSkills.map((skill, idx) => `
              <label class="radio-label" style="background:#F8FAFC; padding:0.875rem 1rem; border:1px solid #E2E8F0; border-radius:10px; cursor:pointer;">
                <input type="radio" name="wizard-skill" value="${skill}" ${idx === 0 ? 'checked' : ''} style="display:none;">
                <span class="radio-custom"></span>
                <span style="font-weight:600; color:#173B75;">${skill}</span>
              </label>
            `).join('')}
          </div>
        </div>

        <!-- Step 2: Training Format -->
        <div class="booking-wizard-step ${currentStep === 2 ? 'active' : ''}">
          <h4 style="color:#173B75; margin-bottom:0.5rem;">Choose Training Format</h4>
          <p style="font-size:0.8125rem; color:#64748B; margin-bottom:1.25rem;">Select how you want to conduct this mentorship session.</p>
          <div class="format-options-grid">
            <div class="format-option-card ${bookingData.format === 'online' ? 'selected' : ''}" data-format="online">
              <div class="format-icon"><i data-lucide="video"></i></div>
              <div class="format-title">Online Classroom</div>
              <div class="format-desc">HD Video, screen share, schematics review.</div>
            </div>
            <div class="format-option-card ${bookingData.format === 'in-person' ? 'selected' : ''}" data-format="in-person">
              <div class="format-icon"><i data-lucide="map-pin"></i></div>
              <div class="format-title">In-Person Workshop</div>
              <div class="format-desc">Hands-on bench practice at Pro Training Bays.</div>
            </div>
            <div class="format-option-card ${bookingData.format === 'supervised-field' ? 'selected' : ''}" data-format="supervised-field">
              <div class="format-icon"><i data-lucide="shield-check"></i></div>
              <div class="format-title">Supervised Field</div>
              <div class="format-desc">Shadow live client job under master guidance.</div>
            </div>
          </div>
        </div>

        <!-- Step 3: Date & Time Picker -->
        <div class="booking-wizard-step ${currentStep === 3 ? 'active' : ''}">
          <h4 style="color:#173B75; margin-bottom:0.5rem;">Select Date & Time Slot</h4>
          <p style="font-size:0.8125rem; color:#64748B; margin-bottom:1.25rem;">Available slots from ${mentor.name}'s verified schedule.</p>
          <div class="booking-schedule-container">
            <div class="calendar-box">
              <div class="calendar-header">
                <span class="calendar-month-title">October 2026</span>
                <span style="font-size:0.75rem; color:#64748B;">Central Time (CT)</span>
              </div>
              <div class="calendar-days-grid">
                <div class="cal-day-label">Mo</div><div class="cal-day-label">Tu</div><div class="cal-day-label">We</div><div class="cal-day-label">Th</div><div class="cal-day-label">Fr</div><div class="cal-day-label">Sa</div><div class="cal-day-label">Su</div>
                <div class="cal-date-cell disabled">28</div><div class="cal-date-cell disabled">29</div><div class="cal-date-cell disabled">30</div>
                <div class="cal-date-cell">1</div><div class="cal-date-cell">2</div><div class="cal-date-cell">3</div><div class="cal-date-cell today selected" data-date="Tomorrow">4</div>
                <div class="cal-date-cell" data-date="Oct 5, 2026">5</div><div class="cal-date-cell" data-date="Oct 6, 2026">6</div><div class="cal-date-cell" data-date="Oct 7, 2026">7</div><div class="cal-date-cell" data-date="Oct 8, 2026">8</div><div class="cal-date-cell" data-date="Oct 9, 2026">9</div><div class="cal-date-cell" data-date="Oct 10, 2026">10</div><div class="cal-date-cell" data-date="Oct 11, 2026">11</div>
              </div>
            </div>

            <div class="time-slots-container">
              <div class="slots-title">Available Slots</div>
              <div class="slots-grid">
                ${mentor.availability.slots.map((slot, idx) => `
                  <button class="time-slot-btn ${idx === 0 ? 'selected' : ''}" data-slot="${slot}">${slot}</button>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- Step 4: Details & Notes -->
        <div class="booking-wizard-step ${currentStep === 4 ? 'active' : ''}">
          <h4 style="color:#173B75; margin-bottom:0.5rem;">Session Details & Prep</h4>
          <div class="form-group">
            <label class="form-label">What specific questions or challenges would you like to focus on?</label>
            <textarea class="form-textarea" id="wizard-notes" placeholder="e.g., I'd like help testing three-phase voltage drops and diagnosing breaker tripping on high load..."></textarea>
          </div>
          <div style="background:#EFF6FF; border:1px solid #DBEAFE; border-radius:10px; padding:0.875rem 1rem; font-size:0.8125rem; color:#1E40AF;">
            <i data-lucide="info" style="width:16px;height:16px;margin-right:4px;"></i>
            <strong>Cancellation Policy:</strong> Free cancellation or rescheduling up to 4 hours before session start time.
          </div>
        </div>

        <!-- Step 5: Summary & Confirm -->
        <div class="booking-wizard-step ${currentStep === 5 ? 'active' : ''}">
          <h4 style="color:#173B75; margin-bottom:0.5rem;">Review & Confirm Booking</h4>
          <div class="booking-summary-card">
            <div class="summary-row"><span class="label">Mentor:</span><span class="val">${mentor.name}</span></div>
            <div class="summary-row"><span class="label">Skill Topic:</span><span class="val" id="summary-skill">${bookingData.skill}</span></div>
            <div class="summary-row"><span class="label">Format:</span><span class="val" id="summary-format" style="text-transform:uppercase;">${bookingData.format}</span></div>
            <div class="summary-row"><span class="label">Scheduled Time:</span><span class="val" id="summary-datetime">${bookingData.date} at ${bookingData.time}</span></div>
            <div class="summary-row"><span class="label">Duration:</span><span class="val">60 Minutes</span></div>
            <div class="summary-row" style="border-top:1px solid #DBEAFE; padding-top:0.5rem; margin-top:0.5rem;">
              <span class="label" style="font-weight:700;">Total Fee:</span>
              <span class="val" style="color:#2563EB; font-size:1.1rem;">${bookingData.fee}</span>
            </div>
          </div>
        </div>
      `;

      const footerHtml = `
        ${currentStep > 1 ? `<button class="btn btn-secondary" id="wizard-prev-btn"><i data-lucide="chevron-left"></i> Back</button>` : ''}
        ${currentStep < 5 ? `<button class="btn btn-primary" id="wizard-next-btn">Next Step <i data-lucide="chevron-right"></i></button>` : `<button class="btn btn-success" id="wizard-confirm-btn"><i data-lucide="check-circle"></i> Confirm Booking</button>`}
      `;

      modal.open({
        title: `<i data-lucide="calendar" style="color:#2563EB;"></i> Book Training Session • ${mentor.name}`,
        bodyHtml: stepHtml,
        footerHtml: footerHtml,
        maxWidth: '680px'
      });

      // Bind wizard events
      const prevBtn = document.getElementById('wizard-prev-btn');
      const nextBtn = document.getElementById('wizard-next-btn');
      const confirmBtn = document.getElementById('wizard-confirm-btn');

      if (prevBtn) {
        prevBtn.onclick = () => {
          currentStep--;
          renderWizardStep();
        };
      }

      if (nextBtn) {
        nextBtn.onclick = () => {
          // Capture step data
          if (currentStep === 1) {
            const sel = document.querySelector('input[name="wizard-skill"]:checked');
            if (sel) bookingData.skill = sel.value;
          } else if (currentStep === 4) {
            const notesEl = document.getElementById('wizard-notes');
            if (notesEl) bookingData.notes = notesEl.value;
          }
          currentStep++;
          renderWizardStep();
        };
      }

      if (confirmBtn) {
        confirmBtn.onclick = () => {
          appState.bookTrainingSession(bookingData);
          modal.close();
          toast.success("Training Session Booked! 📅", `Your mentorship session with ${mentor.name} is confirmed.`);
          window.location.hash = '#/sc-my-training';
        };
      }

      // Step 2 Format Select
      const formatCards = document.querySelectorAll('.format-option-card');
      formatCards.forEach(c => {
        c.onclick = () => {
          formatCards.forEach(fc => fc.classList.remove('selected'));
          c.classList.add('selected');
          bookingData.format = c.dataset.format;
        };
      });

      // Step 3 Time Slot Select
      const slotBtns = document.querySelectorAll('.time-slot-btn');
      slotBtns.forEach(sb => {
        sb.onclick = () => {
          slotBtns.forEach(b => b.classList.remove('selected'));
          sb.classList.add('selected');
          bookingData.time = sb.dataset.slot;
        };
      });
    };

    renderWizardStep();
  }
};
