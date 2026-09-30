

// JS para la gráfica
window.addEventListener("load", () => {
  const canvas = document.getElementById("demoChart");
  if (!canvas || typeof Chart === "undefined") return;

  new Chart(canvas, {
        type: "bar",
        data: {
          labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
          datasets: [
            {
              label: "Ingresos ($)",
              data: [1200, 1900, 800, 1500, 2200],
              backgroundColor: "#1d3e7a",
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: true },
          },
          scales: {
            x: {
              grid: {
                color: "transparent",
              },
            },
            y: {
              grid: {
                color: "rgba(0,0,0,0.1)",
              },
            },
          },
        },
  });
});


      function toggleHighContrast() {
        document.body.classList.toggle("high-contrast");
        document.body.classList.remove("low-contrast");
      }
      function toggleLowContrast() {
        document.body.classList.toggle("low-contrast");
        document.body.classList.remove("high-contrast");
      }
      function increaseFont() {
        document.body.style.fontSize =
          parseInt(window.getComputedStyle(document.body).fontSize) + 2 + "px";
      }
      function decreaseFont() {
        document.body.style.fontSize =
          parseInt(window.getComputedStyle(document.body).fontSize) - 2 + "px";
      }
      function toggleAccessibilityModal() {
        const modal = document.getElementById("accessibilityModal");
        if (modal) modal.classList.toggle("active");
      }

      const chatToggle = document.getElementById("chatToggle");
      const chatContainer = document.getElementById("chatContainer");
      const chatWindow = document.getElementById("chatWindow");
      const chatInput = document.getElementById("chatInput");
      const sendBtn = document.getElementById("sendBtn");

      const responses = {
        venta: "Un asesor se comunicara con usted pronto.",
        solicitud: "Su documento ha sido recibido y está en proceso.",
        ayuda: "Puede contactarnos a través del correo soporte@securelink.com.",
      };

      function toggleChat() {
        chatContainer.style.display =
          chatContainer.style.display === "none" ? "block" : "none";
        chatToggle.setAttribute(
          "aria-expanded",
          chatContainer.style.display === "block"
        );
      }

      function addMessage(msg, type) {
        const div = document.createElement("div");
        div.textContent = msg;
        div.className =
          type === "user" ? "text-end text-primary" : "text-start text-dark";
        chatWindow.appendChild(div);
        chatWindow.scrollTop = chatWindow.scrollHeight;
      }

      function sendMessage() {
        const msg = chatInput.value.trim();
        if (!msg) return;
        addMessage(msg, "user");
        chatInput.value = "";
        setTimeout(() => {
          const reply =
            responses[msg.toLowerCase()] ||
            "Un agente revisará su solicitud pronto.";
          addMessage(reply, "bot");
        }, 500);
      }

      if (chatToggle) chatToggle.addEventListener("click", toggleChat);
      if (sendBtn) sendBtn.addEventListener("click", sendMessage);
      if (chatInput) {
        chatInput.addEventListener("keypress", (e) => {
          if (e.key === "Enter") sendMessage();
        });
      }
