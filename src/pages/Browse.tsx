import { useState, useEffect, useMemo } from "react";
import { 
  BookOpen, 
  Search, 
  X
} from "lucide-react";
import { fetchCourses, Course } from "@/lib/course";
import CourseCard from "@/components/CourseCard";
import DashboardLayout from "@/components/DashboardLayout";

export default function Browse() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filterTab, setFilterTab] = useState<"all" | "popular" | "new">("all");

  const categories = useMemo(() => {
    const cats = new Set(["All"]);
    courses.forEach(c => {
      if (c.category) cats.add(c.category);
    });
    return Array.from(cats);
  }, [courses]);

  useEffect(() => {
    // Check url search params if any
    const urlParams = new URLSearchParams(window.location.search);
    const q = urlParams.get("q");
    if (q) {
      setSearchQuery(q);
    }
  }, []);

  useEffect(() => {
    loadCourses();
  }, [selectedCategory]);

  const loadCourses = async () => {
    setLoading(true);
    const data = await fetchCourses(selectedCategory);
    setCourses(data);
    setLoading(false);
  };

  const filteredAndSortedCourses = useMemo(() => {
    let result = courses.filter((course) => {
      const matchesSearch = 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === "All" || course.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });

    if (filterTab === "popular") {
      result = [...result].sort((a, b) => (b.enrolled_count || 0) - (a.enrolled_count || 0));
    } else if (filterTab === "new") {
      result = [...result].sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
    }

    return result;
  }, [courses, searchQuery, selectedCategory, filterTab]);

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-6xl">

        {/* TOP HEADER SECTION */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-teal-700 uppercase tracking-wider">
            Course catalog
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Explore your next learning obsession.
          </h1>
          <p className="text-sm sm:text-base text-slate-500 max-w-2xl font-normal leading-relaxed">
            Curated paths, practical projects, and expert-led courses for every kind of learner.
          </p>
        </div>

        {/* SEARCH AND FILTER BAR */}
        <div className="space-y-4">
          {/* Search Box */}
          <div className="relative max-w-2xl">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses, skills, or topics"
              className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 shadow-sm transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              onClick={() => { setFilterTab("all"); setSelectedCategory("All"); }}
              className={`px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer ${
                filterTab === "all" && selectedCategory === "All"
                  ? "bg-teal-700 text-white shadow-sm"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              All topics
            </button>

            <button
              onClick={() => setFilterTab("popular")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer ${
                filterTab === "popular"
                  ? "bg-teal-700 text-white shadow-sm"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              Popular
            </button>

            <button
              onClick={() => setFilterTab("new")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer ${
                filterTab === "new"
                  ? "bg-teal-700 text-white shadow-sm"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              New releases
            </button>

            {categories.filter(c => c !== "All").map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-teal-700 text-white shadow-sm"
                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* RESULTS GRID */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-3xl border border-slate-200 p-6 animate-pulse h-80" />
            ))}
          </div>
        ) : filteredAndSortedCourses.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto">
              <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No courses match your search</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try searching with another keyword or select "All topics".
            </p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedCategory("All"); setFilterTab("all"); }}
              className="px-5 py-2.5 rounded-full bg-teal-700 text-white text-xs font-bold hover:bg-teal-800 transition shadow-sm cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}

