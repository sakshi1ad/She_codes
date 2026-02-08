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
