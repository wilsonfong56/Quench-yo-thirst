import { Component, Inject, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HealthKit, HealthKitOptions} from '@awesome-cordova-plugins/health-kit/ngx';
import { Geolocation } from '@capacitor/geolocation';
import { Platform } from '@ionic/angular';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { TestService } from 'src/environments/services/test.service';

import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { query, where, getDocs, doc, setDoc  } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { getFirestore } from 'firebase/firestore';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  email?: string;
  password?: string;
  latitude = 0;
  longitude = 0;

  constructor(public _testService: TestService, private http: HttpClient,
    @Inject('API_KEY') private apiKey: string) {

    this.ngOnInit()
   }

  // const auth = getAuth();
  // createUserWithEmailAndPassword(auth, email, password)
  //   .then((userCredential) => {
  //     // Signed in 
  //     const user = userCredential.user;
  //   })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //   });

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
      this._testService.weather = data.main.temp;
      this._testService.city = data.name;
    });
    }



  async loginClick() {
    this._testService.username = this.email as string;
    this._testService.password = this.password as string;
    console.log("EMAIL:", this.email);
    console.log("PASSWORD:", this.password);
    
    //const db = getFirestore()
    //const temp2 = {name: "joe", height: this.height, weight: this.weight}
    //const res = await collection(db, "profile").id("testDoc").set(temp2)
    }
}
