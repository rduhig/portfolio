const app = {};

app.mobileMenu = () => {
  $("nav button").on("click", function() {
    $(this).toggleClass("active not-active");
    $("nav").toggleClass("expanded");
    $("nav ul").toggleClass("mobile");
    $(window).trigger("scroll");
  });
};

app.smoothScroll = () => {
  $("[href^='#']").click(function (e) {
    e.preventDefault();
    $("nav button.active").trigger("click");
    $('html, body').animate({
      scrollTop: $($(this).attr("href")).offset().top - 50
    }, 500);
  });
};

app.animateNav = () => {
  const $nav = $("nav");
  $(window).on("scroll", $.throttle(250, () => {
    if (!$nav.hasClass("expanded")) {
      if($(this).scrollTop()) {
        $nav.attr("class", "compressed");
      } else {
        $nav.removeClass("compressed");
      }
    }
  })).trigger("scroll");
};

app.cycleImages = (imgPaths, $targetImg) => {
  let index = 1;
  setInterval(() => {
    $targetImg.addClass("blur");
    setTimeout(() => {
      $targetImg.attr("src", imgPaths[index]).on("load", () => {
        $targetImg.removeClass("blur");
      });
      index = (index + 1) % imgPaths.length;
    }, 250);
  }, 10000);
};

app.clickEmail = () => {
  $("a[href^='mailto'").on("click", function (e) {
    e.preventDefault();
    window.location.href = $(this).attr("href").replace("myemail", "zoho");
  });
};

app.init = () => {
  const portraitPaths = [
    "./assets/portraits/robert-1.png",
    "./assets/portraits/robert-2.png",
    "./assets/portraits/robert-3.png",
    "./assets/portraits/robert-4.png",
    "./assets/portraits/robert-5.png"
  ];
  $portraitImg = $(".about-image img");
  app.mobileMenu();
  app.smoothScroll();
  app.animateNav();
  app.cycleImages(portraitPaths, $portraitImg);
  app.clickEmail();
};

$(() => {
  app.init();
  AOS.init();
});
