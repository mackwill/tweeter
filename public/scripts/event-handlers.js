import { escape, createTweetElement } from "./helpers.js";
export const tweetChangeHandler = function (event) {
  let textLength = 140 - this.value.length;

  $(`[for=${this.id}]`).text(`${140 - this.value.length}`);

  if (textLength < 0) {
    $(`[for=${this.id}]`).css("color", "red");
  } else {
    $(`[for=${this.id}]`).css("color", "black");
  }
};

export const submitHandler = function (event) {
  event.preventDefault();

  const tempTweet = $(this).children("textarea").val();

  $(this).children("textarea").val(escape(tempTweet));

  if (tempTweet === "" || tempTweet === null) {
    $("#alert")
      .html(`Please enter something in the tweet field`)
      .slideDown("slow")
      .css("display", "flex");

    return;
  } else if (tempTweet.length > 140) {
    $("#alert")
      .html(`Please limit your tweet to 140 characters`)
      .slideDown("slow")
      .css("display", "flex");

    return;
  }
  $("#alert").css("display", "none").html("");
  console.log("Nicolas Cage is making an AJAX request");

  $.post("/tweets", $("#submit-new-tweet").serialize()).then(() => {
    $.get("/tweets", (data) => {
      const newTweet = data[data.length - 1];
      console.log(newTweet);
      $("#all-tweets").prepend(createTweetElement(newTweet));
    });
  });
  $(this).children("textarea").val("");
};

export const newTweetHandler = function (event) {
  const newTweet = $(this).parents().find(".new-tweet");
  const textArea = $(this).parents().find("textarea");

  if ($(newTweet).css("display") === "none") {
    $(newTweet).slideDown("slow");
    $(textArea).focus();
    return;
  }
  $(newTweet).slideUp("slow");
  return;
};

export const scrollHandler = function (event) {
  if ($(window).scrollTop() !== 0) {
    $("#scroll-button-container").show().css("display", "flex");
  } else {
    $("#scroll-button-container").hide();
  }
};

export const showUserName = function (event) {
  $(this).find(".username").css("visibility", "visible");
};
export const hideUserName = function (event) {
  $(this).find(".username").css("visibility", "hidden");
};

// module.exports = {
//   tweetChangeHandler,
//   submitHandler,
//   newTweetHandler,
//   scrollHandler,
// };
