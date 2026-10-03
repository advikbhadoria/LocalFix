/**
 * Notification Service - Handles User Alerts, Reminders, and Read Status
 */

import { appState } from '../state.js';

export const notificationService = {
  async getNotifications() {
    const state = appState.getState();
    return state.notifications;
  },

  async markAsRead(id) {
    appState.markNotificationAsRead(id);
  },

  async markAllRead() {
    appState.markAllNotificationsRead();
  },

  async pushAlert(title, message, type = 'info', icon = 'bell') {
    appState.addNotification({ title, message, type, icon });
  }
};
