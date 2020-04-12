import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { DataService } from '../_services/data.service';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Observable, combineLatest, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-vacations-list',
  templateUrl: './vacations-list.component.html',
  styleUrls: ['./vacations-list.component.sass']
})
export class VacationsListComponent implements OnInit {


  private tasksCollection: AngularFirestoreCollection;
  private workersCollection: AngularFirestoreCollection;
  items;
  item = [];

  displayedColumns = ['name', 'date', 'linkColumn'];
  dataSource;
  workers;
  workersSource;

  rowChoosen = {
    end: undefined,
    id: undefined,
    name: undefined,
    note: undefined,
    start: undefined
  };

  ELEMENT_DATA = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private dataService: DataService, private _router: Router, private afs: AngularFirestore) {
    this.items = this.afs.collection('Tasks').valueChanges().pipe(
      map(items => {
        return items.map((item: any) => {
          this.afs.collection('Workers', ref => ref.where('id', '==', item.workerId))
          .valueChanges().
          subscribe((res: any) => item.workerName = res[0].name);
              return item;
            });
        })
    );
  }

  ngOnInit() {
    console.log('this.items ' + JSON.stringify(this.items.workers))
    this.dataSource = new MatTableDataSource<any>(this.items);
    // this.dataSource.paginator = this.paginator;
    // this.items.paginator = this.paginator;
    this.workersSource = this.dataService.getWorkers();
  }

  onRowClicked(row) {
    console.log(row)
    this.rowChoosen = row;
    this._router.navigateByUrl('/vacation-card', { state: { add: false, taskId: this.rowChoosen.id, ...row } });
  }

  openAddForm() {
    this._router.navigateByUrl('/vacation-card', { state: { add: true } });
  }

}
