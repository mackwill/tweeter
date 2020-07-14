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

const createTweetElement = (tweetObj) => {
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

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac",
    },
    "content": {
      "text":
        "If I have seen further it is by standing on the shoulders of giants",
    },
    "created_at": 1461116232227,
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd",
    },
    "content": {
      "text": "Je pense , donc je suis",
    },
    "created_at": 1461113959088,
  },
];

$(document).ready(() => {
  const renderTweets = (tweets) => {
    tweets.forEach((tweet) => {
      $(".all-tweets").append(createTweetElement(tweet));
    });
  };

  renderTweets(data);
});
