$(document).ready(function() {
  
  var topics = ["Family-Guy", "Funny", "South-Park", "So Excited", "DragonBall Z", "Dying", "Simpsons"];
  showButton();

  function showButton() {
    $("#buttons").empty();

    for (var i = 0; i < topics.length; i++) {
      $("#buttons").append("<button class='click' data-name=" + topics[i] + ">" + topics[i] + "</button>"
      );
    }
  }

  $("#search").on("click", function(event) {
    event.preventDefault();

    var newGIF = $("#input").val().trim();

    topics.push(newGIF);
    showButton();

  });

  $("#buttons").on("click", ".click", function() {
    $("#giphy").empty();
   
    // var topic = $(this).attr("data-name");
    // var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=8bvrXfOVZnPW3TMYuEFO8jRewu4AXh3U&limit=10&rating";

    var tvShow = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+ tvShow +"&api_key=LBzJClt2nUnrziIdOPm3XfG6o2JeLlAt&limit=10&rating";

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function(response) {

      for (var i = 0; i < 10; i++) {
        $("#giphy").append(`<div id="rating"> Rating:${response.data[i].rating}</div>`);
        $("#giphy").append(`<img class=loadedImages data-state='still' data-animate=${response.data[i].images.downsized.url} data-still=${response.data[i].images.downsized_still.url} src=${response.data[i].images.downsized_still.url}>`
        );
      }
    });
  });

  $("#giphy").on("click", ".loadedImages", function() {
   
    var GIFlife= $(this).attr("data-state");
    if (GIFlife === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
});
