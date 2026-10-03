/**
 * SkillConnect Central Reactive State Manager
 * Handles local state persistence, demo mutations, and subscriber broadcasts
 */

import { INITIAL_MOCK_DATA } from './mock-data.js';

const STORAGE_KEY = 'SKILLCONNECT_APP_STATE_V1';

class StateManager {
  constructor() {
    this.subscribers = new Set();
    this.state = this.loadState();
  }

  loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not read state from localStorage, using initial mock data', e);
    }
    return JSON.parse(JSON.stringify(INITIAL_MOCK_DATA));
  }

  saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn('Could not save state to localStorage', e);
    }
  }

  getState() {
    return this.state;
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  notify(changeType = 'GENERAL') {
    this.saveState();
    this.subscribers.forEach(cb => {
      try {
        cb(this.state, changeType);
      } catch (err) {
        console.error('Subscriber notification error:', err);
      }
    });
  }

  // ==========================================
  // Role & Worker Status Actions
  // ==========================================
  setRole(role) {
    this.state.currentRole = role; // 'learner' or 'mentor'
    this.notify('ROLE_CHANGED');
  }

  getRole() {
    return this.state.currentRole || 'learner';
  }

  toggleDutyStatus() {
    const nextStatus = {
      online: 'busy',
      busy: 'offline',
      offline: 'online'
    };
    this.state.currentUser.dutyStatus = nextStatus[this.state.currentUser.dutyStatus] || 'online';
    this.notify('DUTY_STATUS_CHANGED');
    return this.state.currentUser.dutyStatus;
  }

  // ==========================================
  // Training Session Bookings
  // ==========================================
  bookTrainingSession(bookingData) {
    const newSession = {
      id: `ses_${Date.now()}`,
      mentorId: bookingData.mentorId,
      mentorName: bookingData.mentorName,
      mentorAvatar: bookingData.mentorAvatar,
      skill: bookingData.skill,
      category: bookingData.category || "General",
      dateTime: `${bookingData.date} at ${bookingData.time}`,
      isoDate: new Date().toISOString(),
      duration: bookingData.duration || "60 mins",
      format: bookingData.format,
      status: "upcoming",
      meetingUrl: bookingData.format === "online" ? `https://meet.skillconnect.pro/room-${Date.now()}` : "",
      location: bookingData.format === "in-person" ? "Pro Training Center • Bay 3" : "Virtual Classroom (HD Video + Screen Share)",
      requiredTools: bookingData.requiredTools || ["Standard Toolset", "Safety Glasses"],
      notes: bookingData.notes || "Standard 1-on-1 practical mentorship session."
    };

    this.state.trainingSessions.unshift(newSession);
    this.state.currentUser.stats.upcomingSessions += 1;

    // Add notification
    this.addNotification({
      title: "Training Session Confirmed!",
      message: `Your ${bookingData.format} session for '${bookingData.skill}' with ${bookingData.mentorName} is scheduled.`,
      type: "session",
      icon: "calendar-check"
    });

    this.notify('SESSION_BOOKED');
    return newSession;
  }

  rescheduleSession(sessionId, newDate, newTime) {
    const session = this.state.trainingSessions.find(s => s.id === sessionId);
    if (session) {
      session.dateTime = `${newDate} at ${newTime}`;
      this.addNotification({
        title: "Session Rescheduled",
        message: `Your session with ${session.mentorName} was moved to ${session.dateTime}.`,
        type: "session",
        icon: "calendar"
      });
      this.notify('SESSION_RESCHEDULED');
      return true;
    }
    return false;
  }

  cancelSession(sessionId, reason = "Learner requested cancellation") {
    const session = this.state.trainingSessions.find(s => s.id === sessionId);
    if (session) {
      session.status = "cancelled";
      session.cancelReason = reason;
      this.state.currentUser.stats.upcomingSessions = Math.max(0, this.state.currentUser.stats.upcomingSessions - 1);
      
      this.addNotification({
        title: "Session Cancelled",
        message: `Your session for '${session.skill}' with ${session.mentorName} has been cancelled.`,
        type: "session",
        icon: "x-circle"
      });

      this.notify('SESSION_CANCELLED');
      return true;
    }
    return false;
  }

  // ==========================================
  // Learning & Checklist Progress
  // ==========================================
  completeLesson(courseId, lessonId) {
    const course = this.state.courses.find(c => c.id === courseId);
    if (!course) return false;

    const lesson = course.lessons.find(l => l.id === lessonId);
    if (lesson && !lesson.completed) {
      lesson.completed = true;
      course.completedLessons = course.lessons.filter(l => l.completed).length;
      course.progressPercent = Math.round((course.completedLessons / course.totalLessons) * 100);

      this.state.currentUser.stats.trainingHours += 0.5;

      if (course.progressPercent === 100) {
        this.addNotification({
          title: "Course Completed! 🎓",
          message: `Congratulations on completing all lessons for '${course.title}'! You can now request mentor assessment.`,
          type: "course",
          icon: "award"
        });
      }

      this.notify('LESSON_COMPLETED');
      return true;
    }
    return false;
  }

  toggleChecklistItem(courseId, checklistId) {
    const course = this.state.courses.find(c => c.id === courseId);
    if (!course || !course.practicalChecklist) return false;

    const item = course.practicalChecklist.find(chk => chk.id === checklistId);
    if (item) {
      item.learnerCompleted = !item.learnerCompleted;
      this.notify('CHECKLIST_UPDATED');
      return item.learnerCompleted;
    }
    return false;
  }

  // ==========================================
  // Mentor Assessment & Verification
  // ==========================================
  submitMentorAssessment(assessmentData) {
    const newAssessment = {
      id: `asm_${Date.now()}`,
      learnerId: assessmentData.learnerId || this.state.currentUser.id,
      learnerName: assessmentData.learnerName || this.state.currentUser.name,
      skill: assessmentData.skill,
      category: assessmentData.category,
      mentorId: "mnt_101",
      mentorName: "Marcus Vance",
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: assessmentData.status, // competency-demonstrated, practice-required, reassess
      criteria: assessmentData.criteria,
      strengths: assessmentData.strengths,
      improvements: assessmentData.improvements,
      verdict: assessmentData.verdict
    };

    this.state.assessments.unshift(newAssessment);

    if (assessmentData.status === 'competency-demonstrated') {
      this.instantVerifySkill(assessmentData.skill, assessmentData.category, "Marcus Vance");
    } else {
      this.addNotification({
        title: "Assessment Review Complete",
        message: `Mentor feedback submitted for '${assessmentData.skill}': ${assessmentData.verdict}`,
        type: "badge",
        icon: "clipboard-check"
      });
    }

    this.notify('ASSESSMENT_SUBMITTED');
    return newAssessment;
  }

  instantVerifySkill(skillName, category = "Electrical Services", assessorName = "Marcus Vance (Master Electrician)") {
    // Add badge if not exists
    const existing = this.state.verifiedBadges.find(b => b.skillName.toLowerCase() === skillName.toLowerCase());
    if (!existing) {
      const newBadge = {
        id: `bdg_${Date.now()}`,
        skillName: skillName,
        category: category,
        level: "Level 1 Verified",
        issuedDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        assessorName: assessorName,
        credentialId: `SKC-${category.substring(0,3).toUpperCase()}-${Date.now().toString().slice(-4)}`,
        status: "verified",
        icon: "shield-check",
        unlockedJobsCount: Math.floor(Math.random() * 8) + 6,
        averageJobRate: "$45 - $60/hr"
      };

      this.state.verifiedBadges.unshift(newBadge);
      this.state.currentUser.stats.verifiedBadgesCount += 1;
      
      // Update in-progress skills
      if (!this.state.currentUser.verifiedSkills.includes(skillName)) {
        this.state.currentUser.verifiedSkills.push(skillName);
      }

      // Unlock high-paying jobs matching this skill
      this.state.unlockedJobs.forEach(job => {
        if (job.requiredVerifiedSkill.toLowerCase().includes(skillName.toLowerCase()) || skillName.toLowerCase().includes('electrical')) {
          job.isUnlocked = true;
          job.status = "Instant Apply Available";
        }
      });

      this.addNotification({
        title: "Skill Verified & Credential Issued! 🏆",
        message: `You earned verified status in '${skillName}'. High-paying jobs have been unlocked in your Job Requests!`,
        type: "badge",
        icon: "award"
      });

      this.notify('SKILL_VERIFIED');
      return newBadge;
    }
    return existing;
  }

  // ==========================================
  // Mentor Registration & Verification Tracker
  // ==========================================
  updateMentorRegistration(stepData) {
    this.state.mentorRegistrationState.data = {
      ...this.state.mentorRegistrationState.data,
      ...stepData
    };
    this.notify('MENTOR_REG_UPDATED');
  }

  submitMentorRegistration() {
    this.state.mentorRegistrationState.status = "under_review";
    this.state.mentorRegistrationState.submittedDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    this.state.mentorRegistrationState.trackingId = `MNT-REG-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    this.addNotification({
      title: "Mentor Application Submitted",
      message: `Your registration (ID: ${this.state.mentorRegistrationState.trackingId}) is now under review by the SkillConnect Certification Board.`,
      type: "session",
      icon: "check-circle"
    });

    this.notify('MENTOR_REG_SUBMITTED');
  }

  approveSimulatedMentor() {
    this.state.mentorRegistrationState.status = "verified";
    this.state.mentorRegistrationState.data.verificationProgress = {
      profileReview: "completed",
      documentAudit: "completed",
      practicalAssessment: "completed",
      finalApproval: "completed"
    };

    // Add current user to mentors list
    const newMentor = {
      id: `mnt_${this.state.currentUser.id}`,
      name: this.state.currentUser.name,
      avatar: this.state.currentUser.avatar,
      primarySkill: this.state.mentorRegistrationState.data.primaryCategory || "Electrical Services",
      verifiedSkills: this.state.mentorRegistrationState.data.selectedSkills || ["Basic Electrical Maintenance"],
      experienceYears: this.state.mentorRegistrationState.data.experienceYears || 4,
      rating: 5.0,
      reviewsCount: 1,
      languages: this.state.mentorRegistrationState.data.preferredLanguages || ["English"],
      trainingFormats: this.state.mentorRegistrationState.data.teachingFormats || ["online", "in-person"],
      location: this.state.currentUser.location,
      bio: this.state.mentorRegistrationState.data.bio,
      methodology: "Practical hands-on fault walkthroughs and safety checklist compliance.",
      totalSessionsConducted: 0,
      availability: {
        days: ["Monday", "Wednesday", "Friday"],
        slots: ["10:00 AM", "02:00 PM", "04:30 PM"]
      },
      reviews: []
    };

    this.state.mentors.unshift(newMentor);

    this.addNotification({
      title: "Mentor Verification Approved! ⭐",
      message: "Congratulations! You are now an officially verified SkillConnect Mentor. Your public profile is live.",
      type: "badge",
      icon: "award"
    });

    this.notify('MENTOR_APPROVED');
  }

  // ==========================================
  // Notifications Management
  // ==========================================
  addNotification(notif) {
    const item = {
      id: `notif_${Date.now()}`,
      title: notif.title,
      message: notif.message,
      type: notif.type || 'info',
      read: false,
      time: 'Just now',
      icon: notif.icon || 'bell'
    };
    this.state.notifications.unshift(item);
    this.notify('NOTIFICATION_ADDED');
  }

  markNotificationAsRead(notifId) {
    const item = this.state.notifications.find(n => n.id === notifId);
    if (item) {
      item.read = true;
      this.notify('NOTIFICATION_READ');
    }
  }

  markAllNotificationsRead() {
    this.state.notifications.forEach(n => n.read = true);
    this.notify('NOTIFICATIONS_CLEARED');
  }

  // ==========================================
  // Reset All Demo Data
  // ==========================================
  resetAllData() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    this.state = JSON.parse(JSON.stringify(INITIAL_MOCK_DATA));
    this.notify('STATE_RESET');
  }
}

export const appState = new StateManager();
