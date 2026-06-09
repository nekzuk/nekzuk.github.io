(function () {
  function activateProtectedEmails() {
    var links = document.querySelectorAll(
      "a[data-email-user][data-email-domain]"
    );

    links.forEach(function (link) {
      var user = link.getAttribute("data-email-user");
      var domain = link.getAttribute("data-email-domain");

      if (!user || !domain) {
        return;
      }

      var address = user + "@" + domain;
      link.href = "mailto:" + address;
      link.textContent = address;
      link.setAttribute("aria-label", address);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", activateProtectedEmails);
  } else {
    activateProtectedEmails();
  }
})();
