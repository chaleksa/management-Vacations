import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';

@Component({
  selector: 'app-vacation-card',
  templateUrl: './vacation-card.component.html',
  styleUrls: ['./vacation-card.component.sass']
})
export class VacationCardComponent implements OnInit {

  workersSource$;
  isAddMode = false;
  taskId;
  vacationStart;
  vacationEnd;
  workerId;
  workerData$;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private afs: AngularFirestore, private activatedRoute: ActivatedRoute,
    private _location: Location) {

    this.activatedRoute.paramMap
      .pipe(map(() => window.history.state)).subscribe(res => {

        this.isAddMode = res.add;

        if (!this.isAddMode) {
        this.taskId = res.taskId;
        this.vacationStart = res.start;
        this.vacationEnd = res.end;
        this.workerId = res.workerId;
        }
      });

    this.workersSource$ = this.afs.collection('Workers').snapshotChanges().pipe(
      map(workers => {
        return workers.map(worker => {
          const workerData: Object = worker.payload.doc.data();
          const workerId = worker.payload.doc.id;
          return { workerId, ...workerData };
        });
      })
    );

    if (!this.isAddMode) {
        this.workerData$ =  this.afs.collection('Workers').doc(this.workerId).valueChanges();
      }
  }

  ngOnInit() {
  }

  async onSubmit(form: NgForm) {

    const newVacationData = { ...form.value };
    const startDate = typeof(newVacationData.start) === 'object' ? newVacationData.start.format('YYYY-MM-DDTHH:mm:ss') : newVacationData.start;
    const endDate = typeof(newVacationData.end) === 'object' ? newVacationData.end.format('YYYY-MM-DDTHH:mm:ss') : newVacationData.end;

    if (this.isAddMode) {
      this.afs.collection('Tasks').doc(this.afs.createId()).set(
        {
          start: startDate,
          end: endDate,
          workerId: newVacationData.workerId
        }
      );
    } else {
      this.afs.collection('Tasks').doc(this.taskId).update({
        start: startDate,
          end: endDate
      });
    }

  }
  return() {
    this._location.back();
  }

  delete() {
    this.afs.collection('Tasks').doc(this.taskId).delete();
    this._location.back();
  }
}
