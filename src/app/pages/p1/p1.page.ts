import { Component, Inject, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HealthKit, HealthKitOptions} from '@awesome-cordova-plugins/health-kit/ngx';
import { Geolocation } from '@capacitor/geolocation';
import { Platform } from '@ionic/angular';
import { TestService } from 'src/environments/services/test.service';

import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { query, where, getDocs, doc, setDoc, updateDoc  } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { getFirestore } from 'firebase/firestore';

interface Item {
  height: number,
  weight: number,
  name: string,
};

interface CombinedItem {
	docName: string,
	username: string,
	password: string,
	height: number,
	weight: number,
	heartRate: number,
	stepCount: number,
	calorieBurned: number,
	temperature: number,
	water: number
  };

@Component({
  selector: 'app-p1',
  templateUrl: './p1.page.html',
  styleUrls: ['./p1.page.scss'],
})
export class P1Page implements OnInit {
  latitude = 0;
  longitude = 0;
  height = 0;
  weight = 0;
  temp = "";
  stepcount = "No Data";
  caloriesBurned = "No Data";
  currentHeight = "No Data";
  height_ft = "No Data";
  height_in = "No Data";
  currentWeight = "No Data";
  heartRate = 0;
  city = "No Data";
  gender = "No Data";
  age = 0;

  tArray = [0, 0, 0, 0, 0, 0, 0];

  item$: Observable<Item[]>;

  constructor(
	public _testService: TestService,
	private http: HttpClient,
	private healthKit: HealthKit,
	@Inject('API_KEY') private apiKey: string,
	  private plt: Platform,
	firestore: Firestore)  { 

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

	this.queryData(firestore, this._testService.username)
	

	// "admin@uci.edu"
  }

  async updateProfile() {
	const input_weight = document.getElementById('html_weight') as HTMLInputElement | null;
	const value_weight = input_weight?.value;

	const f = getFirestore();

	await updateDoc(doc(f, 'profile', this._testService.username), {	
		weight: Number(value_weight),
	});
  }

  // Add a new document in collection "cities"	
  async writeData(firestore: Firestore, email: string) {
	console.log("WRITING DATA")
	await setDoc(doc(firestore, 'profile', email), {	
		username: this._testService.username,
		password: this._testService.password,
		height: this.height,	
		weight: this.weight,
		gender: this.gender,
		age: this.age,
		// location: this._testService.city,
		weather: this.temp,
		lastSevenDays: [0,0,0,0,0,0,0],
		recLastSevenDays: [0,0,0,0,0,0,0],
		// drinksList: {}
		heartrate: this.heartRate
	});
  };

  async queryData(firestore: Firestore, email: string) {
	const profileDatabase = collection(firestore, 'profile');
	const q = query(profileDatabase, where("username", "==", email));
	const queryTester = await getDocs(q);
	if (queryTester.size == 0) {
		// users need to input their biometric data
		console.log("USER CREATED")
		this.writeData(firestore, email);
	  } else if (queryTester.size == 1) {
		// users have created the accounts, and we need to load their previous data
		console.log("USER EXISTS")
		queryTester.forEach((doc) => {
			this._testService.temp = doc.data()["lastSevenDays"];
			this._testService.temp2 = doc.data()["recLastSevenDays"];
			this.height = doc.data()["height"];
			this.weight = doc.data()["weight"];
			this.gender = doc.data()["gender"];
			this.age = doc.data()["age"];
			this.heartRate = doc.data()["heartrate"]
		  })
	  }
	console.log(queryTester.size);
	queryTester.forEach((doc) => {
	  console.log(doc.id, " => ", doc.data());
	  this._testService.temp = doc.data()["lastSevenDays"];
	  this._testService.temp2 = doc.data()["recLastSevenDays"];
	})
  }

  async RefreshData() {
	// refresh the page after user pressed submit button
	
  }

  
  async loadHealthData() {

	this.healthKit.readHeight({ unit: 'in' }).then(val => {
	  this.height_ft = Math.floor(Math.trunc(Number(val.value)) / 12).toString();
	  this.height_in = (Math.trunc(Number(val.value)) % 12).toString()
	  this.currentHeight = Math.trunc(Number(val.value)).toString();
	  this.height = Math.trunc(Number(val.value));
	  }, err => {
		console.log('No height: ', err);
	  });

	this.healthKit.readWeight({ unit: 'lb' }).then(val => {
	  this.currentWeight = val.value;
	  this.weight = val.value;
	  }, err => {
		console.log('No weight: ', err);
	  });

	this.healthKit.readGender().then(val => {
	  this.gender = val;
	}, err => {
		console.log('No weight: ', err);
	});


	this.healthKit.readDateOfBirth().then(val => {
	  this.age = val.split("T")[0];
	  const birthdate = new Date(this.age);
	  const now = new Date();
	  const diffMs = now.valueOf() - birthdate.valueOf();
	  this.age = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365.25));

	  console.log("Age: " + this.age);
	//   this.age = this.diff_years(new Date(new Date().getTime() - 24 * 60 * 60 * 1000), new Date(val.split("T")[0])).toString();
	//   this.age = new Date(new Date() - new Date(val.split("T")[0])).getFullYear() - 1970;
	}, err => {
		console.log('No age: ', err);
	});


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
	  this.heartRate = (heartRate / data.length);
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
	// this.queryData(this.firestore, "sampleUsername@gmail.com")
	// this.writeData(this.firestore)
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
  
  async buttonTest() {
	console.log("HEIGHT:", this.height)
	console.log("WEIGHT:", this.weight)
	console.log(this._testService.username)
	console.log(this._testService.password)
	
	//const db = getFirestore()
	//const temp2 = {name: "joe", height: this.height, weight: this.weight}
	//const res = await collection(db, "profile").id("testDoc").set(temp2)
  }


}
