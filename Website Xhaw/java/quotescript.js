function calculateTotal(isQuote = false) {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("number").value;
    const address = document.getElementById("address").value; 

    if (!name || !email || !phone) {
        alert("Please fill in your Name, Email, and Phone Number.");
        return;
    }

    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("number", phone);
    localStorage.setItem("address", address);

    const selectedCourses = [...document.querySelectorAll(".course:checked")];
    if (selectedCourses.length === 0) {
        alert("Please select at least one course.");
        return;
    }

    const courseDetails = selectedCourses.map(item => ({ 
      name: item.dataset.name, 
      duration: item.dataset.duration, 
      price: parseFloat(item.value) 
    })); 

    let subtotal = courseDetails.reduce((sum, c) => sum + c.price, 0);

    let discountRate = 0;
    const courseCount = selectedCourses.length;

    if (courseCount >= 4) discountRate = 0.15;
    else if (courseCount === 3) discountRate = 0.10;
    else if (courseCount === 2) discountRate = 0.05;

    const discount = subtotal * discountRate;
    const vat = 0.15 * (subtotal - discount);
    const total = subtotal - discount + vat;

    localStorage.setItem("courseDetails", JSON.stringify(courseDetails));
    localStorage.setItem("subtotal", subtotal.toFixed(2));
    localStorage.setItem("discount", discount.toFixed(2));
    localStorage.setItem("discountRate", (discountRate * 100) + "%");
    localStorage.setItem("vat", vat.toFixed(2));
    localStorage.setItem("total", total.toFixed(2));

    if (isQuote) {
      window.location.href = "quotationLink.html"; // Placeholder
    } else {
      window.location.href = "payment.html"; // Placeholder
    }
  }

    // Info Modal Logic
    const infoModal = document.getElementById("infoModal");
    const openInfoModalBtn = document.getElementById("openInfoModal");
    const closeInfoModalBtn = document.getElementById("closeInfoModal");

    openInfoModalBtn.onclick = () => infoModal.style.display = "flex";
    closeInfoModalBtn.onclick = () => infoModal.style.display = "none";
    window.addEventListener('click', (e) => { if (e.target === infoModal) infoModal.style.display = "none"; });

    // Accordion Logic
    document.querySelectorAll(".accordion-header").forEach(header => {
      header.addEventListener("click", () => {
        const currentlyActive = document.querySelector(".accordion-header.active");
        if(currentlyActive && currentlyActive !== header) {
            currentlyActive.classList.remove("active");
            currentlyActive.nextElementSibling.style.display = "none";
        }

        header.classList.toggle("active");
        const content = header.nextElementSibling;
        content.style.display = content.style.display === "block" ? "none" : "block";
      });
    });

    // ChatBot Functions
    document.getElementById("chatbotBtn").onclick = () => {
        const modal = document.getElementById("chatbotModal");
        if (modal.style.display !== "flex") {
            modal.style.display = "flex";
            if (!document.getElementById("chat-log").hasChildNodes()) {
                addMessage("bot", "Hi 👋! How can I help you today?<br>Type 'faq' to see our help menu.");
            }
        }
    };
    document.getElementById("closeChatModal").onclick = () => { document.getElementById("chatbotModal").style.display = "none"; };
    document.getElementById("send-btn").onclick = sendMessage;
    document.getElementById("user-input").addEventListener("keypress", (e) => { if (e.key === "Enter") sendMessage(); });
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
            locations: `<div class="accordion"><details open><summary>Where are your locations?</summary><p>We are in Johannesburg South, Soweto, Roodepoort, and Sandton.<br><a href='contact-us.html'>📍 View on map</a></p></details></div>`,
            payments: `<div class="accordion"><details open><summary>How do I pay?</summary><p>You can pay online via EFT or card. <a href='getqoute.html'>💳 Go to payment page</a></p></details></div>`,
            contact: `<div class="accordion"><details open><summary>How can I contact you?</summary><p>You can reach us via our <a href='contact-us.html'>Contact Page</a> or call 011-123-4567.</p></details></div>`,
            courses: `<div class="accordion"><details open><summary>What courses do you offer?</summary><p>We offer First Aid, Sewing, Cooking, Landscaping, Child Minding, Life Skills, and Garden Maintenance.<br><a href='Courses.html'>📚 View all courses</a></p></details></div>`
        };
        addMessage("bot", faqs[category]);
    }