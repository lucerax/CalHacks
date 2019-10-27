  /*let corpus = document.getElementByClass()*/
$(document).ready(function() {
  let searchInput = document.getElementById("searchBar");
  // console.log(searchInput.value);

  let button = document.getElementById("button");
  button.addEventListener("click", send_url)

  let articleList = document.getElementById("articleList");
});

// run our API call on the value of the current input!
function get_articles () {

    articleList.textContent = ''

    let query = searchInput.value

    let endpoint = "https://newsapi.org/v2/everything?q= + " + query + "&apiKey=75404e18a7aa4b1bb9f478923ff9b858"

    fetch(endpoint)
      .then((response) => {
          return response.json()
    })
      .then((data) => {
          data.articles.forEach((articleObject) => {

              let article = document.createElement("article")

              let img = document.createElement("img")
              img.setAttribute("src", articleObject.urlToImage)

              let heading = document.createElement("h2")
              heading.textContent = articleObject.title

              let description = document.createElement("p")
              description.textContent = articleObject.description

              let link = document.createElement("a")
              link.setAttribute("href", articleObject.url)
              link.textContent = "Link to Article"
              link.setAttribute("target", "_blank")

              article.appendChild(img)
              article.appendChild(heading)
              article.appendChild(description)
              article.appendChild(link)

              articleList.appendChild(article)
          })
    })
}

function send_url() {
    var str = 'https://www.cnn.com/2019/10/18/opinions/hanging-israel-out-to-dry-andelman/index.html'
    console.log(str)
    $.ajax({
        url: '/send_url',
        /*data: {u:str},*/
        dataType: 'json',
        data: JSON.stringify({u:str}),
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        success: function(data) { //callback
            console.log(data);
        },
        error: function(data){
            console.log('ERROR');
        }
    });
}
