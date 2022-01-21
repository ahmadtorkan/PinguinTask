export interface Issue {
  expand: string;
  id: string;
  self: string;
  key: string;
  renderedFields: RenderedFields;
  fields: Fields;
}
export interface RenderedFields {
  statuscategorychangedate: string;
  issuetype?: any;
  timespent?: any;
  customfield_10030?: any;
  project?: any;
  fixVersions?: any;
  aggregatetimespent?: any;
  resolution?: any;
  customfield_10027?: any;
  customfield_10028?: any;
  customfield_10029?: any;
  resolutiondate?: any;
  workratio?: any;
  issuerestriction?: any;
  watches?: any;
  lastViewed?: string;
  created: string;
  customfield_10020?: any;
  customfield_10021?: any;
  customfield_10022?: any;
  customfield_10023?: any;
  priority?: any;
  customfield_10024?: any;
  labels?: any;
  customfield_10016?: any;
  customfield_10017: string;
  customfield_10018?: any;
  customfield_10019?: any;
  aggregatetimeoriginalestimate?: string;
  timeestimate?: string;
  versions?: any;
  issuelinks?: any;
  assignee?: any;
  updated: string;
  status?: any;
  components?: any;
  timeoriginalestimate?: string;
  description: string;
  customfield_10010?: any;
  customfield_10011: string;
  customfield_10012?: any;
  customfield_10013: string;
  customfield_10014?: any;
  customfield_10015?: any;
  timetracking: Timetracking;
  customfield_10005?: any;
  customfield_10006?: any;
  security?: any;
  customfield_10007?: any;
  customfield_10008?: any;
  aggregatetimeestimate?: string;
  attachment: Attachment[];
  customfield_10009?: any;
  summary?: any;
  creator?: any;
  subtasks?: any;
  reporter?: any;
  customfield_10000?: any;
  aggregateprogress?: any;
  customfield_10001?: any;
  customfield_10002?: any;
  customfield_10003?: any;
  customfield_10004?: any;
  environment: string;
  duedate?: string;
  progress?: any;
  votes?: any;
  comment: Comment;
  worklog: Worklog;
}
export interface Timetracking {
  originalEstimate?: string;
  originalEstimateSeconds: number;
  remainingEstimate?: string;
  remainingEstimateSeconds?: number;
}
export interface Worklog {
  startAt: number;
  maxResults: number;
  total: number;
  worklogs: any[];
}

export interface Fields {
  statuscategorychangedate: string;
  issuetype: Issuetype;
  timespent?: any;
  customfield_10030?: any;
  project: Project;
  fixVersions: any[];
  aggregatetimespent?: any;
  resolution?: any;
  customfield_10027?: any;
  customfield_10028?: any;
  customfield_10029?: any;
  resolutiondate?: any;
  workratio: number;
  issuerestriction: Issuerestriction;
  watches: Watches;
  lastViewed?: string;
  created: string;
  customfield_10020?: any;
  customfield_10021?: any;
  customfield_10022: string;
  customfield_10023: any[];
  priority: Priority;
  customfield_10024?: any;
  labels: string[];
  customfield_10016?: any;
  customfield_10017?: any;
  customfield_10018: Customfield10018;
  customfield_10019?: any;
  aggregatetimeoriginalestimate?: number;
  timeestimate?: number;
  versions: any[];
  issuelinks: any[];
  assignee?: any;
  updated: string;
  status: Status;
  components: any[];
  timeoriginalestimate?: number;
  description?: string;
  customfield_10010?: any;
  customfield_10011: string;
  customfield_10012: Customfield10012;
  customfield_10013: string;
  customfield_10014?: any;
  customfield_10015?: any;
  timetracking: Timetracking;
  customfield_10005?: any;
  customfield_10006?: any;
  security?: any;
  customfield_10007?: any;
  customfield_10008?: any;
  aggregatetimeestimate?: number;
  attachment: Attachment2[];
  customfield_10009?: any;
  summary: string;
  creator: Creator;
  subtasks: any[];
  reporter: Creator;
  customfield_10000: string;
  aggregateprogress: Aggregateprogress;
  customfield_10001?: any;
  customfield_10002?: any;
  customfield_10003?: any;
  customfield_10004?: any;
  environment?: any;
  duedate: string;
  progress: Aggregateprogress;
  votes: Votes;
  comment: Comment;
  worklog: Worklog;
}
export interface Issuetype {
  self: string;
  id: string;
  description: string;
  iconUrl: string;
  name: string;
  subtask: boolean;
}
export interface Project {
  self: string;
  id: string;
  key: string;
  name: string;
  projectTypeKey: string;
  simplified: boolean;
  avatarUrls: AvatarUrls;
}
export interface Issuerestriction {
  issuerestrictions: Issuerestrictions;
  shouldDisplay: boolean;
}
export interface Watches {
  self: string;
  watchCount: number;
  isWatching: boolean;
}
export interface Customfield10018 {
  hasEpicLinkFieldDependency: boolean;
  showField: boolean;
  nonEditableReason: NonEditableReason;
}
export interface NonEditableReason {
  reason: string;
  message: string;
}
export interface Status {
  self: string;
  description: string;
  iconUrl: string;
  name: string;
  id: string;
  statusCategory: StatusCategory;
}
export interface StatusCategory {
  self: string;
  id: number;
  key: string;
  colorName: string;
  name: string;
}
export interface Customfield10012 {
  self: string;
  value: string;
  id: string;
}
export interface Attachment2 {
  self: string;
  id: string;
  filename: string;
  author: Author;
  created: string;
  size: number;
  mimeType: string;
  content: string;
  thumbnail: string;
}
export interface Creator {
  self: string;
  accountId: string;
  avatarUrls: AvatarUrls;
  displayName: string;
  active: boolean;
  timeZone: string;
  accountType: string;
  emailAddress?: string;
}
export interface Votes {
  self: string;
  votes: number;
  hasVoted: boolean;
}

export interface Aggregateprogress {
  progress: number;
  total: number;
  percent?: number;
}
export interface Issuerestrictions {}
export interface Attachment {
  self: string;
  id: string;
  filename: string;
  author: Author;
  created: string;
  size: string;
  mimeType: string;
  content: string;
  thumbnail: string;
}
export interface Author {
  self: string;
  accountId: string;
  emailAddress: string;
  avatarUrls: AvatarUrls;
  displayName: string;
  active: boolean;
  timeZone: string;
  accountType: string;
}
export interface AvatarUrls {
  "48x48": string;
  "24x24": string;
  "16x16": string;
  "32x32": string;
}
export interface Priority {
  self: string;
  iconUrl: string;
  name: string;
  id: string;
}
