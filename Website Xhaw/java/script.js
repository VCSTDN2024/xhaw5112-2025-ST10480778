//Home Page Js
var modal = document.getElementById('id01');
window.onclick = function(event) {
  if (event.target == modal) { modal.style.display = "none"; }
}

function openNav() { document.getElementById("sideNav").style.width = "250px"; }
function closeNav() { document.getElementById("sideNav").style.width = "0"; }

function signup(e) {
  e.preventDefault();
  let username = document.getElementById("username").value;
  localStorage.setItem("username", username);
  document.getElementById("id01").style.display = "none";
  document.getElementById("profileIcon").style.display = "block";
  alert("Welcome " + username + "!");
}

function logout() {
  localStorage.removeItem("username");
  document.getElementById("profileIcon").style.display = "none";
  alert("Logged out!");
}

window.onload = function() {
  if(localStorage.getItem("username")) {
    document.getElementById("profileIcon").style.display = "block";
  }
}

document.querySelectorAll(".course-link").forEach(link => {
      link.addEventListener("click", function(e) {
        e.preventDefault(); 
        const sectionId = this.getAttribute("data-section");
        if (sectionId) {
          window.location.href = "detailed Courses.html#" + sectionId; 
        }
      });
    });
