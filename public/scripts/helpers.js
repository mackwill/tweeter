export const findDaysAgo = (tweetDate) => {
  const today = new Date();
  const msInDay = 24 * 60 * 60 * 1000;

  return Math.floor((today - tweetDate) / msInDay);
};

export const escape = (str) => {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

export const createTweetElement = (tweetObj) => {
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

export const renderTweets = (tweets) => {
  tweets.forEach((tweet) => {
    $(".all-tweets").append(createTweetElement(tweet));
  });
};
