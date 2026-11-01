// Invite form: post in the background and confirm in place. Falls back to a normal
// submit (and a redirect back here with ?invited=1) if fetch is unavailable or fails.
(function () {
  var form = document.querySelector(".signup");
  var note = document.querySelector(".signup-note");
  if (!form || !note) return;

  function confirmed(email) {
    form.hidden = true;
    note.textContent = "You're on the list" + (email ? " as " + email : "") + ". We'll send a TestFlight invite as seats open.";
  }

  if (/[?&]invited=1/.test(window.location.search)) confirmed("");

  form.addEventListener("submit", function (e) {
    if (!window.fetch || !window.FormData) return;
    e.preventDefault();
    var button = form.querySelector("button");
    var email = form.querySelector("#email").value;
    button.disabled = true;
    button.textContent = "Sending";
    fetch(form.action.replace("formsubmit.co/", "formsubmit.co/ajax/"), {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(form)
    }).then(function (r) {
      if (!r.ok) throw new Error(String(r.status));
      return r.json();
    }).then(function (data) {
      if (!data || String(data.success) !== "true") throw new Error("refused");
      confirmed(email);
    }).catch(function () {
      button.disabled = false;
      button.textContent = "Request an invite";
      note.textContent = "That didn't go through. Try again, or email patrickodonohuev@icloud.com and we'll add you by hand.";
    });
  });
})();
