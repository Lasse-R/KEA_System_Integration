import json
import xml.etree.ElementTree as ET
import csv
import yaml

def parse_json(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return json.load(file)

def parse_xml(file_path):
    tree = ET.parse(file_path)
    return tree.getroot()

def parse_csv(file_path):
    with open(file_path, mode='r', newline='', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        return [row for row in reader]

def parse_txt(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return file.read()

def parse_yaml(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return yaml.safe_load(file)
