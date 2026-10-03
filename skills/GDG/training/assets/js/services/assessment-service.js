/**
 * Assessment Service - Handles Mentor Skill Assessments, Criteria Rubrics, and Verified Credentials
 * Structured for future FastAPI /api/v1/assessments backend integration
 */

import { appState } from '../state.js';

export const assessmentService = {
  async getAssessments() {
    const state = appState.getState();
    return state.assessments;
  },

  async getVerifiedBadges() {
    const state = appState.getState();
    return state.verifiedBadges;
  },

  async submitAssessment(data) {
    return appState.submitMentorAssessment(data);
  },

  async verifySkillDirectly(skillName, category, assessorName) {
    return appState.instantVerifySkill(skillName, category, assessorName);
  }
};
