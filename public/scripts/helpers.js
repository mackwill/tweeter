// Converts the time of the tweet into number of days from current date
export const findDaysAgo = (tweetDate) => {
  const today = new Date();
  const msInDay = 24 * 60 * 60 * 1000;

  return Math.floor((today - tweetDate) / msInDay);
};

// Escape function to avoid code injections
export const escape = (str) => {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Creates the body for each tweet element
// which includes a header, form and footer
export const createTweetElement = (tweetObj) => {
  const newTweet = `<article class="tweet">
    <header class="tweet-header">
      <div class="tweet-header left">
        <img src="${tweetObj.user.avatars}" />
        <p>${tweetObj.user.name}</p>
      </div>
      <div class="tweet-header right">
        <p class="username">${tweetObj.user.handle}</p>
        </div>
    </header>
    <form>
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
          <a href="#"><i class="fas fa-flag footer-icon"></i></a>
          <a href="#"><i class="fas fa-retweet footer-icon"></i></a>
          <a href="#"><i class="fas fa-heart footer-icon"></i></a>
        </div>
      </footer>
    </form>
  </article>`;

  return newTweet;
};

export const renderTweets = (tweets) => {
  tweets.forEach((tweet) => {
    $(".all-tweets").prepend(createTweetElement(tweet));
  });
};
