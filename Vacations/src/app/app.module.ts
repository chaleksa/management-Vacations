import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { DataService } from './_services/data.service';

import { VacationsComponent } from './vacations/vacations.component';
import { VacationCardComponent } from './vacations/vacation-card/vacation-card.component';
import { VacationsListComponent } from './vacations/vacations-list/vacations-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'vacations', pathMatch: 'full' },
  {
    path: 'vacations',
    component: VacationsComponent,
    children: [
      { path: '', component: VacationsListComponent},
      { path: 'add', component: VacationCardComponent }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    VacationsComponent,
    VacationCardComponent,
    VacationsListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    RouterModule.forRoot(routes),
    FormsModule,
    FlexLayoutModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
