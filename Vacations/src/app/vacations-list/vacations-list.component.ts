import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { DataService } from '../_services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vacations-list',
  templateUrl: './vacations-list.component.html',
  styleUrls: ['./vacations-list.component.sass']
})
export class VacationsListComponent implements OnInit {

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

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private dataService: DataService, private _router: Router) { }

  async ngOnInit() {
    const allocatedTasks = await this.dataService.getAllocationTasks();

    this.workers = await this.dataService.getWorkers();

    allocatedTasks.map(async (task) => {
      const res = this.workers.filter((rsrs) => task.workerId === rsrs.id);

      await this.ELEMENT_DATA.push({
        name: res[0].name,
        start: task.start,
        end: task.end,
        note: task.notes,
        id: task.id
      });
    });

    this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
    this.workersSource = await this.dataService.getWorkers();
  }

  onRowClicked(row) {
    this.rowChoosen = row;
    this._router.navigateByUrl('/vacation-card', { state: { add: false , taskId: this.rowChoosen.id } });
  }

  openAddForm() {
    this._router.navigateByUrl('/vacation-card', { state: { add: true } });
  }

}
