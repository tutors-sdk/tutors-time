import { getSupabase } from "@tutors/tutors-time-lib";
import type { CalendarRow, TutorsTimeCourse } from "@tutors/tutors-time-lib";

type UserFields = { online_status: string; sentiment: string };

/**
 * Fetches `online_status` and `sentiment` from tutors-connect-users and attaches
 * them to each calendar student row (day + week). Mutates rows in place.
 */
export async function enrichCalendarRowsWithUserFields(course: TutorsTimeCourse | null): Promise<void> {
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
    .select("github_id, online_status, sentiment")
    .in("github_id", [...ids]);

  if (error) {
    console.warn("enrichCalendarRowsWithUserFields:", error.message);
    return;
  }

  const fieldsByGithub = new Map<string, UserFields>();
  for (const row of data ?? []) {
    const gh = (row as { github_id?: string }).github_id?.trim();
    if (!gh) continue;
    const st = (row as { online_status?: string | null }).online_status;
    const sent = (row as { sentiment?: string | null }).sentiment;
    fieldsByGithub.set(gh, {
      online_status: st != null && String(st).trim() !== "" ? String(st) : "",
      sentiment: sent != null && String(sent).trim() !== "" ? String(sent).trim() : ""
    });
  }

  const apply = (rows: CalendarRow[]) => {
    for (const r of rows) {
      const id = r.studentid?.trim();
      if (!id) {
        r.online_status = "";
        r.sentiment = "";
        continue;
      }
      const f = fieldsByGithub.get(id);
      r.online_status = f?.online_status ?? "";
      r.sentiment = f?.sentiment ?? "";
    }
  };

  apply(course.calendarModel.day.rows);
  apply(course.calendarModel.week.rows);
}
