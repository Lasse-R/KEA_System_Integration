import json
import xml.etree.ElementTree as ET
import csv
import yaml

# 1 read and parse the json file
with open('car.json', 'r') as file:
    car = json.load(file)

# print the data
print("Parsed JSON data:")
print(car)

# 2 read and parse the xml file
print("\nParsed XML data:")
tree = ET.parse('book.xml')
root = tree.getroot()

# iterate over the children of the root element
for child in root:
    print(f"Tag: {child.tag}, text: {child.text}")


# 3 read and parse the csv file

print("\nParsed CSV data:")
with open('game.csv', mode='r', newline='') as file:
    reader = csv.DictReader(file)
    for row in reader:
        print(row)


# 4 read and parse the txt file
print("\nParsed TXT data:")
with open('phone.txt', 'r') as file:
    phone = file.read()
    print(phone)


# 5 read and parse the yaml file
print("\nParsed YAML data:")    

with open('movie.yaml', 'r') as file:
    movie = yaml.safe_load(file)
    print(movie)
