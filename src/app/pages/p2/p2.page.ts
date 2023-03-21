import { Component, Inject, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HealthKit, HealthKitOptions} from '@awesome-cordova-plugins/health-kit/ngx';
import { Geolocation } from '@capacitor/geolocation';
import { Platform } from '@ionic/angular';
import { TestService } from 'src/environments/services/test.service';

import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { query, where, getDocs, doc, setDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { getFirestore } from 'firebase/firestore';




interface RegResult {
  docName: string,
  email: string,
  water: number
};


@Component({
  selector: 'app-p2',
  templateUrl: './p2.page.html',
  styleUrls: ['./p2.page.scss'],
})

export class P2Page implements OnInit {
  latitude = 0;
  longitude = 0;
  city = "No Data";
  temp = 0;
  stepcount = "No Data";
  heartRate = "No Data";
  caloriesBurned = "No Data";

//   item$: Observable<Item[]>;
  regressorResult: number;
  constructor(public _testService: TestService,
    private http: HttpClient,
    private healthKit: HealthKit,
    @Inject('API_KEY') private apiKey: string,
      private plt: Platform,
    firestore: Firestore) { 
      this.queryData(firestore, "sampleUsername@gmail.com");
      const temp = collection(firestore, 'profile');
	//   this.item$ = collectionData(temp) as Observable<Item[]>

      this.ngOnInit();

      this.plt.ready().then(() => {
        this.healthKit.available().then(available => {
        if (available) {
        // Request all permissions up front if you like to
        var options: HealthKitOptions = {
          readTypes: ['HKQuantityTypeIdentifierHeight', 'HKQuantityTypeIdentifierBodyMass', 'HKQuantityTypeIdentifierStepCount', 'HKWorkoutTypeIdentifier', 'HKQuantityTypeIdentifierActiveEnergyBurned', 'HKQuantityTypeIdentifierHeartRate', 'HKCharacteristicTypeIdentifierBiologicalSex'],
          writeTypes: []
        }
        this.healthKit.requestAuthorization(options).then(_ => {
          this.loadHealthData();
        })
        }
        });
      });

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
      this.city = data.name;
    });
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
      this.regressorResult = doc.data()["regressorResult"];
    })
  }


  async loadHealthData() {  
  
    var heartOptions = {
      startDate: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      endDate: new Date(),
      sampleType: 'HKQuantityTypeIdentifierHeartRate',
      unit: 'count/min'
    }
  
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
  
    this.healthKit.querySampleType(heartOptions).then(data => {
      let heartRate = data.reduce((a: any, b: any) => a + b.quantity, 0);
      this.heartRate = (heartRate / data.length).toString();
    }, err => {
      console.log('No heartrate: ', err);
    });
  
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


}