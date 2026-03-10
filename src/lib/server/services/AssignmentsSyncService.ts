import { AssignmentsService, type MoodleModule } from "$lib/server/services/AssignmentsService";
import { upsertAssignments, upsertSubmissions } from "$lib/server/db/submissionsRepository";

export class AssignmentsSyncService {
  private readonly assignmentsService = new AssignmentsService();

  async sync(courseId: string, moodleCourseId: number, moodleSectionId?: number): Promise<void> {
    const assignments = await this.assignmentsService.fetchAssignments(moodleCourseId, moodleSectionId);

    await upsertAssignments(assignments, courseId);

    const assignmentIds = assignments
      .filter((assignment) => assignment.instance !== undefined)
      .map((assignment) => assignment.instance as number);

    const submissions = await this.assignmentsService.fetchSubmissions(assignmentIds);

    const assignmentsById = new Map<number, MoodleModule>(
      assignments
        .filter((assignment) => assignment.instance !== undefined)
        .map((assignment) => [assignment.instance as number, assignment])
    );

    for (const assignment of submissions.assignments) {
      const module = assignmentsById.get(assignment.assignmentid);
      await upsertSubmissions(assignment.submissions, assignment.assignmentid, module);
    }
  }
}
