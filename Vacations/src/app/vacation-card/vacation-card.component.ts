import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { DataService } from '../_services/data.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-vacation-card',
  templateUrl: './vacation-card.component.html',
  styleUrls: ['./vacation-card.component.sass']
})
export class VacationCardComponent implements OnInit {

  workersSource;
  isAddMode = false;
  taskId;
  state;
  task;
  worker;
  workerName;
  vacationStart;
  vacationEnd;
  vacationNotes;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private dataService: DataService,
              private activatedRoute: ActivatedRoute,
              private _location: Location) { }

  async ngOnInit() {

    this.activatedRoute.paramMap
      .pipe(map(() => window.history.state)).subscribe(res => {
        this.workerName = res.workerName;
        this.vacationStart = res.start;
        this.vacationEnd = res.end;
        this.vacationNotes = res.notes;
        this.isAddMode = res.add;

       if (!res.add) {
        this.taskId = res.taskId;
       }
      });

    if (!this.isAddMode) {
      // this.task = await this.dataService.getTaskById(this.taskId);
      // console.log('task ' + this.task);
      // this.worker = await this.dataService.getWorkerById(this.task.workerId);
      // console.log('worker ' + this.worker);
      // this.workerName = this.worker.name;
      // this.vacationStart = this.task.start;
      // this.vacationEnd = this.task.end;
      // this.vacationNotes = this.task.notes;
    }

    this.workersSource = await this.dataService.getWorkers();
  }

  async onSubmit(form: NgForm) {

    const newVacationData = { ...form.value };

    if (this.isAddMode) {
      const newVacation = { ...newVacationData, notes: newVacationData.notes,
        workerId: newVacationData.workerId, status: 'Pending', type: 'Allocation' };
      const newTaskId = await this.dataService.addTask(newVacation);
    } else {
      const updateVacation = await this.dataService.updateVacationDatesAndNotes(newVacationData.notes,
        newVacationData.start, newVacationData.end, this.taskId);
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
