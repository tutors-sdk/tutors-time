import type { LiveLab } from "./models/live-lab";
import type { Course, IconType, Lo } from "./models/lo-types";

export type TutorsId = {
  name: string;
  login: string;
  email: string;
  image: string;
  share: boolean;
};

export type CourseVisit = {
  id: string;
  title: string;
  image?: string;
  icon?: IconType;
  lastVisit: Date;
  credits: string;
  visits: number;
};

export interface LoUser {
  fullName: string;
  avatar: string;
  id: string;
}

export class LoRecord {
  courseId: string = $state("");
  courseUrl: string = $state("");
  courseTitle: string = $state("");
  loRoute: string = $state("");
  title: string = $state("");
  img?: string = $state("");
  icon?: IconType = $state();
  isPrivate: boolean = $state(false);
  user?: LoUser = $state<LoUser | undefined>();
  type: string = $state("");

  constructor(data: any) {
    Object.assign(this, data);
  }
}

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

export interface ProfileStore {
  courseVisits: CourseVisit[];

  reload(): void;
  save(): void;
  logCourseVisit(course: Course): void;
  deleteCourseVisit(courseId: string): void;
  getCourseVisits(): Promise<CourseVisit[]>;
}

export interface TutorsConnectService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tutorsId: any;
  profile: ProfileStore;
  intervalId: any;

  connect(redirectStr: string): void;
  reconnect(user: TutorsId): void;
  disconnect(redirectStr: string): void;

  courseVisit(course: Course, user: TutorsId): void;
  deleteCourseVisit(courseId: string): void;
  getCourseVisits(): void;

  learningEvent(params: Record<string, string>): void;
  startTimer(): void;
  stopTimer(): void;
}

export interface AnalyticsService {
  loRoute: string;

  learningEvent(course: Course, params: Record<string, unknown>, lo: Lo, student: TutorsId): void;
  reportPageLoad(course: Course, lo: Lo, student: TutorsId): void;
  updatePageCount(course: Course, lo: Lo, student: TutorsId): void;
  updateLogin(courseId: string, session: any): void;
}

export interface PresenceService {
  studentsOnline: any;
  partyKitAll: any;
  partyKitCourse: any;
  studentEventMap: Map<string, LoRecord>;
  listeningTo: string;

  studentListener(event: any): void;
  sendLoEvent(course: Course, lo: Lo, student: TutorsId): void;
  startPresenceListener(courseId: string): void;
}
