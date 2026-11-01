// Signup form has no backend yet: keep the page honest instead of pretending.
(function () {
  var form = document.querySelector(".signup");
  if (!form) return;
  form.addEventListener("submit", function (e) {
    if (form.getAttribute("action") === "#") {
      e.preventDefault();
      var note = form.querySelector(".form-note");
      if (!note) {
        note = document.createElement("p");
        note.className = "fine form-note";
        note.setAttribute("role", "status");
        form.insertAdjacentElement("afterend", note);
      }
      note.textContent = "This form isn't connected yet. Email hello@bulgebracket.app and we will add you to the list by hand.";
    }
  });
})();
