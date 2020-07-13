$(document).ready(() => {
  const tweetChangeHandler = function (event) {
    let textLength = 140 - this.value.length;

    $(`[for=${this.id}]`).text(`${140 - this.value.length}`);

    if (textLength < 0) {
      $(`[for=${this.id}]`).css("color", "red");
    } else {
      $(`[for=${this.id}]`).css("color", "black");
    }
  };

  $("#tweet-text").on("keyup", tweetChangeHandler);
});
