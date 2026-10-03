/**
 * Booking Service - Handles Session Reservations, Rescheduling, and Cancellation
 * Structured for future FastAPI /api/v1/bookings backend integration
 */

import { appState } from '../state.js';

export const bookingService = {
  async getMySessions(statusFilter = 'all') {
    const state = appState.getState();
    if (statusFilter === 'all') {
      return state.trainingSessions;
    }
    return state.trainingSessions.filter(s => s.status === statusFilter);
  },

  async getSessionById(sessionId) {
    const state = appState.getState();
    return state.trainingSessions.find(s => s.id === sessionId) || null;
  },

  async bookSession(bookingData) {
    return appState.bookTrainingSession(bookingData);
  },

  async rescheduleSession(sessionId, newDate, newTime) {
    return appState.rescheduleSession(sessionId, newDate, newTime);
  },

  async cancelSession(sessionId, reason) {
    return appState.cancelSession(sessionId, reason);
  }
};
