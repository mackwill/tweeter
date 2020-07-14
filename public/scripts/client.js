/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const findDaysAgo = (tweetDate) => {
  const today = new Date();
  const msInDay = 24 * 60 * 60 * 1000;

  return Math.floor((today - tweetDate) / msInDay);
};

const escape = (str) => {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = (tweetObj) => {
  console.log(tweetObj);
  const header = `<header class="tweet-header">
      <div class="tweet-header left">
        <img src="${tweetObj.user.avatars}" />
        <p>${tweetObj.user.name}</p>
      </div>
      <div class="tweet-header right">
        <p class="username">${tweetObj.user.handle}</p>
      </div>
    </header>`;

  const form = `<form>
      <p class="submitted-tweet">
        ${tweetObj.content.text}
      </p>
      <footer>
        <div class="tweet-footer footer-left">
          <p class="date-of-tweet">${findDaysAgo(
            tweetObj.created_at
          )} days ago</p>
        </div>
        <div class="tweet-footer footer-right">
          <a href="#"><i class="fas fa-flag"></i></a>
          <a href="#"><i class="fas fa-retweet"></i></a>
          <a href="#"><i class="fas fa-heart"></i></a>
        </div>
      </footer>
    </form>`;

  const newTweet = `<article class="tweet">
      ${header}
      ${form}
    </article>`;

  return newTweet;
};

// const checkIfTweetIsGood = tweet => {
//   if
// }

const renderTweets = (tweets) => {
  tweets.forEach((tweet) => {
    $(".all-tweets").append(createTweetElement(tweet));
  });
};

const submitHandler = function (event) {
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

$(document).ready(() => {
  $("#submit-new-tweet").on("submit", submitHandler);

  const showUserName = function (event) {
    $(this).find(".username").css("visibility", "visible");
  };
  const hideUserName = function (event) {
    $(this).find(".username").css("visibility", "hidden");
  };

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

  loadTweets();
});
