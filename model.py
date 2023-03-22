# of all milks and juices convert to 1
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import sys, math


from datetime import date

'''
ALTERNATIVES:
    Coconut Water
    Types of Milks (Almond, Soy, Coconut, Oat, Cashew, Hemp, Rice)
    Fruits and Veggies
    Fruit and Veggie Juice
    Tea
    Smoothies
    Coffee
    Soup

- Add a reccomendation to stop drinking other stuff and drink water
        If other drink chosen every time pass a threshold, we want to say STOP

- Do not suggest allergies
        If option in in self.allergies, IGNORE!!

- Adjust weight of each drink but keep water at a threshold
        Normalized weights
        Water always at 51% so that it is always the best option
        Other alternatives 49/numOthers to start

- Suggest differnt drinks based on time
        ex milk and coffee in morning
    * also might want to consider wake up and sleep times later
        start off with looking at histortical data, get the time of first step and average to find wake up
                                                    get the time of last step and average to find sleep time
                                                    OR IF APPLE KEEPS TRACK OF SLEEP!!
        adjust if necessary
        anytime from sleep to walk up only suggest water
        anytime from wake up to 12pm allow certain ones like coffee
        anytime from 12pm to 6 or 7 sugggest more likely suggest others
        anytime from 6/7 to sleep dont suggest coffee
        ^ just an idea, obviously we still might suggest coffee at night but it isnt likely bc low weight
        
'''

class WaterUser:
    def __init__(self, docName):
        cred = credentials.ApplicationDefault()
        firebase_admin.initialize_app(cred)
        firestore_client = firestore.client()

        self.drinksCollec = firestore_client.collection("options")
        self.drinkConver = {"water": 1}
        self.drinkConver.update({item.id:self.drinksCollec.document(item.id).get().to_dict()["conversionRate"] for item in self.drinksCollec.get()})
        self.doc_ref = firestore_client.collection("profile").document(docName)
        self.doc_dict = self.doc_ref.get().to_dict()

        self.gender = self.doc_dict["gender"]
        self.age = self.doc_dict["age"]
        self.locationWeather = self.doc_dict["weather"]
        self.weight = self.doc_dict["weight"]
        self.height = self.doc_dict["height"]
        #self.waterWeightPercentage = self.doc_dict["waterWeight"]
        self.regressResult = self.doc_dict["regressorResult"]/28.35 # g -> oz
        self.recentWaterUse = self.doc_dict["lastSevenDays"]
        self.recentWaterRec = self.doc_dict["recLastSevenDays"]
        try:
            self.drinkWeights = self.doc_dict["drinkWeights"]
        except:
            self.drinkWeights = {"water": 1}
            self.drinkWeights.update({item.id:0.99 for item in firestore_client.collection('options').get()})
            self.doc_ref.set({"drinkWeights": self.drinkWeights}, merge=True)
        try: 
            self.lastUpdate = self.doc_dict["lastUpdate"]
        except:
            # today = date.today()
            # d1 = today.strftime("%d/%m/%Y")
            # self.lastUpdate = d1
            self.lastUpdate = ""
            self.doc_ref.set({"lastUpdate": self.lastUpdate}, merge=True)

        self.waterRec = self.recWater() # get daily water recommendation
        self.getOptionRecommendations()

    def printProfile(self):
        print(f'Document data: {self.doc_dict}')

    # returns a list of top 5 recommendations
    def getOptionRecommendations(self):
        n = int(len(self.drinkWeights) * 0.2)
        if n > 5:
            n = 5
        print("N:", n)
        drinks = sorted(self.drinkWeights.items(), key=lambda item: item[1], reverse=True)[:n]
        drinks = [item[0] for item in drinks]
        drinkRecs = {}
        for drink in drinks:
            drinkRecs.update({drink: math.ceil(16.9/(0.035274*self.drinkConver[drink]))})

        self.doc_ref.update({"drinkRecs": drinkRecs})

        return drinkRecs

    # user clicked to show option less
    # adjust the weights of option showing up
    def userSuggestedLess(self, option):
        if(option != "water"):
            self.drinkWeights[option] = 0.8*self.drinkWeights[option]
            self.doc_ref.update({"drinkWeights": self.drinkWeights})

    # recommended water based on gender, age, weight, height, temp
    def recWater(self):
        recommended_water = 0
        waterWeightRec = self.weight/2
        if self.age >= 4 and self.age <= 8:
            recommended_water = 40
        elif self.age >= 9 and self.age <= 13:
            recommended_water = 60
        elif self.age >= 14 and self.age <= 18:
            recommended_water = 75
        elif self.age >= 19 and self.gender == "male":
            recommended_water = 104
        elif self.age >= 19 and self.gender == "female":
            recommended_water = 72
        else:
            recommended_water = 70
        recommended_water = 0.6*((recommended_water+waterWeightRec)/2)+(0.4*self.regressResult)
        if self.locationWeather >= 100:
            recommended_water = 1.1*recommended_water
        if self.locationWeather >= 90:
            recommended_water = 1.08*recommended_water
        if self.locationWeather >= 80:
            recommended_water = 1.07*recommended_water
        if self.locationWeather >= 75:
            recommended_water = 1.05*recommended_water
        if self.locationWeather >= 70:
            recommended_water = 1.02*recommended_water
        daysMissed = 0
        for i in range(-1, -4, -1):
            if(self.recentWaterUse[i] < self.recentWaterRec[i]):
                daysMissed += 1
        if daysMissed == 3:
            recommended_water *= 0.98
        self.doc_ref.set({"recommendedWater": math.ceil(recommended_water)}, merge=True)
        return math.ceil(recommended_water)

    def updateDaily(self):
        today = date.today()
        d1 = today.strftime("%d/%m/%Y")
        print("d1:", d1)
        if d1 != self.lastUpdate:
            print("HUH")
            self.recentWaterUse.pop(0)
            self.recentWaterUse.append(0)
            self.recentWaterRec.pop(0)
            self.recentWaterRec.append(self.waterRec)
            self.doc_ref.update({"recLastSevenDays": self.recentWaterRec})
            self.doc_ref.update({"lastSevenDays": self.recentWaterUse})
            self.doc_ref.update({"lastUpdate": d1})
