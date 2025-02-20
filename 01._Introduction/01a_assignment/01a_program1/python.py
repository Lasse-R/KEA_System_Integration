# main.py
from file_parser import parse_json, parse_xml, parse_csv, parse_txt, parse_yaml

# solution contains code from GPT

def main():
    print("Parsed JSON data:")
    print(parse_json('car.json'))

    print("\nParsed XML data:")
    root = parse_xml('book.xml')
    for child in root:
        print(f"Tag: {child.tag}, text: {child.text}")

    print("\nParsed CSV data:")
    print(parse_csv('game.csv'))

    print("\nParsed TXT data:")
    print(parse_txt('phone.txt'))

    print("\nParsed YAML data:")
    print(parse_yaml('movie.yaml'))

if __name__ == "__main__":
    main()