import pandas as pd
import numpy as np
# import math
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

def parse_data(data_path, data_column: list(), condition: str):
    data = pd.read_csv(data_path)
    data = data.dropna()
#     data = data.loc[:, data_column]
    data = data[(data.Metric == condition)]
    return data

if __name__ == "__main__":
    data = parse_data("combined_result.csv", [], condition = "Heart Rate (Apple Health)")

    X = data.loc[:, ["Amount", "Average Temperature"]]
    y = data["Water (g)"]
    reg = LinearRegression().fit(X, y)
    pre_result = reg.predict(np.array([[120, 70]]))
    # print(list(test["Water (g)"])[1])
    # print("result accuracy:", my_score(pre_result, list(test["Water (g)"])))
    print("result accuracy:", pre_result)
    cred = credentials.ApplicationDefault()
    firebase_admin.initialize_app(cred)
    firestore_client = firestore.client()
    #data_list = list()
    # for data in firestore_client.collection("profile"):
    #     print(data)
    doc_ref = firestore_client.collection("profile").document("final4")
    #doc_ref = firestore_client.collection("regressorResult").document("test")
    doc = doc_ref.get()
    # if doc.exists:
    #     doc_info = doc.to_dict()

    doc_ref.update(
        {
            "regressorResult": pre_result[0]
        }
    )
