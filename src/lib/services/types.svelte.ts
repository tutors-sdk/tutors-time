import type { LiveLab } from "./models/live-lab";
import type { Course, Lo } from "./models/lo-types";

export type TutorsId = {
  name: string;
  login: string;
  email: string;
  image: string;
  share: string;
};

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

export interface TutorsConnectService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tutorsId: any;

  connect(redirectStr: string): void;
  reconnect(user: TutorsId): void;
  disconnect(redirectStr: string): void;
}
