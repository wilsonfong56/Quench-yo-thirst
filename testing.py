
# of all milks and juices convert to 1
conversionDictionary = {"water": 1, "coconut_water": 1, "almond_milk": 1, "soy_milk": 1,
                        "coconut_milk": 1, "oat_milk": 1, "cashew_milk": 1, "hemp_milk": 1,
                        "rice_milk": 1, "watermelon": 2, "cucumber": 2, "ALL!!!!!juice": 1,
                        "tea": 1}

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
    def __init__(self, gender, age, weather, weight, height, waterWeightPercentage=0.62):
        self.gender = gender
        self.age = age
        self.locationWeather = weather
        self.weight = weight
        self.height = height
        self.waterWeightPercentage = waterWeightPercentage

        self.allergies = set()
        self.recentExercise = []
        self.recentWaterUse = []
    
    # returns a list of top 5 reccomendations
    def getOptionReccomendations(self):
        pass

    # user clicked to show option less
    # adjust the weights of option showing up
    def userSuggestedLess(self, option):

        pass

    # user clicked saying they drank this
    # adjust accordingly
    def userDrank(self, option):
        pass


