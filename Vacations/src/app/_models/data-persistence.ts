export interface Task {
  start: string;
  end: string;
  workerId: string;
}

export class Worker {
  id: string;
  name: string;
  workerType?: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
