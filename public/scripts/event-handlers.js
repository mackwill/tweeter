import { escape, createTweetElement, renderTweets } from "./helpers.js";

// Track the number of characters entered into the
// new tweet box and change the counter to red
// if characters are longer than 140.
export const tweetCharHandler = function (event) {
  let textLength = 140 - this.value.length;

  $(`[for=${this.id}]`).text(`${140 - this.value.length}`);

  if (textLength < 0) {
    $(`[for=${this.id}]`).css("color", "red");
  } else {
    $(`[for=${this.id}]`).css("color", "black");
  }
};

// Check whether the tweet is empty or if it is
// longer than 140 characters and display the
// appropriate error message

const presentAlert = (tempTweet) => {
  if (tempTweet === "" || tempTweet === null) {
    $("#alert")
      .html(`Please enter something in the tweet field`)
      .slideDown("slow")
      .css("display", "flex");

    return true;
  } else if (tempTweet.length > 140) {
    $("#alert")
      .html(`Please limit your tweet to 140 characters`)
      .slideDown("slow")
      .css("display", "flex");

    return true;
  }
  return false;
};

// Check if the tweets are properly entered
// and then post to tweets if they are
export const submitHandler = function (event) {
  event.preventDefault();

  const tempTweet = $(this).children("textarea").val();

  $(this).children("textarea").val(escape(tempTweet));

  const alert = presentAlert(tempTweet);

  if (alert) return;

  $("#alert").css("display", "none").html("");

  $.post("/tweets", $("#submit-new-tweet").serialize()).then(() => {
    $.get("/tweets", (data) => {
      $("#all-tweets").empty();
      renderTweets(data);
    });
  });

  $(this).children("textarea").val("");
  $($(this).parent().find("output")).text("140");
};

// If the window is not in desktop mode, then scroll out/up
// the new tweet area when Write a new tweet is clicked
export const newTweetHandler = function () {
  const newTweet = $(this).parents().find(".new-tweet");
  const textArea = $(this).parents().find("textarea");

  if ($(newTweet).css("display") === "none") {
    $(newTweet).slideDown("slow");
    $(textArea).focus();
    return;
  } else if ($(window).width() < 1024) {
    $(newTweet).slideUp("slow");
    return;
  }

  $(textArea).focus();

  return;
};

export const scrollHandler = function () {
  if ($(window).scrollTop() !== 0) {
    $("#scroll-button-container").show().css("display", "flex");
  } else {
    $("#scroll-button-container").hide();
  }
};

// Show and hide the username and icons of the user
// when hovering over the tweet and then leaving
export const showUserName = function (event) {
  $(this).find(".username").css("visibility", "visible");
  $(this).find(".footer-right").css("visibility", "visible");
};
export const hideUserName = function (event) {
  $(this).find(".username").css("visibility", "hidden");
  $(this).find(".footer-right").css("visibility", "hidden");
};
