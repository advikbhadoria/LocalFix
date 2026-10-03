/**
 * Modal Manager Component
 */

class ModalManager {
  constructor() {
    this.backdrop = null;
    this.card = null;
    this.titleEl = null;
    this.bodyEl = null;
    this.footerEl = null;
    this.closeCallback = null;
    this.init();
  }

  init() {
    let backdrop = document.getElementById('global-modal-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.id = 'global-modal-backdrop';
      backdrop.className = 'modal-backdrop';
      backdrop.innerHTML = `
        <div class="modal-card" id="global-modal-card">
          <div class="modal-header">
            <h3 class="modal-title" id="global-modal-title">Modal Title</h3>
            <button class="modal-close-btn" id="global-modal-close-btn" aria-label="Close modal">
              <i data-lucide="x"></i>
            </button>
          </div>
          <div class="modal-body" id="global-modal-body"></div>
          <div class="modal-footer" id="global-modal-footer"></div>
        </div>
      `;
      document.body.appendChild(backdrop);
    }

    this.backdrop = backdrop;
    this.card = backdrop.querySelector('#global-modal-card');
    this.titleEl = backdrop.querySelector('#global-modal-title');
    this.bodyEl = backdrop.querySelector('#global-modal-body');
    this.footerEl = backdrop.querySelector('#global-modal-footer');

    const closeBtn = backdrop.querySelector('#global-modal-close-btn');
    closeBtn.addEventListener('click', () => this.close());

    this.backdrop.addEventListener('click', (e) => {
      if (e.target === this.backdrop) {
        this.close();
      }
    });

    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.backdrop.classList.contains('active')) {
        this.close();
      }
    });
  }

  open({ title, bodyHtml, footerHtml = '', maxWidth = '640px', onClose = null }) {
    this.init();
    this.titleEl.innerHTML = title;
    this.bodyEl.innerHTML = bodyHtml;
    this.footerEl.innerHTML = footerHtml;
    this.footerEl.style.display = footerHtml ? 'flex' : 'none';
    this.card.style.maxWidth = maxWidth;
    this.closeCallback = onClose;

    this.backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (window.lucide) {
      window.lucide.createIcons({ root: this.card });
    }
  }

  close() {
    if (!this.backdrop) return;
    this.backdrop.classList.remove('active');
    document.body.style.overflow = '';
    if (typeof this.closeCallback === 'function') {
      this.closeCallback();
      this.closeCallback = null;
    }
  }
}

export const modal = new ModalManager();
