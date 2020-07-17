const app = {
  portraitPaths: [
    "./assets/portraits/robert-1.png",
    "./assets/portraits/robert-2.png",
    "./assets/portraits/robert-3.png",
    "./assets/portraits/robert-4.png",
    "./assets/portraits/robert-5.png"
  ],
  refreshIntervalId: null
};

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

app.startImageCycle = () => {
  $targetImg = $(".about-image img");
  let index = app.portraitPaths.indexOf($targetImg.attr("src")) + 1;
  app.refreshIntervalId = setInterval(() => {
    $targetImg.addClass("blur");
    setTimeout(() => {
      $targetImg.attr("src", app.portraitPaths[index]).on("load", () => {
        $targetImg.removeClass("blur");
      });
      index = (index + 1) % app.portraitPaths.length;
    }, 250);
  }, 10000);
};

app.stopImageCycle = () => {
  clearInterval(app.refreshIntervalId);
  app.refreshIntervalId = null;
}

app.clickEmail = () => {
  $("a[href^='mailto'").on("click", function (e) {
    e.preventDefault();
    window.location.href = $(this).attr("href").replace("myemail", "zoho");
  });
};

app.init = () => {
  const $nav = $("nav");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      switch (entry.target) {
        case $(".page-top")[0]:
          if (entry.isIntersecting) {
            $nav.removeClass("compressed");
          } else {
            $nav.attr("class", "compressed");
          }
          break;
        case $(".about-image")[0]:
          if (entry.isIntersecting) {
            app.startImageCycle();
          } else {
            app.stopImageCycle();
          }
          break;
      }
    });
  }, {threshold: 0});
  observer.observe($(".page-top")[0]);
  observer.observe($(".about-image")[0]);
  app.mobileMenu();
  app.smoothScroll();
  app.clickEmail();
};

$(() => {
  app.init();
});
