import { Component, Inject, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HealthKit, HealthKitOptions} from '@awesome-cordova-plugins/health-kit/ngx';
import { Geolocation } from '@capacitor/geolocation';
import { Platform } from '@ionic/angular';

import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { getFirestore } from 'firebase/firestore';

interface Item {
  height: number,
  weight: number,
  name: string,
};


@Component({
  selector: 'app-p1',
  templateUrl: './p1.page.html',
  styleUrls: ['./p1.page.scss'],
})
export class P1Page implements OnInit {
  latitude = 0;
  longitude = 0;
  age?: number;
  gender?: string;
  height?: number;
  weight?: number;
  temp = 0;
  stepcount = "No Data";
  caloriesBurned = "No Data";

  item$: Observable<Item[]>;

  constructor(
    private http: HttpClient,
    private healthKit: HealthKit,
    @Inject('API_KEY') private apiKey: string,
	  private plt: Platform,
    firestore: Firestore)  { 

    console.log("API KEY:", this.apiKey)
    this.ngOnInit();

    this.plt.ready().then(() => {
      this.healthKit.available().then(available => {
        if (available) {
        // Request all permissions up front if you like to
        var options: HealthKitOptions = {
          readTypes: ['HKQuantityTypeIdentifierHeight', 'HKQuantityTypeIdentifierStepCount', 'HKWorkoutTypeIdentifier', 'HKQuantityTypeIdentifierActiveEnergyBurned', 'HKQuantityTypeIdentifierDistanceCycling'],
          writeTypes: ['HKQuantityTypeIdentifierHeight', 'HKWorkoutTypeIdentifier', 'HKQuantityTypeIdentifierActiveEnergyBurned', 'HKQuantityTypeIdentifierDistanceCycling']
        }
        this.healthKit.requestAuthorization(options).then(_ => {
          this.loadHealthData();
        })
        }
      });
    });

    const temp = collection(firestore, 'profile');
    this.item$ = collectionData(temp) as Observable<Item[]>

  }

  async loadHealthData() {
    var stepOptions = {
      startDate: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      endDate: new Date(),
      sampleType: 'HKQuantityTypeIdentifierStepCount',
      unit: 'count'
    }

    var calorieOptions = {
      startDate: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      endDate: new Date(),
      sampleType: 'HKQuantityTypeIdentifierActiveEnergyBurned',
      unit: 'kcal'
    }

    this.healthKit.querySampleType(stepOptions).then(data => {
      let stepSum = data.reduce((a: any, b: any) => a + b.quantity, 0);
      this.stepcount = stepSum;
    }, err => {
      console.log('No steps: ', err);
    });

    this.healthKit.querySampleType(calorieOptions).then(data => {
      let calorieSum = data.reduce((a: any, b: any) => a + b.quantity, 0);
    this.caloriesBurned = calorieSum;
    }, err => {
      console.log('No calories: ', err);
    });

  }

  async ngOnInit() {
    await this.getCurrentPosition();
    this.getWeather();
  }

  async getCurrentPosition() {
    const position = await Geolocation.getCurrentPosition();
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
  }

  async getWeather() {
    // Change this later so api key is hidden
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&appid=${this.apiKey}&units=imperial`; 
    this.http.get(url).subscribe((data: any) => {
      this.temp = data.main.temp;
    });
  }

  async buttonTest() {
    console.log("HEIGHT:", this.height)
    console.log("WEIGHT:", this.weight)

    //const db = getFirestore()
    //const temp2 = {name: "joe", height: this.height, weight: this.weight}
    //const res = await collection(db, "profile").id("testDoc").set(temp2)
  }
}
