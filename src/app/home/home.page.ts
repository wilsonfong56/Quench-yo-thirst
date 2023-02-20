import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HealthKit } from '@awesome-cordova-plugins/health-kit/ngx';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  latitude = 0;
  longitude = 0;
  height = "";
  weight = "";
  //weather: any;

  constructor() {
    this.getCurrentPosition();
    // this.getWeather();
  }

  async getCurrentPosition() {
    const position = await Geolocation.getCurrentPosition();
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
  }

  // getWeather() {
  //   // Change this later so api key is hidden
  //   const url = 'https://api.openweathermap.org/data/2.5/weather?lat=44&lon=-134}&appid=fa845a8dfaa2d70c613ea149690dc198'; 
  //   this.http.get(url).subscribe((data: any) => {
  //     this.weather = data;
  //   });
  //}

}
