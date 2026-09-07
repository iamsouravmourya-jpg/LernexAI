import React, { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  BellRing,
  CheckCheck,
  Trash2,
  X,
  Sparkles,
  BookOpen,
  Award,
  GraduationCap,
  Crown,
  Flame,
  ArrowRight,
  Clock,
  Inbox,
  Bot,
  Layers
} from "lucide-react";
import { User } from "@/context/AuthContext";
import { fetchUserCertificatePurchases } from "@/lib/certificates";
import { fetchEnrolledCourses, fetchCourses, Course } from "@/lib/course";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export interface NotificationItem {
  id: string;
  type: "certificate" | "course" | "exam" | "plan" | "tutor" | "system" | "streak";
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  link?: string;
  actionLabel?: string;
  tag?: string;
}

interface NotificationCenterProps {
  user: User | null;
}

export default function NotificationCenter({ user }: NotificationCenterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"all" | "unread" | "courses" | "achievements">("all");
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const storageKey = user?.id ? `lernex_notifs_${user.id}` : "lernex_notifs_guest";

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Load dynamic notifications from Supabase, enrolled courses, certificates & new course releases
  useEffect(() => {
    async function loadNotifications() {
      const generatedNotifs: NotificationItem[] = [];

      // Read local state for dismissals or manual reads
      let localSaved: Array<{ id: string; read?: boolean; dismissed?: boolean }> = [];
      try {
        const raw = localStorage.getItem(storageKey);
        if (raw) localSaved = JSON.parse(raw);
      } catch (e) {
        console.warn("Failed reading notifications from storage:", e);
      }

      // 1. Fetch catalog courses to notify about active & newly available tracks
      try {
        const allCourses: Course[] = await fetchCourses();
        if (allCourses && allCourses.length > 0) {
          allCourses.slice(0, 4).forEach((course) => {
            generatedNotifs.push({
              id: `course-release-${course.id}`,
              type: "course",
              title: `Course Available: ${course.title}`,
              description: `Master ${course.category} with interactive sandboxes and 10-question module milestones.`,
              timestamp: "Active",
              read: false,
              link: `/learning/${course.id}`,
              actionLabel: "Start Learning",
              tag: "Masterclass",
            });
          });
        }
      } catch (err) {
        console.warn("Failed fetching all courses for notification feed:", err);
      }

      // 2. Fetch User-Specific Certs & Progress
      if (user?.id) {
        try {
          const [certificates, enrollments] = await Promise.all([
            fetchUserCertificatePurchases(user.id).catch(() => []),
            fetchEnrolledCourses(user.id).catch(() => []),
          ]);

          if (certificates && certificates.length > 0) {
            certificates.forEach((cert) => {
              generatedNotifs.push({
                id: `cert-${cert.id}`,
                type: "certificate",
                title: `Certificate Issued: ${cert.course_title}`,
                description: `Your QR-verifiable credential (${cert.certificate_number}) is ready to download.`,
                timestamp: "Recent",
                read: false,
                link: `/certificate?id=${cert.certificate_number}`,
                actionLabel: "View Certificate",
                tag: "Credential",
              });
            });
          }

          const completedCourse = enrollments.find(
            (e) => (e.enrollment_progress || 0) >= 100
          );
          if (completedCourse) {
            generatedNotifs.push({
              id: `exam-ready-${completedCourse.id}`,
              type: "exam",
              title: `Ready for Final Exam: ${completedCourse.title}`,
              description: `You've completed all curriculum lessons! Clear the 15-min proctored exam to earn your certificate.`,
              timestamp: "Ready",
              read: false,
              link: `/final-exam/${completedCourse.id}`,
              actionLabel: "Take Exam",
              tag: "Final Exam",
            });
          }

          const inProgressCourse = enrollments.find(
            (e) => (e.enrollment_progress || 0) > 0 && (e.enrollment_progress || 0) < 100
          );
          if (inProgressCourse) {
            generatedNotifs.push({
              id: `progress-${inProgressCourse.id}`,
              type: "course",
              title: `Resume Track: ${inProgressCourse.title}`,
              description: `You are at ${Math.round(inProgressCourse.enrollment_progress || 0)}% completion. Keep your coding streak alive!`,
              timestamp: "In Progress",
              read: false,
              link: `/learning/${inProgressCourse.id}`,
              actionLabel: "Continue Lesson",
              tag: "Active",
            });
          }
        } catch (e) {
          console.warn("Failed to load user activity for notifications:", e);
        }
      }

      // 3. System & Plan Notifications
      if (user?.plan_type === "pro") {
        generatedNotifs.push({
          id: "pro-benefit-active",
          type: "plan",
          title: "Pro Membership Active ⚡",
          description: "Enjoy unlimited code playgrounds, AI Tutor assistance, and free verified certificates.",
          timestamp: "Active",
          read: true,
          link: "/upgrade",
          actionLabel: "View Benefits",
          tag: "Pro Member",
        });
      } else {
        generatedNotifs.push({
          id: "upgrade-promo",
          type: "plan",
          title: "Upgrade to Pro Pass 🎓",
          description: "Unlock all certified exams, unlimited AI Tutor queries, and industry credentials.",
          timestamp: "Special Pass",
          read: false,
          link: "/upgrade",
          actionLabel: "Upgrade Plan",
          tag: "Pro Pass",
        });
      }

      generatedNotifs.push({
        id: "ai-tutor-tip",
        type: "tutor",
        title: "Bilingual AI Tutor Ready",
        description: "Need help with syntax or logic? Open the AI Tutor sidebar during any lesson for instant code explanations.",
        timestamp: "Active",
        read: true,
        link: "/browse",
        actionLabel: "Browse Courses",
        tag: "Assistant",
      });

      const merged = generatedNotifs.map((gen) => {
        const savedMatch = localSaved.find((s) => s.id === gen.id);
        if (savedMatch && typeof savedMatch.read === "boolean") {
          return { ...gen, read: savedMatch.read };
        }
        return gen;
      });

      const dismissedIds = new Set(
        localSaved.filter((item) => item.dismissed).map((item) => item.id)
      );
      const filtered = merged.filter((item) => !dismissedIds.has(item.id));

      setNotifications(filtered);
    }

    loadNotifications();
  }, [user?.id, user?.plan_type, storageKey]);

  const saveNotificationsState = (updated: NotificationItem[]) => {
    setNotifications(updated);
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch (e) {
      console.warn("Failed to save notifications to localStorage:", e);
    }
  };

  const markAsRead = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const updated = notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
    saveNotificationsState(updated);
  };

  const markAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    saveNotificationsState(updated);
  };

  const dismissNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const updated = notifications.filter((n) => n.id !== id);
    try {
      const raw = localStorage.getItem(storageKey);
      let list = raw ? JSON.parse(raw) : [];
      list.push({ id, dismissed: true });
      localStorage.setItem(storageKey, JSON.stringify(list));
    } catch (err) {
      console.warn(err);
    }
    setNotifications(updated);
  };

  const clearAll = () => {
    try {
      const dismissedEntries = notifications.map((n) => ({ id: n.id, dismissed: true }));
      localStorage.setItem(storageKey, JSON.stringify(dismissedEntries));
    } catch (err) {
      console.warn(err);
    }
    setNotifications([]);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = notifications.filter((n) => {
    if (activeFilter === "unread") return !n.read;
    if (activeFilter === "courses") return n.type === "course";
    if (activeFilter === "achievements") return n.type === "certificate" || n.type === "exam";
    return true;
  });

  const getIcon = (type: NotificationItem["type"]) => {
    switch (type) {
      case "certificate":
        return <Award className="w-4 h-4 text-amber-600" />;
      case "exam":
        return <GraduationCap className="w-4 h-4 text-teal-700" />;
      case "plan":
        return <Crown className="w-4 h-4 text-amber-600" />;
      case "tutor":
        return <Bot className="w-4 h-4 text-teal-700" />;
      case "streak":
        return <Flame className="w-4 h-4 text-orange-600" />;
      case "course":
        return <BookOpen className="w-4 h-4 text-teal-700" />;
      default:
        return <Sparkles className="w-4 h-4 text-teal-700" />;
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      {/* Bell Button matching Dashboard Design */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl border transition-all duration-200 cursor-pointer shadow-xs ${
          isOpen
            ? "border-teal-500 text-teal-700 bg-teal-50 ring-2 ring-teal-500/20"
            : "border-slate-200 bg-white text-slate-700 hover:border-teal-400 hover:bg-teal-50/50 hover:text-teal-900"
        }`}
        aria-label="Notifications"
        title="Notifications"
      >
        {unreadCount > 0 ? (
          <BellRing className="h-5 w-5 text-teal-700 animate-pulse" />
        ) : (
          <Bell className="h-5 w-5 text-slate-600" />
        )}

        {/* Unread Pill Badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] font-black shadow-sm ring-2 ring-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Notifications Popover Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute right-0 top-14 w-[340px] sm:w-[420px] rounded-3xl border border-slate-200 bg-white shadow-2xl z-50 overflow-hidden flex flex-col max-h-[85vh] text-slate-900"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/80 backdrop-blur-sm">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-teal-700 text-white flex items-center justify-center shadow-xs font-black">
                    <Bell className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">Notifications</h3>
                      {unreadCount > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-orange-100 border border-orange-200 text-orange-800 text-[10px] font-extrabold">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium">Courses, milestones & learning updates</p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {unreadCount > 0 && (
                    <button
                      type="button"
                      onClick={markAllAsRead}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold text-teal-700 hover:bg-teal-50 transition cursor-pointer"
                      title="Mark all as read"
                    >
                      <CheckCheck className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Read all</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="p-1 rounded-lg text-slate-400 hover:bg-slate-200 hover:text-slate-800 transition cursor-pointer"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1 p-1 bg-slate-200/60 border border-slate-200 rounded-xl text-slate-600">
                {(["all", "unread", "courses", "achievements"] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveFilter(tab)}
                    className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold capitalize transition-all cursor-pointer ${
                      activeFilter === tab
                        ? "bg-white text-teal-900 shadow-xs font-extrabold"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
                    }`}
                  >
                    {tab === "all"
                      ? "All"
                      : tab === "unread"
                      ? `Unread (${unreadCount})`
                      : tab === "courses"
                      ? "Courses"
                      : "Milestones"}
                  </button>
                ))}
              </div>
            </div>

            {/* Notification List Body */}
            <div className="overflow-y-auto divide-y divide-slate-100 flex-1 p-3 space-y-2.5 max-h-[380px] bg-slate-50/40">
              {filteredNotifications.length === 0 ? (
                <div className="py-12 px-4 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-teal-700 mx-auto flex items-center justify-center shadow-xs">
                    <Inbox className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">No notifications found</h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                      {activeFilter === "unread"
                        ? "You've read all notifications! Great job staying on top of your learning."
                        : "You're all caught up on course updates and milestones."}
                    </p>
                  </div>
                </div>
              ) : (
                filteredNotifications.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => markAsRead(item.id)}
                    className={`group relative rounded-2xl border p-3.5 transition-all cursor-pointer shadow-xs ${
                      item.read
                        ? "bg-white border-slate-200/90 text-slate-700 hover:bg-slate-50"
                        : "bg-teal-50/70 border-teal-200 text-slate-900 hover:border-teal-300"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Icon container */}
                      <div
                        className={`w-9 h-9 rounded-xl border shadow-xs flex items-center justify-center shrink-0 mt-0.5 ${
                          item.read
                            ? "bg-slate-100 border-slate-200"
                            : "bg-white border-teal-200 text-teal-700"
                        }`}
                      >
                        {getIcon(item.type)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 pr-6">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span
                            className={`text-xs font-bold truncate ${
                              item.read ? "text-slate-700" : "text-slate-900 font-extrabold"
                            }`}
                          >
                            {item.title}
                          </span>
                          {!item.read && (
                            <span className="w-2 h-2 rounded-full bg-teal-600 shrink-0" />
                          )}
                          {item.tag && (
                            <span className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-[9px] font-extrabold text-slate-700 uppercase tracking-wider">
                              {item.tag}
                            </span>
                          )}
                        </div>

                        <p className="text-[11px] text-slate-600 mt-1 leading-relaxed line-clamp-2">
                          {item.description}
                        </p>

                        <div className="mt-2.5 flex items-center justify-between gap-2">
                          <span className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
                            <Clock className="w-3 h-3" />
                            <span>{item.timestamp}</span>
                          </span>

                          {item.link && (
                            <Link
                              href={item.link}
                              onClick={() => {
                                markAsRead(item.id);
                                setIsOpen(false);
                              }}
                              className="inline-flex items-center gap-1 text-[11px] font-extrabold text-teal-700 hover:text-teal-900 transition"
                            >
                              <span>{item.actionLabel || "Open"}</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Quick Dismiss Button */}
                    <button
                      type="button"
                      onClick={(e) => dismissNotification(item.id, e)}
                      className="absolute top-3 right-3 p-1 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                      title="Dismiss notification"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer Actions */}
            {notifications.length > 0 && (
              <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px] font-medium">
                  {notifications.length} total alert{notifications.length > 1 ? "s" : ""}
                </span>
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-[11px] font-bold text-slate-500 hover:text-red-600 transition flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Clear All</span>
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
