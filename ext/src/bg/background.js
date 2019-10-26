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
	string += "<a href = " + link + ">" + iconHTML + '  ' + link + "</a>";
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

chrome.browserAction.onClicked.addListener(function(tab) {
    console.log('Injecting content script(s)');
    //On Firefox document.body.textContent is probably more appropriate
    chrome.tabs.executeScript(tab.id,{
        code: 'document.body.innerText;'
        //If you had something somewhat more complex you can use an IIFE:
        //code: '(function (){return document.body.innerText})();'
        //If your code was complex, you should store it in a
        // separate .js file, which you inject with the file: property.
    },receiveText);
});

//tabs.executeScript() returns the results of the executed script
//  in an array of results, one entry per frame in which the script
//  was injected.
function receiveText(resultsArray){
    console.log(resultsArray[0]);
}




