$(document).on("ready", () => {
  const showUserName = function (event) {
    $(this).find(".username").css("visibility", "visible");
  };
  const hideUserName = function (event) {
    $(this).find(".username").css("visibility", "hidden");
  };

  $(document).on("mouseenter", ".tweet", showUserName);
  $(document).on("mouseleave", ".tweet", hideUserName);
});
