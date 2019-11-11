import json
from flask import Flask, jsonify
from getKeys import keyResult
from bing import bingResult
from scrape import send_url

app = Flask(__name__)

items = ["Apples", "Carrots", "Bananas"]

@app.route('/get', methods=['GET'])
def first_function():
	data = {"items": items}
	return jsonify(data)

"""
@app.route('/')
def first_function():
    article = 'donald trump'
    keywords = keyResult(article)
    print(keywords)
    news = bingResult(keywords)
    def set_default(obj):
        if isinstance(obj, set):
            return list(obj)
        raise TypeError
    newsString = json.dumps(news, default=set_default);
    return jsonify(newsString)
"""
@app.route('/add', methods=['GET','POST'])
def add_function():
	item = request.args.get("item")
	items.append(item)
	return jsonify({"items": item})

if __name__ == "__main__":
	app.run(debug=True)

