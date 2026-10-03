/**
 * SkillConnect Application Bootstrap
 */

import { router } from './router.js';
import { appState } from './state.js';
import { demoControls } from './components/demo-controls.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons on start
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Render floating demo controls dock
  demoControls.render();

  // Initial Route Dispatch
  router.handleRoute();

  // Subscribe to state changes for live reactive UI updates
  appState.subscribe((state, changeType) => {
    // Re-render current page
    router.handleRoute();
    demoControls.render();
  });
});
