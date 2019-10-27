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

var namesList = [];

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
            list = data["names"]
            console.log("printing namesList",)
            console.log(namesList)
            console.log("title is:", list[0])
            stringDiv(list[0])
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

function stringDiv(title) {

    console.log("stringDiv called")
    var link = "http://usatoday.com";
    var iconHTML = "<img src = 'https://www.google.com/s2/favicons?domain=" + link.slice(7) + "' />";
    console.log("title is:",title)

    
    var snippet = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat";
	
    string = "";
	string += "<a href = " + link + ">";
	string += "<div class = 'social-card'>";
	string += "<h2>" + title + "</h2>";
	string += "<a href = " + link + ">" + iconHTML + '  ' + link.slice(7) + "</a>";
	string += "<p>" + snippet + "</p>";
	string += "</div> </a>";
    console.log("string generated")

	strings.push(string)

}


function load() {
    document.getElementById('stories').innerHTML += strings[0];
    var socialCards = document.getElementsByClassName("social-card");
    $( ".social-card").on("mouseenter", function() {
        alert('mouseover');
        this.addClass('social-card-hover');
    });
    document.getElementById('stories').innerHTML += strings[0];
    // this second one is just an example, delete later
}


document.addEventListener('DOMContentLoaded', function() {
    getURL()
});




function httpGet(url) {

}