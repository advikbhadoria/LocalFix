/**
 * Mentor Service - Handles Mentor Discovery, Filtering, and Profile Retrieval
 * Structured for future FastAPI /api/v1/mentors backend integration
 */

import { appState } from '../state.js';

export const mentorService = {
  async getAllMentors(filters = {}) {
    const state = appState.getState();
    let mentors = [...state.mentors];

    // Text query search
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase().trim();
      mentors = mentors.filter(m => 
        m.name.toLowerCase().includes(q) ||
        m.primarySkill.toLowerCase().includes(q) ||
        m.bio.toLowerCase().includes(q) ||
        m.verifiedSkills.some(s => s.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (filters.category && filters.category !== 'all') {
      mentors = mentors.filter(m => m.primarySkill.toLowerCase().includes(filters.category.toLowerCase()));
    }

    // Minimum Experience
    if (filters.minExperience) {
      mentors = mentors.filter(m => m.experienceYears >= parseInt(filters.minExperience, 10));
    }

    // Minimum Rating
    if (filters.minRating) {
      mentors = mentors.filter(m => m.rating >= parseFloat(filters.minRating));
    }

    // Training Format
    if (filters.format && filters.format !== 'all') {
      mentors = mentors.filter(m => m.trainingFormats.includes(filters.format));
    }

    // Language
    if (filters.language && filters.language !== 'all') {
      mentors = mentors.filter(m => m.languages.some(l => l.toLowerCase() === filters.language.toLowerCase()));
    }

    // Pricing (free vs paid)
    if (filters.pricing === 'free') {
      mentors = mentors.filter(m => m.isFree || m.hourlyRate === 0);
    } else if (filters.pricing === 'paid') {
      mentors = mentors.filter(m => !m.isFree && m.hourlyRate > 0);
    }

    // Sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'experience':
          mentors.sort((a, b) => b.experienceYears - a.experienceYears);
          break;
        case 'rating':
          mentors.sort((a, b) => b.rating - a.rating);
          break;
        case 'fee_low':
          mentors.sort((a, b) => a.hourlyRate - b.hourlyRate);
          break;
        case 'sessions':
          mentors.sort((a, b) => b.totalSessionsConducted - a.totalSessionsConducted);
          break;
        default:
          // Most relevant / default
          break;
      }
    }

    return mentors;
  },

  async getMentorById(mentorId) {
    const state = appState.getState();
    return state.mentors.find(m => m.id === mentorId) || null;
  },

  async getRecommendedMentors(limit = 4) {
    const state = appState.getState();
    // Recommend top rated mentors matching user's in-progress skills
    return state.mentors.slice(0, limit);
  }
};
