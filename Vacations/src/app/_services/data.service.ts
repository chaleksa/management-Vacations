import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task, Worker } from '../_models/data-persistence';

@Injectable()
export class DataService {
  workers: any[] = [];
  tasks: Task[];
 
  constructor(private http: HttpClient) {
  }

  async getTasks(): Promise<any> {
    return new Promise(responce => {
      if (localStorage.getItem('tasks')) {
        setTimeout(() => {
          this.tasks = JSON.parse(localStorage.getItem('tasks'));
          responce(this.tasks);
        }, 100);
      } else {
        this.http.get('../../../assets/dummyData/dummyTasks.json').subscribe((tasks: any[]) => {
          setTimeout(() => {
            this.tasks = tasks;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            responce(this.tasks);
          }, 100);
        });
      }
    });
  }
  
  async deleteTask(taskId): Promise<any[]> {
    let indexToRemove: number;
    this.tasks = await this.getTasks();
    this.tasks.map((taskItem, index) => {
      if (taskItem.id === parseInt(taskId, 10)) {
        indexToRemove = index;
      }
    });
    this.tasks.splice(indexToRemove, 1);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    return Promise.resolve(this.tasks);
  }

   async updateVacationDatesAndNotes(newNotes, newStart, newEnd, taskId): Promise<any[]> {
    await this.getAllocationTasks();
    this.tasks.map((taskItem) => {
      if (taskItem.id === parseInt(taskId, 10)) {
        taskItem.notes = newNotes;
        taskItem.start = newStart;
        taskItem.end = newEnd;
      }
    });
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    return Promise.resolve(this.tasks);
  }

  async getAllocationTasks(): Promise<Task[]> {
    const filteredTasks: Task[] = [];
    await this.getTasks();
    this.tasks.map((task) => {
      if (task.type === 'Allocation') {
        filteredTasks.push(task);
      }
    });
    return Promise.resolve(filteredTasks);
  }

  async getMaxIdValue(dataName: string): Promise<number> {
    let maxIdValue = 0;
    if (this[`${dataName}`].length) {
      this[`${dataName}`].map((item) => maxIdValue = (item.id > maxIdValue) ? item.id : maxIdValue);
    }
    return Promise.resolve(maxIdValue);
  }
  
  async addTask(newTask: Task): Promise<number> { 
    this.tasks = await this.getTasks();
    newTask.id = await this.getMaxIdValue('tasks') + 1;
    if (!newTask.title) {
      newTask.title = `${newTask.type} Task ${newTask.id}`;
    }
    this.tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    return Promise.resolve(newTask.id);
  }

  async getWorkers(): Promise<any> {
    return new Promise(responce => {
    if (localStorage.getItem('workers')) {
      setTimeout(() => {
        this.workers = JSON.parse(localStorage.getItem('workers'));
        responce(this.workers);
      }, 100);
    } else {
      this.http.get('../../../assets/dummyData/dummyWorkers.json').subscribe((workers: any[]) => {
        setTimeout(() => {
          this.workers = workers;
          localStorage.setItem('workers', JSON.stringify(workers));
          responce(this.workers);
        }, 100);
      });
    }
  });
  }

  async getTaskById(taskId): Promise<Task> {
    await this.getTasks();
    return Promise.resolve(this.tasks.filter((task) => task.id === taskId)[0]);
  }

  async getWorkerById(workerId): Promise<Worker> {
    await this.getWorkers();
    return Promise.resolve(this.workers.filter((worker) => worker.id === workerId)[0]);
  }
}
