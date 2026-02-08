let points = 0;
let map;
let userLat, userLng;

// Initialize map
map = L.map('map').setView([20.5937, 78.9629], 5);

// Map tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

// User location
navigator.geolocation.getCurrentPosition(pos => {
  userLat = pos.coords.latitude;
  userLng = pos.coords.longitude;

  L.marker([userLat, userLng])
    .addTo(map)
    .bindPopup("📍 You are here")
    .openPopup();

  map.setView([userLat, userLng], 13);
  loadBins();
});

// Mock E-Bins
const bins = [
  { name: "Green E-Bin Center", lat: 28.6139, lng: 77.2090, status: "Open" },
  { name: "Smart E-Waste Hub", lat: 28.5355, lng: 77.3910, status: "Closed" },
  { name: "City Recycling Point", lat: 28.4595, lng: 77.0266, status: "Open" }
];

function loadBins() {
  const list = document.getElementById("binList");
  list.innerHTML = "";

  bins.forEach((bin, index) => {
    const distance = calculateDistance(userLat, userLng, bin.lat, bin.lng);

    // Map marker
    const marker = L.marker([bin.lat, bin.lng]).addTo(map);
    marker.bindPopup(getPopupContent(bin, distance));

    // Side panel item
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${bin.name}</strong><br>
      ${distance.toFixed(2)} km away<br>
      Status: <b>${bin.status}</b>
    `;

    li.onclick = () => {
      map.setView([bin.lat, bin.lng], 15);
      marker.openPopup();
    };

    list.appendChild(li);
  });
}

function getPopupContent(bin, distance) {
  return `
    <strong>${bin.name}</strong><br>
    Status: <b>${bin.status}</b><br>
    Distance: ${distance.toFixed(2)} km<br><br>
    <a href="https://www.google.com/maps/dir/${userLat},${userLng}/${bin.lat},${bin.lng}">
       📍 Get Directions
    </a>
    <br><br>
    <button onclick="dumpHere()">🗑 Dump Here</button>
  `;
}

// Distance formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat/2)**2 +
    Math.cos(lat1*Math.PI/180) *
    Math.cos(lat2*Math.PI/180) *
    Math.sin(dLon/2)**2;

  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)));
}

// Dump logic
function dumpHere() {
  points += 10;
  document.getElementById("points").innerText = `Points: ${points} 🏅`;
  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}
window.dumpHere = dumpHere;
window.closeModal = closeModal;