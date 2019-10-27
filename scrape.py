
from flask import Flask, jsonify, request, render_template, url_for
import requests
import os
import logging
from bs4 import BeautifulSoup




app = Flask(__name__)


@app.route('/send_url', methods = ['GET', 'POST'])
def send_url():
    link = request.get_json()['u'] #args.get('u')

    data = {"returned_url": link}
    print(request.args)

    page = requests.get(link)
    soup = BeautifulSoup(page.content, 'html.parser')
    soup.find_all('meta', name='content')
    return page.content
    """
    get text from url
    """
    return jsonify(data)


@app.route("/")
def index():
    return render_template("index.html")
# #reroute to index.html
# @app.route('/', methods = ['GET'], defaults = {'path':'index.html'})
# @app.route('/<path:path>', methods = ['GET'])
# def static_file(path):
#     #adds path to end of static
#     return send_from_directory('static', path)



if __name__== "__main__":
    logger = logging.getLogger('tdm')
    logger.setLevel(logging.INFO)
    app.run()
