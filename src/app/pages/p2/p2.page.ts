import { Component, Inject, OnInit } from '@angular/core';
import { TestService } from 'src/environments/services/test.service';
import { HttpClient } from '@angular/common/http';
import { HealthKit, HealthKitOptions} from '@awesome-cordova-plugins/health-kit/ngx';
import { Geolocation } from '@capacitor/geolocation';
import { Platform } from '@ionic/angular';

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

  // constructor(public _testService: TestService) { }

  constructor(
    private healthKit: HealthKit,
    @Inject('API_KEY') private apiKey: string,
	  private plt: Platform,
    firestore: Firestore)  { 

    console.log("API KEY:", this.apiKey)
    this.ngOnInit();

    let data: RegResult = {
      docName: "test@gmail.com_hahahaha",
      email: "test@gmail.com",
      water: 3000,
    }
    this.queryData(firestore, "regressorResult", "test@gmail.com");
  }

  async queryData(firestore: Firestore, tableName: string, email: string) {
    const db = collection(firestore, tableName);
    const q = query(db, where("email", "==", email));
    const queryTester = await getDocs(q);
    if (queryTester.size == 0) {
      // users need to input their biometric data

    } else if (queryTester.size == 1) {
      // users have created the accounts, and we need to load their previous data

    }
    // console.log(queryTester.size);
    console.log(queryTester);
    queryTester.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    })
  }

  ngOnInit() {
    // console.log(this._testService.myData)
  }

}
