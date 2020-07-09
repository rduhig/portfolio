const app = {};

app.smoothScroll = () => {
  $("[href^='#']").click(function (e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $($(this).attr("href")).offset().top - 50
    }, 500);
  });
};

app.animateNav = () => {
  const $window = $(window);
  const $nav = $("nav");

  $window.scroll(() => {
    if($window.scrollTop()) {
      $nav.attr("class", "compressed");
    } else {
      $nav.removeClass("compressed");
    }
  });
};

app.init = () => {
  app.smoothScroll();
  app.animateNav();
};

$(() => {
  app.init();
  AOS.init();
});
