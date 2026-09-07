import { Link } from "wouter";
import { ArrowRight, BookOpen, Sparkles, Cpu } from "lucide-react";
import { Course } from "@/lib/course";
import { motion } from "framer-motion";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const categoryLabel = (course.category || "Technology").toUpperCase();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-teal-400 transition-all duration-300"
    >
      <div className="space-y-4">
        {/* Top Image or Icon Area */}
        {course.thumbnail_url ? (
          <div className="w-full h-36 rounded-2xl overflow-hidden relative border border-slate-100">
            <img 
              src={course.thumbnail_url} 
              alt={course.title} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="w-full h-36 rounded-2xl bg-teal-50/70 border border-teal-100 flex items-center justify-center text-teal-700 relative overflow-hidden group-hover:bg-teal-100/60 transition-colors">
            <BookOpen className="w-10 h-10 text-teal-600 transition-transform group-hover:scale-110" />
          </div>
        )}

        {/* Category & Details */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="text-[10px] font-black tracking-widest text-teal-700 uppercase">
              {categoryLabel}
            </div>
            {(course.total_modules || course.modules?.length) ? (
              <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                {course.total_modules || course.modules?.length} Modules
              </span>
            ) : null}
          </div>
          <h3 className="font-bold text-slate-900 text-base sm:text-lg group-hover:text-teal-700 transition-colors line-clamp-1">
            {course.title}
          </h3>
          {course.subtitle && (
            <div className="text-xs font-medium text-teal-700 line-clamp-1">
              {course.subtitle}
            </div>
          )}
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-normal">
            {course.description}
          </p>
        </div>

        {/* Interactive Features Badge */}
        <div className="flex items-center gap-2 text-xs text-teal-800 font-semibold bg-teal-50/80 px-2.5 py-1 rounded-lg w-fit border border-teal-100">
          <Cpu className="w-3.5 h-3.5 text-teal-600" />
          <span>Interactive Sandbox</span>
        </div>
      </div>

      {/* Footer Link */}
      <div className="pt-5 border-t border-slate-100 mt-4">
        <Link href={`/course/${course.id}`}>
          <div className="text-xs font-bold text-teal-700 group-hover:text-teal-900 flex items-center gap-1 transition-colors cursor-pointer">
            <span>View course</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>
      </div>
    </motion.div>
  );
}

