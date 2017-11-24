var flag = 0;
var genreId;
var button;


document.getElementsByTagName('button').addEventListener('click', clickHandler(this));

function clickHandler(btn) {
  $("#background").css("display", 'none');
  if (flag === 0) {
    flag += 1;
    button = btn;
    genreId = parseInt($(btn).attr("id"));
    if(genreId === 777){
      var num = Math.floor((Math.random() * 11) + 1);
          switch (num) {
            case 1:
              genreId = 28;
              break;
            case 2:
              genreId = 35;
              break;
            case 3:
              genreId = 27;
              break;
            case 4:
              genreId = 53;
              break;
            case 5:
              genreId = 878;
              break;
            case 6:
              genreId = 16;
              break;
            case 7:
              genreId = 37;
              break;
            case 8:
              genreId = 10751;
              break;
            case 9:
              genreId = 9648;
              break;
            case 10:
              genreId = 10744;
              break;
            case 11:
              genreId = 18;
              break;
        }
    }
        var tempUrl =
      "https://api.themoviedb.org/3/genre/" +
      genreId +
      "/movies?api_key=b09e8ebef5593dfec03034ec1ab31d35&language=en-US&include_adult=false&sort_by=created_at.desc";
    $("body").css(
      "background-image",
      'url("Assets/carbon.jpg")'
    );

    $.ajax({
      dataType: "json",
      method: "GET",
      url: tempUrl,
      success: function(result) {
        var random = Math.floor(Math.random() * 20 + 1);
        var movieTitle = result.results[random].original_title;
        var vote_average = result.results[random].vote_average;
        var release = result.results[random].release_date;
        youtubeApi(movieTitle, vote_average, release);
      },
      error: function(error) {
        console.log("There was an error for retrieval");
      }
    });
  }
}


function youtubeApi(movie, average, release) {
  var movieTitle = movie;
  var vote_average = average;
  var releaseDate = release;
  var title = {
    q: "" + movieTitle + "trailer",
    maxResults: 1
  };

  $.ajax({
    dataType: "json",
    method: "POST",
    data: title,
    url: "https://s-apis.learningfuze.com/hackathon/youtube/search.php",
    success: function(result) {
      var container = $("<div>").attr("id", "description_container");
      var url = "https://www.youtube.com/v/" + result.video[0].id;
      var title = $("<h3>")
        .attr("id", "title")
        .text(movieTitle);
      var date = $("<h5>")
        .attr("id", "release")
        .text("Release Date: " + releaseDate);
      var embed = $("<embed>")
        .attr("src", url)
        .attr("id", "movie");
      var new_div = $("<div>").attr("id", "new_div");
      var vote = $("<h5>").text("IMDB Rating: " + vote_average + " / 10");
      $("#whole_container").replaceWith(new_div);
      $("#new_div").replaceWith(new_div);
      $(new_div).append(title);
      $(new_div).append(embed);
      $(new_div).append(container);
      $("#description_container").append(vote);
      $("#description_container").append(date);
      itunesApi(movieTitle);
    },
    error: function(err) {
      console.log("There was an error");
    }
  });
}

function itunesApi(title) {
  var url2 = "https://itunes.apple.com/search?term=";
  var arr = title.split(" ");
  var url = arr[0];
  for (var i = 1; i < arr.length; i++) {
    url2 = url2 + url + "+" + arr[i];
  }
  $.ajax({
    dataType: "json",
    method: "GET",
    data: url2,
    url: "https://itunes.apple.com/search?term=" + title + "+movie",
    success: function(result) {
      console.log("ITUNE'S WORKS");
      var price = result.results[0].trackPrice;
      var longDescription = result.results[0].longDescription;
      if(longDescription.length <= 0){
        console.log('no description');
      }
      var descript = $("<h5>")
        .attr("id", "longDescription")
        .text(longDescription);
      var rating = result.results[0].contentAdvisoryRating;
      var ratingDisplay = $("<h5>").text("Parental Advisory: " + rating);
      var priceDisplay = $("<h5>").text("Available on Itune's $" + price);
      var bigBtn = $("<button>")
        .text("SOMETHING ELSE!")
        .on("click", redoSearchWithinGenre);
      var bigBtn1 = $("<button>")
        .text("GO BACK!")
        .on("click", reloadHome);

      $("#description_container").append(priceDisplay);
      $("#description_container").append(descript);
      $("#description_container").append(bigBtn);
      $("#description_container").append(ratingDisplay);
      $("#description_container").append(bigBtn1);
    },
    error: function() {
      console.log("ITUNE'S ERROR");
    }
  });
}
function redoSearchWithinGenre() {
  flag = 0;
  clickHandler(button);
}
function reloadHome() {
  window.location.reload();
}


