import { signOut } from "@auth/sveltekit/client";
import { signIn } from "@auth/sveltekit/client";
import { rune } from "./utils/runes.svelte";
import { browser } from "$app/environment";
import type { CourseVisit, TutorsConnectService, TutorsId } from "./types.svelte";
import { goto } from "$app/navigation";
import type { Course } from "./models/lo-types";
import { localStorageProfile } from "./profiles/localStorageProfile";
import { supabaseProfile } from "./profiles/supabaseProfile.svelte";
import { currentCourse, currentLo } from "$lib/runes";
import { analyticsService } from "./analytics.svelte";

export const tutorsConnectService: TutorsConnectService = {
  tutorsId: rune<TutorsId | null>(null),
  profile: localStorageProfile,

  async connect(redirectStr: string) {
    if (redirectStr === "/") {
      redirectStr = "/dashboard";
    }
    return await signIn("github", { callbackUrl: redirectStr });
  },

  reconnect(user: TutorsId) {
    if (user) {
      this.tutorsId.value = user;
      this.profile = supabaseProfile;
      if (browser) {
        if (!localStorage.share) {
          localStorage.share = true;
        }
        this.tutorsId.value.share = localStorage.share;
        if (localStorage.loginCourse) {
          const courseId = localStorage.loginCourse;
          localStorage.removeItem("loginCourse");
          goto(`/course/${courseId}`);
        }
      }
    }
  },

  disconnect(redirectStr: string) {
    if (redirectStr === "/") {
      redirectStr = "/dashboard";
    }
    signOut({ callbackUrl: redirectStr });
  },

  courseVisit(course: Course, student: TutorsId) {
    this.profile.logCourseVisit(course);
    if (course.authLevel! > 0 && !this.tutorsId.value?.login) {
      localStorage.loginCourse = course.courseId;
      goto(`/auth`);
    }
  },

  deleteCourseVisit(courseId: string) {
    this.profile.deleteCourseVisit(courseId);
  },

  getCourseVisits(): Promise<CourseVisit[]> {
    return this.profile.getCourseVisits();
  },

  learningEvent(params: Record<string, string>): void {
    if (currentCourse.value && currentLo.value && this.tutorsId.value) {
      analyticsService.learningEvent(currentCourse.value, params, currentLo.value, this.tutorsId.value);
    }
  },

  startTimer() {
    this.intervalId = setInterval(() => {
      if (!document.hidden && currentCourse.value && currentLo.value && this.tutorsId.value) {
        analyticsService.updatePageCount(currentCourse.value, currentLo.value, this.tutorsId.value);
      }
    }, 30 * 1000);
  },

  stopTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
};
