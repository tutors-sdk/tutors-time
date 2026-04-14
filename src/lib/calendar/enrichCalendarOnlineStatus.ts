import { getSupabase } from "@tutors/tutors-time-lib";
import type { CalendarRow, TutorsTimeCourse } from "@tutors/tutors-time-lib";

/**
 * Fetches `online_status` from tutors-connect-users and attaches it to each
 * calendar student row (day + week). Mutates rows in place.
 */
export async function enrichCalendarRowsWithOnlineStatus(course: TutorsTimeCourse | null): Promise<void> {
  if (!course?.calendarModel) return;

  const ids = new Set<string>();
  for (const r of course.calendarModel.day.rows) {
    const id = r.studentid?.trim();
    if (id) ids.add(id);
  }
  if (ids.size === 0) return;

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("tutors-connect-users")
    .select("github_id, online_status")
    .in("github_id", [...ids]);

  if (error) {
    console.warn("enrichCalendarRowsWithOnlineStatus:", error.message);
    return;
  }

  const statusByGithub = new Map<string, string>();
  for (const row of data ?? []) {
    const gh = (row as { github_id?: string }).github_id?.trim();
    if (!gh) continue;
    const st = (row as { online_status?: string | null }).online_status;
    statusByGithub.set(gh, st != null && String(st).trim() !== "" ? String(st) : "");
  }

  const apply = (rows: CalendarRow[]) => {
    for (const r of rows) {
      const id = r.studentid?.trim();
      r.online_status = id ? (statusByGithub.get(id) ?? "") : "";
    }
  };

  apply(course.calendarModel.day.rows);
  apply(course.calendarModel.week.rows);
}
