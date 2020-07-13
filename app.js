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
  const $nav = $("nav");
  $(window).on("scroll", () => {
    if($(this).scrollTop()) {
      $nav.attr("class", "compressed");
    } else {
      $nav.removeClass("compressed");
    }
  }).trigger("scroll");
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
    }, 500);
  }, 5000);
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
  app.smoothScroll();
  app.animateNav();
  app.cycleImages(portraitPaths, $portraitImg);
};

$(() => {
  app.init();
  AOS.init();
});
