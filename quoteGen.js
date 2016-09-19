var counter = 0;
var $body = $('body'),
redVal = 55,
greenVal = 50,
blueVal = 25,
quote;

var sendText = "something current...";  //this is the variable that should be replaced by the API calls and sent to Twitter


//this is Twitters function to format the page
window.twttr = (function(d, s, id) {
    var t, js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);
    return window.twttr || (t = {
        _e: [],
        ready: function(f) {
            t._e.push(f)
        }
    });
}(document, "script", "twitter-wjs"));

//the actions to call the quote API
function start() {
redVal = (redVal + 45) % 255;
greenVal = (greenVal + 40) % 255;
blueVal = (blueVal + 20) % 255; 
var colorVal = "rgba(" + redVal + "," + greenVal + "," + blueVal + ", 0.4)";
$body.css({"background-color": colorVal });


if (counter % 2 == 0) {
   $.ajax({
       url: "http://quotes.stormconsultancy.co.uk/quotes/random.json?",
       jsonp: "callback",
       dataType: "jsonp",
       data: {
           q: "id, author, quote",
           format: "json"
       },

       success: function( response ) {
           var quote = response.quote;
           var author = response.author;
           document.getElementById("textDisplay").innerHTML = quote;
           document.getElementById("author").innerHTML = author;
           outText = quote + "--" + author;
           passText(outText);
       }
    }); 
   counter += 1; 
} else {     $.ajax({
       url: "http://api.icndb.com/jokes/random?",
       jsonp: "callback",
       dataType: "jsonp",
       success: function( response ) {
           var quote = response.value.joke;
           var author = " ";
           document.getElementById("textDisplay").innerHTML = quote;
           document.getElementById("author").innerHTML = author;
           passText(quote);
       }
    }); 
   counter += 1;
}
}

//my attempted helper function to pass the quote values
function passText(superT) {
    $('#container iframe').remove();

    console.log(superT);
    sendText = superT;
        twttr.ready(function (twttr) {
            twttr.events.bind('tweet', 
                twttr.widgets.createShareButton(
                'https://dev.twitter.com/',
                document.getElementById('container'),
                {
                text: sendText }
                ));
        })
    }



