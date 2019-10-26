// document ready
$(document).ready(function () {

  $(document).on("click", ".fresh", loadScrape);
  $(document).on("click", ".saveArt", saveArt);
  $(document).on("click", ".unSave", unSave);


  $(document).on("click", ".makeNote", function () {
    // Empty the notes from the note section
    $("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");

    // Now make an ajax call for the Article
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
      })
      // With that done, add the note information to the page
      .then(function (data) {
        console.log(data);
        // The title of the article
        $("#notes").append("<h2>" + data.title + "</h2>");
        // An input to enter a new title
        $("#notes").append("<input id='titleinput' name='title' >");
        // A textarea to add a new note body
        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
        // A button to submit a new note, with the id of the article saved to it
        $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

        // If there's a note in the article
        if (data.note) {
          // Place the title of the note in the title input
          $("#titleinput").val(data.note.title);
          // Place the body of the note in the body textarea
          $("#bodyinput").val(data.note.body);
        }
      });
  });

    // This function will scrape and load the main page
  function loadScrape() {
    $.get("/scrape", function (data) {
    });
    alert("Getting your results!",setTimeout(window.location.assign("/"), 1000))
  };

  //  This function will save an article
  function saveArt() {
    var articleId = $(this).attr("data-_id");
    console.log(articleId);
    $.ajax({
      type: "PUT",
      url: "/api/articles/" + articleId
    });
    setTimeout(window.location.assign("/"), 1000);
  }

  //  This function will unsave an article
  function unSave() {
    var articleId = $(this).attr("data-_id");
    console.log(articleId);
    $.ajax({
      type: "PUT",
      url: "/api/unsave/" + articleId
    });
    setTimeout(window.location.assign("/saved"), 1000);
  }

  // document ready end
});