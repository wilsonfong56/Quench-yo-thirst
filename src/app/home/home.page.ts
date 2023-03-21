import { Component, Inject, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HealthKit, HealthKitOptions} from '@awesome-cordova-plugins/health-kit/ngx';
import { Geolocation } from '@capacitor/geolocation';
import { Platform } from '@ionic/angular';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { TestService } from 'src/environments/services/test.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  email?: string;
  password?: string;

  constructor(public _testService: TestService) { }

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

  ngOnInit() {
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
