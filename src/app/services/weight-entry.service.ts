import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { WeightEntry } from '../models/WeightEntry';

@Injectable()
export class WeightEntryService {
	weightEntries:FirebaseListObservable<any[]>;
	weightEntry:FirebaseObjectObservable<any>;
  uid:string;

  constructor(
  	public af:AngularFireDatabase,
    public authService:AuthService
  ) {
    this.authService.getAuth().subscribe(auth => {
      if (auth)
        this.uid = auth.uid;
      this.weightEntries = this.af.list('/private/-' + this.uid + '/weightEntries');
    });
  }

  getEntries() {
  	return this.weightEntries;
  }

  newWeightEntry(weightEntry) {
    let key = weightEntry.year * 10000 + weightEntry.month * 100 + weightEntry.date;
    this.af.object('/private/-' + this.uid + '/weightEntries/-' + key).set(weightEntry);
  }

  removeWeightEntry(key) {
    this.af.object('/private/-' + this.uid + '/weightEntries/' + key).remove();
  }

  setWeightEntry(weightEntry) {
    this.weightEntry = weightEntry;
  }

  getWeightEntry() {
    return this.weightEntry;
  }
}
