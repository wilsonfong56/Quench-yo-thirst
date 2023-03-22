import { Component, Inject, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HealthKit, HealthKitOptions} from '@awesome-cordova-plugins/health-kit/ngx';
import { Geolocation } from '@capacitor/geolocation';
import { Platform } from '@ionic/angular';
import { TestService } from 'src/environments/services/test.service';

import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { query, where, getDocs, doc, setDoc, updateDoc } from 'firebase/firestore';
import { Observable, of } from 'rxjs';
import { getFirestore } from 'firebase/firestore';

import { Item } from './p2.item';



@Component({
  selector: 'app-p2',
  templateUrl: './p2.page.html',
  styleUrls: ['./p2.page.scss'],
})


export class P2Page implements OnInit {

  todaysRec: number;

  bruh: Item[] = [];
  bruh2: any;
  intake: any;

  heroes = [
    new Item('Widstorm', 23),
    new Item('Bombasto', 53)

  ];

  constructor(public _testService: TestService,
    private http: HttpClient,
    private healthKit: HealthKit,
    @Inject('API_KEY') private apiKey: string,
      private plt: Platform,
    firestore: Firestore) { 

      this.queryData(firestore, this._testService.username);

      // const temp = collection(firestore, 'profile');
	    // this.item$ = collectionData(temp) as Observable<Item[]>;

      //console.log(this.user$)

      this.ngOnInit();

  }


  async queryData(firestore: Firestore, email: string) {
    const profileDatabase = collection(firestore, 'profile');
    const q = query(profileDatabase, where("username", "==", email));
    const queryTester = await getDocs(q);
    if (queryTester.size == 0) {
      // users need to input their biometric data

    } else if (queryTester.size == 1) {
      // users have created the accounts, and we need to load their previous data
      queryTester.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        this.todaysRec = doc.data()["recommendedWater"]
      })
    }
    console.log(queryTester.size);
    queryTester.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      for (let key in doc.data()["drinkRecs"]) {
        let val = doc.data()["drinkRecs"][key];
        this.bruh.push(new Item(key, val));
      }
      this.bruh2 = of(this.bruh);
    })
  }


  async ngOnInit() {
  }

  async testButt(key: string) {

    console.log("key", key)
    console.log(this.bruh)
    for (var val of this.bruh) {
      if (val["item"] == key) {
        console.log(val);
        this.todaysRec -= 16.9;
		this.todaysRec = Math.round(this.todaysRec * 10) / 10;
		this.todaysRec = Number(this.todaysRec.toFixed(1));
        
        this.updateAmountDrank(16.9);
      }
    }
    // this.todaysRec -= this.bruh[key]
  }

  subtractDrunkWater(){
	  this.todaysRec -= this.intake;
    this.todaysRec = Math.round(this.todaysRec * 10) / 10;
		this.todaysRec = Number(this.todaysRec.toFixed(1));
    this.updateAmountDrank(this.intake);
  }

  async updateAmountDrank(val: number) {

    const f = getFirestore();

    const profileDatabase = collection(f, 'profile');
    const q = query(profileDatabase, where("username", "==", this._testService.username));
    const queryTester = await getDocs(q);
    queryTester.forEach((doc) => {
        this._testService.temp = doc.data()["lastSevenDays"];
        this._testService.temp[this._testService.temp.length - 1] += Number(val);
        console.log(this._testService.temp)
      })

    await updateDoc(doc(f, 'profile', this._testService.username), {	
        lastSevenDays: this._testService.temp,
        recommendedWater: this.todaysRec
      });

    }


}