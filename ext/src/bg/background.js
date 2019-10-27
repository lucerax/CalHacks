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
                /*newsInfo = {"title": [], "provider": [], "description": [], "URL": []}*/
                console.log("titles are: ", newsInfo["title"])
                create(4)
            },
            error: function(data){
                console.log('ERROR');
            },
             
        });
    });

    
}   

strings = []

function reportError(){
    string = "<p>" + "Are you sure you're reading good news?" + "</p>";
    strings.push(string)
    create(1)
}

function createDiv(num) {
    var i = 0;
    while (i < num) {
        var title = newsInfo["title"][i];
        var provider = newsInfo["provider"][i];
        var snippet = newsInfo["description"][i];

    	string = "<a href = \"" + provider + "\">";
    	string += "<div id = '"+i+"' class = 'social-card' >";
    	string += "<h2>" + title + "</h2>";
    	string += "<a href = " + provider + ">" + provider + "</a>";
    	string += "<p>" + snippet + "</p>";
    	string += "</div> </a>";
    	strings.push(string)
        i += 1
    }
    load(num)
}

function load(num) {
    var i = 0;
    while (i < num) {
        document.getElementById('stories').innerHTML += strings[i];
        console.log(i, i.toString())
        var link = document.getElementById(i.toString()) 
        var newlink = newsInfo["URL"][i]
        console.log(newsInfo["URL"])
        console.log(i,newlink)
        link.addEventListener('click', function(){ 
            chrome.tabs.create({url: newlink});   
        })

        i += 1
        
    }
}

function create(i) {
    createDiv(i)
    
    // this second one is just an example, delete later
}


document.addEventListener('DOMContentLoaded', function() {
    getURL()

});




function httpGet(url) {

}