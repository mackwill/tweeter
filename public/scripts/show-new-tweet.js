const newTweetClick = (event) => {
  console.log("clicked");
  $(".new-tweet").slideDown("slow");
};
$(document).on("ready", () => {
  $(document).on("click", "#write-new-tweet", newTweetClick);
});
