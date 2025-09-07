document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("myModal");
  const openModalBtn = document.getElementById("btn-dark"); // "Join Us"
  const closeModalBtn = document.getElementById("closeModal");
  const form = document.getElementById("modalForm");
  const responseDiv = document.getElementById("formResponse");

  // Open modal
  openModalBtn.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent navigation
    modal.style.display = "block";
  });

  // Close modal
  closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close if clicked outside modal
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // AJAX form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    fetch("form-handler.php", {
      method: "POST",
      body: formData
    })
    .then(response => response.text())
    .then(data => {
      responseDiv.innerHTML = data;  // show success message
      form.reset(); // clear form fields
      setTimeout(() => { modal.style.display = "none"; }, 2000); // auto-close modal
    })
    .catch(err => {
      responseDiv.innerHTML = "<p style='color:red;'>Error submitting form.</p>";
      console.error(err);
    });
  });
});
