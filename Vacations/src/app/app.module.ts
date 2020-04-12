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

import { VacationCardComponent } from './vacation-card/vacation-card.component';
import { VacationsListComponent } from './vacations-list/vacations-list.component';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';

const routes: Routes = [
  { path: '', redirectTo: 'vacations', pathMatch: 'full' },
  { path: 'vacations', component: VacationsListComponent },
  { path: 'vacation-card', component: VacationCardComponent }
];

@NgModule({
  declarations: [
    AppComponent,
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
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
