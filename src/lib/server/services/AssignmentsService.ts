import {
  getAssignmentSubmissions,
  type MoodleAssignSubmission,
  type MoodleAssignSubmissionsResponse
} from "$lib/server/api/moodle";

export type { MoodleAssignSubmission, MoodleAssignSubmissionsResponse };

export class AssignmentsService {
  async fetchSubmissions(
    assignmentIds: number[],
    options?: { status?: string; since?: number }
  ): Promise<MoodleAssignSubmissionsResponse> {
    return getAssignmentSubmissions(assignmentIds, options);
  }
}
