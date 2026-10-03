import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Play, 
  Clock, 
  Award, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  Zap, 
  Wrench, 
  Tv, 
  MessageSquare, 
  Paintbrush
} from 'lucide-react';

export default function LearningLibraryPage({
  courses,
  onOpenVideoLesson,
  onOpenQuiz,
  onOpenChecklist
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all'); // 'all' | 'Beginner' | 'Intermediate' | 'Advanced'

  const categoriesList = [
    { id: 'all', label: 'All Categories', icon: Layers },
    { id: 'electrical', label: 'Electrical', icon: Zap },
    { id: 'appliance', label: 'Appliance & HVAC', icon: Tv },
    { id: 'plumbing', label: 'Plumbing', icon: Wrench },
    { id: 'cleaning', label: 'Cleaning & Hygiene', icon: Sparkles },
    { id: 'painting', label: 'Painting & Waterproofing', icon: Paintbrush },
    { id: 'soft skills', label: 'Customer Communication', icon: MessageSquare }
  ];

  const filteredCourses = courses.filter((c) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = c.title.toLowerCase().includes(q);
      const matchCategory = c.category.toLowerCase().includes(q);
      const matchMentor = c.mentorName.toLowerCase().includes(q);
      if (!matchTitle && !matchCategory && !matchMentor) return false;
    }

    if (selectedCategory !== 'all' && c.category.toLowerCase() !== selectedCategory.toLowerCase()) {
      return false;
    }

    if (selectedDifficulty !== 'all' && c.difficulty.toLowerCase() !== selectedDifficulty.toLowerCase()) {
      return false;
    }

    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display flex items-center gap-2">
            <span>Learning Library & Video Lessons</span>
            <span className="text-blue-600 text-lg">📚</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Practical HD instructional videos, step-by-step diagnostic checklists, and interactive safety quizzes.
          </p>
        </div>
      </div>

      {/* Category Filter Pills Carousel */}
      <div className="flex items-center gap-2.5 overflow-x-auto custom-scrollbar pb-2">
        {categoriesList.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Search & Difficulty Filter Bar */}
      <div className="p-4 rounded-3xl bg-white border border-blue-100 flex flex-col sm:flex-row items-center gap-3 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search lessons by topic (e.g. 3-Phase, Inverter AC, Wall Cistern, Safety)..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-2xl text-xs text-slate-800 placeholder:text-slate-400 border border-slate-200 focus:border-blue-500 outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-500 whitespace-nowrap">Difficulty:</span>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="w-full sm:w-auto bg-slate-50 text-slate-800 text-xs font-bold rounded-2xl px-3 py-2.5 border border-slate-200 outline-hidden"
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced (Pro)</option>
          </select>
        </div>
      </div>

      {/* Courses Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="p-5 rounded-3xl bg-white border border-blue-100 hover:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between space-y-4 group"
          >
            {/* Thumbnail with Overlay Play */}
            <div 
              onClick={() => onOpenVideoLesson && onOpenVideoLesson(course)}
              className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100 cursor-pointer"
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-900/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xl ring-4 ring-white/30">
                  <Play className="w-5 h-5 translate-x-0.5 fill-white" />
                </div>
              </div>

              {/* Category Badge & Duration */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black bg-blue-600 text-white shadow-xs">
                  {course.category}
                </span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/90 text-slate-800 backdrop-blur-xs border border-slate-200">
                  {course.difficulty}
                </span>
              </div>

              <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-slate-900/80 text-white backdrop-blur-xs">
                {course.duration}
              </div>
            </div>

            {/* Course Information */}
            <div className="space-y-2 flex-1">
              <h3 
                onClick={() => onOpenVideoLesson && onOpenVideoLesson(course)}
                className="text-base font-bold text-slate-900 line-clamp-1 hover:text-blue-600 transition-colors cursor-pointer"
              >
                {course.title}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {course.description}
              </p>

              <div className="flex items-center gap-2 text-xs text-slate-600 pt-1">
                <img
                  src={course.mentorAvatar}
                  alt={course.mentorName}
                  className="w-5 h-5 rounded-full object-cover ring-1 ring-blue-500"
                />
                <span className="text-[11px] font-medium">Instructor: <strong>{course.mentorName}</strong></span>
              </div>
            </div>

            {/* Progress Bar if enrolled */}
            {course.isEnrolled && (
              <div className="space-y-1 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">Progress:</span>
                  <span className="text-blue-700 font-bold">{course.progressPercentage}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-600 to-teal-500 rounded-full"
                    style={{ width: `${course.progressPercentage}%` }}
                  />
                </div>
              </div>
            )}

            {/* Action Row */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => onOpenVideoLesson && onOpenVideoLesson(course)}
                className="flex-1 py-2 rounded-xl text-xs font-black bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>{course.isEnrolled ? 'Continue' : 'Start Course'}</span>
              </button>

              <button
                type="button"
                onClick={() => onOpenChecklist && onOpenChecklist(course)}
                className="p-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-teal-700 border border-slate-200 transition-colors cursor-pointer"
                title="Practical Checklist"
              >
                <CheckCircle2 className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onOpenQuiz && onOpenQuiz(course)}
                className="p-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-amber-700 border border-slate-200 transition-colors cursor-pointer"
                title="Knowledge Quiz"
              >
                <Award className="w-4 h-4" />
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
