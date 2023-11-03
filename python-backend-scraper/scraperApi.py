from flask import Flask, request
from flask_restful import Api, Resource
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
import regex as re
app = Flask(__name__)
CORS(app)  # Add this line to enable CORS for the entire app

api = Api(app)

# In-memory data store (replace with a database in a real application)


class ItemList(Resource):

    def post(self):
        data = request.get_json()
        print(data)
        response = requests.get(data["url"])
        if response.status_code == 200:
    # Parse the HTML content using Beautiful Soup
            soup = BeautifulSoup(response.text, 'html.parser')

            text = soup.get_text()

            # Use regular expressions to extract words (letters and numbers)
            words = re.findall(r'\w+', text)
            print(len(words))
            links = [a['href'] for a in soup.find_all('a') if 'href' in a.attrs]
            print(links)
            images = [img['src'] for img in soup.find_all('img') if 'src' in img.attrs]
            print(images)
            return {"message":"success","hyperlinks":links,"wordlength":len(words),"medialinks":images},200

        else:
            print('Failed to fetch the webpage.')

            return {"message":"error"},200

api.add_resource(ItemList, "/items")

if __name__ == "__main__":
    app.run()





