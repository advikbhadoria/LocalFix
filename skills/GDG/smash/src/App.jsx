import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopNavbar from './components/TopNavbar';
import DemoControls from './components/DemoControls';

// SkillConnect Modals
import BookingModal from './components/skillconnect/BookingModal';
import MentorDetailModal from './components/skillconnect/MentorDetailModal';
import VideoLessonModal from './components/skillconnect/VideoLessonModal';
import PracticalChecklistModal from './components/skillconnect/PracticalChecklistModal';
import QuizModal from './components/skillconnect/QuizModal';
import CertificateModal from './components/skillconnect/CertificateModal';
import OnlineClassroomModal from './components/skillconnect/OnlineClassroomModal';

// SkillConnect Pages
import LearningDashboardPage from './pages/skillconnect/LearningDashboardPage';
import FindMentorPage from './pages/skillconnect/FindMentorPage';
import MyTrainingPage from './pages/skillconnect/MyTrainingPage';
import LearningLibraryPage from './pages/skillconnect/LearningLibraryPage';
import LearnerProgressPage from './pages/skillconnect/LearnerProgressPage';
import SkillAssessmentPage from './pages/skillconnect/SkillAssessmentPage';
import MyAchievementsPage from './pages/skillconnect/MyAchievementsPage';
import MentorRegistrationPage from './pages/skillconnect/MentorRegistrationPage';
import MentorDashboardPage from './pages/skillconnect/MentorDashboardPage';
import JobEligibilityPage from './pages/skillconnect/JobEligibilityPage';

// SkillConnect Mock Data
import {
  INITIAL_SKILLCONNECT_PROFILE,
  MOCK_MENTORS,
  MOCK_COURSES,
  MOCK_TRAINING_SESSIONS,
  MOCK_PRACTICAL_CHECKLISTS,
  MOCK_QUIZZES,
  MOCK_ASSESSMENTS,
  MOCK_ACHIEVEMENTS,
  MOCK_ACTIVITY_TIMELINE
} from './data/skillConnectData';

import { INITIAL_WORKER_PROFILE } from './data/mockData';

export default function App() {
  // Navigation & UI State
  const [activePage, setActivePage] = useState('skillconnect_dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState(null);
  const [currentRole, setCurrentRole] = useState('learner'); // 'learner' | 'mentor'

  // Application Data States
  const [workerProfile, setWorkerProfile] = useState(INITIAL_WORKER_PROFILE);
  const [skillProfile, setSkillProfile] = useState(INITIAL_SKILLCONNECT_PROFILE);
  const [mentors, setMentors] = useState(MOCK_MENTORS);
  const [courses, setCourses] = useState(MOCK_COURSES);
  const [trainingSessions, setTrainingSessions] = useState(MOCK_TRAINING_SESSIONS);
  const [practicalChecklists, setPracticalChecklists] = useState(MOCK_PRACTICAL_CHECKLISTS);
  const [quizzes, setQuizzes] = useState(MOCK_QUIZZES);
  const [assessments, setAssessments] = useState(MOCK_ASSESSMENTS);
  const [achievements, setAchievements] = useState(MOCK_ACHIEVEMENTS);
  const [activityTimeline, setActivityTimeline] = useState(MOCK_ACTIVITY_TIMELINE);

  // SkillConnect Modals State
  const [bookingMentor, setBookingMentor] = useState(null);
  const [selectedMentorDetail, setSelectedMentorDetail] = useState(null);
  const [activeVideoCourse, setActiveVideoCourse] = useState(null);
  const [activeChecklist, setActiveChecklist] = useState(null);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [activeCertificate, setActiveCertificate] = useState(null);
  const [activeClassroomSession, setActiveClassroomSession] = useState(null);

  // Helper for showing animated toast feedback
  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Toggle Theme
  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  // Role Switcher Handler
  const handleToggleRole = (role) => {
    setCurrentRole(role);
    if (role === 'mentor') {
      setActivePage('mentor_dashboard');
      showToast('👨‍🏫 Switched to Mentor Mode: Supervising junior technicians & lab sessions.', 'info');
    } else {
      setActivePage('skillconnect_dashboard');
      showToast('🎓 Switched to Learner Mode: Training paths & competency upgrades.', 'info');
    }
  };

  // --- SKILLCONNECT INTERACTIVE HANDLERS ---
  const handleBookingConfirmed = (newBooking) => {
    setTrainingSessions((prev) => [newBooking, ...prev]);
    setActivityTimeline((prev) => [
      {
        id: `ACT-${Date.now()}`,
        type: 'session_booked',
        title: `Booked Training with ${newBooking.mentorName}`,
        subtitle: `${newBooking.topic} • ${newBooking.date}`,
        time: 'Just now',
        icon: 'Calendar',
        color: 'text-amber-400 bg-amber-500/20'
      },
      ...prev
    ]);
    showToast(`✓ Training Session ${newBooking.bookingRef} booked successfully!`, 'success');
  };

  const handleMarkModuleComplete = (courseId, moduleId) => {
    setCourses((prev) => prev.map((c) => {
      if (c.id === courseId) {
        const updatedMods = c.modules?.map(m => m.id === moduleId ? { ...m, completed: true } : m) || [];
        const completedCount = updatedMods.filter(m => m.completed).length;
        const pct = Math.round((completedCount / (updatedMods.length || 1)) * 100);
        return {
          ...c,
          modules: updatedMods,
          completedModulesCount: completedCount,
          progressPercentage: pct,
          isEnrolled: true
        };
      }
      return c;
    }));

    setSkillProfile((prev) => ({
      ...prev,
      totalTrainingHours: Number((prev.totalTrainingHours + 0.8).toFixed(1)),
      weeklyTrainingHours: Number((prev.weeklyTrainingHours + 0.8).toFixed(1)),
      levelProgress: Math.min(100, prev.levelProgress + 6)
    }));

    showToast('✓ Lesson Module completed and logged to your learning progress!', 'success');
  };

  const handleSubmitChecklistForReview = (checklistId, updatedTasks) => {
    setPracticalChecklists((prev) => prev.map((chk) => {
      if (chk.id === checklistId) {
        return {
          ...chk,
          tasks: updatedTasks,
          status: 'submitted_for_review'
        };
      }
      return chk;
    }));

    setActivityTimeline((prev) => [
      {
        id: `ACT-${Date.now()}`,
        type: 'checklist_submitted',
        title: 'Submitted Practical Checklist for Mentor Review',
        subtitle: 'Tasks & photo evidence submitted to mentor',
        time: 'Just now',
        icon: 'CheckCircle2',
        color: 'text-teal-400 bg-teal-500/20'
      },
      ...prev
    ]);

    showToast('📋 Practical Checklist submitted for mentor review!', 'success');
  };

  const handleQuizCompleted = (quizId, result) => {
    if (result.passed) {
      setActivityTimeline((prev) => [
        {
          id: `ACT-${Date.now()}`,
          type: 'quiz_passed',
          title: `Scored ${result.percentage}% on Trade Standards Quiz`,
          subtitle: `${result.correctCount}/${result.total} questions answered correctly`,
          time: 'Just now',
          icon: 'Award',
          color: 'text-emerald-400 bg-emerald-500/20'
        },
        ...prev
      ]);
      showToast(`🎉 Quiz Passed with ${result.percentage}% score!`, 'success');
    }
  };

  const handleSubmitAssessmentSignoff = (assessmentId, assessmentData) => {
    setAssessments((prev) => prev.map((asm) => {
      if (asm.id === assessmentId) {
        return {
          ...asm,
          rubricCriteria: assessmentData.criteria,
          overallFeedback: assessmentData.mentorOverallFeedback,
          finalResult: assessmentData.finalDecision,
          status: 'passed',
          assessmentDate: 'Today'
        };
      }
      return asm;
    }));

    // Grant new Achievement & Certificate
    const newAch = {
      id: `ACH-${Date.now().toString().slice(-4)}`,
      title: "3-Phase Distribution & MCB Load Balancing",
      badgeIcon: "Zap",
      category: "Electrical",
      type: "verified_competency",
      date: "Today, Just now",
      issuer: "PocketHelp SkillConnect Academy & NSDC Assessor",
      score: 96,
      mentor: "Rajesh Sharma",
      verified: true,
      certificateId: assessmentData.issuedCertificateId || "CERT-ELEC-2026-9082",
      description: "Verified ability to diagnose, balance, and install 3-phase industrial switchboards."
    };

    setAchievements((prev) => [newAch, ...prev]);

    setSkillProfile((prev) => ({
      ...prev,
      completedSkillsCount: prev.completedSkillsCount + 1,
      levelProgress: Math.min(100, prev.levelProgress + 15)
    }));

    showToast('🏆 Assessment Signed Off! Verified Competency Certificate generated.', 'success');
  };

  // --- DEMO SIMULATION ACTIONS ---
  const handleSimulateBookSession = () => {
    const mentor = mentors[0];
    const newBooking = {
      id: `TRN-BK-${Math.floor(5000 + Math.random() * 4000)}`,
      mentorId: mentor.id,
      mentorName: mentor.name,
      mentorAvatar: mentor.avatar,
      courseId: "CRS-101",
      topic: "3-Phase Distribution Board & Phase Balancing Live Workshop",
      date: "Tomorrow, Oct 4, 2026",
      rawDate: "2026-10-04",
      time: "10:30 AM - 11:30 AM",
      duration: "60 mins",
      format: "In-Person",
      location: "PocketHelp Skill Lab • Sector 4 Training Hub, Swargate, Pune",
      status: "upcoming",
      countdownHours: 21,
      isOnline: false,
      notes: "Please bring 1000V insulated plier set. Safety helmets and test rigs provided at hub.",
      bookingRef: `TRN-BK-${Math.floor(5000 + Math.random() * 4000)}`,
      price: "Free (Grant Sponsored)"
    };
    handleBookingConfirmed(newBooking);
    setActivePage('my_training');
  };

  const handleSimulateCompleteLesson = () => {
    handleMarkModuleComplete('CRS-101', 'mod-5');
    setActivePage('skillconnect_dashboard');
  };

  const handleSimulateSubmitChecklist = () => {
    const chk = practicalChecklists[0];
    if (chk) {
      setActiveChecklist(chk);
    }
  };

  const handleSimulatePassAssessment = () => {
    const asm = assessments[0];
    if (asm) {
      handleSubmitAssessmentSignoff(asm.id, {
        criteria: asm.rubricCriteria,
        mentorOverallFeedback: "Demonstrated exemplary high voltage safety isolation and balanced all 3 phases under 3% delta.",
        finalDecision: "passed",
        issuedCertificateId: "CERT-ELEC-2026-9082"
      });
      setActivePage('my_achievements');
    }
  };

  const handleSimulateUnlockJob = () => {
    showToast('💼 High-Ticket Category Unlocked: Industrial 3-Phase Repairs (₹850 - ₹1,400) now eligible!', 'success');
    setActivePage('job_eligibility');
  };

  const handleResetDemoData = () => {
    setWorkerProfile(INITIAL_WORKER_PROFILE);
    setSkillProfile(INITIAL_SKILLCONNECT_PROFILE);
    setMentors(MOCK_MENTORS);
    setCourses(MOCK_COURSES);
    setTrainingSessions(MOCK_TRAINING_SESSIONS);
    setPracticalChecklists(MOCK_PRACTICAL_CHECKLISTS);
    setQuizzes(MOCK_QUIZZES);
    setAssessments(MOCK_ASSESSMENTS);
    setAchievements(MOCK_ACHIEVEMENTS);
    setActivityTimeline(MOCK_ACTIVITY_TIMELINE);
    setCurrentRole('learner');
    showToast('🔄 SkillConnect demo data restored to pristine state.', 'info');
  };

  return (
    <div className={`min-h-screen font-sans antialiased selection:bg-blue-600 selection:text-white ${
      theme === 'dark' ? 'bg-slate-950 text-slate-100 dark' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 right-6 z-50 animate-in slide-in-from-top-4 duration-300">
          <div className={`px-4 py-3 rounded-2xl text-xs font-bold shadow-xl flex items-center gap-2.5 border backdrop-blur-md ${
            toast.type === 'success' 
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200 shadow-emerald-500/10' 
              : toast.type === 'error' 
                ? 'bg-rose-50 text-rose-800 border-rose-200 shadow-rose-500/10' 
                : toast.type === 'warning'
                  ? 'bg-amber-50 text-amber-800 border-amber-200 shadow-amber-500/10'
                  : 'bg-white text-blue-700 border-blue-200 shadow-blue-500/10'
          }`}>
            <span className="w-2 h-2 rounded-full bg-current animate-ping"></span>
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Main Layout Shell */}
      <div className="flex">
        
        {/* Collapsible Left Sidebar - Dedicated to SkillConnect */}
        <Sidebar
          activePage={activePage}
          onSelectPage={setActivePage}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          workerProfile={workerProfile}
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
          currentRole={currentRole}
          onToggleRole={handleToggleRole}
        />

        {/* Dynamic Main Workspace Container */}
        <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-68'
        }`}>
          
          {/* Top Navbar */}
          <TopNavbar
            workerProfile={workerProfile}
            onToggleTheme={handleToggleTheme}
            theme={theme}
            onSelectPage={setActivePage}
            onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            currentRole={currentRole}
            onToggleRole={handleToggleRole}
          />

          {/* Main View Port */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-24">
            
            {/* 1. Learning Dashboard */}
            {(activePage === 'skillconnect_dashboard' || activePage === 'dashboard') && (
              <LearningDashboardPage
                skillConnectProfile={skillProfile}
                courses={courses}
                mentors={mentors}
                trainingSessions={trainingSessions}
                activityTimeline={activityTimeline}
                onSelectPage={setActivePage}
                onOpenBooking={(mentor) => setBookingMentor(mentor)}
                onOpenMentorDetail={(mentor) => setSelectedMentorDetail(mentor)}
                onOpenVideoLesson={(course) => setActiveVideoCourse(course)}
                onOpenClassroom={(session) => setActiveClassroomSession(session)}
              />
            )}

            {/* 2. Find Mentor */}
            {activePage === 'find_mentor' && (
              <FindMentorPage
                mentors={mentors}
                onOpenBooking={(mentor) => setBookingMentor(mentor)}
                onOpenMentorDetail={(mentor) => setSelectedMentorDetail(mentor)}
              />
            )}

            {/* 3. My Training Schedule */}
            {activePage === 'my_training' && (
              <MyTrainingPage
                sessions={trainingSessions}
                onOpenBooking={() => setBookingMentor(mentors[0])}
                onOpenClassroom={(session) => setActiveClassroomSession(session)}
                onRescheduleSession={(session) => setBookingMentor(mentors.find(m => m.id === session.mentorId) || mentors[0])}
                onCancelSession={(sessionId) => {
                  setTrainingSessions(trainingSessions.map(s => s.id === sessionId ? { ...s, status: 'cancelled' } : s));
                  showToast('Training session cancelled.', 'info');
                }}
              />
            )}

            {/* 4. Learning Library */}
            {activePage === 'learning_library' && (
              <LearningLibraryPage
                courses={courses}
                onOpenVideoLesson={(course) => setActiveVideoCourse(course)}
                onOpenQuiz={(course) => {
                  const qz = quizzes.find(q => q.courseId === course.id) || quizzes[0];
                  setActiveQuiz(qz);
                }}
                onOpenChecklist={(course) => {
                  const chk = practicalChecklists.find(c => c.courseId === course.id) || practicalChecklists[0];
                  setActiveChecklist(chk);
                }}
              />
            )}

            {/* 5. Competency Roadmap & Progress */}
            {(activePage === 'learner_progress' || activePage === 'profile') && (
              <LearnerProgressPage
                skillConnectProfile={skillProfile}
                courses={courses}
                assessments={assessments}
                onSelectPage={setActivePage}
                onOpenVideoLesson={(course) => setActiveVideoCourse(course)}
              />
            )}

            {/* 6. Skill Assessments & Sign-offs */}
            {activePage === 'skill_assessment' && (
              <SkillAssessmentPage
                assessments={assessments}
                workerProfile={workerProfile}
                onOpenCertificate={(ach) => setActiveCertificate(ach)}
                onSubmitAssessmentSignoff={handleSubmitAssessmentSignoff}
              />
            )}

            {/* 7. Achievements & Certifications */}
            {activePage === 'my_achievements' && (
              <MyAchievementsPage
                achievements={achievements}
                onOpenCertificate={(ach) => setActiveCertificate(ach)}
              />
            )}

            {/* 8. Become a Mentor Application */}
            {activePage === 'become_mentor' && (
              <MentorRegistrationPage
                workerProfile={workerProfile}
                onSelectPage={setActivePage}
                onMentorRegistrationComplete={(data) => {
                  setSkillProfile(prev => ({ ...prev, mentorStatus: 'verified' }));
                  showToast('✓ Mentor application submitted and accredited!', 'success');
                }}
              />
            )}

            {/* 9. Mentor Command Dashboard */}
            {activePage === 'mentor_dashboard' && (
              <MentorDashboardPage
                skillConnectProfile={skillProfile}
                onSelectPage={setActivePage}
                onOpenAssessment={(learner) => setActivePage('skill_assessment')}
              />
            )}

            {/* 10. Job Eligibility Matrix */}
            {(activePage === 'job_eligibility' || activePage === 'earnings') && (
              <JobEligibilityPage
                onSelectPage={setActivePage}
                onOpenVideoLesson={(course) => setActiveVideoCourse(course)}
              />
            )}

          </main>

        </div>

      </div>

      {/* --- SKILLCONNECT INTERACTIVE MODALS --- */}
      {bookingMentor && (
        <BookingModal
          mentor={bookingMentor}
          allCourses={courses}
          onClose={() => setBookingMentor(null)}
          onBookingConfirmed={handleBookingConfirmed}
        />
      )}

      {selectedMentorDetail && (
        <MentorDetailModal
          mentor={selectedMentorDetail}
          onClose={() => setSelectedMentorDetail(null)}
          onOpenBooking={(mentor) => setBookingMentor(mentor)}
        />
      )}

      {activeVideoCourse && (
        <VideoLessonModal
          course={activeVideoCourse}
          onClose={() => setActiveVideoCourse(null)}
          onMarkModuleComplete={handleMarkModuleComplete}
          onOpenQuiz={(course) => {
            const qz = quizzes.find(q => q.courseId === course.id) || quizzes[0];
            setActiveQuiz(qz);
          }}
          onOpenChecklist={(course) => {
            const chk = practicalChecklists.find(c => c.courseId === course.id) || practicalChecklists[0];
            setActiveChecklist(chk);
          }}
        />
      )}

      {activeChecklist && (
        <PracticalChecklistModal
          checklist={activeChecklist}
          onClose={() => setActiveChecklist(null)}
          onSubmitChecklistForReview={handleSubmitChecklistForReview}
        />
      )}

      {activeQuiz && (
        <QuizModal
          quiz={activeQuiz}
          onClose={() => setActiveQuiz(null)}
          onQuizCompleted={handleQuizCompleted}
        />
      )}

      {activeCertificate && (
        <CertificateModal
          achievement={activeCertificate}
          workerName={workerProfile.name}
          onClose={() => setActiveCertificate(null)}
        />
      )}

      {activeClassroomSession && (
        <OnlineClassroomModal
          session={activeClassroomSession}
          onClose={() => setActiveClassroomSession(null)}
        />
      )}

      {/* --- SKILLCONNECT DEMO ACTION CONTROLS TOOLBAR --- */}
      <DemoControls
        onResetDemoData={handleResetDemoData}
        onSimulateBookSession={handleSimulateBookSession}
        onSimulateCompleteLesson={handleSimulateCompleteLesson}
        onSimulateSubmitChecklist={handleSimulateSubmitChecklist}
        onSimulatePassAssessment={handleSimulatePassAssessment}
        onSimulateUnlockJob={handleSimulateUnlockJob}
        onToggleRole={handleToggleRole}
        currentRole={currentRole}
      />

    </div>
  );
}
