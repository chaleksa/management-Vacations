import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-vacations-list',
  templateUrl: './vacations-list.component.html',
  styleUrls: ['./vacations-list.component.sass']
})
export class VacationsListComponent implements OnInit {

  items$;

  displayedColumns = ['name', 'date', 'linkColumn'];
  workersSource;

  constructor(private _router: Router, private afs: AngularFirestore) {
    this.items$ = this.afs.collection('Tasks').snapshotChanges().pipe(
      map(items => {
        return items.map((item: any) => {
          const itemData = item.payload.doc.data();
          const id = item.payload.doc.id;
          const name$ = this.afs.collection('Workers').doc(itemData.workerId).valueChanges();
          return { id, name$, ...itemData };
        });
      })
    );
  }

  ngOnInit() {
  }

  onRowClicked(row) {
    this._router.navigateByUrl('/vacation-card', {
      state: {
        add: false,
        taskId: row.id,
        workerId: row.workerId,
        start: row.start,
        end: row.end
      }
    });
  }

  openAddForm() {
    this._router.navigateByUrl('/vacation-card', { state: { add: true } });
  }

}
