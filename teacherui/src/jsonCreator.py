import json
import random

json_file = open("data/warningSample_individual.json", "r")
json_object = json.load(json_file)
json_file.close()

for i in json_object:
    print(round(random.uniform(0, 4), 2))
    i["warningMax"] = round(random.uniform(0, 4), 2)

json_file = open("data/warningSample_individual4.json", "w")
json.dump(json_object, json_file)
json_file.close()
