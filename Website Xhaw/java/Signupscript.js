/* ===== Empowering The Nation - Main JavaScript File ===== */

// ===== Modal Functions =====
function openModal(defaultForm = 'signup') {
  const modal = document.getElementById('authModal');
  if (modal) {
    modal.style.display = 'block';
    showForm(defaultForm);
  }
}
function closeModal() {
  const modal = document.getElementById('authModal');
  if (modal) {
    modal.style.display = 'none';
  }
}
function showForm(form) {
  const signupForm = document.getElementById('signupForm');
  const loginForm = document.getElementById('loginForm');
  if (signupForm && loginForm) {
    signupForm.style.display = (form === 'signup') ? 'block' : 'none';
    loginForm.style.display = (form === 'login') ? 'block' : 'none';
  }
}

// ===== Signup & Login Logic =====
function signup(e) {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  if (username) {
    localStorage.setItem("username", username);
    checkLoginStatus();
    closeModal();
    alert("Welcome, " + username + "!");
  }
}
function login(e) {
  e.preventDefault();
  const username = document.getElementById("loginUsername").value.trim();
  if (username) {
    localStorage.setItem("username", username);
    checkLoginStatus();
    closeModal();
    alert("Welcome back, " + username + "!");
  }
}
function logout() {
  localStorage.removeItem("username");
  checkLoginStatus();
  closeNav();
  alert("You have been logged out.");
}

function checkLoginStatus() {
  const profileIcon = document.getElementById("profileIcon");
  const primaryButton = document.querySelector(".hero-buttons .btn-primary");

  if (localStorage.getItem("username")) {
    if (profileIcon) profileIcon.style.display = "block";
    if (primaryButton) primaryButton.style.display = "none";
  } else {
    if (profileIcon) profileIcon.style.display = "none";
    if (primaryButton) primaryButton.style.display = "inline-block";
  }
}

// ===== Side Navigation =====
function openNav() {
  const sideNav = document.getElementById("sideNav");
  if (sideNav) sideNav.style.width = "250px";
}
function closeNav() {
  const sideNav = document.getElementById("sideNav");
  if (sideNav) sideNav.style.width = "0";
}

// theme
const themeToggleButton = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

// On page load, apply the saved theme
if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggleButton.textContent = '☀️'; // Sun icon for dark mode
}

// Add click listener to the button
themeToggleButton.addEventListener('click', () => {
    // Toggle the .dark-mode class on the body
    document.body.classList.toggle('dark-mode');

    let theme = 'light';
    // If dark mode is now active...
    if (document.body.classList.contains('dark-mode')) {
        theme = 'dark';
        themeToggleButton.textContent = '☀️'; // Change icon to sun
    } else {
        themeToggleButton.textContent = '🌙'; // Change icon to moon
    }
    // Save the user's preference to localStorage
    localStorage.setItem('theme', theme);
});

// ===== EVENT LISTENERS (Runs after the page is loaded) =====
document.addEventListener("DOMContentLoaded", function() {
  // Check login status as soon as any page loads
  checkLoginStatus();

  // Attach listener to close modal if clicking outside of it
  window.onclick = function(event) {
    const modal = document.getElementById('authModal');
    if (event.target === modal) { closeModal(); }
  };

  // --- Chatbot Listeners ---
  const chatbotBtn = document.getElementById("chatbotBtn");
  if (chatbotBtn) {
    chatbotBtn.onclick = () => {
      const modal = document.getElementById("chatbotModal");
      if (modal.style.display !== "flex") {
        modal.style.display = "flex";
        if (!document.getElementById("chat-log").hasChildNodes()) {
          addMessage("bot", "Hi 👋! How can I help you today?<br>Type 'faq' to see our help menu.");
        }
      }
    };
  }

  const closeModalChat = document.getElementById("closeModal");
  if(closeModalChat) closeModalChat.onclick = () => { document.getElementById("chatbotModal").style.display = "none"; };

  const sendBtn = document.getElementById("send-btn");
  if(sendBtn) sendBtn.onclick = sendMessage;
  
  const userInput = document.getElementById("user-input");
  if(userInput) userInput.addEventListener("keypress", (e) => { if (e.key === "Enter") sendMessage(); });
});

// ===== Listen for logout/login events from OTHER tabs =====
window.addEventListener('storage', function(event) {
  if (event.key === 'username') {
    checkLoginStatus(); // Update the UI on this page
    applyTheme();
  }
});