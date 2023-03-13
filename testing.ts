const conversionDictionary: { [key: string]: number } = {
                        "water": 1, "coconut_water": 1, "almond_milk": 1, "soy_milk": 1,
                        "coconut_milk": 1, "oat_milk": 1, "cashew_milk": 1, "hemp_milk": 1,
                        "rice_milk": 1, "watermelon": 2, "cucumber": 2, "ALL!!!!!juice": 1,
                        "tea": 1}

class WaterUser{
    gender: string
    age: number
    locationWeather: number
    weight: number
    height: number
    waterWeightPercentage: number
    allergies: Set<string>
    recentExercise: Array<string>
    recentWaterUse: Array<string>
    
    constructor(gender: string, age: number, weather: number, weight: number, height: number, waterWeightPercentage: number){
        this.gender = gender;
        this.age = age;
        this.locationWeather = weather;
        this.weight = weight;
        this.height = height;
        this.waterWeightPercentage = waterWeightPercentage;
        this.allergies = new Set<string>();
        this.recentExercise = new Array<string>;
        this.recentWaterUse = new Array<string>;
    }

    getOptionReccomendations() {
        console.log("GENDER:", this.gender);
        console.log("AGE:", this.age);
        console.log("WEATHER:", this.locationWeather);
        console.log("WEIGHT:", this.weight);
        console.log("HEIGHT:", this.height);
        console.log("WATER WEIGHT PERCENTAGE:", this.waterWeightPercentage);
        let yourMum: string = this.gender + 
                              this.age.toString() + '<br/>'
                              this.locationWeather.toString() + '<br/>'
                              this.weight.toString() + '<br/>'
                              this.height.toString() + '<br/>'
                              this.waterWeightPercentage.toString()
        return yourMum
    }

}

const user: WaterUser = new WaterUser("guy", 1, 72, 150, 69, 0.5);

user.getOptionReccomendations();

