


var newsInfo = {}
function getURL() {

    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var CURRENTURL = tabs[0].url;
    console.log(CURRENTURL)
    console.log('POST ajax called')

    $.ajax({
        url: 'http://127.0.0.1:5000/send_url',
        /*data: {u:str},*/
        dataType: 'json',
        data: JSON.stringify({u:CURRENTURL}),
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        success: function(data) { //callback
            console.log(data);
            newsInfo = data
            /*newsInfo = {"title": [], "provider": [], "description": []}*/
            console.log("titles are: ", newsInfo["title"])
            stringDiv(0)
            stringDiv(1)
            stringDiv(2)
            load()
        },
        error: function(data){
            console.log('ERROR');
        },

        });

    });

    console.log("getURL finished")


}

strings = []

function stringDiv(i) {

    console.log("stringDiv called")
    var link = newsInfo["provider"][i];
    var iconHTML = "<img src = 'https://www.google.com/s2/favicons?domain=" + link.slice(7) + "' />";
    var title = newsInfo["title"][i];
    var snippet = newsInfo["description"][i];

    string = "";
	string += "<a href = " + link + ">";
	string += "<div class = 'social-card'>";
	string += "<h2>" + title + "</h2>";
	string += "<a href = " + link + ">" + iconHTML + '  ' + link + "</a>";
	string += "<p>" + snippet + "</p>";
	string += "</div> </a>";
    console.log("string generated")

	strings.push(string)

}


function load() {

    document.getElementById('stories').innerHTML += strings[0];
    document.getElementById('stories').innerHTML += strings[1];
    document.getElementById('stories').innerHTML += strings[2];

    // this second one is just an example, delete later
}


document.addEventListener('DOMContentLoaded', function() {
    getURL()
});




function httpGet(url) {

}
