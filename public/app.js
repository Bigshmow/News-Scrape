// document ready
$(document).ready(function () {

  $(document).on("click", ".fresh", loadScrape);
  $(document).on("click", ".saveArt", saveArt);
  $(document).on("click", ".unSave", unSave);
  $(document).on("click", ".makeNote", makeNote);

  function makeNote() {

    $("#textModal").val("");
    $("#titleModal").empty();

    // Save the id from the p tag
    var articleId = $(this).attr("data-_id");

    // Now make an ajax call for the Article
    $.ajax({
        method: "GET",
        url: "/articles/" + articleId
      })
      .then(function (data) {
        console.log(data);
        // The title of the article
        $("#titleModal").append(data.title);
        if (data.note) {
          $("#textModal").val(data.note.body);
        }
      });
  };

  // This function will scrape and load the main page
  function loadScrape() {
    $.get("/scrape", function (data) {
    }).then(alert("Getting your results!", setTimeout(window.location.reload()),3500))
  };

  //  This function will save an article
  function saveArt() {
    var articleId = $(this).attr("data-_id");
    console.log(articleId);
    $.ajax({
      type: "PUT",
      url: "/api/articles/" + articleId
    });
    setTimeout(window.location.assign("/"), 2000);
  }

  //  This function will unsave an article
  function unSave() {
    var articleId = $(this).attr("data-_id");
    console.log(articleId);
    $.ajax({
      type: "PUT",
      url: "/api/unsave/" + articleId
    });
    setTimeout(window.location.assign("/saved"), 2000);
  }

  // document ready end
});