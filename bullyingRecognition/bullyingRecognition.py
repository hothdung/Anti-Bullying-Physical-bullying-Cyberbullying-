import sqlalchemy as sal
from sqlalchemy import create_engine
import os
import pandas as pd
import sklearn
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn import preprocessing
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score
import joblib

# print(sklearn.__version__)

# database credentials
engine = sal.create_engine(
    'mysql+mysqlconnector://'+os.environ.get('DB_USER')+':' + os.environ.get('DB_PW')+'@147.46.215.219: 3306/signals_db')

conn = engine.connect()

sql = """
SELECT *
FROM signals_db.trainTable
"""

df = pd.read_sql_query(sql, engine)
# print(df.head(600))

# encode sentiment (categorical data)
# labels = df['sentiment'].astype('category').cat.categories.tolist()
# replace_map_comp = {'sentiment': {k: v for k,
#                                   v in zip(labels, list(range(1, len(labels)+1)))}}

labelsAudio = df['audioText'].astype('category').cat.categories.tolist()
replaceAudio = {'audioText': {k: v for k,
                              v in zip(labelsAudio, list(range(1, len(labelsAudio)+1)))}}

# mapping results testing the results
# print(replace_map_comp)
# print(replaceAudio)

# keeps original data intact
df_copy = df.copy()
# df_copy.replace(replace_map_comp, inplace=True)
df_copy.replace(replaceAudio, inplace=True)
# print(df_copy.head(3))


X = df_copy[["audioText", 'bpm', 'long', 'lat', 'gravityX',
             'gravityY', 'gravityZ', 'accX', 'accY', 'accZ', 'rotX', 'rotY', 'rotZ', 'attRoll', 'attPitch', 'attYaw', 'fallenDown']]


# label
y = df['bullying']


X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=0)

# creation of classifier
classifier = RandomForestClassifier(n_estimators=1500)

# training the model
classifier.fit(X_train, y_train)

y_prediction = classifier.predict(X_test)

print(classifier.predict([[270, 95, 126.93525873029968, 37.46846711884488,
                           0.18, -0.19, -0.97, -0.02, -0.08, 0.06, 0.56, 0.18, -0.16, 0.2, 0.2, 0, 0]]))

# measuring performance
print("Accuracy: ", accuracy_score(y_test, y_prediction))
print(confusion_matrix(y_test, y_prediction))
print(classification_report(y_test, y_prediction))

# saving the model
savedModel = 'recognitionModel.sav'
joblib.dump(classifier, savedModel)

# loading model
loadedModel = joblib.load(savedModel)

predictionResult = loadedModel.predict([[120, 99, 126.95244961956517, 37.44894278465949,
                                         0.02, -0.19, -0.98, 0.31, 0.05, 0.12, 1.17, -0.14, 0.13, 0, 0.2, 0.3, 0]])

# predictionResult = loadedModel.predict([[170, 80, 126.95237032022756, 37.44886936475775,
#                                          0.04, 0.67, -0.74, -0.01, -0.02, 0, -0.26, 0.03, 0.02, 0, -0.7, 0, 0]])

# predictionResult = loadedModel.predict([[245, 100, 127.0274289901936, 37.50936028636054,
#                                          0.07, 0.4, -0.92, 0, 0, 0, -0.03, -0.02, -0.01, 0.1, -0.4, -0.4, 0]])
# predictionResult = loadedModel.predict([[169, 92, 127.433899, 37.283886,
#                                          0.2, -0.43, -0.88, 0.11, 0.21, 0.22, 0.14, -0.84, -1.32, 0.2, 0.4, 0, 0]])

# predictionResult = loadedModel.predict([[12, 94, 127.433899, 37.283886,
#                                          0.05, -0.05, -1, 0.1, 0.02, 0.01, -0.84, -0.55, 0.32, 0.1, 0, 0.2, 0]])

# predictionResult = loadedModel.predict([[142, 96, 127.433899, 37.283886,
#                                          0.18, -0.19, -0.97, -0.02, -0.08, 0.06, 0.56, 0.18, -0.16, 0.2, 0.2, 0, 0]])

# predictionResult = loadedModel.predict([[65, 94, 126.9507512, 37.4557004,
#                                          -0.14, 0.86, -0.48, 0, 0.01, -0.01, -0.01, 0.02, 0.01, -0.3, -1, -0.4, 0]])

# predictionResult = loadedModel.predict([[205, 94, 126.9507512, 37.4557004,
#                                          -0.1, -0.02, -1, -0.03, -0.03, 0.11, 0.51, -0.11, -0.6, -0.1, 0, 0.4, 0]])

# predictionResult = loadedModel.predict([[222, 3, 66, 127.009676, 37.539619,

#                                          0.21, -0.62, -0.75, 0.01, -0.01, 0, 0.06, 0.01, -0.02, 0.3, 0.7, -0.3, 0]])


# predictionResult = loadedModel.predict([[222, 70, 127.433899, 37.283886,

#                                          0.05, -0.05, -1, 0.1, 0.02, 0.01, -0.84, -0.55, 0.32, 0.1, 0, 0.2, 0]])


print(predictionResult)
