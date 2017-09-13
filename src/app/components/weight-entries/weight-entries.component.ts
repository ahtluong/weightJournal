import { Component, OnInit } from '@angular/core';
import { WeightEntryService } from '../../services/weight-entry.service';
import { WeightEntry } from '../../models/WeightEntry';

@Component({
  selector: 'app-weight-entries',
  templateUrl: './weight-entries.component.html',
  styleUrls: ['./weight-entries.component.css']
})
export class WeightEntriesComponent implements OnInit {
	weightEntries:WeightEntry[];

  constructor(
  	public weightEntryService:WeightEntryService,
  ) { }

  ngOnInit() {
  	this.weightEntryService.getEntries().subscribe(weightEntries => {
  		this.weightEntries = weightEntries;
  	});
  }

  format(date,month,year) {
    let monthArray = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var dateSuffix = '';
    if (date == 1 || date == 21 || date == 31)
      dateSuffix = 'st';
    else if (date == 2 || date == 22)
      dateSuffix = 'nd';
    else if (date == 3 || date == 23)
      dateSuffix = 'rd';
    else dateSuffix = 'th';
    return monthArray[month-1] + ' ' + date + dateSuffix + ' ' + year;
  }

  onDelete(weightEntry,e) {
    if (e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      this.weightEntryService.removeWeightEntry(weightEntry.$key);
    }
    else {
      var that = this;
      document.getElementById('deleteButton').onclick = function() {
        that.weightEntryService.removeWeightEntry(weightEntry.$key);
      };
    }
  }

  onEdit(weightEntry) {
    this.weightEntryService.setWeightEntry(weightEntry);
  }

}
