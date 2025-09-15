import type { Course, IconType } from "@tutors/tutors-model-lib";

/**
 * Record of a user's interaction with a course
 */
export type CourseVisit = {
  id: string;
  title: string;
  img?: string;
  icon?: IconType;
  lastVisit: Date;
  credits: string;
  visits?: number;
  private: boolean;
  favourite: boolean;
};

/**
 * Service for managing user profile data and course interactions
 */
export interface ProfileStore {
  /** List of courses visited by user */
  courseVisits: CourseVisit[];

  reload(): void;
  save(): void;
  logCourseVisit(course: Course): void;
  favouriteCourse(courseId: string): void;
  unfavouriteCourse(courseId: string): void;
  deleteCourseVisit(courseId: string): void;
  getCourseVisits(): Promise<CourseVisit[]>;
}

/**
 * User identity information from authentication provider
 */
export type TutorsId = {
  name: string;
  login: string;
  email: string;
  image: string;
  share: string;
};

/**
 * Service for managing user authentication and course access
 */
export interface TutorsConnectService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tutorsId: any;

  connect(redirectStr: string): void;
  reconnect(user: TutorsId): void;
  disconnect(redirectStr: string): void;
}
