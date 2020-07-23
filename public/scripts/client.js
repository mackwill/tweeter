/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

import {
  tweetCharHandler,
  submitHandler,
  newTweetHandler,
  scrollHandler,
  showUserName,
  hideUserName,
  // registerHandler,
} from "./event-handlers.js";
import { renderTweets } from "./helpers.js";

$(document).ready(() => {
  // Bind all click listeners from event-handlers.js to respecive elements
  $("#submit-new-tweet").on("submit", submitHandler);
  $("#tweet-text").on("keyup", tweetCharHandler);
  $(".all-tweets").on("mouseenter", ".tweet", showUserName);
  $(".all-tweets").on("mouseleave", ".tweet", hideUserName);
  $(".all-tweets").on("submit", ".tweet", hideUserName);

  // $(document).on("keyup", "#username-form-register", checkUsername);

  $(window).on("scroll", scrollHandler);

  // $(document).on("submit", "#register-form", registerHandler);

  // Load all of the tweets in the "database" and render them to the front page
  const loadTweets = () => {
    $.get("/tweets", (data) => {
      renderTweets(data);
    });
  };

  loadTweets();
});
