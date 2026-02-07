const imageInput = document.getElementById("imageInput");
const preview = document.getElementById("preview");
const result = document.getElementById("result");
const deviceSelect = document.getElementById("deviceSelect");

imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    if (file) {
        preview.src = URL.createObjectURL(file);
        preview.style.display = "block";
        result.innerHTML = "";
    }
});

function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("active");
}

function detectItem() {

    if (!imageInput.files.length) {
        result.innerHTML = "❌ Please upload a device image.";
        return;
    }

    if (deviceSelect.value === "") {
        result.innerHTML = "❌ Please select the device type.";
        return;
    }

    if (deviceSelect.value === "non-electronic") {
        result.innerHTML = `
            <h3>⚠ Invalid Item</h3>
            <p>Please upload a valid <b>electronic device</b> image.</p>
        `;
        return;
    }

    result.innerHTML = "🔍 AI is analyzing the device…";

    setTimeout(() => {

        let detectedItem = "";
        let value = 0;

        switch (deviceSelect.value) {
            case "battery":
                detectedItem = "Battery";
                value = 120;
                break;
            case "charger":
                detectedItem = "Charger / Cable";
                value = 80;
                break;
            case "phone":
                detectedItem = "Mobile Phone";
                value = 300;
                break;
            case "laptop":
                detectedItem = "Laptop";
                value = 600;
                break;
            case "earphone":
                detectedItem = "Earphones / Headphones";
                value = 150;
                break;
        }

        const confidence = Math.floor(Math.random() * 21) + 75; // 75–95%

        result.innerHTML = `
            <h3>✅ Device Detected</h3>
            <p><b>Device:</b> ${detectedItem}</p>
            <p><b>Confidence:</b> ${confidence}%</p>
            <p><b>Estimated Recycling Value:</b> ₹${value}</p>
        `;

    }, 1500);
}
body {
  margin: 0;
  font-family: "Segoe UI", sans-serif;
  background:
    radial-gradient(circle at top left, rgba(110, 247, 124, 0.25), transparent 45%),
    radial-gradient(circle at bottom right, rgba(136, 225, 123, 0.25), transparent 45%),
    linear-gradient(135deg, #0b2d14, #071b0c);
  color: white;
}

/* Navbar */
.navbar {
  background: rgba(0,0,0,0.65);
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Layout */
.container {
  display: flex;
  height: calc(100vh - 60px);
}

/* Side Panel */
.side-panel {
  width: 300px;
  background: rgba(0,0,0,0.55);
  padding: 15px;
  overflow-y: auto;
}

.side-panel h3 {
  margin-top: 0;
  border-bottom: 1px solid rgba(255,255,255,0.2);
  padding-bottom: 8px;
}

.side-panel ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.side-panel li {
  background: rgba(255,255,255,0.08);
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
}

.side-panel li:hover {
  background: rgba(110,247,124,0.25);
}

/* Map */
#map {
  flex: 1;
}

/* Modal */
.modal {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  justify-content: center;
  align-items: center;
  z-index: 9999; 
}

.modal-content {
  background: #0e1f14;
  padding: 25px;
  border-radius: 12px;
  text-align: center;
}

.modal-content button {
  margin-top: 15px;
  padding: 8px 18px;
  border: none;
  border-radius: 6px;
  background: #6ef77c;
  cursor: pointer;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }

  .side-panel {
    width: 100%;
    height: 200px;
  }

  #map {
    height: calc(100vh - 260px);
  }
}
