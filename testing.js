var conversionDictionary = {
    "water": 1, "coconut_water": 1, "almond_milk": 1, "soy_milk": 1,
    "coconut_milk": 1, "oat_milk": 1, "cashew_milk": 1, "hemp_milk": 1,
    "rice_milk": 1, "watermelon": 2, "cucumber": 2, "ALL!!!!!juice": 1,
    "tea": 1
};
var WaterUser = /** @class */ (function () {
    function WaterUser(gender, age, weather, weight, height, waterWeightPercentage) {
        this.gender = gender;
        this.age = age;
        this.locationWeather = weather;
        this.weight = weight;
        this.height = height;
        this.waterWeightPercentage = waterWeightPercentage;
        this.allergies = new Set();
        this.recentExercise = new Array;
        this.recentWaterUse = new Array;
    }
    WaterUser.prototype.getOptionReccomendations = function () {
        console.log("GENDER:", this.gender);
        console.log("AGE:", this.age);
        console.log("WEATHER:", this.locationWeather);
        console.log("WEIGHT:", this.weight);
        console.log("HEIGHT:", this.height);
        console.log("WATER WEIGHT PERCENTAGE:", this.waterWeightPercentage);
    };
    return WaterUser;
}());
var user = new WaterUser("guy", 1, 72, 150, 69, 0.5);
user.getOptionReccomendations();
