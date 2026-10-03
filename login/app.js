/**
 * LocalFix - Authentication & Role System
 * State Management, Routing, and Interactive Views
 */

(function () {
  'use strict';

  // --- STORAGE KEYS ---
  const STORAGE_KEYS = {
    AUTH_USER: 'LocalFix_user',
    PENDING_AUTH: 'LocalFix_pending_auth',
    OTP_STATE: 'LocalFix_otp_state'
  };

  // --- MOCK WORKERS DATA ---
  const MOCK_WORKERS = [
    {
      id: 'w1',
      name: 'Aman Kumar',
      category: 'AC Repair',
      title: 'AC & Appliance Technician',
      rating: 4.8,
      reviewsCount: 142,
      jobsCompleted: 127,
      distance: '2.4 km away',
      estimatedPrice: '₹650',
      badge: 'Top Rated',
      image: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80',
      verified: true
    },
    {
      id: 'w2',
      name: 'Priya Singh',
      category: 'Electrical',
      title: 'Licensed Electrician & Wiring Expert',
      rating: 4.9,
      reviewsCount: 98,
      jobsCompleted: 89,
      distance: '1.8 km away',
      estimatedPrice: '₹400',
      badge: 'Quick Response',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      verified: true
    },
    {
      id: 'w3',
      name: 'Rajesh Patel',
      category: 'Plumbing',
      title: 'Senior Master Plumber & Pipe Fitter',
      rating: 4.7,
      reviewsCount: 180,
      jobsCompleted: 156,
      distance: '3.2 km away',
      estimatedPrice: '₹550',
      badge: 'Super Pro',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      verified: true
    },
    {
      id: 'w4',
      name: 'Sunil Sharma',
      category: 'Carpenter',
      title: 'Custom Furniture & Woodcraft Artisan',
      rating: 4.9,
      reviewsCount: 220,
      jobsCompleted: 210,
      distance: '2.9 km away',
      estimatedPrice: '₹700',
      badge: 'Customer Choice',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      verified: true
    },
    {
      id: 'w5',
      name: 'Sunita Devi',
      category: 'Cleaning',
      title: 'Deep Home & Sanitization Specialist',
      rating: 4.8,
      reviewsCount: 165,
      jobsCompleted: 140,
      distance: '2.1 km away',
      estimatedPrice: '₹450',
      badge: 'Eco-Friendly',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      verified: true
    }
  ];

  // Default sample portfolio photos for workers
  const DEFAULT_WORK_PHOTOS = [
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&auto=format&fit=crop&q=80'
  ];

  // --- APP STATE ---
  class AppState {
    constructor() {
      this.currentUser = this.loadUser();
      this.pendingAuth = this.loadPendingAuth();
      this.otpState = this.loadOtpState();
      this.activeService = null;
      this.otpTimer = null;
      this.otpSecondsLeft = 30;
      this.uploadedWorkPhotos = [...DEFAULT_WORK_PHOTOS];
    }

    loadUser() {
      try {
        const stored = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
        return stored ? JSON.parse(stored) : null;
      } catch (e) {
        return null;
      }
    }

    saveUser(user) {
      this.currentUser = user;
      try {
        if (user) {
          localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
        } else {
          localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
        }
      } catch (e) {}
      renderNav();
    }

    loadPendingAuth() {
      try {
        const stored = localStorage.getItem(STORAGE_KEYS.PENDING_AUTH);
        return stored ? JSON.parse(stored) : null;
      } catch (e) {
        return null;
      }
    }

    savePendingAuth(data) {
      this.pendingAuth = data;
      try {
        if (data) {
          localStorage.setItem(STORAGE_KEYS.PENDING_AUTH, JSON.stringify(data));
        } else {
          localStorage.removeItem(STORAGE_KEYS.PENDING_AUTH);
        }
      } catch (e) {}
    }

    loadOtpState() {
      try {
        const stored = localStorage.getItem(STORAGE_KEYS.OTP_STATE);
        return stored ? JSON.parse(stored) : { code: '123456', mobile: '' };
      } catch (e) {
        return { code: '123456', mobile: '' };
      }
    }

    saveOtpState(mobile, code = '123456') {
      const stateObj = { mobile, code, timestamp: Date.now() };
      this.otpState = stateObj;
      try {
        localStorage.setItem(STORAGE_KEYS.OTP_STATE, JSON.stringify(stateObj));
      } catch (e) {}
    }

    isAuthenticated() {
      return Boolean(this.currentUser && this.currentUser.isLoggedIn);
    }

    logout() {
      this.currentUser = null;
      this.pendingAuth = null;
      try {
        localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
        localStorage.removeItem(STORAGE_KEYS.PENDING_AUTH);
      } catch (e) {}
      renderNav();
      showToast('Logged out successfully', 'info');
      navigateTo('#/login');
    }

    resetDemo() {
      try {
        localStorage.clear();
      } catch (e) {}
      this.currentUser = null;
      this.pendingAuth = null;
      this.otpState = { code: '123456', mobile: '' };
      this.uploadedWorkPhotos = [...DEFAULT_WORK_PHOTOS];
      renderNav();
      showToast('Demo data and session reset', 'info');
      navigateTo('#/');
    }
  }

  const state = new AppState();
  window.app = state;

  // --- SAFE ICON HELPER ---
  function safeCreateIcons() {
    try {
      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
    } catch (e) {
      console.warn('Lucide icon renderer warning:', e);
    }
  }

  // --- TOAST NOTIFICATIONS ---
  function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast-animate pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border text-sm max-w-sm transition-all duration-200 ' + (
      type === 'success'
        ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
        : type === 'error'
        ? 'bg-rose-50 border-rose-200 text-rose-800'
        : 'bg-blue-50 border-blue-200 text-blue-800'
    );

    const icon = type === 'success' ? 'check-circle-2' : type === 'error' ? 'alert-circle' : 'info';
    toast.innerHTML = '<i data-lucide="' + icon + '" class="w-5 h-5 flex-shrink-0"></i><span class="font-medium">' + message + '</span>';

    container.appendChild(toast);
    safeCreateIcons();

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      setTimeout(() => toast.remove(), 250);
    }, 3500);
  }

  // --- ROUTING HELPERS ---
  function navigateTo(hashPath) {
    if (!hashPath.startsWith('#')) {
      hashPath = '#' + hashPath;
    }
    window.location.hash = hashPath;
  }

  function getRoute() {
    const hash = window.location.hash || '';
    const cleanHash = hash.replace(/^#\/?/, '').split('?')[0].trim();
    return cleanHash || '';
  }

  // --- NAVIGATION BAR RENDERER ---
  function renderNav() {
    const nav = document.getElementById('nav-actions');
    if (!nav) return;

    if (state.isAuthenticated()) {
      const user = state.currentUser || {};
      const isWorker = user.role === 'worker';
      const roleBadge = isWorker
        ? '<span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 flex items-center gap-1"><i data-lucide="wrench" class="w-3 h-3"></i> Worker</span>'
        : '<span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-brand-700 flex items-center gap-1"><i data-lucide="user" class="w-3 h-3"></i> Customer</span>';

      nav.innerHTML = `
        <div class="flex items-center gap-2">
          ${roleBadge}
        </div>
        ${!isWorker ? `
          <a href="#/customer" class="text-sm font-semibold text-slate-600 hover:text-brand-600 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors">
            Services
          </a>
        ` : `
          <a href="#/worker" class="text-sm font-semibold text-slate-600 hover:text-brand-600 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors">
            Handoff
          </a>
        `}
        <a href="#/profile" class="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-brand-600 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors">
          <div class="w-7 h-7 rounded-full bg-brand-100 text-brand-700 font-bold flex items-center justify-center text-xs">
            ${(user.name || 'U').charAt(0).toUpperCase()}
          </div>
          <span class="hidden md:inline font-semibold">${user.name || 'Account'}</span>
        </a>
        <button id="btn-logout-nav" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs border border-rose-200 transition-all cursor-pointer shadow-sm hover:shadow" title="Log Out of LocalFix">
          <i data-lucide="log-out" class="w-3.5 h-3.5"></i>
          <span>Log Out</span>
        </button>
      `;

      const logoutBtn = document.getElementById('btn-logout-nav');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', () => state.logout());
      }
    } else {
      nav.innerHTML = `
        <a href="#/login" class="text-sm font-semibold text-slate-600 hover:text-brand-600 px-3.5 py-2 rounded-lg hover:bg-slate-100 transition-all">
          Sign In
        </a>
        <a href="#/signup" class="text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 px-4 py-2 rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-1.5">
          <span>Create Account</span>
          <i data-lucide="arrow-right" class="w-4 h-4"></i>
        </a>
      `;
    }

    safeCreateIcons();
  }

  // --- VIEWS ---

  // 1. LANDING PAGE
  function renderLandingView() {
    return `
      <div class="view-animate flex-grow flex flex-col justify-center">
        <!-- Hero Section -->
        <section class="relative overflow-hidden pt-12 pb-16 md:py-20 bg-transparent border-b border-white/30">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100/80 border border-brand-200 text-brand-800 text-xs font-semibold mb-6 shadow-sm">
              <span class="flex h-2 w-2 rounded-full bg-brand-600 animate-pulse"></span>
              India's Trusted Two-Sided Marketplace
            </div>

            <h1 class="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight sm:leading-none">
              Welcome to <span class="bg-gradient-to-r from-brand-600 to-tealAccent-500 bg-clip-text text-transparent">LocalFix</span>
            </h1>

            <p class="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
              Connect with work. Get things done. Get paid safely.
            </p>

            <!-- Action Buttons -->
            <div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <a href="#/login" class="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-base shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:-translate-y-0.5 transition-all text-center flex items-center justify-center gap-2 cursor-pointer">
                <i data-lucide="log-in" class="w-4 h-4"></i>
                <span>Login</span>
              </a>
              <a href="#/signup" class="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-semibold text-base shadow-sm hover:shadow hover:-translate-y-0.5 transition-all text-center flex items-center justify-center gap-2 cursor-pointer">
                <i data-lucide="user-plus" class="w-4 h-4"></i>
                <span>Create Account</span>
              </a>
            </div>

            <!-- Quick Stats / Badges -->
            <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-slate-200/80 text-left">
              <div class="p-4 rounded-xl bg-white/80 border border-slate-200 shadow-sm flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-blue-100 text-brand-600 flex items-center justify-center flex-shrink-0">
                  <i data-lucide="shield-check" class="w-5 h-5"></i>
                </div>
                <div>
                  <div class="font-bold text-slate-900 text-sm">Aadhaar Verified</div>
                  <div class="text-xs text-slate-500">Government UIDAI Linked</div>
                </div>
              </div>

              <div class="p-4 rounded-xl bg-white/80 border border-slate-200 shadow-sm flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <i data-lucide="clock" class="w-5 h-5"></i>
                </div>
                <div>
                  <div class="font-bold text-slate-900 text-sm">Under 15 Mins</div>
                  <div class="text-xs text-slate-500">Fast Local Dispatch</div>
                </div>
              </div>

              <div class="p-4 rounded-xl bg-white/80 border border-slate-200 shadow-sm flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0">
                  <i data-lucide="badge-percent" class="w-5 h-5"></i>
                </div>
                <div>
                  <div class="font-bold text-slate-900 text-sm">Fair Pricing</div>
                  <div class="text-xs text-slate-500">No Hidden Markups</div>
                </div>
              </div>

              <div class="p-4 rounded-xl bg-white/80 border border-slate-200 shadow-sm flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
                  <i data-lucide="wallet" class="w-5 h-5"></i>
                </div>
                <div>
                  <div class="font-bold text-slate-900 text-sm">Instant Pay</div>
                  <div class="text-xs text-slate-500">Direct Worker Payouts</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Two Sided Overview -->
        <section class="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-2xl sm:text-3xl font-display font-bold text-slate-900">One Platform. Two Seamless Journeys.</h2>
            <p class="text-slate-600 text-sm mt-2">Whether you need help at home or want to earn with your trade, LocalFix connects you.</p>
          </div>

          <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <!-- Customer Card -->
            <div class="bg-white/70 backdrop-blur-xl rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div class="w-12 h-12 rounded-xl bg-blue-100 text-brand-600 flex items-center justify-center mb-5">
                <i data-lucide="user" class="w-6 h-6"></i>
              </div>
              <h3 class="text-xl font-bold text-slate-900 font-display">For Customers</h3>
              <p class="text-slate-600 text-sm mt-2 mb-6">Find trusted technicians, plumbers, electricians, and carpenters with upfront pricing and ratings.</p>
              <ul class="space-y-2.5 text-xs text-slate-600 mb-6">
                <li class="flex items-center gap-2"><i data-lucide="check" class="w-4 h-4 text-emerald-500"></i> Verified local professionals nearby</li>
                <li class="flex items-center gap-2"><i data-lucide="check" class="w-4 h-4 text-emerald-500"></i> Upfront transparent job rates</li>
                <li class="flex items-center gap-2"><i data-lucide="check" class="w-4 h-4 text-emerald-500"></i> Satisfaction guarantee with real ratings</li>
              </ul>
              <a href="#/login" class="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700">
                Book a service now <i data-lucide="arrow-right" class="w-4 h-4"></i>
              </a>
            </div>

            <!-- Worker Card -->
            <div class="bg-white/70 backdrop-blur-xl rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div class="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-5">
                <i data-lucide="wrench" class="w-6 h-6"></i>
              </div>
              <h3 class="text-xl font-bold text-slate-900 font-display">For Service Workers</h3>
              <p class="text-slate-600 text-sm mt-2 mb-6">Grow your trade business, upload past work proofs, receive instant job requests, and get paid promptly.</p>
              <ul class="space-y-2.5 text-xs text-slate-600 mb-6">
                <li class="flex items-center gap-2"><i data-lucide="check" class="w-4 h-4 text-emerald-500"></i> Control your work radius and schedule</li>
                <li class="flex items-center gap-2"><i data-lucide="check" class="w-4 h-4 text-emerald-500"></i> Aadhaar verified badge &amp; photo portfolio</li>
                <li class="flex items-center gap-2"><i data-lucide="check" class="w-4 h-4 text-emerald-500"></i> Direct UPI payouts and worker safety line</li>
              </ul>
              <a href="#/signup" class="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-800">
                Join as a service partner <i data-lucide="arrow-right" class="w-4 h-4"></i>
              </a>
            </div>
          </div>
        </section>
      </div>
    `;
  }

  // 2. LOGIN PAGE - STEP 1: Role selection, STEP 2: Phone number -> OTP
  function renderLoginView() {
    return `
      <div class="view-animate flex-grow flex items-center justify-center px-4 py-12">
        <div class="w-full max-w-md bg-white/70 backdrop-blur-xl rounded-2xl border border-slate-200 shadow-xl p-8">
          <!-- Header -->
          <div class="text-center mb-8">
            <div class="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-50 text-brand-600 mb-3 shadow-inner">
              <i data-lucide="log-in" class="w-6 h-6"></i>
            </div>
            <h2 class="text-2xl font-bold font-display text-slate-900">Welcome Back</h2>
            <p class="text-sm text-slate-500 mt-1">Sign in to your LocalFix account</p>
          </div>

          <!-- STEP 1: Role Selection -->
          <div id="login-step-1">
            <p class="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-3">I am signing in as a...</p>
            <div class="grid grid-cols-2 gap-3 mb-6">
              <button
                type="button"
                id="login-role-customer"
                class="login-role-btn flex flex-col items-center gap-2 p-5 rounded-2xl border-2 border-slate-200 hover:border-brand-500 hover:bg-brand-50/50 transition-all cursor-pointer group"
                data-role="customer"
              >
                <div class="w-12 h-12 rounded-xl bg-blue-100 text-brand-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  👤
                </div>
                <span class="font-bold text-sm text-slate-800 group-hover:text-brand-700">Customer</span>
                <span class="text-[11px] text-slate-400">Hire a service</span>
              </button>
              <button
                type="button"
                id="login-role-worker"
                class="login-role-btn flex flex-col items-center gap-2 p-5 rounded-2xl border-2 border-slate-200 hover:border-tealAccent-500 hover:bg-teal-50/50 transition-all cursor-pointer group"
                data-role="worker"
              >
                <div class="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  🛠️
                </div>
                <span class="font-bold text-sm text-slate-800 group-hover:text-teal-700">Worker</span>
                <span class="text-[11px] text-slate-400">Find work</span>
              </button>
            </div>
          </div>

          <!-- STEP 2: Phone Number (hidden initially) -->
          <div id="login-step-2" class="hidden">
            <!-- Selected role badge -->
            <div class="flex items-center gap-2 mb-4 p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span id="login-role-badge" class="text-lg">👤</span>
              <div>
                <span class="text-xs text-slate-500">Signing in as</span>
                <span id="login-role-label" class="ml-1 text-xs font-bold text-slate-800 uppercase">Customer</span>
              </div>
              <button type="button" id="btn-login-change-role" class="ml-auto text-xs text-brand-600 font-semibold hover:underline cursor-pointer">Change</button>
            </div>

            <form id="form-login" class="space-y-5">
              <input type="hidden" id="login-role-hidden" value="" />
              <div>
                <label for="login-mobile" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Mobile Number
                </label>
                <div class="relative flex items-center rounded-xl border border-slate-300 focus-within:border-brand-600 focus-within:ring-2 focus-within:ring-brand-500/20 bg-slate-50/50">
                  <span class="pl-3.5 pr-2.5 text-sm font-semibold text-slate-500 flex items-center gap-1.5 border-r border-slate-200">
                    <span class="text-base">🇮🇳</span> +91
                  </span>
                  <input
                    type="tel"
                    id="login-mobile"
                    required
                    placeholder="98765 43210"
                    maxlength="10"
                    pattern="[0-9]{10}"
                    autofocus
                    class="w-full px-3 py-3 text-slate-900 bg-transparent rounded-r-xl text-base focus:outline-none placeholder:text-slate-400 font-medium"
                  />
                </div>
                <p class="text-xs text-slate-400 mt-1.5">A 6-digit OTP will be sent to this number</p>
              </div>

              <button
                type="submit"
                id="btn-login-submit"
                class="w-full py-3.5 px-4 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl shadow-md shadow-brand-500/25 hover:shadow-brand-500/35 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <span>Send OTP</span>
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
              </button>
            </form>
          </div>

          <!-- Footer Switch -->
          <div class="mt-8 pt-6 border-t border-slate-100 text-center">
            <p class="text-sm text-slate-600">
              Don't have an account?
              <a href="#/signup" class="font-semibold text-brand-600 hover:text-brand-700 ml-1">
                Create an Account
              </a>
            </p>
          </div>
        </div>
      </div>
    `;
  }

  // 3. SIGN-UP PAGE (WITH AADHAAR VERIFICATION)
  function renderSignupView() {
    return `
      <div class="view-animate flex-grow flex items-center justify-center px-4 py-12">
        <div class="w-full max-w-md bg-white/70 backdrop-blur-xl rounded-2xl border border-slate-200 shadow-xl p-8">
          <!-- Header -->
          <div class="text-center mb-6">
            <div class="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-teal-50 text-teal-600 mb-3 shadow-inner">
              <i data-lucide="user-plus" class="w-6 h-6"></i>
            </div>
            <h2 class="text-2xl font-bold font-display text-slate-900">Create an Account</h2>
            <p class="text-sm text-slate-500 mt-1">Join LocalFix with Aadhaar identity verification</p>
          </div>

          <!-- Form -->
          <form id="form-signup" class="space-y-4">
            <!-- Account Role Selection -->
            <div>
              <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Registering As
              </label>
              <div class="grid grid-cols-2 gap-2.5">
                <label class="cursor-pointer border border-slate-200 rounded-xl p-2.5 text-center flex items-center justify-center gap-2 has-[:checked]:border-brand-600 has-[:checked]:bg-brand-50 has-[:checked]:text-brand-800 font-semibold text-xs transition-all">
                  <input type="radio" name="signup_role" value="customer" class="sr-only" checked />
                  <span>👤 Customer</span>
                </label>
                <label class="cursor-pointer border border-slate-200 rounded-xl p-2.5 text-center flex items-center justify-center gap-2 has-[:checked]:border-tealAccent-500 has-[:checked]:bg-teal-50 has-[:checked]:text-teal-800 font-semibold text-xs transition-all">
                  <input type="radio" name="signup_role" value="worker" class="sr-only" />
                  <span>🛠️ Service Worker</span>
                </label>
              </div>
            </div>

            <!-- Full Name -->
            <div>
              <label for="signup-name" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <div class="relative">
                <i data-lucide="user" class="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5"></i>
                <input
                  type="text"
                  id="signup-name"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 focus:outline-none text-slate-900 placeholder:text-slate-400 text-sm font-medium"
                />
              </div>
            </div>

            <!-- Mobile -->
            <div>
              <label for="signup-mobile" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Mobile Number
              </label>
              <div class="relative flex items-center rounded-xl border border-slate-300 focus-within:border-brand-600 focus-within:ring-2 focus-within:ring-brand-500/20 bg-slate-50/50">
                <span class="pl-3.5 pr-2.5 text-xs font-semibold text-slate-500 flex items-center gap-1 border-r border-slate-200">
                  <span>🇮🇳</span> +91
                </span>
                <input
                  type="tel"
                  id="signup-mobile"
                  required
                  placeholder="98765 43210"
                  maxlength="10"
                  pattern="[0-9]{10}"
                  class="w-full px-3 py-2.5 text-slate-900 bg-transparent rounded-r-xl text-sm focus:outline-none placeholder:text-slate-400 font-medium"
                />
              </div>
            </div>

            <!-- Email -->
            <div>
              <label for="signup-email" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <div class="relative">
                <i data-lucide="mail" class="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5"></i>
                <input
                  type="email"
                  id="signup-email"
                  required
                  placeholder="name@example.com"
                  class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 focus:outline-none text-slate-900 placeholder:text-slate-400 text-sm font-medium"
                />
              </div>
            </div>

            <!-- AADHAAR VERIFICATION (REQUESTED) -->
            <div>
              <div class="flex items-center justify-between mb-1">
                <label for="signup-aadhaar" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Aadhaar Number (UIDAI)
                </label>
                <span id="aadhaar-badge" class="hidden text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <i data-lucide="check-check" class="w-3 h-3"></i> Validated
                </span>
              </div>
              <div class="relative">
                <i data-lucide="shield-alert" class="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5"></i>
                <input
                  type="text"
                  id="signup-aadhaar"
                  required
                  maxlength="14"
                  placeholder="5432 9876 1234"
                  class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 focus:outline-none text-slate-900 placeholder:text-slate-400 text-sm font-mono tracking-wider font-semibold"
                />
              </div>
              <p class="text-[11px] text-slate-400 mt-1">
                Enter 12-digit Aadhaar for government-backed security &amp; trust
              </p>
            </div>

            <!-- Password -->
            <div>
              <label for="signup-password" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Create Password
              </label>
              <div class="relative">
                <i data-lucide="lock" class="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5"></i>
                <input
                  type="password"
                  id="signup-password"
                  required
                  minlength="6"
                  placeholder="At least 6 characters"
                  class="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 focus:outline-none text-slate-900 placeholder:text-slate-400 text-sm font-medium"
                />
                <button type="button" id="toggle-pwd-btn" class="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer">
                  <i data-lucide="eye" class="w-4 h-4"></i>
                </button>
              </div>
            </div>

            <button
              type="submit"
              class="w-full py-3 px-4 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl shadow-md shadow-brand-500/25 hover:shadow-brand-500/35 active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-3 cursor-pointer text-sm"
            >
              <span>Continue to OTP Verification</span>
              <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </button>
          </form>

          <!-- Footer Switch -->
          <div class="mt-6 pt-5 border-t border-slate-100 text-center">
            <p class="text-sm text-slate-600">
              Already have an account?
              <a href="#/login" class="font-semibold text-brand-600 hover:text-brand-700 ml-1">
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    `;
  }

  // 4. OTP VERIFICATION PAGE (VERIFIES AND LOGS PERSON IN DIRECTLY)
  function renderVerifyOtpView() {
    const pending = state.pendingAuth || { mobile: '9876543210' };
    const maskedMobile = pending.mobile ? ('+91 ' + pending.mobile) : '+91 98765 43210';

    return `
      <div class="view-animate flex-grow flex items-center justify-center px-4 py-12">
        <div class="w-full max-w-md bg-white/70 backdrop-blur-xl rounded-2xl border border-slate-200 shadow-xl p-8">
          <!-- Back button -->
          <div class="mb-4">
            <a href="#/login" class="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800">
              <i data-lucide="arrow-left" class="w-4 h-4"></i> Change Mobile
            </a>
          </div>

          <!-- Header -->
          <div class="text-center mb-6">
            <div class="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-50 text-brand-600 mb-3 shadow-inner">
              <i data-lucide="shield-check" class="w-6 h-6"></i>
            </div>
            <h2 class="text-2xl font-bold font-display text-slate-900">OTP Verification</h2>
            <p class="text-sm text-slate-500 mt-1">
              Enter 6-digit OTP sent to <strong class="text-slate-800">${maskedMobile}</strong>
            </p>
          </div>

          <!-- Hint Pill -->
          <div class="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-6 text-center text-xs text-amber-800 flex items-center justify-center gap-2">
            <i data-lucide="sparkles" class="w-4 h-4 text-amber-600 flex-shrink-0"></i>
            <span>Demo Mode: Enter <strong>any 6 digits</strong> (e.g. 1 2 3 4 5 6)</span>
          </div>

          <!-- OTP Form -->
          <form id="form-otp" class="space-y-6">
            <!-- 6 Digits Container -->
            <div class="flex justify-between gap-2 sm:gap-3" id="otp-inputs-container">
              <input type="text" maxlength="1" inputmode="numeric" class="otp-input w-12 h-14 rounded-xl border border-slate-300 text-center text-xl font-bold text-slate-800 bg-slate-50 focus:bg-white" autofocus required />
              <input type="text" maxlength="1" inputmode="numeric" class="otp-input w-12 h-14 rounded-xl border border-slate-300 text-center text-xl font-bold text-slate-800 bg-slate-50 focus:bg-white" required />
              <input type="text" maxlength="1" inputmode="numeric" class="otp-input w-12 h-14 rounded-xl border border-slate-300 text-center text-xl font-bold text-slate-800 bg-slate-50 focus:bg-white" required />
              <input type="text" maxlength="1" inputmode="numeric" class="otp-input w-12 h-14 rounded-xl border border-slate-300 text-center text-xl font-bold text-slate-800 bg-slate-50 focus:bg-white" required />
              <input type="text" maxlength="1" inputmode="numeric" class="otp-input w-12 h-14 rounded-xl border border-slate-300 text-center text-xl font-bold text-slate-800 bg-slate-50 focus:bg-white" required />
              <input type="text" maxlength="1" inputmode="numeric" class="otp-input w-12 h-14 rounded-xl border border-slate-300 text-center text-xl font-bold text-slate-800 bg-slate-50 focus:bg-white" required />
            </div>

            <!-- Timer & Resend Link -->
            <div class="flex items-center justify-between text-xs">
              <span id="otp-timer-display" class="text-slate-400">
                Resend code in <strong class="text-slate-700">00:30</strong>
              </span>
              <button
                type="button"
                id="btn-resend-otp"
                disabled
                class="font-semibold text-brand-600 disabled:text-slate-300 disabled:cursor-not-allowed hover:underline cursor-pointer"
              >
                Resend OTP
              </button>
            </div>

            <!-- Submit Button (Directly logs person in) -->
            <button
              type="submit"
              id="btn-verify-otp"
              class="w-full py-3.5 px-4 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl shadow-md shadow-brand-500/25 hover:shadow-brand-500/35 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <span>Verify &amp; Log In</span>
              <i data-lucide="check" class="w-4 h-4"></i>
            </button>
          </form>
        </div>
      </div>
    `;
  }

  // 5. ROLE SELECTION PAGE (FOR ROLE SWITCHING)
  function renderRoleSelectionView() {
    return `
      <div class="view-animate flex-grow flex items-center justify-center px-4 py-12">
        <div class="w-full max-w-4xl">
          <div class="text-center mb-10">
            <span class="px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 border border-brand-200 text-brand-700 uppercase tracking-wider">
              Role Management
            </span>
            <h1 class="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 mt-3">
              How will you use LocalFix?
            </h1>
            <p class="text-slate-600 text-base max-w-xl mx-auto mt-2">
              Choose the experience that best describes you. You can change this anytime.
            </p>
          </div>

          <div class="grid md:grid-cols-2 gap-6 sm:gap-8">
            <!-- CUSTOMER CARD -->
            <div class="interactive-card bg-white/70 backdrop-blur-xl rounded-2xl border-2 border-slate-200 hover:border-brand-500 p-8 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group cursor-pointer relative overflow-hidden" id="card-customer">
              <div>
                <div class="w-14 h-14 rounded-2xl bg-blue-100 text-brand-600 flex items-center justify-center mb-6 text-2xl shadow-inner">
                  👤
                </div>
                <div class="flex items-center gap-2">
                  <h2 class="text-2xl font-bold font-display text-slate-900">Customer</h2>
                  <span class="text-xs px-2 py-0.5 rounded-md bg-blue-50 text-brand-600 font-semibold border border-blue-200">Hire Help</span>
                </div>
                <p class="text-slate-600 text-sm mt-3 leading-relaxed">
                  Find trusted workers for the job you need done.
                </p>
                <div class="mt-6 pt-5 border-t border-slate-100">
                  <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">Popular Services</p>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium">🔧 AC Repair</span>
                    <span class="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium">🚰 Plumbing</span>
                    <span class="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium">⚡ Electrical</span>
                  </div>
                </div>
              </div>
              <div class="mt-8 pt-4">
                <button type="button" id="btn-select-customer" class="w-full py-3.5 px-4 bg-brand-600 group-hover:bg-brand-700 text-white font-semibold rounded-xl shadow-md shadow-brand-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer">
                  <span>Continue as Customer</span>
                  <i data-lucide="arrow-right" class="w-4 h-4"></i>
                </button>
              </div>
            </div>

            <!-- WORKER CARD -->
            <div class="interactive-card bg-white/70 backdrop-blur-xl rounded-2xl border-2 border-slate-200 hover:border-tealAccent-500 p-8 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group cursor-pointer relative overflow-hidden" id="card-worker">
              <div>
                <div class="w-14 h-14 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mb-6 text-2xl shadow-inner">
                  🛠️
                </div>
                <div class="flex items-center gap-2">
                  <h2 class="text-2xl font-bold font-display text-slate-900">Worker</h2>
                  <span class="text-xs px-2 py-0.5 rounded-md bg-teal-50 text-teal-700 font-semibold border border-teal-200">Earn Income</span>
                </div>
                <p class="text-slate-600 text-sm mt-3 leading-relaxed">
                  Find jobs, upload past work photos, work safely and get paid faster.
                </p>
                <div class="mt-6 pt-5 border-t border-slate-100">
                  <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">Platform Benefits</p>
                  <ul class="space-y-1.5 text-xs text-slate-600">
                    <li class="flex items-center gap-2"><i data-lucide="check-circle" class="w-4 h-4 text-teal-600"></i> Aadhaar verified badge</li>
                    <li class="flex items-center gap-2"><i data-lucide="check-circle" class="w-4 h-4 text-teal-600"></i> Upload project photos &amp; portfolio</li>
                    <li class="flex items-center gap-2"><i data-lucide="check-circle" class="w-4 h-4 text-teal-600"></i> Fast direct payouts</li>
                  </ul>
                </div>
              </div>
              <div class="mt-8 pt-4">
                <button type="button" id="btn-select-worker" class="w-full py-3.5 px-4 bg-tealAccent-500 hover:bg-tealAccent-600 text-white font-semibold rounded-xl shadow-md shadow-teal-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer">
                  <span>Continue as Worker</span>
                  <i data-lucide="arrow-right" class="w-4 h-4"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // 6. WORKER ONBOARDING PAGE
  // Fields: Service type, Experience level, Preferred work radius, Previous work description, Uploading photos related to previous work, Aadhaar verification
  function renderWorkerOnboardingView() {
    const user = state.currentUser || {};
    const fullName = user.name || (state.pendingAuth && state.pendingAuth.name) || '';
    const aadhaar = user.aadhaar || (state.pendingAuth && state.pendingAuth.aadhaar) || '5432 9876 1234';

    return `
      <div class="view-animate flex-grow flex items-center justify-center px-4 py-12">
        <div class="w-full max-w-3xl bg-white/70 backdrop-blur-xl rounded-2xl border border-slate-200 shadow-xl p-8">
          <!-- Step indicator -->
          <div class="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div>
              <span class="text-xs font-bold text-teal-600 uppercase tracking-wider">Worker Profile &amp; Verification</span>
              <h1 class="text-2xl font-bold font-display text-slate-900 mt-1">Set Up Your Professional Worker Profile</h1>
            </div>
            <div class="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shadow-inner">
              <i data-lucide="briefcase" class="w-5 h-5"></i>
            </div>
          </div>

          <form id="form-worker-onboarding" class="space-y-6">
            <div class="grid md:grid-cols-2 gap-5">
              <!-- Full Name -->
              <div>
                <label for="worker-name" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Full Name (Pre-filled)
                </label>
                <input
                  type="text"
                  id="worker-name"
                  value="${fullName}"
                  required
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 focus:outline-none text-slate-900 bg-slate-50 text-sm font-medium"
                />
              </div>

              <!-- Aadhaar Verification Display -->
              <div>
                <div class="flex items-center justify-between mb-1.5">
                  <label for="worker-aadhaar" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Aadhaar Verification
                  </label>
                  <span class="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <i data-lucide="badge-check" class="w-3.5 h-3.5"></i> UIDAI Verified
                  </span>
                </div>
                <input
                  type="text"
                  id="worker-aadhaar"
                  value="${aadhaar}"
                  required
                  class="w-full px-4 py-2.5 rounded-xl border border-emerald-300 bg-emerald-50/40 text-emerald-900 text-sm font-mono tracking-wider font-semibold"
                />
              </div>
            </div>

            <!-- SERVICE TYPE (DROPDOWN) -->
            <div>
              <label for="worker-service" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Service Type (Primary Trade)
              </label>
              <div class="relative">
                <select
                  id="worker-service"
                  required
                  class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 focus:outline-none text-slate-900 bg-white text-sm appearance-none font-medium"
                >
                  <option value="" disabled selected>Select your primary trade category</option>
                  <option value="AC Technician">AC Technician &amp; HVAC</option>
                  <option value="Electrician">Electrician &amp; Wiring Expert</option>
                  <option value="Plumber">Plumber &amp; Pipe Fitter</option>
                  <option value="Carpenter">Carpenter &amp; Woodcraft</option>
                  <option value="Cleaner">Deep Cleaning &amp; Sanitization</option>
                  <option value="Painter">Painter &amp; Wall Treatment</option>
                  <option value="Mason">Masonry &amp; Tile Work</option>
                  <option value="Appliance Repair">Appliance &amp; Electronics Repair</option>
                  <option value="Other">Other Handyman Services</option>
                </select>
                <i data-lucide="chevron-down" class="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none"></i>
              </div>
            </div>

            <!-- EXPERIENCE LEVEL (RADIO BUTTONS) -->
            <div>
              <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Experience Level
              </label>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <label class="cursor-pointer border border-slate-200 rounded-xl p-3 text-center hover:border-brand-500 transition-all flex flex-col items-center gap-1 has-[:checked]:border-brand-600 has-[:checked]:bg-brand-50/70 has-[:checked]:text-brand-900">
                  <input type="radio" name="experience" value="Less than 1 year" class="sr-only" required />
                  <span class="text-xs font-bold">&lt; 1 Year</span>
                  <span class="text-[10px] text-slate-500">Entry level</span>
                </label>

                <label class="cursor-pointer border border-slate-200 rounded-xl p-3 text-center hover:border-brand-500 transition-all flex flex-col items-center gap-1 has-[:checked]:border-brand-600 has-[:checked]:bg-brand-50/70 has-[:checked]:text-brand-900">
                  <input type="radio" name="experience" value="1-3 years" class="sr-only" checked />
                  <span class="text-xs font-bold">1–3 Years</span>
                  <span class="text-[10px] text-slate-500">Skilled</span>
                </label>

                <label class="cursor-pointer border border-slate-200 rounded-xl p-3 text-center hover:border-brand-500 transition-all flex flex-col items-center gap-1 has-[:checked]:border-brand-600 has-[:checked]:bg-brand-50/70 has-[:checked]:text-brand-900">
                  <input type="radio" name="experience" value="3-5 years" class="sr-only" />
                  <span class="text-xs font-bold">3–5 Years</span>
                  <span class="text-[10px] text-slate-500">Experienced</span>
                </label>

                <label class="cursor-pointer border border-slate-200 rounded-xl p-3 text-center hover:border-brand-500 transition-all flex flex-col items-center gap-1 has-[:checked]:border-brand-600 has-[:checked]:bg-brand-50/70 has-[:checked]:text-brand-900">
                  <input type="radio" name="experience" value="5+ years" class="sr-only" />
                  <span class="text-xs font-bold">5+ Years</span>
                  <span class="text-[10px] text-slate-500">Master Craftsman</span>
                </label>
              </div>
            </div>

            <!-- PREFERRED WORK RADIUS (RADIO BUTTONS) -->
            <div>
              <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Preferred Work Radius
              </label>
              <div class="grid grid-cols-4 gap-2.5">
                <label class="cursor-pointer border border-slate-200 rounded-xl p-3 text-center hover:border-brand-500 transition-all flex flex-col items-center gap-0.5 has-[:checked]:border-tealAccent-500 has-[:checked]:bg-teal-50 has-[:checked]:text-teal-900">
                  <input type="radio" name="radius" value="5km" class="sr-only" />
                  <span class="text-sm font-bold">5 km</span>
                  <span class="text-[10px] text-slate-500">Local Area</span>
                </label>

                <label class="cursor-pointer border border-slate-200 rounded-xl p-3 text-center hover:border-brand-500 transition-all flex flex-col items-center gap-0.5 has-[:checked]:border-tealAccent-500 has-[:checked]:bg-teal-50 has-[:checked]:text-teal-900">
                  <input type="radio" name="radius" value="10km" class="sr-only" checked />
                  <span class="text-sm font-bold">10 km</span>
                  <span class="text-[10px] text-slate-500">Standard</span>
                </label>

                <label class="cursor-pointer border border-slate-200 rounded-xl p-3 text-center hover:border-brand-500 transition-all flex flex-col items-center gap-0.5 has-[:checked]:border-tealAccent-500 has-[:checked]:bg-teal-50 has-[:checked]:text-teal-900">
                  <input type="radio" name="radius" value="20km" class="sr-only" />
                  <span class="text-sm font-bold">20 km</span>
                  <span class="text-[10px] text-slate-500">Extended</span>
                </label>

                <label class="cursor-pointer border border-slate-200 rounded-xl p-3 text-center hover:border-brand-500 transition-all flex flex-col items-center gap-0.5 has-[:checked]:border-tealAccent-500 has-[:checked]:bg-teal-50 has-[:checked]:text-teal-900">
                  <input type="radio" name="radius" value="35km" class="sr-only" />
                  <span class="text-sm font-bold">35 km</span>
                  <span class="text-[10px] text-slate-500">Metro Wide</span>
                </label>
              </div>
            </div>

            <!-- Base Work Area -->
            <div>
              <label for="worker-area" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Work Area (Locality / Hub)
              </label>
              <div class="relative">
                <i data-lucide="map-pin" class="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5"></i>
                <input
                  type="text"
                  id="worker-area"
                  required
                  list="popular-locations"
                  value="Baner, Pune"
                  placeholder="e.g. Baner, Pune or Koramangala, Bangalore"
                  class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 focus:outline-none text-slate-900 text-sm font-medium"
                />
                <datalist id="popular-locations">
                  <option value="Baner, Pune"></option>
                  <option value="Koramangala, Bangalore"></option>
                  <option value="Andheri, Mumbai"></option>
                  <option value="Indiranagar, Bangalore"></option>
                  <option value="Whitefield, Bangalore"></option>
                  <option value="Hinjewadi, Pune"></option>
                  <option value="Bandra, Mumbai"></option>
                </datalist>
              </div>
            </div>

            <!-- PREVIOUS WORK DETAILS (TEXTAREA) -->
            <div>
              <label for="worker-previous-work" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Previous Work Experience &amp; Specializations
              </label>
              <textarea
                id="worker-previous-work"
                rows="3"
                required
                placeholder="Describe your previous work experience (e.g. 4 years of residential and commercial AC servicing, compressor replacements, inverter AC PCB repairs, worked with Daikin and Voltas authorized centers)..."
                class="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 text-slate-900 placeholder:text-slate-400 text-sm font-medium"
              >Worked on over 200+ residential and commercial AC repair and maintenance projects. Specialized in split AC gas charging, copper pipe welding, wiring checks, and inverter PCB diagnosis.</textarea>
            </div>

            <!-- UPLOADING PHOTOS RELATED TO PREVIOUS WORK (REQUESTED) -->
            <div class="p-5 rounded-2xl border border-slate-200 bg-slate-50/60">
              <div class="flex items-center justify-between mb-3">
                <div>
                  <label class="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Upload Photos of Previous Work / Portfolio
                  </label>
                  <p class="text-xs text-slate-500 mt-0.5">Showcase your completed repairs, installations, or craftsmanship</p>
                </div>
                <span class="text-xs font-semibold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-lg border border-brand-200">
                  Proof of Work
                </span>
              </div>

              <!-- Upload input box -->
              <div class="flex flex-col sm:flex-row items-center gap-3 p-4 rounded-xl border-2 border-dashed border-brand-300 bg-white hover:bg-brand-50/30 transition-colors cursor-pointer mb-4">
                <div class="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0">
                  <i data-lucide="images" class="w-5 h-5"></i>
                </div>
                <div class="flex-grow text-center sm:text-left">
                  <input
                    type="file"
                    id="worker-work-photos-input"
                    multiple
                    accept="image/png,image/jpeg,image/webp"
                    class="text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-brand-600 file:text-white hover:file:bg-brand-700 cursor-pointer"
                  />
                  <p class="text-[11px] text-slate-400 mt-1">Select one or more photos (JPG, PNG, WebP up to 5MB each)</p>
                </div>
              </div>

              <!-- Thumbnail Gallery Container -->
              <div>
                <span class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                  Portfolio Preview (<span id="photo-count-badge">${state.uploadedWorkPhotos.length}</span> Photos Attached)
                </span>
                <div class="grid grid-cols-3 sm:grid-cols-4 gap-3" id="work-photos-gallery">
                  ${state.uploadedWorkPhotos.map((url, idx) => `
                    <div class="relative group rounded-xl overflow-hidden border border-slate-200 bg-white aspect-video shadow-sm">
                      <img src="${url}" alt="Work Sample ${idx + 1}" class="w-full h-full object-cover" />
                      <button type="button" class="btn-remove-photo absolute top-1 right-1 w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs opacity-80 hover:opacity-100 shadow transition-opacity" data-idx="${idx}" title="Remove photo">
                        ✕
                      </button>
                      <span class="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/60 text-white text-[9px] font-medium">Sample #${idx + 1}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>

            <!-- Profile Photo (Headshot) -->
            <div>
              <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Profile Photo (Headshot / ID Photo)
              </label>
              <div class="flex items-center gap-4 p-4 rounded-xl border border-dashed border-slate-300 bg-slate-50/50">
                <div id="photo-preview" class="w-14 h-14 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center overflow-hidden flex-shrink-0 border border-slate-300 shadow-inner">
                  <i data-lucide="camera" class="w-6 h-6"></i>
                </div>
                <div class="flex-grow">
                  <input type="file" id="worker-photo-input" accept="image/png,image/jpeg,image/webp" class="text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100 cursor-pointer" />
                  <p class="text-[11px] text-slate-400 mt-1">Recommended: Clear face photo for customer trust badge</p>
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              class="w-full py-4 px-4 bg-tealAccent-500 hover:bg-tealAccent-600 text-white font-semibold rounded-xl shadow-md shadow-teal-500/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer text-base"
            >
              <span>Create Worker Profile &amp; Route to Dashboard</span>
              <i data-lucide="check" class="w-5 h-5"></i>
            </button>
          </form>
        </div>
      </div>
    `;
  }

  // 7. BASIC CUSTOMER SETUP PAGE
  function renderCustomerSetupView() {
    return `
      <div class="view-animate flex-grow flex items-center justify-center px-4 py-12">
        <div class="w-full max-w-md bg-white/70 backdrop-blur-xl rounded-2xl border border-slate-200 shadow-xl p-8">
          <div class="text-center mb-6">
            <div class="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-brand-600 mb-3 shadow-inner">
              <i data-lucide="map-pin" class="w-6 h-6"></i>
            </div>
            <h1 class="text-2xl font-bold font-display text-slate-900">Welcome to LocalFix</h1>
            <p class="text-sm text-slate-500 mt-1">Set your primary location to find workers nearby</p>
          </div>

          <form id="form-customer-setup" class="space-y-5">
            <div>
              <label for="cust-location" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Your Location / City
              </label>
              <div class="relative">
                <i data-lucide="compass" class="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5"></i>
                <input
                  type="text"
                  id="cust-location"
                  required
                  list="customer-cities"
                  value="Baner, Pune"
                  placeholder="e.g. Koramangala, Bangalore"
                  class="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 focus:outline-none text-slate-900 text-sm font-medium"
                />
                <datalist id="customer-cities">
                  <option value="Baner, Pune"></option>
                  <option value="Koramangala, Bangalore"></option>
                  <option value="Andheri, Mumbai"></option>
                  <option value="Indiranagar, Bangalore"></option>
                  <option value="Hinjewadi, Pune"></option>
                </datalist>
              </div>
            </div>

            <!-- Quick pick pills -->
            <div>
              <span class="text-xs text-slate-500">Popular Hubs:</span>
              <div class="flex flex-wrap gap-1.5 mt-1.5">
                <button type="button" class="btn-location-pill text-xs px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer">Baner, Pune</button>
                <button type="button" class="btn-location-pill text-xs px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer">Koramangala, Bangalore</button>
                <button type="button" class="btn-location-pill text-xs px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer">Andheri, Mumbai</button>
              </div>
            </div>

            <button
              type="submit"
              class="w-full py-3.5 px-4 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl shadow-md shadow-brand-500/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <span>Get Started</span>
              <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </button>
          </form>
        </div>
      </div>
    `;
  }

  // 8. CUSTOMER DASHBOARD (WITH LOG OUT BUTTON & INSTANT WORKER MATCHING)
  function renderCustomerDashboardView() {
    const user = state.currentUser || {};
    const location = user.location || 'Baner, Pune';

    const services = [
      { id: 'AC Repair', icon: '🔧', name: 'AC Repair', tag: 'Fast 30-min visit' },
      { id: 'Plumbing', icon: '🚰', name: 'Plumbing', tag: 'Pipe, tap & leaks' },
      { id: 'Electrical', icon: '⚡', name: 'Electrical', tag: 'Wiring & switches' },
      { id: 'Cleaning', icon: '🧹', name: 'Cleaning', tag: 'Deep clean & sanitize' },
      { id: 'Carpenter', icon: '🔨', name: 'Carpenter', tag: 'Furniture & doors' },
      { id: 'Other', icon: '📦', name: 'Other', tag: 'Handyman & shifting' },
    ];

    return `
      <div class="view-animate max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-grow">
        <!-- Top bar with greeting, location & LOG OUT -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-semibold text-brand-600 uppercase tracking-wider">Customer Portal</span>
              <span class="text-xs text-slate-400">•</span>
              <span class="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">Active Session</span>
            </div>
            <h1 class="text-2xl sm:text-3xl font-bold font-display text-slate-900 mt-0.5">
              What do you need help with?
            </h1>
            <p class="text-sm text-slate-500 mt-1">Select a service or search below to book trusted local experts</p>
          </div>

          <div class="flex items-center gap-3">
            <div class="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm text-xs font-medium text-slate-700">
              <i data-lucide="map-pin" class="w-4 h-4 text-brand-600"></i>
              <span>Location: <strong>${location}</strong></span>
            </div>
            <!-- PROMINENT LOG OUT BUTTON -->
            <button
              type="button"
              id="btn-customer-logout"
              class="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs border border-rose-200 shadow-sm transition-all cursor-pointer"
            >
              <i data-lucide="log-out" class="w-3.5 h-3.5"></i>
              <span>Log Out</span>
            </button>
          </div>
        </div>

        <!-- Search Bar -->
        <div class="mt-8 max-w-2xl">
          <div class="relative flex items-center">
            <i data-lucide="search" class="w-5 h-5 text-slate-400 absolute left-4"></i>
            <input
              type="text"
              id="customer-service-search"
              placeholder="What service are you looking for? (e.g. AC repair, leaking tap, wiring)"
              class="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-300 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 focus:outline-none text-slate-900 placeholder:text-slate-400 shadow-sm text-sm"
            />
          </div>
        </div>

        <!-- Service Cards Grid -->
        <div class="mt-8">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-base font-bold text-slate-900">Select a Service Category</h2>
            <span class="text-xs text-slate-400">Tap to customize request</span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4" id="service-cards-container">
            ${services.map(s => `
              <div
                class="service-card interactive-card bg-white p-5 rounded-2xl border border-slate-200 hover:border-brand-500 shadow-sm hover:shadow-md cursor-pointer flex flex-col items-center text-center group transition-all"
                data-service="${s.id}"
              >
                <div class="w-14 h-14 rounded-2xl bg-slate-50 group-hover:bg-brand-50 flex items-center justify-center text-2xl mb-3 shadow-inner group-hover:scale-110 transition-transform">
                  ${s.icon}
                </div>
                <div class="font-bold text-sm text-slate-900 group-hover:text-brand-600">${s.name}</div>
                <div class="text-[11px] text-slate-400 mt-1">${s.tag}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Service Request Form (Revealed when a service is picked) -->
        <div id="service-request-section" class="mt-12 bg-white/70 backdrop-blur-xl rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 hidden">
          <div class="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
            <div class="flex items-center gap-3">
              <div id="request-service-icon" class="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center text-xl font-bold">
                🔧
              </div>
              <div>
                <h3 class="text-lg font-bold text-slate-900 font-display">Configure Service Request</h3>
                <p class="text-xs text-slate-500">Provide task details so matching workers can review</p>
              </div>
            </div>
            <button type="button" id="btn-close-service-form" class="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <form id="form-service-request" class="space-y-5">
            <div class="grid md:grid-cols-2 gap-5">
              <div>
                <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Service Type
                </label>
                <input
                  type="text"
                  id="request-service-type"
                  readonly
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 font-semibold text-sm cursor-not-allowed"
                />
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Service Location
                </label>
                <div class="relative">
                  <i data-lucide="map-pin" class="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5"></i>
                  <input
                    type="text"
                    id="request-location"
                    required
                    value="${location}"
                    class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 text-slate-900 text-sm font-medium"
                  />
                </div>
              </div>
            </div>

            <div>
              <label for="request-description" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Description of the Issue / Job
              </label>
              <textarea
                id="request-description"
                rows="3"
                required
                placeholder="e.g., Water leakage in kitchen sink pipe, or split AC not cooling effectively..."
                class="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 text-slate-900 placeholder:text-slate-400 text-sm"
              ></textarea>
            </div>

            <div class="grid md:grid-cols-2 gap-5">
              <div>
                <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Preferred Date &amp; Time
                </label>
                <div class="relative">
                  <input
                    type="datetime-local"
                    id="request-datetime"
                    required
                    class="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 text-slate-900 text-sm font-medium"
                  />
                </div>
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Estimated Budget (₹)
                </label>
                <div class="relative flex items-center">
                  <span class="absolute left-3.5 text-slate-500 font-bold text-sm">₹</span>
                  <input
                    type="number"
                    id="request-budget"
                    required
                    min="200"
                    step="50"
                    value="500"
                    placeholder="500"
                    class="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 text-slate-900 text-sm font-medium"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              id="btn-find-workers"
              class="w-full py-3.5 px-4 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl shadow-md shadow-brand-500/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <i data-lucide="search" class="w-4 h-4"></i>
              <span>Find Workers</span>
            </button>
          </form>
        </div>

        <!-- MOCK WORKERS RESULTS SECTION -->
        <div id="workers-results-section" class="mt-12 hidden">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-xl font-bold font-display text-slate-900">Available Workers Nearby</h2>
              <p class="text-xs text-slate-500 mt-0.5">Matched based on your trade category and vicinity</p>
            </div>
            <span class="text-xs font-semibold text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
              Verified &amp; Available Today
            </span>
          </div>

          <div class="grid md:grid-cols-3 gap-6" id="workers-cards-list"></div>
        </div>
      </div>
    `;
  }

  // 9. WORKER EXTERNAL REDIRECT NOTICE (WITH AADHAAR BADGE, WORK PHOTOS & LOG OUT)
  function renderWorkerHandoffView() {
    const user = state.currentUser || {};
    const workerProfile = user.workerProfile || {
      service: 'AC Technician',
      experience: '1-3 years',
      area: 'Baner, Pune',
      radius: '10km',
      previousWork: 'Specialized in split AC copper piping, PCB repair, and domestic maintenance.',
      aadhaar: user.aadhaar || '5432 9876 1234'
    };
    const photos = (workerProfile && workerProfile.photos) || state.uploadedWorkPhotos;

    return `
      <div class="view-animate flex-grow flex items-center justify-center px-4 py-12">
        <div class="w-full max-w-2xl bg-white/70 backdrop-blur-xl rounded-2xl border border-slate-200 shadow-xl p-8 text-center relative overflow-hidden">
          <div class="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-tealAccent-500 to-brand-600"></div>

          <!-- Status badge -->
          <div class="w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-4 text-3xl shadow-inner">
            <i data-lucide="check-check" class="w-8 h-8"></i>
          </div>

          <div class="flex items-center justify-center gap-2 mb-2">
            <span class="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 inline-block">
              Worker Onboarding Completed
            </span>
            <span class="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 flex items-center gap-1">
              <i data-lucide="badge-check" class="w-3.5 h-3.5 text-blue-600"></i> Aadhaar UIDAI Verified
            </span>
          </div>

          <h1 class="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
            Routing to Worker Dashboard
          </h1>
          <p class="text-xs text-slate-500 mt-1">Your verified worker credentials and work portfolio are now active</p>

          <!-- Worker Specs Summary Card -->
          <div class="mt-6 p-5 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs space-y-3">
            <div class="font-bold text-slate-800 text-sm border-b border-slate-200 pb-2 flex items-center justify-between">
              <span>Registered Professional Specs</span>
              <span class="text-emerald-600 font-semibold flex items-center gap-1">
                ● Live in Dispatch Pool
              </span>
            </div>

            <div class="grid sm:grid-cols-2 gap-3 text-slate-600">
              <div>
                <span class="block text-[11px] text-slate-400">Worker Name</span>
                <strong class="text-slate-900 text-sm">${user.name || 'Worker'}</strong>
              </div>
              <div>
                <span class="block text-[11px] text-slate-400">Trade Category</span>
                <strong class="text-teal-700 text-sm">${workerProfile.service || 'AC Technician'}</strong>
              </div>
              <div>
                <span class="block text-[11px] text-slate-400">Experience Level</span>
                <strong class="text-slate-900">${workerProfile.experience || '1-3 years'}</strong>
              </div>
              <div>
                <span class="block text-[11px] text-slate-400">Preferred Work Radius</span>
                <strong class="text-slate-900">${workerProfile.radius || '10km'} (${workerProfile.area || 'Baner, Pune'})</strong>
              </div>
            </div>

            <!-- Previous Work Section -->
            <div class="pt-2 border-t border-slate-200">
              <span class="block text-[11px] text-slate-400 font-semibold uppercase">Previous Work Experience</span>
              <p class="text-xs text-slate-700 mt-0.5 leading-relaxed bg-white p-2.5 rounded-lg border border-slate-200">
                ${workerProfile.previousWork || 'Over 200+ completed repairs and maintenance tasks across residential hubs.'}
              </p>
            </div>

            <!-- Photos of Previous Work Preview -->
            <div class="pt-2 border-t border-slate-200">
              <span class="block text-[11px] text-slate-400 font-semibold uppercase mb-2">
                Attached Previous Work Photos (${photos.length} Verified Images)
              </span>
              <div class="grid grid-cols-3 gap-2">
                ${photos.map((p, idx) => `
                  <div class="aspect-video rounded-lg overflow-hidden border border-slate-200 bg-white">
                    <img src="${p}" alt="Work sample ${idx + 1}" class="w-full h-full object-cover" />
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Architecture handoff explanation -->
          <div class="mt-6 p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-900 text-left flex items-start gap-2.5">
            <i data-lucide="info" class="w-4 h-4 text-brand-600 mt-0.5 flex-shrink-0"></i>
            <div>
              <strong>Architecture Hand-off Notice:</strong>
              As designated in the project brief, worker dispatch, live job acceptances, SOS, and wallet systems are hosted in the partner Worker Dashboard application.
            </div>
          </div>

          <!-- Action buttons with LOG OUT -->
          <div class="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#/profile" class="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-semibold">
              View Profile
            </a>
            <button
              type="button"
              id="btn-worker-logout"
              class="px-5 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-sm border border-rose-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <i data-lucide="log-out" class="w-4 h-4"></i>
              <span>Log Out</span>
            </button>
            <a href="#/" class="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold shadow-sm">
              Return Home
            </a>
          </div>
        </div>
      </div>
    `;
  }

  // 10. PROFILE PAGE (WITH LOG OUT BUTTON & FULL DETAILS)
  function renderProfileView() {
    const user = state.currentUser;
    if (!user) {
      navigateTo('#/login');
      return '';
    }

    const isWorker = user.role === 'worker';

    return `
      <div class="view-animate max-w-3xl mx-auto px-4 sm:px-6 py-12 w-full flex-grow">
        <div class="bg-white/70 backdrop-blur-xl rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
          <div class="h-28 bg-gradient-to-r from-brand-600 to-tealAccent-500 relative"></div>

          <div class="px-6 sm:px-8 pb-8 pt-0 relative">
            <div class="flex flex-col sm:flex-row sm:items-end justify-between -mt-12 sm:-mt-14 mb-6 gap-4">
              <div class="flex items-end gap-4">
                <div class="w-24 h-24 rounded-2xl bg-white p-1 shadow-md border border-slate-200">
                  <div class="w-full h-full rounded-xl bg-slate-100 flex items-center justify-center font-display font-extrabold text-3xl text-brand-600">
                    ${(user.name || 'U').charAt(0).toUpperCase()}
                  </div>
                </div>
                <div>
                  <h1 class="text-2xl font-bold font-display text-slate-900">${user.name || 'User'}</h1>
                  <div class="flex items-center gap-2 mt-1">
                    <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      isWorker ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-brand-700'
                    }">
                      ${isWorker ? '🛠️ Service Worker' : '👤 Customer'}
                    </span>
                    <span class="text-xs text-slate-400">ID: KS-${user.mobile ? user.mobile.slice(-4) : '9982'}</span>
                  </div>
                </div>
              </div>

              <!-- Switch Role Button -->
              <a
                href="#/role-selection"
                class="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors self-start sm:self-auto cursor-pointer"
              >
                <i data-lucide="refresh-cw" class="w-3.5 h-3.5 text-brand-600"></i>
                <span>Switch Role</span>
              </a>
            </div>

            <!-- Details List -->
            <div class="grid sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <span class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">Mobile Phone</span>
                <span class="text-sm font-semibold text-slate-800 flex items-center gap-2">
                  <i data-lucide="phone" class="w-4 h-4 text-slate-400"></i>
                  +91 ${user.mobile || '98765 43210'}
                </span>
              </div>

              <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <span class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">Email Address</span>
                <span class="text-sm font-semibold text-slate-800 flex items-center gap-2">
                  <i data-lucide="mail" class="w-4 h-4 text-slate-400"></i>
                  ${user.email || 'user@LocalFix.in'}
                </span>
              </div>

              <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <span class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">Aadhaar Status</span>
                <span class="text-sm font-semibold text-emerald-700 flex items-center gap-2">
                  <i data-lucide="badge-check" class="w-4 h-4 text-emerald-600"></i>
                  ${user.aadhaar || '5432 9876 1234'} (Verified)
                </span>
              </div>

              <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <span class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">Location Hub</span>
                <span class="text-sm font-semibold text-slate-800 flex items-center gap-2">
                  <i data-lucide="map-pin" class="w-4 h-4 text-slate-400"></i>
                  ${user.location || (user.workerProfile && user.workerProfile.area) || 'Baner, Pune'}
                </span>
              </div>
            </div>

            <!-- Worker Profile Snippet -->
            ${isWorker && user.workerProfile ? `
              <div class="mt-6 p-4 rounded-xl bg-teal-50/60 border border-teal-200">
                <div class="font-bold text-xs text-teal-800 uppercase tracking-wider mb-2">Worker Skill &amp; Portfolio Specs</div>
                <div class="grid grid-cols-3 gap-2 text-xs mb-3">
                  <div>
                    <span class="text-slate-500 block">Service</span>
                    <strong class="text-slate-800">${user.workerProfile.service}</strong>
                  </div>
                  <div>
                    <span class="text-slate-500 block">Experience</span>
                    <strong class="text-slate-800">${user.workerProfile.experience}</strong>
                  </div>
                  <div>
                    <span class="text-slate-500 block">Work Radius</span>
                    <strong class="text-slate-800">${user.workerProfile.radius}</strong>
                  </div>
                </div>
                ${user.workerProfile.previousWork ? `
                  <div class="text-xs text-slate-700 border-t border-teal-200 pt-2">
                    <span class="text-slate-500 block font-semibold mb-0.5">Previous Work:</span>
                    ${user.workerProfile.previousWork}
                  </div>
                ` : ''}
              </div>
            ` : ''}

            <!-- Action Buttons with LOG OUT -->
            <div class="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div class="text-xs text-slate-400">
                Member of LocalFix Verified Network
              </div>
              <button
                type="button"
                id="btn-profile-logout"
                class="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs border border-rose-200 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow"
              >
                <i data-lucide="log-out" class="w-4 h-4"></i>
                <span>Log Out of LocalFix</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // --- CONTROLLER / EVENT BINDINGS ---
  function attachViewEvents(route) {
    // 1. LOGIN: STEP 1 = Role, STEP 2 = Phone -> OTP -> Profile
    if (route === 'login') {
      const step1 = document.getElementById('login-step-1');
      const step2 = document.getElementById('login-step-2');
      const roleButtons = document.querySelectorAll('.login-role-btn');
      const roleHidden = document.getElementById('login-role-hidden');
      const roleBadge = document.getElementById('login-role-badge');
      const roleLabel = document.getElementById('login-role-label');
      const changeRoleBtn = document.getElementById('btn-login-change-role');
      const form = document.getElementById('form-login');

      // Role selection buttons -> go to step 2
      roleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          const role = btn.getAttribute('data-role');
          if (roleHidden) roleHidden.value = role;

          // Update badge in step 2
          if (roleBadge) roleBadge.textContent = role === 'customer' ? '👤' : '🛠️';
          if (roleLabel) roleLabel.textContent = role === 'customer' ? 'Customer' : 'Worker';

          // Highlight selected role button
          roleButtons.forEach(b => {
            b.classList.remove('border-brand-500', 'bg-brand-50/50', 'border-tealAccent-500', 'bg-teal-50/50');
            b.classList.add('border-slate-200');
          });
          if (role === 'customer') {
            btn.classList.add('border-brand-500', 'bg-brand-50/50');
          } else {
            btn.classList.add('border-tealAccent-500', 'bg-teal-50/50');
          }

          // Transition to step 2
          if (step1) step1.classList.add('hidden');
          if (step2) {
            step2.classList.remove('hidden');
            const mobileInput = document.getElementById('login-mobile');
            if (mobileInput) setTimeout(() => mobileInput.focus(), 50);
          }
        });
      });

      // Change role button -> back to step 1
      if (changeRoleBtn) {
        changeRoleBtn.addEventListener('click', () => {
          if (step2) step2.classList.add('hidden');
          if (step1) step1.classList.remove('hidden');
        });
      }

      // Phone form submit -> send OTP
      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const mobileInput = document.getElementById('login-mobile');
          const mobile = mobileInput ? mobileInput.value.trim() : '';
          const role = roleHidden ? roleHidden.value : 'customer';

          if (mobile.length !== 10) {
            showToast('Please enter a valid 10-digit mobile number', 'error');
            return;
          }

          if (!role) {
            showToast('Please select Customer or Worker first', 'error');
            return;
          }

          state.savePendingAuth({
            mobile,
            role,
            name: 'User',
            email: '',
            aadhaar: '',
            loginFlow: true
          });

          state.saveOtpState(mobile, '123456');
          showToast('OTP sent to +91 ' + mobile, 'info');
          navigateTo('#/verify-otp');
        });
      }
    }

    // 2. SIGNUP (WITH AADHAAR VERIFICATION)
    if (route === 'signup') {
      const form = document.getElementById('form-signup');
      const togglePwd = document.getElementById('toggle-pwd-btn');
      const pwdInput = document.getElementById('signup-password');
      const aadhaarInput = document.getElementById('signup-aadhaar');
      const aadhaarBadge = document.getElementById('aadhaar-badge');

      // Auto-format Aadhaar with spaces
      if (aadhaarInput) {
        aadhaarInput.addEventListener('input', (e) => {
          let val = e.target.value.replace(/[^0-9]/g, '');
          if (val.length > 12) val = val.slice(0, 12);
          // format: XXXX XXXX XXXX
          let parts = [];
          for (let i = 0; i < val.length; i += 4) {
            parts.push(val.slice(i, i + 4));
          }
          e.target.value = parts.join(' ');

          if (val.length === 12) {
            if (aadhaarBadge) aadhaarBadge.classList.remove('hidden');
            safeCreateIcons();
          } else {
            if (aadhaarBadge) aadhaarBadge.classList.add('hidden');
          }
        });
      }

      if (togglePwd && pwdInput) {
        togglePwd.addEventListener('click', () => {
          pwdInput.type = pwdInput.type === 'password' ? 'text' : 'password';
        });
      }

      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const nameInput = document.getElementById('signup-name');
          const mobileInput = document.getElementById('signup-mobile');
          const emailInput = document.getElementById('signup-email');
          const passwordInput = document.getElementById('signup-password');
          const roleRadio = form.querySelector('input[name="signup_role"]:checked');

          const name = nameInput ? nameInput.value.trim() : 'User';
          const mobile = mobileInput ? mobileInput.value.trim() : '';
          const email = emailInput ? emailInput.value.trim() : '';
          const password = passwordInput ? passwordInput.value : '';
          const aadhaar = aadhaarInput ? aadhaarInput.value.trim() : '5432 9876 1234';
          const role = roleRadio ? roleRadio.value : 'customer';

          if (mobile.length !== 10) {
            showToast('Mobile number must be exactly 10 digits', 'error');
            return;
          }

          if (password.length < 6) {
            showToast('Password must be at least 6 characters', 'error');
            return;
          }

          const rawAadhaar = aadhaar.replace(/[^0-9]/g, '');
          if (rawAadhaar.length < 12) {
            showToast('Please enter a valid 12-digit Aadhaar number', 'error');
            return;
          }

          state.savePendingAuth({ name, mobile, email, password, aadhaar, role });
          state.saveOtpState(mobile, '123456');
          showToast('Aadhaar verified! OTP sent to +91 ' + mobile, 'info');
          navigateTo('#/verify-otp');
        });
      }
    }

    // 3. OTP VERIFICATION (LOGS USER IN DIRECTLY BASED ON ROLE)
    if (route === 'verify-otp') {
      const otpInputs = document.querySelectorAll('.otp-input');
      const form = document.getElementById('form-otp');
      const resendBtn = document.getElementById('btn-resend-otp');
      const timerDisplay = document.getElementById('otp-timer-display');

      otpInputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
          const val = e.target.value.replace(/[^0-9]/g, '');
          e.target.value = val ? val[0] : '';
          if (val && index < otpInputs.length - 1) {
            otpInputs[index + 1].focus();
          }
        });

        input.addEventListener('keydown', (e) => {
          if (e.key === 'Backspace' && !input.value && index > 0) {
            otpInputs[index - 1].focus();
          }
        });

        input.addEventListener('paste', (e) => {
          e.preventDefault();
          const pasted = (e.clipboardData || window.clipboardData).getData('text').trim();
          const digits = pasted.replace(/[^0-9]/g, '').slice(0, 6);
          digits.split('').forEach((digit, i) => {
            if (otpInputs[i]) otpInputs[i].value = digit;
          });
          if (digits.length >= 6) {
            otpInputs[5].focus();
          }
        });
      });

      clearInterval(state.otpTimer);
      state.otpSecondsLeft = 30;
      state.otpTimer = setInterval(() => {
        state.otpSecondsLeft -= 1;
        if (state.otpSecondsLeft <= 0) {
          clearInterval(state.otpTimer);
          if (timerDisplay) timerDisplay.innerHTML = '<span class="text-slate-600">Didn\'t receive code?</span>';
          if (resendBtn) resendBtn.disabled = false;
        } else {
          const sec = state.otpSecondsLeft < 10 ? '0' + state.otpSecondsLeft : state.otpSecondsLeft;
          if (timerDisplay) {
            timerDisplay.innerHTML = 'Resend code in <strong class="text-slate-700">00:' + sec + '</strong>';
          }
        }
      }, 1000);

      if (resendBtn) {
        resendBtn.addEventListener('click', () => {
          showToast('New OTP sent: 123456', 'info');
          resendBtn.disabled = true;
          state.otpSecondsLeft = 30;
          otpInputs.forEach(i => i.value = '');
          otpInputs[0].focus();
        });
      }

      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const enteredOtp = Array.from(otpInputs).map(i => i.value).join('');
          if (enteredOtp.length < 6) {
            showToast('Please enter all 6 digits of the OTP', 'error');
            return;
          }

          const pending = state.pendingAuth || { name: 'User', mobile: '9876543210' };
          const user = Object.assign({}, pending, {
            isLoggedIn: true,
            verifiedAt: Date.now()
          });

          state.saveUser(user);
          state.savePendingAuth(null);
          showToast('OTP verified successfully!', 'success');

          // If this was a login flow (not signup), go directly to profile
          if (pending.loginFlow) {
            if (user.role === 'worker') {
              navigateTo('#/worker');
            } else {
              navigateTo('#/customer');
            }
          } else if (user.role === 'worker') {
            // Signup flow for worker
            if (user.workerProfile) {
              navigateTo('#/worker');
            } else {
              navigateTo('#/worker-onboarding');
            }
          } else if (user.role === 'customer') {
            // Signup flow for customer
            if (user.location) {
              navigateTo('#/customer');
            } else {
              navigateTo('#/customer-setup');
            }
          } else {
            navigateTo('#/role-selection');
          }
        });
      }
    }

    // 4. ROLE SELECTION
    if (route === 'role-selection') {
      const btnCust = document.getElementById('btn-select-customer');
      const cardCust = document.getElementById('card-customer');
      const btnWorker = document.getElementById('btn-select-worker');
      const cardWorker = document.getElementById('card-worker');

      const selectRole = (role) => {
        const user = state.currentUser || { name: 'User', mobile: '9876543210', isLoggedIn: true };
        user.role = role;
        state.saveUser(user);

        if (role === 'customer') {
          showToast('Role switched to Customer', 'success');
          navigateTo('#/customer-setup');
        } else {
          showToast('Role switched to Service Worker', 'success');
          navigateTo('#/worker-onboarding');
        }
      };

      if (btnCust) btnCust.addEventListener('click', (e) => { e.stopPropagation(); selectRole('customer'); });
      if (cardCust) cardCust.addEventListener('click', () => selectRole('customer'));
      if (btnWorker) btnWorker.addEventListener('click', (e) => { e.stopPropagation(); selectRole('worker'); });
      if (cardWorker) cardWorker.addEventListener('click', () => selectRole('worker'));
    }

    // 5. WORKER ONBOARDING (SERVICE TYPE, RADIUS, PREVIOUS WORK, PHOTO UPLOADS)
    if (route === 'worker-onboarding') {
      const form = document.getElementById('form-worker-onboarding');
      const headshotInput = document.getElementById('worker-photo-input');
      const headshotPreview = document.getElementById('photo-preview');
      const workPhotosInput = document.getElementById('worker-work-photos-input');
      const gallery = document.getElementById('work-photos-gallery');
      const countBadge = document.getElementById('photo-count-badge');

      // Headshot preview
      if (headshotInput && headshotPreview) {
        headshotInput.addEventListener('change', (e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
              headshotPreview.innerHTML = '<img src="' + event.target.result + '" class="w-full h-full object-cover" />';
            };
            reader.readAsDataURL(file);
          }
        });
      }

      // Work Portfolio Photos upload handler
      if (workPhotosInput && gallery) {
        workPhotosInput.addEventListener('change', (e) => {
          const files = Array.from(e.target.files);
          files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (ev) => {
              state.uploadedWorkPhotos.push(ev.target.result);
              refreshGallery();
              showToast('Work photo added to portfolio!', 'success');
            };
            reader.readAsDataURL(file);
          });
        });

        // Function to refresh work photos gallery
        function refreshGallery() {
          if (!gallery) return;
          if (countBadge) countBadge.textContent = state.uploadedWorkPhotos.length;
          gallery.innerHTML = state.uploadedWorkPhotos.map((url, idx) => `
            <div class="relative group rounded-xl overflow-hidden border border-slate-200 bg-white aspect-video shadow-sm">
              <img src="${url}" alt="Work Sample ${idx + 1}" class="w-full h-full object-cover" />
              <button type="button" class="btn-remove-photo absolute top-1 right-1 w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs opacity-80 hover:opacity-100 shadow transition-opacity cursor-pointer" data-idx="${idx}" title="Remove photo">
                ✕
              </button>
              <span class="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/60 text-white text-[9px] font-medium">Sample #${idx + 1}</span>
            </div>
          `).join('');

          // Re-bind delete buttons
          gallery.querySelectorAll('.btn-remove-photo').forEach(btn => {
            btn.addEventListener('click', (e) => {
              e.stopPropagation();
              const removeIdx = parseInt(btn.getAttribute('data-idx'), 10);
              state.uploadedWorkPhotos.splice(removeIdx, 1);
              refreshGallery();
              showToast('Photo removed', 'info');
            });
          });
        }

        // Initial gallery binding for remove buttons
        gallery.querySelectorAll('.btn-remove-photo').forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const removeIdx = parseInt(btn.getAttribute('data-idx'), 10);
            state.uploadedWorkPhotos.splice(removeIdx, 1);
            refreshGallery();
            showToast('Photo removed', 'info');
          });
        });
      }

      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const user = state.currentUser || { name: 'Worker', mobile: '9876543210', isLoggedIn: true };
          const nameInput = document.getElementById('worker-name');
          const serviceInput = document.getElementById('worker-service');
          const areaInput = document.getElementById('worker-area');
          const prevWorkInput = document.getElementById('worker-previous-work');
          const aadhaarInput = document.getElementById('worker-aadhaar');

          const name = nameInput ? nameInput.value.trim() : 'Worker';
          const service = serviceInput ? serviceInput.value : '';
          const expRadio = form.querySelector('input[name="experience"]:checked');
          const experience = expRadio ? expRadio.value : '1-3 years';
          const radRadio = form.querySelector('input[name="radius"]:checked');
          const radius = radRadio ? radRadio.value : '10km';
          const area = areaInput ? areaInput.value.trim() : 'Baner, Pune';
          const previousWork = prevWorkInput ? prevWorkInput.value.trim() : '';
          const aadhaar = aadhaarInput ? aadhaarInput.value.trim() : '5432 9876 1234';

          if (!service) {
            showToast('Please select your trade / service type', 'error');
            return;
          }

          user.name = name;
          user.role = 'worker';
          user.aadhaar = aadhaar;
          user.workerProfile = {
            service,
            experience,
            radius,
            area,
            previousWork,
            photos: [...state.uploadedWorkPhotos],
            completedAt: Date.now()
          };

          state.saveUser(user);
          showToast('Worker profile & work portfolio created successfully!', 'success');
          navigateTo('#/worker');
        });
      }
    }

    // 6. CUSTOMER SETUP
    if (route === 'customer-setup') {
      const form = document.getElementById('form-customer-setup');
      const pills = document.querySelectorAll('.btn-location-pill');
      const locInput = document.getElementById('cust-location');

      pills.forEach(pill => {
        pill.addEventListener('click', () => {
          if (locInput) locInput.value = pill.textContent.trim();
        });
      });

      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const user = state.currentUser || { name: 'Customer', mobile: '9876543210', isLoggedIn: true };
          user.location = (locInput && locInput.value.trim()) || 'Baner, Pune';
          user.role = 'customer';
          state.saveUser(user);
          showToast('Location saved!', 'success');
          navigateTo('#/customer');
        });
      }
    }

    // 7. CUSTOMER DASHBOARD
    if (route === 'customer') {
      const customerLogoutBtn = document.getElementById('btn-customer-logout');
      if (customerLogoutBtn) {
        customerLogoutBtn.addEventListener('click', () => state.logout());
      }

      const serviceCards = document.querySelectorAll('.service-card');
      const searchInput = document.getElementById('customer-service-search');
      const requestSection = document.getElementById('service-request-section');
      const reqServiceType = document.getElementById('request-service-type');
      const reqIcon = document.getElementById('request-service-icon');
      const closeFormBtn = document.getElementById('btn-close-service-form');
      const reqForm = document.getElementById('form-service-request');
      const reqDateTime = document.getElementById('request-datetime');
      const workersSection = document.getElementById('workers-results-section');
      const workersList = document.getElementById('workers-cards-list');

      if (reqDateTime) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(10, 0, 0, 0);
        reqDateTime.value = tomorrow.toISOString().slice(0, 16);
      }

      const selectCategory = (categoryName) => {
        state.activeService = categoryName;
        if (reqServiceType) reqServiceType.value = categoryName;

        const iconMap = {
          'AC Repair': '🔧',
          'Plumbing': '🚰',
          'Electrical': '⚡',
          'Cleaning': '🧹',
          'Carpenter': '🔨',
          'Other': '📦'
        };
        if (reqIcon) reqIcon.textContent = iconMap[categoryName] || '🛠️';

        if (requestSection) {
          requestSection.classList.remove('hidden');
          requestSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      };

      serviceCards.forEach(card => {
        card.addEventListener('click', () => {
          const service = card.getAttribute('data-service');
          selectCategory(service);
        });
      });

      if (closeFormBtn) {
        closeFormBtn.addEventListener('click', () => {
          if (requestSection) requestSection.classList.add('hidden');
        });
      }

      if (searchInput) {
        searchInput.addEventListener('input', (e) => {
          const query = e.target.value.toLowerCase().trim();
          serviceCards.forEach(card => {
            const name = (card.getAttribute('data-service') || '').toLowerCase();
            const text = card.textContent.toLowerCase();
            if (name.includes(query) || text.includes(query)) {
              card.style.display = 'flex';
            } else {
              card.style.display = 'none';
            }
          });
        });
      }

      if (reqForm) {
        reqForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const service = (reqServiceType && reqServiceType.value) || 'AC Repair';

          showToast('Finding best-rated workers nearby...', 'info');

          let matchedWorkers = MOCK_WORKERS.filter(w => w.category === service);
          if (matchedWorkers.length === 0) {
            matchedWorkers = MOCK_WORKERS.slice(0, 3);
          }

          if (workersList) {
            workersList.innerHTML = matchedWorkers.map(w => `
              <div class="bg-white/70 backdrop-blur-xl rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
                <div>
                  <div class="flex items-start gap-3.5 mb-4">
                    <img src="${w.image}" alt="${w.name}" class="w-14 h-14 rounded-xl object-cover border border-slate-200 shadow-sm" />
                    <div>
                      <div class="flex items-center gap-1.5">
                        <h4 class="font-bold text-slate-900 text-base group-hover:text-brand-600 transition-colors">${w.name}</h4>
                        <i data-lucide="badge-check" class="w-4 h-4 text-brand-600"></i>
                      </div>
                      <div class="text-xs text-slate-500 font-medium">${w.title}</div>
                      <div class="flex items-center gap-2 mt-1 text-xs">
                        <span class="flex items-center text-amber-500 font-bold">
                          ★ ${w.rating}
                        </span>
                        <span class="text-slate-300">|</span>
                        <span class="text-slate-500 font-medium">${w.jobsCompleted} Jobs Completed</span>
                      </div>
                    </div>
                  </div>

                  <div class="bg-slate-50 rounded-xl p-3 text-xs space-y-1.5 border border-slate-100">
                    <div class="flex items-center justify-between text-slate-600">
                      <span class="flex items-center gap-1"><i data-lucide="navigation" class="w-3.5 h-3.5 text-slate-400"></i> Distance</span>
                      <strong class="text-slate-800">${w.distance}</strong>
                    </div>
                    <div class="flex items-center justify-between text-slate-600">
                      <span class="flex items-center gap-1"><i data-lucide="tag" class="w-3.5 h-3.5 text-slate-400"></i> Estimated</span>
                      <strong class="text-emerald-700 font-bold text-sm">${w.estimatedPrice}</strong>
                    </div>
                  </div>
                </div>

                <div class="mt-5 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    class="btn-request-worker w-full py-2.5 px-4 bg-brand-600 hover:bg-brand-700 active:scale-[0.99] text-white font-semibold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    data-worker-name="${w.name}"
                  >
                    <i data-lucide="send" class="w-3.5 h-3.5"></i>
                    <span>Request Worker</span>
                  </button>
                </div>
              </div>
            `).join('');

            const requestBtns = workersList.querySelectorAll('.btn-request-worker');
            requestBtns.forEach(btn => {
              btn.addEventListener('click', () => {
                const workerName = btn.getAttribute('data-worker-name');
                btn.disabled = true;
                btn.innerHTML = '<i data-lucide="check" class="w-3.5 h-3.5"></i> Requested!';
                btn.className = "w-full py-2.5 px-4 bg-emerald-600 text-white font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-not-allowed";
                showToast('Request sent to ' + workerName + '! They will call you within 10 minutes.', 'success');
                safeCreateIcons();
              });
            });
          }

          if (workersSection) {
            workersSection.classList.remove('hidden');
            workersSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }

          safeCreateIcons();
        });
      }
    }

    // 8. WORKER HANDOFF LOGOUT
    if (route === 'worker' || route === 'worker/') {
      const workerLogoutBtn = document.getElementById('btn-worker-logout');
      if (workerLogoutBtn) {
        workerLogoutBtn.addEventListener('click', () => state.logout());
      }
    }

    // 9. PROFILE LOGOUT
    if (route === 'profile') {
      const logoutBtn = document.getElementById('btn-profile-logout');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', () => state.logout());
      }
    }
  }

  // --- ROUTE DISPATCHER ---
  function router() {
    const rawRoute = getRoute();
    const appContainer = document.getElementById('app');
    if (!appContainer) return;

    renderNav();

    let html = '';
    let currentActiveRoute = rawRoute;

    switch (rawRoute) {
      case '':
      case '/':
        html = renderLandingView();
        break;

      case 'login':
        html = renderLoginView();
        break;

      case 'signup':
        html = renderSignupView();
        break;

      case 'verify-otp':
        html = renderVerifyOtpView();
        break;

      case 'role-selection':
        if (!state.isAuthenticated()) {
          state.saveUser({ name: 'Demo User', mobile: '9876543210', isLoggedIn: true, role: 'customer' });
        }
        html = renderRoleSelectionView();
        break;

      case 'worker-onboarding':
        if (!state.isAuthenticated()) {
          state.saveUser({ name: 'Service Worker', mobile: '9876543210', isLoggedIn: true, role: 'worker', aadhaar: '5432 9876 1234' });
        }
        html = renderWorkerOnboardingView();
        break;

      case 'customer-setup':
        if (!state.isAuthenticated()) {
          state.saveUser({ name: 'Customer Partner', mobile: '9876543210', isLoggedIn: true, role: 'customer' });
        }
        html = renderCustomerSetupView();
        break;

      case 'customer':
        if (!state.isAuthenticated()) {
          state.saveUser({ name: 'Customer Demo', mobile: '9876543210', isLoggedIn: true, role: 'customer', location: 'Baner, Pune' });
        }
        window.location.href = '/customer/index.html';
        return;

      case 'worker':
      case 'worker/':
        if (!state.isAuthenticated()) {
          state.saveUser({ name: 'Service Partner', mobile: '9876543210', isLoggedIn: true, role: 'worker', aadhaar: '5432 9876 1234' });
        }
        window.location.href = '/worker/index.html';
        return;

      case 'profile':
        if (!state.isAuthenticated()) {
          navigateTo('#/login');
          return;
        }
        html = renderProfileView();
        break;

      case 'logout':
        state.logout();
        return;

      default:
        html = renderLandingView();
        break;
    }

    appContainer.innerHTML = html;
    safeCreateIcons();
    window.scrollTo({ top: 0, behavior: 'instant' });
    attachViewEvents(currentActiveRoute);
  }

  // --- IMMEDIATE AND EVENT INITIALIZATION ---
  window.addEventListener('hashchange', router);
  window.addEventListener('popstate', router);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', router);
  } else {
    router();
  }

  setTimeout(router, 10);
  setTimeout(router, 100);
})();
