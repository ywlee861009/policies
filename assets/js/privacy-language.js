(function () {
  "use strict";

  var script = document.querySelector("script[data-policy-root]");
  if (!script) return;

  var root = script.getAttribute("data-policy-root");
  if (!root) return;

  // Explicit app language takes priority over the browser's primary language.
  var current = new URL(window.location.href);
  var requested = current.searchParams.get("lang");
  var preferred = navigator.language || (navigator.languages || [])[0] || "en";
  var language = requested === "ko" || requested === "en"
    ? requested
    : (/^ko(?:-|$)/i.test(preferred) ? "ko" : "en");

  var target = new URL(root + language + "/", current);
  target.search = current.search;
  target.hash = current.hash;

  // Replacing the gateway keeps the Back button from entering a redirect loop.
  window.location.replace(target.href);
}());
