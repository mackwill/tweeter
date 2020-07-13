$(document).ready(() => {
  const showUserName = function (event) {
    $(this).find(".username").css("visibility", "visible");
  };
  const hideUserName = function (event) {
    $(this).find(".username").css("visibility", "hidden");
  };

  $(".tweet").on("mouseover", showUserName);
  $(".tweet").on("mouseleave", hideUserName);
});
