$(function() {
  $(window).on("load page:load", function() {
    setTimeout(function() {
      $("html").addClass("loaded");
    }, 250);
  });

  function hasLocalStorage() {
    try {
      return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
      return false;
    }
  }

  // Store the new language
  $(document).on("click", ".js-locale", function() {
    var selected = $(this).data("locale");
    if (hasLocalStorage()) localStorage.setItem("lastLocale", selected);
  });

  // Redirect to browser language
  if(window.location.pathname == "/" && hasLocalStorage()) {
    if(localStorage.getItem("lastLocale") == null) {
      var browserLang = (navigator.language || navigator.userLanguage).match(/^[a-z]{2}/)[0];
      if (browserLang == "fr" || browserLang == "en") {
        localStorage.setItem("lastLocale", browserLang);
      } else {
        localStorage.setItem("lastLocale", defaultLang);
      }
    }

    if(localStorage.getItem("lastLocale") != $("body").data("locale")) {
      window.location = localStorage.getItem("lastLocale");
    }
  }
});
