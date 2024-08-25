import csv, json

csvFilePath = 'data.csv'
jsonFilePath = 'cleanData.json'

data = {}
with open(csvFilePath) as csvFile:
	csvReader = csv.DictReader(csvFile)
	for rows in csvReader:
		id = rows['name']
		data[id] = rows
with open(jsonFilePath, 'w') as jsonFile:
	jsonFile.write(json.dumps(data, indent=4))
