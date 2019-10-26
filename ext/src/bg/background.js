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

var link = "http://usatoday.com";
var iconHTML = "<img src = 'https://www.google.com/s2/favicons?domain=" + link.slice(7) + "' />";
var title = "Default title";
var snippet = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat";

function stringDiv() {
	string = "";
	string += "<a href = " + link + ">";
	string += "<div class = 'social-card'>";
	string += "<h2>" + title + "</h2>";
	string += "<a href = " + link + ">" + iconHTML + '  ' + link.slice(7) + "</a>";
	string += "<p>" + snippet + "</p>";
	string += "</div> </a>";
	return string;
};

document.addEventListener('DOMContentLoaded', function() {

	document.getElementById('stories').innerHTML += stringDiv();
	var socialCards = document.getElementsByClassName("social-card");

	$( ".social-card").on("mouseenter", function() {
	  	alert('mouseover');
		this.addClass('social-card-hover');
	});

	document.getElementById('stories').innerHTML += stringDiv();
	// this second one is just an example, delete later

});


chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var CURRENTURL = tabs[0].url;
});

function httpGet(url) {

}