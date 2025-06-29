function getAge(dob) {
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const dobInput = document.getElementById("dob");
    const dob = new Date(dobInput.value);
    const errorName = document.getElementById("error-name");
    const errorDob = document.getElementById("error-dob");

    // Clear previous errors
    errorName.textContent = "";
    errorDob.textContent = "";

    if (name === "") {
      errorName.textContent = "Please enter your full name.";
      return;
    }

    if (isNaN(dob.getTime())) {
      errorDob.textContent = "Please enter a valid date of birth.";
      return;
    }

    const age = getAge(dob);

    if (age <= 10) {
      errorDob.textContent = "You must be over 10 years old.";
      return;
    }

    const user = {
      name,
      dob: dob.toISOString(),
    };

    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = "app.html";
  });

  // Redirect if already logged in
  if (localStorage.getItem("user")) {
    window.location.href = "app.html";
  }
});
