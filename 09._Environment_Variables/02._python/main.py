from dotenv import load_dotenv
import os

load_dotenv()
print(os.getenv("MY_SECRET"))
print(os.getenv("API_KEY"))