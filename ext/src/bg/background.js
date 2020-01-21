//using the style attributes of HTML text nodes, we extract relevant strings
var newsInfo = {}

code = `(function() {
    function textNodesUnder(node){
      var all = [];
      for (node=node.firstChild;node;node=node.nextSibling){
        if (node.nodeType==3) all.push(node);
        else all = all.concat(textNodesUnder(node));
      }
      return all;
    }
    let textNodes = textNodesUnder(document);
    textNodes = textNodes.filter(t => t.parentElement.tagName !== 'STYLE' && t.parentElement.tagName !== 'SCRIPT' && t.parentElement.tagName == 'P' && window.getComputedStyle(t.parentElement, null).getPropertyValue('visibility') === 'visible');
    console.log("textNodes is: ", textNodes)


    let textByStyle = {};
    for (let i = 0; i < textNodes.length; i++) {
        let style = window.getComputedStyle(textNodes[i].parentElement, null).getPropertyValue('font-size') + window.getComputedStyle(textNodes[i].parentElement, null).getPropertyValue('font-family') + window.getComputedStyle(textNodes[i].parentElement, null).getPropertyValue('font-weight');
        if (!textByStyle[style]) {
            textByStyle[style] = '';
        }
        textByStyle[style] = textByStyle[style].trim() + ' ' + textNodes[i].textContent.trim();
    }

    let maxLength = -1;
    let bestText = '';

    for (let style of Object.keys(textByStyle)) {
        let length = textByStyle[style].length;
        if (length > maxLength) {
            maxLength = length;
            bestText = textByStyle[style];
        }
    }

    return bestText;
})();`;

//include url to allow access to the full website when results are displayed
function getURL() {

    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        var CURRENTURL = tabs[0].url;
        console.log(CURRENTURL)

        chrome.tabs.executeScript({
            code: code
        }, function(results) {

            var sentence = results[0];
            console.log(results)
            console.log(sentence)
            console.log('POST ajax called')

            $.ajax({
                url: 'http://lucerax.pythonanywhere.com/send_url',
                dataType: 'json',
                data: JSON.stringify({u:sentence, link:CURRENTURL}),
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
                    createDivs(6)
                },
                error: function(data){
                    console.log('ERROR');
                },

            });
        });


    });


}

strings = []

function reportError(){
    string = "<p>" + "No cross-references generated!" + "</p>";
    strings.push(string)
    createDivs(1)
}


function createDivs(num) {
    var i = 0;
    while (i < num) {
        var title = newsInfo["title"][i];
        var provider = newsInfo["provider"][i];
        var snippet = newsInfo["description"][i];

    	string = "<div id='"+i+"' class = 'social-card' >";
    	string += "<h2>" + title + "</h2>";
    	string += "<a >" + provider + "</a>";
    	string += "<p>" + snippet + "</p>";
    	string += "</div>";
    	strings.push(string)
        i += 1
    }
    load(num)
}

function load(num) {
    var i = 0;
    while (i < num) {
        document.getElementById('stories').innerHTML += strings[i];
        i += 1
    }
    addListen(num)

}

links = {}

function addListen(num){
    var i = 0;
    while (i < num) {
        var link = document.getElementById(i.toString())
        links[i] = newsInfo["URL"][i]
        console.log(links[i],link.id)
        link.addEventListener('click', function(){
            chrome.tabs.create({url: links[this.id]});
        })
        i += 1
    }
}




document.addEventListener('DOMContentLoaded', function() {
    getURL()

});




function httpGet(url) {

}
