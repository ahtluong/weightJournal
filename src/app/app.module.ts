import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// AngularFire Imports
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

// Other
import { DatePickerModule } from 'ng2-datepicker';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { FlashMessagesModule } from 'angular2-flash-messages';

// Component Imports
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WeightEntriesComponent } from './components/weight-entries/weight-entries.component'
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AddWeightEntryComponent } from './components/add-weight-entry/add-weight-entry.component';
import { EditWeightEntryComponent } from './components/edit-weight-entry/edit-weight-entry.component';
import { ChartComponent } from './components/chart/chart.component';

// Service Imports
import { WeightEntryService } from './services/weight-entry.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes = [
  { path: ''                 , component:DashboardComponent      , canActivate:[AuthGuard] },
  { path: 'add-weight-entry' , component:AddWeightEntryComponent , canActivate:[AuthGuard] },
  { path: 'edit-weight-entry', component:EditWeightEntryComponent, canActivate:[AuthGuard] },
  { path: 'chart'            , component:ChartComponent          , canActivate:[AuthGuard] },
  { path: 'register'         , component:RegisterComponent                                 },
  { path: 'login'            , component:LoginComponent                                    }
];

export const firebaseConfig = {
  apiKey: "AIzaSyBLjKt8AuXNF5LM4MWFDL1LYgxvkpdaSvs",
  authDomain: "weightjournal1.firebaseapp.com",
  databaseURL: "https://weightjournal1.firebaseio.com",
  storageBucket: "weightjournal1.appspot.com",
  messagingSenderId: "402612925961"
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    WeightEntriesComponent,
    AddWeightEntryComponent,
    EditWeightEntryComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FlashMessagesModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig),
    DatePickerModule,
    ChartsModule
  ],
  providers: [
    AngularFireAuth,
    AngularFireDatabase,
    WeightEntryService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
