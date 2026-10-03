/**
 * Learning Service - Handles Course Library, Video Lessons, Practical Checklists, and Quizzes
 * Structured for future FastAPI /api/v1/courses backend integration
 */

import { appState } from '../state.js';

export const learningService = {
  async getCourses(filters = {}) {
    const state = appState.getState();
    let courses = [...state.courses];

    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      courses = courses.filter(c => 
        c.title.toLowerCase().includes(q) || 
        c.category.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
      );
    }

    if (filters.category && filters.category !== 'all') {
      courses = courses.filter(c => c.category.toLowerCase().includes(filters.category.toLowerCase()));
    }

    if (filters.difficulty && filters.difficulty !== 'all') {
      courses = courses.filter(c => c.difficulty.toLowerCase() === filters.difficulty.toLowerCase());
    }

    return courses;
  },

  async getCourseById(courseId) {
    const state = appState.getState();
    return state.courses.find(c => c.id === courseId) || null;
  },

  async markLessonCompleted(courseId, lessonId) {
    return appState.completeLesson(courseId, lessonId);
  },

  async toggleChecklist(courseId, checklistId) {
    return appState.toggleChecklistItem(courseId, checklistId);
  }
};
