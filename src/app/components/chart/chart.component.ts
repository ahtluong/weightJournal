import { Component, OnInit } from '@angular/core';
import { WeightEntryService } from '../../services/weight-entry.service';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { WeightEntry } from '../../models/WeightEntry';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  overall:boolean;
  weekly:boolean;
  monthly:boolean;
	weightEntries:WeightEntry[];
  line:string = "line";

	/* Chart */
	weeklyChartData   :Array<any> = [];
  weeklyChartLabels :Array<any> = [];
  overallChartData  :Array<any> = [];
  overallChartLabels:Array<any> = [];
  monthlyChartData  :Array<any> = [];
  monthlyChartLabels:Array<any> = [];
	chartOptions:any = {
		responsive:true,
		scales: {
			xAxes: [{
				type: 'time',
				time: {
					displayFormats: {
						day: 'MM/DD/YY'
					}
				},
				scaleLabel: {
					display: true,
					labelString: 'Date'
				}
			}],
			yAxes: [{
				scaleLabel: {
					display: true,
					labelString: 'Weight'
				}
			}]
		},
		tooltips: {
			callbacks: {
				title: function(tooltipItem,data) {
    			let monthArray = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    			let date  = tooltipItem[0].xLabel.getDate();
    			let month = tooltipItem[0].xLabel.getMonth();
    			let year  = tooltipItem[0].xLabel.getFullYear();
    			var dateSuffix = '';
    			if (date == 1 || date == 21 || date == 31)
    			  dateSuffix = 'st';
    			else if (date == 2 || date == 22)
    			  dateSuffix = 'nd';
    			else if (date == 3 || date == 23)
    			  dateSuffix = 'rd';
    			else dateSuffix = 'th';
    			return monthArray[month-1] + ' ' + date + dateSuffix + ' ' + year;
    		},
        label:function(tooltipItem,data) {
          return tooltipItem.yLabel;
        }
			}
		}
	};
	lineChartColors:Array<any> = [{
    backgroundColor: 'rgba(255,102,0,0.1)',
    borderColor: '#FF6600',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }];
  scatterChartColors:Array<any> = [{
    backgroundColor: 'rgba(255,102,0,0.1)',
    borderColor: '#FF6600',
    pointBackgroundColor: '#FF6600',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }];
  chartLegend:boolean = false;
  chartType:string;
  /****************/

  constructor(
  	public weightEntryService:WeightEntryService
  ) { }

  ngOnInit() {
    this.onOverallProgress();
  }

  createDate(date,month,year) {
  	return new Date(year, month, date);
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

  chartClicked(e:any):void {
    console.log(e);
  }
 
  chartHovered(e:any):void {
    console.log(e);
  }

  onWeeklyProgress() {
    this.weekly  = true;
    this.monthly = false;
    this.overall = false;

    // ChartData
    // Get this week Monday
    var date = new Date();
    var day = date.getDay() || 7;  
    if( day !== 1 ) 
      date.setHours(-24 * (day - 1));

    // Calculate the value of Monday
    let monday = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();

    let weeklyChartLabels:Array<any> = [];
    let weeklyData:Array<any> = [];

    this.weightEntryService.getEntries().subscribe(weightEntries => {
      for (var i = 0; i < 7; i++) {
        weeklyChartLabels.push(this.createDate(date.getDate(), date.getMonth(), date.getFullYear()));
        date.setTime(date.getTime() + 1000*3600*24);
        let value = weightEntries[i].year * 10000 + weightEntries[i].month * 100 + weightEntries[i].date;
        if (value >= monday)
          weeklyData.push(weightEntries[i].weight);
        else
          weeklyData.push(null);
      }
      let datasets = [{
        data: weeklyData
      }] ;
      this.weeklyChartData   = datasets;
      this.weeklyChartLabels = weeklyChartLabels;
      this.chartOptions.scales.xAxes[0].time.displayFormats.day = 'ddd Do, MMM YYYY';
    });
  }

  onOverallProgress() {
    this.overall = true;
    this.monthly = false;
    this.weekly  = false;

    // ChartData
    let overallData:Array<number> = [];
    let overallChartLabels:Array<any> = [];
    this.weightEntryService.getEntries().subscribe(weightEntries => {
      this.weightEntries = weightEntries;
      for (var i = weightEntries.length - 1; i >= 0; i--) {
        overallData.push(weightEntries[i].weight);
        overallChartLabels.push(this.createDate(weightEntries[i].date,weightEntries[i].month-1,weightEntries[i].year));
      }
      let datasets = [{
        data: overallData
      }] ;
      this.overallChartData   = datasets;
      this.overallChartLabels = overallChartLabels;
      this.chartOptions.scales.xAxes[0].time.displayFormats.day = 'MM/DD/YY';
    });
  }

  onMonthlyProgress() {
    this.monthly = true;
    this.overall = false;
    this.weekly  = false;

    // ChartData
    let month = new Date().getMonth() + 1;
    let monthlyData:Array<number> = [];
    let monthlyChartLabels:Array<any> = [];
    this.weightEntryService.getEntries().subscribe(weightEntries => {
      for (var i = 0; i < weightEntries.length; i++) {
        if (weightEntries[i].month == month) {
          monthlyData.unshift(weightEntries[i].weight);
          monthlyChartLabels.unshift(this.createDate(weightEntries[i].date,weightEntries[i].month-1,weightEntries[i].year));
        }
      }
      let datasets = [{
        data: monthlyData
      }];
      this.monthlyChartData   = datasets;
      this.monthlyChartLabels = monthlyChartLabels;
      this.chartOptions.scales.xAxes[0].time.displayFormats.day = 'MM/DD/YY';
    });
  }

}
