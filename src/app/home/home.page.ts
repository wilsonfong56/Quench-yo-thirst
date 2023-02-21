import { Component, Inject } from '@angular/core';
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
  temp = 0;

  constructor(
    private http: HttpClient,
    private healthKit: HealthKit,
    @Inject('API_KEY') private apiKey: string) {
    console.log(this.apiKey)
    this.ngOnInit();
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
      console.log(`Current temp: ${this.temp}`)
    });
  }
}
