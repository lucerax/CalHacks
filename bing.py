from azure.cognitiveservices.search.newssearch import NewsSearchAPI
from msrest.authentication import CognitiveServicesCredentials

def bingResult(keywords):
    subscription_key = "18d92d49457f44869027dcd6145d4b11"
    search_term = ""
    for word in keywords:
        search_term += word + " "
    print("SEARCHTERM:", search_term)

    client = NewsSearchAPI(CognitiveServicesCredentials(subscription_key))

    news_result = client.news.search(query=search_term, market="en-us", count=10)
    count = 10
    i = 0
    list = []

        
    while i < count:
        if news_result.value:
            first_news_result = news_result.value[i]
            list.append({("Total estimated matches value: {}".format(
                news_result.total_estimated_matches)),
            ("News result count: {}".format(len(news_result.value))),
            ("First news name: {}".format(first_news_result.name)),
            ("First news url: {}".format(first_news_result.url)),
            ("First news description: {}".format(first_news_result.description)),
            ("First published time: {}".format(first_news_result.date_published)),
            ("First news provider: {}".format(first_news_result.provider[0].name))})
        else:
            print("Didn't see any news result data..")
            
        i += 1
        
    return list
