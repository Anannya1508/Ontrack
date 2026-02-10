let tracking = true;
document.getElementById("start-stop-btn").textContent = "⏸️ Stop Tracking";

chrome.runtime.sendMessage({ action: "start-tracking" });

document.getElementById("start-stop-btn").addEventListener("click", () => {
  tracking = !tracking;
  document.getElementById("start-stop-btn").textContent = tracking ? "⏸️ Stop Tracking" : "▶️ Start Tracking";
  chrome.runtime.sendMessage({ action: tracking ? "start-tracking" : "stop-tracking" });
});

document.getElementById("toggle-mode").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  document.getElementById("toggle-mode").textContent =
    document.body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
});

document.getElementById("export-btn").addEventListener("click", () => {
  chrome.storage.local.get("trackingData", ({ trackingData }) => {
    if (trackingData) {
      const csv = ["Site,Date,Start Time,End Time,Duration"];
      trackingData.forEach(entry => {
        csv.push(`${entry.site},${entry.date},${entry.start},${entry.end},${entry.duration}`);
      });
      const blob = new Blob([csv.join("\n")], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "ontrack_data.csv";
      a.click();
      URL.revokeObjectURL(url);
    }
  });
});

document.getElementById("clear-btn").addEventListener("click", () => {
  chrome.storage.local.set({ trackingData: [] }, () => {
    document.querySelector("tbody").innerHTML = "";
  });
});

function loadData() {
  chrome.storage.local.get("trackingData", ({ trackingData }) => {
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";
    if (trackingData) {
      trackingData.forEach(entry => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${entry.site}</td>
          <td>${entry.date}</td>
          <td>${entry.start}</td>
          <td>${entry.end}</td>
          <td>${entry.duration}</td>
        `;
        tbody.appendChild(tr);
      });
    }
  });
}

loadData();
setInterval(loadData, 3000); // Auto refresh
