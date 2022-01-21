export interface TaskCard {
  id: number;
  icon?: string;
  canDrag?: boolean;
  summery?: string;
  key?: string;
  description?: string;
  startPos: number;
  //
  startDate: Date;
  endDate: Date;
  estimationDays: number;
  //with weekend days
  realDays: number;
  //
  labels?: string[];
  dueNote?: string;
  creatorName?: string;
  creatorAbb?: string;
  color?: string;
}
