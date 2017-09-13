import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WeightEntry } from '../../models/WeightEntry';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import { WeightEntryService } from '../../services/weight-entry.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-edit-weight-entry',
  templateUrl: './edit-weight-entry.component.html',
  styleUrls: ['./edit-weight-entry.component.css']
})
export class EditWeightEntryComponent implements OnInit {
	entryWeight:number;
  entryDate:DateModel;
	dateOptions:DatePickerOptions;
  defaultUnit:string = 'lbs';
	entry = {
		date:0,
		month:0,
		year:0,
		weight:0,
		unit:this.defaultUnit
	}
	weightEntry:any;
	key:string;

  constructor(
    public router:Router,
    public weightEntryService:WeightEntryService,
    public flashMessagesService:FlashMessagesService
  ) {
  	this.dateOptions = new DatePickerOptions();
  	this.dateOptions.format = "MMM Do YYYY";

  	this.weightEntry = this.weightEntryService.getWeightEntry();
    if (this.weightEntry == null)
      this.weightEntry = JSON.parse(localStorage.getItem('weightEntry'));
    else localStorage.setItem('weightEntry', JSON.stringify(this.weightEntry));
  	this.key         = this.weightEntry.$key;
  	this.entryWeight = this.weightEntry.weight;
  	this.entry       = this.weightEntry;

    let monthArray = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var dateSuffix = '';
    if (this.entry.date == 1 || this.entry.date == 21 || this.entry.date == 31)
      dateSuffix = 'st';
    else if (this.entry.date == 2 || this.entry.date == 22)
      dateSuffix = 'nd';
    else if (this.entry.date == 3 || this.entry.date == 23)
      dateSuffix = 'rd';
    else dateSuffix = 'th';
    let formatted = monthArray[this.entry.month-1] + ' ' + this.entry.date + dateSuffix + ' ' + this.entry.year;
  	this.entryDate   = new DateModel({
  		day:this.entry.date.toString(),
      month:this.entry.month.toString(),
      year:this.entry.year.toString(),
      formatted:formatted,
      momentObj:null
  	});
  }

  ngOnInit() {
  }

  onSubmit({value, valid}) {
    if (!valid) {
      this.flashMessagesService.show('Please fill in all fields', { cssClass:'alert-danger', timeout:3000 });
      this.router.navigate(['/edit-weight-entry']);
    } else {
      this.entry.date   = parseInt(this.entryDate.day);
      this.entry.month  = parseInt(this.entryDate.month);
      this.entry.year   = parseInt(this.entryDate.year);
      this.entry.weight = this.entryWeight;
      let key = '-' + (this.entry.year * 10000 + this.entry.month * 100 + this.entry.date).toString();
      if (key == this.key)
      	this.weightEntryService.newWeightEntry(this.entry);
      else {
      	this.weightEntryService.newWeightEntry(this.entry);
      	this.weightEntryService.removeWeightEntry(this.key);
      }
      this.flashMessagesService.show('Weight entry edited', { cssClass:'alert-success', timeout:3000 });
      this.router.navigate(['/']);
    }
  }

}
