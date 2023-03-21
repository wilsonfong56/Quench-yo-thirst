# from codecs import getencoder
import model
# Use the application default credentials.

if __name__ == "__main__":
    # email = sys.argv[1]
    # gender = sys.argv[2]
    # age = int(sys.argv[3])
    # weather = float(sys.argv[4])
    # weight = int(sys.argv[5])
    # height = int(sys.argv[6])

    # # Use the application default credentials.

    # doc_ref.set(
    #     {
    #         "username": email,
    #        "gender": gender,
    #        "age": age,
    #        "weather": weather,
    #        "weight": weight,
    #        "height": height

    #     }
    # )x

    # doc_ref.update(
    #     {
    #         "recommendedWater": 120
    #     }
    # )

    profile = model.WaterUser("final4")
    profile.updateDaily()
    while(True):
        print(profile.getOptionRecommendations())
        profile.userSuggestedLess(input())
