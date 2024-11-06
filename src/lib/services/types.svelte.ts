import type { LiveLab } from "./models/live-lab";
import type { Course, Lo } from "./models/lo-types";

export interface CourseService {
  courses: Map<string, Course>;
  labs: Map<string, LiveLab>;
  courseUrl: "";

  getOrLoadCourse(courseId: string, fetchFunction: typeof fetch): Promise<Course>;
  readCourse(courseId: string, fetchFunction: typeof fetch): Promise<Course>;
  readTopic(courseId: string, topicId: string, fetchFunction: typeof fetch): Promise<Lo>;
  readLab(courseId: string, labId: string, fetchFunction: typeof fetch): Promise<LiveLab>;
  readWall(courseId: string, type: string, fetchFunction: typeof fetch): Promise<Lo[]>;
  readLo(courseId: string, loId: string, fetchFunction: typeof fetch): Promise<Lo>;
}
