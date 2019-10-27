// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });

// chrome.browserAction.onClicked.addListener(function(tab) {
//     alert('opened file');
// });


//example of using a message handler from the inject scripts
// chrome.extension.onMessage.addListener(
//   function(request, sender, sendResponse) {
//   	chrome.pageAction.show(sender.tab.id);
//     sendResponse();
//   });

// iterate through the links and set these variables


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
            if (data["title"] == "Error") {
                console.log("Error CAUGHT")
                reportError()
                return
            }
            console.log(data);
            newsInfo = data
            /*newsInfo = {"title": [], "provider": [], "description": []}*/
            console.log("titles are: ", newsInfo["title"])
            stringDiv(0)
            stringDiv(1)
            stringDiv(2)
            load(2)
        },
        error: function(data){
            console.log('ERROR');
        },
         
        });

    });

    console.log("getURL finished")

    
}   

strings = []

function reportError(){
    string = "<p>" + "Are you sure you're reading good news?" + "</p>";
    strings.push(string)
    load(1)
}

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

function load(i) {
    
    while (i >= 0) {
    document.getElementById('stories').innerHTML += strings[i];
    i -= 1
    }

    // this second one is just an example, delete later
}


document.addEventListener('DOMContentLoaded', function() {
    getURL()
});




function httpGet(url) {

}