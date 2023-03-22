import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables} from 'chart.js';
import { TestService } from 'src/environments/services/test.service';

import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { query, where, getDocs } from 'firebase/firestore';
import { Observable } from 'rxjs';

Chart.register(...registerables);


@Component({
  selector: 'app-p3',
  templateUrl: './p3.page.html',
  styleUrls: ['./p3.page.scss'],
})
export class P3Page implements AfterViewInit {
  // Importing ViewChild. We need @ViewChild decorator to get a reference to the local variable 
  // that we have added to the canvas element in the HTML template.
  @ViewChild('lineCanvas') private lineCanvas: ElementRef;

  // private fs: Firestore;
  lineChart: any;

  lastSeven: any;


  constructor(firestore: Firestore, public _testService: TestService) { 
    this.queryData(firestore, "sampleUsername@gmail.com");
  }

  // When we try to call our chart to initialize methods in ngOnInit() it shows an error nativeElement of undefined. 
  // So, we need to call all chart methods in ngAfterViewInit() where @ViewChild and @ViewChildren will be resolved.
  ngAfterViewInit() {
    this.lineChartMethod()
  }

  async queryData(firestore: Firestore, email: string) {
    const profileDatabase = collection(firestore, 'profile');
    const q = query(profileDatabase, where("username", "==", email));
    const queryTester = await getDocs(q);
    if (queryTester.size == 0) {
      // users need to input their biometric data
  
    } else if (queryTester.size == 1) {
      // users have created the accounts, and we need to load their previous data
  
    }
    console.log(queryTester.size);
    queryTester.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      this.lastSeven = Array.from(doc.data()["lastSevenDays"])
    })
  }

  getDates(){
	// var today = new Date();
	// var dd = String(today.getDate()).padStart(2, '0');
	// var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	// var yyyy = today.getFullYear();

	// var today_string = mm + '/' + dd + '/' + yyyy;
	// console.log(today_string);
	var dates = [];

	for (var i = 0; i < 7; i++) {
		var d = new Date();
		d.setDate(d.getDate() - i);
		var dd = String(d.getDate()).padStart(2, '0');
		var mm = String(d.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yy = String(d.getFullYear()).substr(-2);
		var dateStr = mm + '/' + dd + '/' + yy;
		dates.push(dateStr);
	}

  // console.log("DATES OBJ:", typeof dates)

	return dates.reverse();
  }

  test() {
    console.log("BRUHv", this.lineChart["data"]["datasets"][1]["data"]);
    this.lineChart["data"]["datasets"][1]["data"] = this.lastSeven;
    this.lineChart.update();
  }

  lineChartMethod() {
    console.log("CHART")

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.getDates(),
        datasets: [
          {
            label: 'Water Drank',
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this._testService.temp,
            spanGaps: false,
          },
		  {
            label: 'Water Recommendation',
            fill: false,
            backgroundColor: 'rgba(245, 90, 66,0.4)',
            borderColor: 'rgba(245, 90, 66,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(245, 90, 66,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(245, 90, 66,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this._testService.temp2,
            spanGaps: false,
          }

        ]
      },
		options: {
		  scales: {
			x: {
				title: {
				  display: true,
				  text: 'Dates'
			  }
			},
			y: {
			  title: {
				display: true,
				text: 'Amount of Water (oz)'
			}
		  }
		}
	  }
    });
  }
}

































// import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { TestService } from 'src/environments/services/test.service';
// import { Chart } from 'chart.js';
// @Component({
//   selector: 'app-p3',
//   templateUrl: './p3.page.html',
//   styleUrls: ['./p3.page.scss'],
// })
// export class P3Page implements OnInit {
//   @ViewChild('barCanvas')

//   barChart: any;
//   constructor(private _testService: TestService, public barCanvas: ElementRef) { }
//   ngOnInit() {
//   }

//   ionViewWillEnter(){
// 	this.barChartMethod();
//   }

//   barChartMethod(){
// 	this.barChart = new Chart(this.barCanvas.nativeElement, {
// 		type: 'bar',
// 		data: {
// 			labels: [2017, 2018, 2019, 2020],
// 			datasets: [{
// 				barPercentage: 0.8,
// 				barThickness: 'flex',
// 				label: "Type 1",
// 				stack: "Base",
// 				backgroundColor: " #E1BA24",
// 				data: [10,20,30,32],
// 			},{
// 				barPercentage: 0.8,
// 				barThickness: 'flex',
// 				label: "Type 1",
// 				stack: "Base",
// 				backgroundColor: " #E1BA24",
// 				data: [15,23,35,38],
// 			}]
// 		},
// 		options: {
// 			scales: {
// 				y: {
// 					beginAtZero: true
// 				}
// 			}
// 		}
// 	})
//   }

// }
