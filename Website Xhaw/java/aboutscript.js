
    // ===== Modal Functions =====
function openModal(defaultForm = 'signup') {
  document.getElementById('authModal').style.display = 'block';
  showForm(defaultForm);
}
function closeModal() {
  document.getElementById('authModal').style.display = 'none';
}
function showForm(form) {
  document.getElementById('signupForm').style.display = (form === 'signup') ? 'block' : 'none';
  document.getElementById('loginForm').style.display = (form === 'login') ? 'block' : 'none';
}
window.onclick = function(event) {
  const modal = document.getElementById('authModal');
  if (event.target === modal) { closeModal(); }
}

// ===== Signup & Login =====
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
    // This targets the "Sign Up / Login" button on the home page
    const primaryButton = document.querySelector(".hero-buttons .btn-primary");

    if (localStorage.getItem("username")) {
        // If logged in, show the profile icon
        if (profileIcon) {
            profileIcon.style.display = "block";
        }
        // And hide the main login button if it exists on the page
        if (primaryButton) {
            primaryButton.style.display = "none";
        }
    } else {
        // If not logged in, hide the profile icon
        if (profileIcon) {
            profileIcon.style.display = "none";
        }
        // And make sure the main login button is visible if it exists
        if (primaryButton) {
    primaryButton.style.display = "inline-block";
        }
    }
}

// ===== Side Navigation =====
function openNav() { document.getElementById("sideNav").style.width = "250px"; }
function closeNav() { document.getElementById("sideNav").style.width = "0"; }

    // ChatBot Modal open/close
    document.getElementById("chatbotBtn").onclick = () => {
      const modal = document.getElementById("chatbotModal");
      if (modal.style.display !== "flex") {
          modal.style.display = "flex";
          // Only add welcome message if chat log is empty
          if (!document.getElementById("chat-log").hasChildNodes()) {
             addMessage("bot", "Hi 👋! How can I help you today?<br>Type 'faq' to see our help menu.");
          }
      }
    };

    document.getElementById("closeModal").onclick = () => {
      document.getElementById("chatbotModal").style.display = "none";
    };

    document.getElementById("send-btn").onclick = sendMessage;
    document.getElementById("user-input").addEventListener("keypress", (e) => {
      if (e.key === "Enter") sendMessage();
    });

    function sendMessage() {
      const input = document.getElementById("user-input");
      const message = input.value.trim();
      if (!message) return;
      addMessage("user", message);
      input.value = "";
      setTimeout(() => handleBotResponse(message.toLowerCase()), 500);
    }

    function addMessage(sender, text) {
      const log = document.getElementById("chat-log");
      const div = document.createElement("div");
      div.className = sender;
      div.innerHTML = text;
      log.appendChild(div);
      log.scrollTop = log.scrollHeight;
    }

    function handleBotResponse(userMessage) {
      if (userMessage.includes("hi") || userMessage.includes("hello")) {
        addMessage("bot", "Hello! 😊 How can I help you today? Type 'faq' to see the menu.");
      } else if (userMessage.includes("faq")) {
        addMessage("bot", `
          Please select a category:<br>
          <button class="faq-btn" onclick="showFAQ('locations')">📍 Locations</button>
          <button class="faq-btn" onclick="showFAQ('payments')">💳 Payments</button>
          <button class="faq-btn" onclick="showFAQ('contact')">📞 Contact</button>
          <button class="faq-btn" onclick="showFAQ('courses')">📚 Courses</button>
        `);
      } else {
        addMessage("bot", "Sorry, I didn’t quite get that. Try typing 'faq' for options.");
      }
    }

    function showFAQ(category) {
      let faqs = {
        locations: `
          <div class="accordion">
            <details open>
              <summary>Where are your locations?</summary>
              <p>We are in Johannesburg South, Soweto, Roodepoort, and Sandton.<br>
              <a href='contact us.html'>📍 View on map</a></p>
            </details>
          </div>
        `,
        payments: `
          <div class="accordion">
            <details open>
              <summary>How do I pay?</summary>
              <p>You can pay online via EFT or card. <a href='checkout.html'>💳 Go to checkout</a></p>
            </details>
          </div>
        `,
        contact: `
          <div class="accordion">
            <details open>
              <summary>How can I contact you?</summary>
              <p>You can reach us via our <a href='contact us.html'>Contact page</a> or call 011-123-4567.</p>
            </details>
          </div>
        `,
        courses: `
          <div class="accordion">
            <details open>
              <summary>What courses do you offer?</summary>
              <p>We offer First Aid, Sewing, Cooking, Landscaping, Child Minding, Life Skills, and Garden Maintenance.<br>
              <a href='Courses.html'>📚 View all courses</a></p>
            </details>
          </div>
        `
      };
      addMessage("bot", faqs[category]);
    }
    // ===== Initial Load =====
document.addEventListener("DOMContentLoaded", function() {
    checkLoginStatus();
});