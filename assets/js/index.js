document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  const error = document.getElementById("error");

  if (localStorage.getItem("user")) {
    window.location.href = "app.html";
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const dob = new Date(document.getElementById("dob").value);
    const age = getAge(dob);

    if (age <= 10) {
      error.textContent = "You must be over 10 years old.";
      return;
    }

    const user = {
      name,
      dob: dob.toISOString(),
    };
    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = "app.html";
  });
});
