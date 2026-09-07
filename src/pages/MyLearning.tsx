import { useEffect, useMemo, useState } from "react";
import { 
  ArrowRight, 
  BookOpen, 
  Clock, 
  Flame, 
  Play, 
  Search, 
  Target
} from "lucide-react";
import { Link } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { fetchEnrolledCourses, type EnrolledCourse } from "@/lib/course";
import DashboardLayout from "@/components/DashboardLayout";

export default function MyLearning() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<EnrolledCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let active = true;

    async function loadCourses() {
      if (!user?.id) {
        setLoading(false);
        return;
      }
      setLoading(true);

      try {
        const enrolledCourses = await fetchEnrolledCourses(user.id);
        if (active) setCourses(enrolledCourses);
      } catch (err) {
        console.error("Failed to load enrolled courses:", err);
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadCourses();
    return () => {
      active = false;
    };
  }, [user?.id]);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            course.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [courses, searchQuery]);

  const displayCourses = filteredCourses;

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-6xl">

        {/* TOP HEADER SECTION */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-teal-700 uppercase tracking-wider">
            Your learning library
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Keep your learning momentum going.
          </h1>
          <p className="text-sm sm:text-base text-slate-500 max-w-2xl font-normal leading-relaxed">
            Everything you are currently learning, organized in one focused space.
          </p>
        </div>

        {/* 3 STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
              <Flame className="w-6 h-6 fill-teal-500 text-teal-500" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">12 days</div>
              <div className="text-xs font-semibold text-slate-500">Current streak</div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6 text-teal-600" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">
                {courses.length}
              </div>
              <div className="text-xs font-semibold text-slate-500">Courses in progress</div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 text-teal-600" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">8.5h</div>
              <div className="text-xs font-semibold text-slate-500">Learned this month</div>
            </div>
          </div>
        </div>

        {/* SEARCH FILTER */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your courses..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 shadow-sm transition"
          />
        </div>

        {/* ENROLLED COURSE ITEMS */}
        <div className="space-y-4">
          {loading ? (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="h-28 rounded-3xl border border-slate-200 bg-white p-6 animate-pulse" />
              ))}
            </div>
          ) : displayCourses.length > 0 ? (
            displayCourses.map((c) => {
              const progress = Math.round(c.enrollment_progress || 0);

              return (
                <div 
                  key={c.id} 
                  className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-5 hover:border-teal-300 transition-all group"
                >
                  <div className="flex items-center gap-5">
                    {c.thumbnail_url ? (
                      <img 
                        src={c.thumbnail_url} 
                        alt={c.title} 
                        className="w-14 h-14 rounded-2xl object-cover shrink-0 border border-slate-100 shadow-sm"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 group-hover:bg-teal-100 transition-colors">
                        <Target className="w-7 h-7" />
                      </div>
                    )}

                    <div className="space-y-1">
                      <div className="text-[10px] font-black uppercase tracking-wider text-teal-700">
                        {c.category || "TECHNOLOGY"}
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                        {c.title}
                      </h3>
                      <div className="text-xs text-slate-500 flex flex-wrap items-center gap-2">
                        <span>{c.description ? c.description.slice(0, 80) + "..." : "Curriculum track"}</span>
                        <span>•</span>
                        <span className="font-semibold text-slate-700">{progress}% completed</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <Link href={`/learning/${c.id}`}>
                      <button className="px-6 py-2.5 rounded-full bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center gap-2 transition cursor-pointer shadow-sm">
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>Continue</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center space-y-4 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mx-auto">
                <BookOpen className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900">No active enrolled courses</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Browse our live database courses and start learning Python or Java.
                </p>
              </div>
              <Link href="/browse">
                <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition cursor-pointer shadow-sm">
                  <span>Explore Courses</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Link>
            </div>
          )}
        </div>

      </div>
    </DashboardLayout>
  );
}

