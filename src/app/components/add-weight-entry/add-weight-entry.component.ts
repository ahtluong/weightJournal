import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WeightEntry } from '../../models/WeightEntry';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import { WeightEntryService } from '../../services/weight-entry.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-add-weight-entry',
  templateUrl: './add-weight-entry.component.html',
  styleUrls: ['./add-weight-entry.component.css']
})
export class AddWeightEntryComponent implements OnInit {
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

  constructor(
    public router:Router,
    public weightEntryService:WeightEntryService,
    public flashMessagesService:FlashMessagesService
  ) {
  	this.dateOptions = new DatePickerOptions();
  	this.dateOptions.format = "MMM Do YYYY";
  	let date = new Date();
    let monthArray = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let getDate  = date.getDate();
    let getMonth = date.getMonth() + 1;
    let getYear  = date.getFullYear().toString();
    var dateSuffix = '';
    if (getDate == 1 || getDate == 21 || getDate == 31)
      dateSuffix = 'st';
    else if (getDate == 2 || getDate == 22)
      dateSuffix = 'nd';
    else if (getDate == 3 || getDate == 23)
      dateSuffix = 'rd';
    else dateSuffix = 'th';
    let formatted = monthArray[getMonth-1] + ' ' + getDate + dateSuffix + ' ' + getYear;
  	this.entryDate = new DateModel({
  		day:getDate.toString(),
      month:getMonth.toString(),
      year:getYear,
      formatted:formatted,
      momentObj:null
  	});
  }

  ngOnInit() {
  }

  onSubmit({value, valid}) {
    if (!valid) {
      this.flashMessagesService.show('Please fill in all fields', { cssClass:'alert-danger', timeout:3000 });
      this.router.navigate(['/add-weight-entry']);
    } else {
      this.entry.date   = parseInt(this.entryDate.day);
      this.entry.month  = parseInt(this.entryDate.month);
      this.entry.year   = parseInt(this.entryDate.year);
      this.entry.weight = this.entryWeight;
      this.weightEntryService.newWeightEntry(this.entry);
      this.flashMessagesService.show('New weight entry added', { cssClass:'alert-success', timeout:3000 });
      this.router.navigate(['/']);
    }
  }

}
