// document ready
$(document).ready(function () {

  $(document).on("click", ".fresh", loadScrape);
  $(document).on("click", ".saveArt", saveArt);
  $(document).on("click", ".unSave", unSave);
  $(document).on("click", ".readNote", readNote);
  $(document).on("click", ".saveNote", saveNote);

  function readNote() {

    $("#textModal").empty();
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
        $("#titleModal").append(data.title);
        $("#textModal").append(data.note.body);
      });
  };

  function saveNote() {
    var articleId = $(this).attr("data-_id");
    var newNote = $("#textModal").val();

    $.ajax({
      method: "POST",
      url: "/articles/" + articleId,
      dataType: "json",
      data: {
        _id: articleId,
        body: newNote
      },
      success: function(data) {
        $("#textModal").val(" ");
      }
    });
    setTimeout(window.location.assign("/"), 2000);
  }

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