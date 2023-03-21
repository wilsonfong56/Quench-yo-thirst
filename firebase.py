# from codecs import getencoder
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import sys 
from model import WaterUser
# Use the application default credentials.

if __name__ == "__main__":
    # email = sys.argv[1]
    # gender = sys.argv[2]
    # age = int(sys.argv[3])
    # weather = float(sys.argv[4])
    # weight = int(sys.argv[5])
    # height = int(sys.argv[6])

    # # Use the application default credentials.
    cred = credentials.ApplicationDefault()
    firebase_admin.initialize_app(cred)
    firestore_client = firestore.client()


    doc_ref = firestore_client.collection("profile").document("sample")
    doc_ref.update(
        {
            "lastSevenDays": [69,420,96,85,21]
        }
    )
    # doc_ref.set(
    #     {
    #         "username": email,
    #        "gender": gender,
    #        "age": age,
    #        "weather": weather,
    #        "weight": weight,
    #        "height": height

    #     }
    # )

    # doc = doc_ref.get()
    # print(doc)
    # if doc.exists:
    #     profile = doc.to_dict()
    #     print(f'Document data: {doc.to_dict()}')
    
    # profile = WaterUser(profile["gender"], profile["age"], profile["weather"], profile["weight"],
    #                     profile["height"], profile["regressorResult"], profile["waterUse"])


    # doc_ref.update(
    #     {
    #         "recommendedWater": 120
    #     }
    # )