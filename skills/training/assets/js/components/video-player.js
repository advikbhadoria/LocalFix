/**
 * Interactive Video Player Simulation Component
 * Features realistic technical Canvas simulation, play/pause, scrubber, speed, captions & bookmarking
 */

import { appState } from '../state.js';
import { toast } from './toast.js';

export class TechnicalVideoPlayer {
  constructor(containerId, course, currentLesson, onLessonComplete) {
    this.container = document.getElementById(containerId);
    this.course = course;
    this.currentLesson = currentLesson;
    this.onLessonComplete = onLessonComplete;
    this.isPlaying = false;
    this.currentTime = 145; // seconds
    this.totalDuration = 760; // seconds
    this.playbackRate = 1.0;
    this.showCaptions = true;
    this.animationId = null;
    this.init();
  }

  init() {
    if (!this.container) return;
    this.render();
    this.setupCanvas();
    this.bindControls();
  }

  render() {
    this.container.innerHTML = `
      <div class="video-screen-container">
        <div class="video-viewport" id="video-viewport-box">
          <canvas id="tech-video-canvas" width="800" height="440" style="width:100%; height:100%; display:block;"></canvas>
          
          <div class="video-center-play-trigger" id="video-center-play" style="display:${this.isPlaying ? 'none' : 'flex'}">
            <i data-lucide="play" style="width:32px; height:32px; margin-left:4px;"></i>
          </div>

          <!-- Live Dynamic Captions Overlay -->
          <div id="video-caption-overlay" style="position:absolute; bottom:20px; left:50%; transform:translateX(-50%); background:rgba(0,0,0,0.85); color:#FFFFFF; padding:6px 16px; border-radius:6px; font-size:0.875rem; font-weight:600; text-align:center; max-width:85%; display:${this.showCaptions ? 'block' : 'none'}; pointer-events:none; box-shadow:0 2px 8px rgba(0,0,0,0.5);">
            "Verify zero power with the multimeter across Phase A and Ground before removing the terminal clamp."
          </div>
        </div>

        <div class="custom-player-controls">
          <!-- Scrubber -->
          <div class="scrubber-track" id="video-scrubber-track">
            <div class="scrubber-progress" id="video-scrubber-progress" style="width:${(this.currentTime / this.totalDuration) * 100}%"></div>
          </div>

          <!-- Controls row -->
          <div class="controls-button-row">
            <div class="ctrl-group-left">
              <button class="ctrl-btn" id="ctrl-play-pause-btn" aria-label="Play/Pause">
                <i data-lucide="${this.isPlaying ? 'pause' : 'play'}"></i>
              </button>

              <button class="ctrl-btn" id="ctrl-rewind-10" aria-label="Rewind 10 seconds">
                <i data-lucide="rotate-ccw" style="width:16px;height:16px;"></i>
              </button>

              <button class="ctrl-btn" id="ctrl-forward-10" aria-label="Forward 10 seconds">
                <i data-lucide="rotate-cw" style="width:16px;height:16px;"></i>
              </button>

              <div class="time-readout" id="video-time-readout">
                ${this.formatTime(this.currentTime)} / ${this.formatTime(this.totalDuration)}
              </div>
            </div>

            <div class="ctrl-group-right">
              <!-- Playback Speed -->
              <select id="ctrl-speed-select" style="background:transparent; color:#FFFFFF; border:1px solid #475569; border-radius:4px; font-size:0.75rem; padding:2px 4px; cursor:pointer;">
                <option value="0.75">0.75x</option>
                <option value="1.0" selected>1.0x</option>
                <option value="1.25">1.25x</option>
                <option value="1.5">1.5x</option>
                <option value="2.0">2.0x</option>
              </select>

              <!-- Captions Toggle -->
              <button class="ctrl-btn ${this.showCaptions ? 'active' : ''}" id="ctrl-captions-btn" title="Toggle Captions">
                <i data-lucide="subtitles" style="width:18px;height:18px;"></i>
              </button>

              <!-- Bookmark Lesson -->
              <button class="ctrl-btn" id="ctrl-bookmark-btn" title="Bookmark Timestamp">
                <i data-lucide="bookmark" style="width:18px;height:18px;"></i>
              </button>

              <!-- Complete Lesson Trigger -->
              <button class="btn btn-sm ${this.currentLesson.completed ? 'btn-success' : 'btn-primary'}" id="ctrl-complete-lesson-btn">
                <i data-lucide="${this.currentLesson.completed ? 'check-check' : 'check'}"></i>
                ${this.currentLesson.completed ? 'Lesson Completed' : 'Mark Complete'}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) {
      window.lucide.createIcons({ root: this.container });
    }
  }

  setupCanvas() {
    const canvas = document.getElementById('tech-video-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let waveOffset = 0;
    const animate = () => {
      ctx.fillStyle = '#0B132B';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Grid Lines
      ctx.strokeStyle = '#1C2541';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw Technical Diagram (Oscilloscope Sine Waves & Schematics)
      const centerY = canvas.height / 2;

      // Sine Wave A (Phase A - Blue)
      ctx.beginPath();
      ctx.strokeStyle = '#3B82F6';
      ctx.lineWidth = 3;
      for (let x = 0; x < canvas.width; x++) {
        const y = centerY + Math.sin((x + waveOffset) * 0.02) * 60;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Sine Wave B (Phase B - Amber)
      ctx.beginPath();
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 2;
      for (let x = 0; x < canvas.width; x++) {
        const y = centerY + Math.sin((x + waveOffset) * 0.02 + (2 * Math.PI / 3)) * 60;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Gauge / Measurement Readout Box
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.strokeStyle = '#2563EB';
      ctx.lineWidth = 2;
      ctx.roundRect(40, 40, 240, 110, 10);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#93C5FD';
      ctx.font = 'bold 12px Plus Jakarta Sans, sans-serif';
      ctx.fillText('LIVE VOLTAGE SIMULATOR', 55, 65);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 24px JetBrains Mono, monospace';
      const liveV = (120.4 + Math.sin(waveOffset * 0.05) * 0.6).toFixed(1);
      ctx.fillText(`${liveV} VAC`, 55, 95);

      ctx.fillStyle = '#4ADE80';
      ctx.font = '11px Plus Jakarta Sans, sans-serif';
      ctx.fillText('● 60.0 Hz • Phase Balance OK', 55, 125);

      // Course Watermark
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.font = '12px Plus Jakarta Sans, sans-serif';
      ctx.fillText(`SkillConnect MasterClass • ${this.course.title}`, canvas.width - 320, canvas.height - 20);

      if (this.isPlaying) {
        waveOffset += 3 * this.playbackRate;
        this.currentTime += 0.05 * this.playbackRate;
        if (this.currentTime >= this.totalDuration) {
          this.currentTime = this.totalDuration;
          this.togglePlay(false);
          this.handleLessonFinished();
        }
        this.updateTimeDisplay();
      }

      this.animationId = requestAnimationFrame(animate);
    };

    animate();
  }

  bindControls() {
    const playPauseBtn = document.getElementById('ctrl-play-pause-btn');
    const centerPlay = document.getElementById('video-center-play');
    const viewportBox = document.getElementById('video-viewport-box');

    const toggle = () => this.togglePlay();

    if (playPauseBtn) playPauseBtn.onclick = toggle;
    if (centerPlay) centerPlay.onclick = toggle;
    if (viewportBox) viewportBox.onclick = (e) => {
      if (e.target.tagName !== 'BUTTON') toggle();
    };

    // Scrubber click
    const scrubber = document.getElementById('video-scrubber-track');
    if (scrubber) {
      scrubber.onclick = (e) => {
        const rect = scrubber.getBoundingClientRect();
        const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        this.currentTime = ratio * this.totalDuration;
        this.updateTimeDisplay();
      };
    }

    // Rewind / Forward
    const rewBtn = document.getElementById('ctrl-rewind-10');
    if (rewBtn) rewBtn.onclick = () => {
      this.currentTime = Math.max(0, this.currentTime - 10);
      this.updateTimeDisplay();
    };

    const fwdBtn = document.getElementById('ctrl-forward-10');
    if (fwdBtn) fwdBtn.onclick = () => {
      this.currentTime = Math.min(this.totalDuration, this.currentTime + 10);
      this.updateTimeDisplay();
    };

    // Speed select
    const speedSelect = document.getElementById('ctrl-speed-select');
    if (speedSelect) {
      speedSelect.onchange = (e) => {
        this.playbackRate = parseFloat(e.target.value);
        toast.info("Playback Speed", `Set to ${this.playbackRate}x`);
      };
    }

    // Captions toggle
    const capBtn = document.getElementById('ctrl-captions-btn');
    const capOverlay = document.getElementById('video-caption-overlay');
    if (capBtn && capOverlay) {
      capBtn.onclick = () => {
        this.showCaptions = !this.showCaptions;
        capOverlay.style.display = this.showCaptions ? 'block' : 'none';
        capBtn.classList.toggle('active', this.showCaptions);
      };
    }

    // Bookmark
    const bookBtn = document.getElementById('ctrl-bookmark-btn');
    if (bookBtn) {
      bookBtn.onclick = () => {
        toast.success("Lesson Bookmarked", `Saved timestamp ${this.formatTime(this.currentTime)} to your notes.`);
      };
    }

    // Mark complete button
    const completeBtn = document.getElementById('ctrl-complete-lesson-btn');
    if (completeBtn) {
      completeBtn.onclick = () => {
        this.handleLessonFinished();
      };
    }
  }

  togglePlay(forceState = null) {
    this.isPlaying = forceState !== null ? forceState : !this.isPlaying;
    const playPauseBtn = document.getElementById('ctrl-play-pause-btn');
    const centerPlay = document.getElementById('video-center-play');

    if (playPauseBtn) {
      playPauseBtn.innerHTML = `<i data-lucide="${this.isPlaying ? 'pause' : 'play'}"></i>`;
      if (window.lucide) window.lucide.createIcons({ root: playPauseBtn });
    }
    if (centerPlay) {
      centerPlay.style.display = this.isPlaying ? 'none' : 'flex';
    }
  }

  handleLessonFinished() {
    if (typeof this.onLessonComplete === 'function') {
      this.onLessonComplete(this.course.id, this.currentLesson.id);
    }
    toast.success("Lesson Completed! 🎉", `Progress updated for '${this.currentLesson.title}'`);
    const completeBtn = document.getElementById('ctrl-complete-lesson-btn');
    if (completeBtn) {
      completeBtn.className = 'btn btn-sm btn-success';
      completeBtn.innerHTML = '<i data-lucide="check-check"></i> Lesson Completed';
      if (window.lucide) window.lucide.createIcons({ root: completeBtn });
    }
  }

  updateTimeDisplay() {
    const timeReadout = document.getElementById('video-time-readout');
    const progressBar = document.getElementById('video-scrubber-progress');

    if (timeReadout) {
      timeReadout.innerText = `${this.formatTime(this.currentTime)} / ${this.formatTime(this.totalDuration)}`;
    }
    if (progressBar) {
      progressBar.style.width = `${(this.currentTime / this.totalDuration) * 100}%`;
    }
  }

  formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}
