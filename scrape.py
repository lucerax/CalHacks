import simplejson as json
from flask import Flask, jsonify, request, render_template, url_for
from getKeys import keyResult
from bing import bingResult
import requests
import os
import logging
import git
from bs4 import BeautifulSoup


app = Flask(__name__)



masterDic = {}

"""
@app.route('/get', methods = ['GET'])
def returnDic():
    return jsonify(masterDic)
"""


@app.route('/send_url', methods = ['GET', 'POST'])
def send_url():
    link = request.get_json()['u']
   
    keywords = keyResult(link) #going from article to keywords
    if not keywords:
        return {"title": "Error"}
    curLink = request.get_json()['link']
    newsInfo = bingResult(keywords, curLink) #going from keywords to related news
    ###newsInfo = {"title": [], "provider": [], "description": [], "URL": []}###
    return jsonify(newsInfo) #displaying informations about related news


@app.route("/")
def index():
    #return render_template("index.html")
    return "Backend Server"


@app.route('/update_server', methods=['POST'])
def webhook():
    if request.method == 'POST':
        repo = git.Repo('https://github.com/lucerax/XRef')
        origin = repo.remotes.origin
        origin.pull()
        return "Successful update to PythonAnywhere"
    else:
        return "Unsuccessful in updating PythonAnywhere"

"""
if __name__== "__main__":
    logger = logging.getLogger('tdm')
    logger.setLevel(logging.INFO)
    app.run(debug=True)
"""
