$(document).ready(() => {
  const showUserName = function (event) {
    $(".username").css("visibility", "visible");
  };
  const hideUserName = function (event) {
    $(".username").css("visibility", "hidden");
  };

  $(".tweet").on("mouseover", showUserName);
  $(".tweet").on("mouseleave", hideUserName);
});
