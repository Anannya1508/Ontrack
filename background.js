let current = {};
let trackingData = [];

function getTime() {
  return new Date().toLocaleTimeString();
}

function getDate() {
  return new Date().toLocaleDateString();
}

function getHostname(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return "unknown";
  }
}

chrome.runtime.onStartup.addListener(() => {
  chrome.storage.local.get("trackingData", data => {
    trackingData = data.trackingData || [];
  });
});

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "start-tracking") {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      const site = getHostname(tabs[0].url);
      current = {
        site,
        date: getDate(),
        start: getTime(),
        startTime: Date.now()
      };
    });
  }

  if (msg.action === "stop-tracking" && current.site) {
    const endTime = Date.now();
    const durationMs = endTime - current.startTime;
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    trackingData.push({
      ...current,
      end: getTime(),
      duration: `${minutes}m ${seconds}s`
    });
    chrome.storage.local.set({ trackingData });
    current = {};
  }
});

chrome.tabs.onActivated.addListener(activeInfo => {
  if (!current.site) return;

  const endTime = Date.now();
  const durationMs = endTime - current.startTime;
  const minutes = Math.floor(durationMs / 60000);
  const seconds = Math.floor((durationMs % 60000) / 1000);

  trackingData.push({
    ...current,
    end: getTime(),
    duration: `${minutes}m ${seconds}s`
  });

  chrome.storage.local.set({ trackingData });

  chrome.tabs.get(activeInfo.tabId, tab => {
    const site = getHostname(tab.url);
    current = {
      site,
      date: getDate(),
      start: getTime(),
      startTime: Date.now()
    };
  });
});
