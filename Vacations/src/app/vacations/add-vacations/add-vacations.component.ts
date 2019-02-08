import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { DataService } from '../../_services/data.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-vacations',
  templateUrl: './add-vacations.component.html',
  styleUrls: ['./add-vacations.component.sass']
})
export class AddVacationsComponent implements OnInit {

  workersSource;
  state;
  isAddMode = false; 
  taskId;
  task;
  worker;
  workerName;
  vacationStart;
  vacationEnd;
  vacationNotes;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dataService: DataService, route: ActivatedRoute, private _location: Location) {
    this.state = parseInt(route.snapshot.params['state']);

    if (this.state) {
      this.isAddMode = true;
    }

    this.taskId = parseInt(route.snapshot.params['id']);
  }

  async ngOnInit() {

    
    if (!this.isAddMode) {
      this.task = await this.dataService.getTaskById(this.taskId);
      this.worker = await this.dataService.getWorkerById(this.task.workerId);
      this.workerName = this.worker.name;
      this.vacationStart = this.task.start;
      this.vacationEnd = this.task.end;
      this.vacationNotes = this.task.notes;
    }

    this.workersSource = await this.dataService.getWorkers();
  }

  async onSubmit(form: NgForm) {

    const newVacationData = { ...form.value };

    if (this.isAddMode) {
      const newVacation = { ...newVacationData, notes: newVacationData.notes, workerId: newVacationData.workerId, status: 'Pending', type: 'Allocation' };
      const newTaskId = await this.dataService.addTask(newVacation);
    } else { 
      const updateVacation = await this.dataService.updateVacationDatesAndNotes(newVacationData.notes, newVacationData.start, newVacationData.end, this.taskId)
    }

  }
  return() {
    this._location.back();
  }

  delete() {
    this.dataService.deleteTask(this.taskId);
    this._location.back();
  }

}
