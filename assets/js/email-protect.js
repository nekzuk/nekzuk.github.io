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
      var label = link.getAttribute("data-email-label") || address;
      var subject = link.getAttribute("data-email-subject");
      link.href = "mailto:" + address +
        (subject ? "?subject=" + encodeURIComponent(subject) : "");
      link.textContent = label;
      link.setAttribute("aria-label", label === address ? address : label + " (" + address + ")");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", activateProtectedEmails);
  } else {
    activateProtectedEmails();
  }
})();
