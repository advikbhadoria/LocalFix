/**
 * Toast Notification Component
 */

class ToastManager {
  constructor() {
    this.container = null;
    this.init();
  }

  init() {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    this.container = container;
  }

  show({ title, message, type = 'info', duration = 4000 }) {
    if (!this.container) this.init();

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    let iconName = 'info';
    if (type === 'success') iconName = 'check-circle';
    if (type === 'warning') iconName = 'alert-triangle';
    if (type === 'error') iconName = 'alert-circle';

    toast.innerHTML = `
      <div class="toast-icon">
        <i data-lucide="${iconName}"></i>
      </div>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-msg">${message}</div>
      </div>
      <button class="modal-close-btn" style="padding:2px; font-size:12px;" onclick="this.parentElement.remove()">
        <i data-lucide="x"></i>
      </button>
    `;

    this.container.appendChild(toast);

    if (window.lucide) {
      window.lucide.createIcons({ root: toast });
    }

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Auto remove
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  success(title, message) {
    this.show({ title, message, type: 'success' });
  }

  info(title, message) {
    this.show({ title, message, type: 'info' });
  }

  warning(title, message) {
    this.show({ title, message, type: 'warning' });
  }

  error(title, message) {
    this.show({ title, message, type: 'error' });
  }
}

export const toast = new ToastManager();
