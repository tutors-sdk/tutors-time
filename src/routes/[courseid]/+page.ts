import type { PageLoad } from "./$types";
import type { Course } from "@tutors/tutors-model-lib";
import {
  aggregateTimeActiveByDate,
  decorateLearningRecords,
  fetchLearningUserInteractions
} from "$lib/services/metrics/supabase-metrics";


import { getCalendarDataForAll, getMedianTimeActivePerDate } from "$lib/services/metrics/supabase-utils";
import { courseService } from "$lib/services/course";
import type { LearningInteraction } from "$lib/services/metrics/metrics-types";
import { goto } from "$app/navigation";
import { tutorsConnectService } from "$lib/services/connect";

export const ssr = false;

export const load: PageLoad = async ({ params, fetch }) => {
  const course: Course = await courseService.readCourse(params.courseid, fetch);

  if (!tutorsConnectService.tutorsId?.value) {
    localStorage.loginCourse = course.courseId;
    goto(`/auth`);
  }

  const userMetrics: LearningInteraction[] = await fetchLearningUserInteractions(course);
  const userIds: string[] = [...new Set(userMetrics.map((m: LearningInteraction) => m.studentid))] as string[];
  const userNamesAvatars: Map<string, [string | undefined, string | undefined]> = new Map(
    userMetrics.map((m: LearningInteraction) => [m.studentid, [m.fullname, m.avatarurl]])
  );
  const records: LearningInteraction[] = await getCalendarDataForAll(course.courseId);
  const aggregatedData = await aggregateTimeActiveByDate(records);
  const medianCalendarTime = await getMedianTimeActivePerDate(course.courseId);
  const calendarIds: string[] = [
    ...new Set(Array.from(aggregatedData.entries()).map(([studentId]) => studentId))
  ] as string[];
  await decorateLearningRecords(course, userMetrics);

  return {
    course: course,
    userIds: userIds,
    userNamesAvatars: userNamesAvatars,
    calendarIds: calendarIds, // Because of mismatch data in the dbs (reintroduce calendar)
    timeActiveMap: aggregatedData,
    medianTime: medianCalendarTime
  };
};
