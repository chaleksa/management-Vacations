export interface Task {
  start: string;
  end: string;
  type: string;
  title?: string;
  id?: number;
  workerId?: string;
  status?: string;
  notes?: string;
}

export class Worker {
  id: string;
  name: string;
  workerType?: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
