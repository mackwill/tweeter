/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

import {
  tweetChangeHandler,
  submitHandler,
  newTweetHandler,
  scrollHandler,
  showUserName,
  hideUserName,
} from "./event-handlers.js";
import { renderTweets } from "./helpers.js";

$(document).ready(() => {
  $("#submit-new-tweet").on("submit", submitHandler);
  $("#tweet-text").on("keyup", tweetChangeHandler);

  $(window).on("scroll", scrollHandler);

  $(document).on("click", "#write-new-tweet", newTweetHandler);

  $(".all-tweets").on("mouseenter", ".tweet", showUserName);
  $(".all-tweets").on("mouseleave", ".tweet", hideUserName);

  const loadTweets = () => {
    $.get("/tweets", (data) => {
      console.log("data: ", data);
    })
      .then((data) => {
        console.log("Success");

        renderTweets(data);
      })
      .then(() => {
        console.log("Nicolas Cage rendered your tweets");
      });
  };
  å;
  loadTweets();
});
