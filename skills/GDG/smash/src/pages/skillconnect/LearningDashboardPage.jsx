import React from 'react';
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  Clock, 
  Calendar, 
  Sparkles, 
  ShieldCheck, 
  ChevronRight, 
  Play, 
  ArrowRight, 
  Star, 
  Video, 
  MapPin, 
  CheckCircle2, 
  Users, 
  TrendingUp, 
  Zap,
  Target
} from 'lucide-react';

export default function LearningDashboardPage({
  skillConnectProfile,
  courses,
  mentors,
  trainingSessions,
  activityTimeline,
  onSelectPage,
  onOpenBooking,
  onOpenMentorDetail,
  onOpenVideoLesson,
  onOpenClassroom
}) {
  const activeCourses = courses.filter(c => c.isEnrolled);
  const nextSession = trainingSessions.find(s => s.status === 'upcoming');

  return (
    <div className="space-y-8 animate-in fade-in">
      
      {/* 1. HERO WELCOME SECTION - Rich Royal Blue Gradient Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 border border-blue-600 p-6 sm:p-8 shadow-xl text-white">
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-10 w-60 h-60 bg-teal-400/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative flex-shrink-0">
              <img
                src={skillConnectProfile.avatar}
                alt={skillConnectProfile.name}
                className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-white/30 shadow-2xl"
              />
              <span className="absolute -bottom-1.5 -right-1.5 p-1 bg-white text-blue-600 rounded-full ring-2 ring-blue-800 shadow-md">
                <Sparkles className="w-3.5 h-3.5" />
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display">
                  Welcome back, {skillConnectProfile.name.split(' ')[0]}!
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20 text-white border border-white/30 backdrop-blur-xs flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-300" /> Platinum Electrician
                </span>
              </div>
              <p className="text-xs sm:text-sm text-blue-100 font-medium">
                Keep building your practical competencies and unlocking high-ticket on-demand dispatches.
              </p>
              
              {/* Level Progress Bar */}
              <div className="pt-2 flex items-center gap-3">
                <span className="text-[11px] font-bold text-blue-100 whitespace-nowrap">
                  {skillConnectProfile.learningLevel}
                </span>
                <div className="w-36 sm:w-48 h-2 bg-blue-950/60 rounded-full overflow-hidden border border-white/20">
                  <div 
                    className="h-full bg-gradient-to-r from-teal-300 to-white rounded-full transition-all duration-500"
                    style={{ width: `${skillConnectProfile.levelProgress}%` }}
                  />
                </div>
                <span className="text-[11px] font-mono text-teal-200 font-bold">
                  {skillConnectProfile.levelProgress}%
                </span>
              </div>
            </div>
          </div>

          {/* Top Quick CTA */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              type="button"
              onClick={() => onSelectPage('find_mentor')}
              className="flex-1 md:flex-none px-5 py-3 rounded-2xl text-xs font-bold bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-xs transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Users className="w-4 h-4 text-blue-200" />
              <span>Find a Mentor</span>
            </button>

            <button
              type="button"
              onClick={() => {
                const firstActive = activeCourses[0];
                if (firstActive && onOpenVideoLesson) onOpenVideoLesson(firstActive);
                else onSelectPage('learning_library');
              }}
              className="flex-1 md:flex-none px-6 py-3 rounded-2xl text-xs font-black bg-white hover:bg-blue-50 text-blue-900 shadow-lg shadow-black/10 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Continue Learning</span>
              <ArrowRight className="w-4 h-4 text-blue-700" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. FOUR INTERACTIVE STATISTIC CARDS - Crisp White */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Skills in Progress */}
        <div 
          onClick={() => onSelectPage('my_training')}
          className="p-5 rounded-3xl bg-white border border-blue-100 hover:border-blue-400 transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-blue-500/10 cursor-pointer group space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold text-blue-600 group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
              My Training <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
              {skillConnectProfile.skillsInProgressCount}
            </div>
            <p className="text-xs font-bold text-slate-600 mt-0.5">Skills in Progress</p>
            <div className="flex items-center gap-1 text-[11px] text-teal-600 font-semibold mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>2 modules pending review</span>
            </div>
          </div>
        </div>

        {/* Card 2: Completed Skills & Verified Competencies */}
        <div 
          onClick={() => onSelectPage('my_achievements')}
          className="p-5 rounded-3xl bg-white border border-blue-100 hover:border-emerald-400 transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-emerald-500/10 cursor-pointer group space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold text-emerald-600 group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
              Achievements <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
              {skillConnectProfile.completedSkillsCount}
            </div>
            <p className="text-xs font-bold text-slate-600 mt-0.5">Completed Skills</p>
            <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold mt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>4 Verified Digital Credentials</span>
            </div>
          </div>
        </div>

        {/* Card 3: Training Hours */}
        <div 
          onClick={() => onSelectPage('learner_progress')}
          className="p-5 rounded-3xl bg-white border border-blue-100 hover:border-teal-400 transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-teal-500/10 cursor-pointer group space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Clock className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold text-teal-600 group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
              Analytics <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
              {skillConnectProfile.totalTrainingHours}h
            </div>
            <p className="text-xs font-bold text-slate-600 mt-0.5">Total Training Hours</p>
            <div className="flex items-center gap-1 text-[11px] text-teal-700 font-semibold mt-1">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>+{skillConnectProfile.weeklyTrainingHours} hrs logged this week</span>
            </div>
          </div>
        </div>

        {/* Card 4: Mentorship Sessions */}
        <div 
          onClick={() => onSelectPage('my_training')}
          className="p-5 rounded-3xl bg-white border border-blue-100 hover:border-amber-400 transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-amber-500/10 cursor-pointer group space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Calendar className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold text-amber-600 group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
              Schedule <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
              {trainingSessions.filter(s => s.status === 'upcoming').length}
            </div>
            <p className="text-xs font-bold text-slate-600 mt-0.5">Upcoming Mentorships</p>
            <div className="flex items-center gap-1 text-[11px] text-amber-700 font-semibold mt-1">
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              <span>Next: Tomorrow at 10:30 AM</span>
            </div>
          </div>
        </div>

      </div>

      {/* 3. CONTINUE LEARNING ACTIVE COURSES SECTION */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              Continue Learning
            </h2>
            <p className="text-xs text-slate-500">
              Pick up where you left off in your enrolled skill tracks
            </p>
          </div>
          <button
            type="button"
            onClick={() => onSelectPage('learning_library')}
            className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Explore All Courses</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {activeCourses.slice(0, 2).map((course) => (
            <div 
              key={course.id}
              className="p-5 rounded-3xl bg-white border border-blue-100 hover:border-blue-300 transition-all flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-1 ring-slate-200 flex-shrink-0"
                />
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      {course.category}
                    </span>
                    <span className="text-[10px] text-slate-500 font-semibold">{course.difficulty}</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 line-clamp-1">
                    {course.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <img
                      src={course.mentorAvatar}
                      alt={course.mentorName}
                      className="w-5 h-5 rounded-full object-cover ring-1 ring-blue-400"
                    />
                    <span>{course.mentorName}</span>
                  </div>
                </div>
              </div>

              {/* Progress and Action */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">
                    {course.completedModulesCount} of {course.totalModulesCount} Modules Completed
                  </span>
                  <span className="text-blue-700 font-black">{course.progressPercentage}%</span>
                </div>
                
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-600 to-teal-500 rounded-full transition-all duration-300"
                    style={{ width: `${course.progressPercentage}%` }}
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {course.estimatedRemainingTime}
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenVideoLesson) onOpenVideoLesson(course);
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-black bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Continue Lesson</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. UPCOMING TRAINING SPOTLIGHT */}
      {nextSession && (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-50 via-white to-teal-50 border border-blue-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500 animate-ping"></span>
              <span className="text-xs font-black uppercase tracking-wider text-amber-700">
                Next Mentorship Session
              </span>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-black bg-blue-600 text-white shadow-xs">
              In ~21 Hours
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={nextSession.mentorAvatar}
                alt={nextSession.mentorName}
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-blue-500/40 shadow-sm"
              />
              <div className="space-y-0.5">
                <h3 className="text-base font-bold text-slate-900">{nextSession.topic}</h3>
                <p className="text-xs text-slate-600">
                  With <strong>{nextSession.mentorName}</strong> • {nextSession.date} at {nextSession.time}
                </p>
                <div className="flex items-center gap-2 text-xs text-teal-700 font-semibold">
                  {nextSession.isOnline ? <Video className="w-3.5 h-3.5" /> : <MapPin className="w-3.5 h-3.5" />}
                  <span>{nextSession.location}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              {nextSession.isOnline ? (
                <button
                  type="button"
                  onClick={() => onOpenClassroom && onOpenClassroom(nextSession)}
                  className="w-full md:w-auto px-5 py-2.5 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Video className="w-4 h-4" />
                  <span>Join Live Classroom</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => onSelectPage('my_training')}
                  className="w-full md:w-auto px-5 py-2.5 rounded-xl text-xs font-black bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MapPin className="w-4 h-4" />
                  <span>View Lab Directions</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 5. RECOMMENDED MENTORS CAROUSEL */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              Recommended Master Mentors
            </h2>
            <p className="text-xs text-slate-500">
              Experienced professionals ready to train and verify your competencies
            </p>
          </div>
          <button
            type="button"
            onClick={() => onSelectPage('find_mentor')}
            className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All Mentors</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Horizontal Mentor Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {mentors.slice(0, 3).map((mentor) => (
            <div 
              key={mentor.id}
              className="p-5 rounded-3xl bg-white border border-blue-100 hover:border-blue-300 transition-all flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md"
            >
              <div className="flex items-start gap-3.5">
                <img
                  src={mentor.avatar}
                  alt={mentor.name}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-blue-500/20 flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h4 className="text-sm font-bold text-slate-900 truncate">{mentor.name}</h4>
                    {mentor.verified && (
                      <ShieldCheck className="w-4 h-4 text-blue-600 flex-shrink-0" title="Verified Master Mentor" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 truncate">{mentor.title}</p>
                  
                  <div className="flex items-center gap-2 text-xs mt-1">
                    <span className="text-amber-500 font-bold flex items-center gap-0.5">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      {mentor.rating}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-600 font-medium">{mentor.experience} Exp</span>
                  </div>
                </div>
              </div>

              {/* Skills Tags */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Teaches:</span>
                <div className="flex flex-wrap gap-1">
                  {mentor.skillsTaught.slice(0, 2).map((sk, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-700 truncate max-w-[180px]">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price & Booking Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400">Session:</span>
                  <div className="text-xs font-black text-emerald-700">{mentor.sessionPrice}</div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onOpenMentorDetail && onOpenMentorDetail(mentor)}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    Profile
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenBooking && onOpenBooking(mentor)}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-black bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. LEARNING ACTIVITY TIMELINE & QUICK ACTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Timeline (2 Cols) */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white border border-blue-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              Recent Learning Activity Timeline
            </h3>
            <button
              type="button"
              onClick={() => onSelectPage('learner_progress')}
              className="text-xs text-blue-600 hover:underline font-semibold cursor-pointer"
            >
              Full History
            </button>
          </div>

          <div className="space-y-4 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-200">
            {activityTimeline.map((item) => (
              <div key={item.id} className="relative flex items-start gap-4 pl-1">
                <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 z-10 border border-blue-200">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0 flex-1 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900">{item.title}</h4>
                    <span className="text-[10px] text-slate-400">{item.time}</span>
                  </div>
                  <p className="text-slate-600 text-[11px] mt-0.5">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Action Hub (1 Col) */}
        <div className="p-6 rounded-3xl bg-white border border-blue-100 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              Quick Action Hub
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Jump straight into your professional growth workflows
            </p>
          </div>

          <div className="space-y-2">
            {[
              { label: 'Find a Mentor', page: 'find_mentor', icon: Users, color: 'text-blue-600' },
              { label: 'Explore Learning Library', page: 'learning_library', icon: BookOpen, color: 'text-teal-600' },
              { label: 'Take Practical Assessment', page: 'skill_assessment', icon: Target, color: 'text-emerald-600' },
              { label: 'View Verified Badges', page: 'my_achievements', icon: Award, color: 'text-amber-600' },
              { label: 'Unlock Skill-Based Jobs', page: 'job_eligibility', icon: Zap, color: 'text-indigo-600' },
              { label: 'Become a Mentor', page: 'become_mentor', icon: GraduationCap, color: 'text-purple-600' }
            ].map((action, i) => {
              const Icon = action.icon;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => onSelectPage(action.page)}
                  className="w-full p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 border border-slate-100 text-xs font-bold text-slate-700 hover:text-blue-700 transition-all flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${action.color}`} />
                    <span>{action.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-transform" />
                </button>
              );
            })}
          </div>

          <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900">
            <span className="font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              SkillConnect Guarantee
            </span>
            <p className="text-[11px] text-blue-800 mt-1">
              Every verified competency directly boosts your algorithmic job dispatch priority in Sector 4.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
