chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({ text: 'OFF' });
  chrome.storage.sync.set({}); // Initializing storage with no states for domains
});

chrome.action.onClicked.addListener(async () => {
  // Get the current active tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const domain = new URL(tab.url).hostname; // Get the domain of the current tab

  // Get the current state for the domain
  const { [domain]: isEnabled } = await chrome.storage.sync.get([domain]);
  const nextState = !isEnabled; // Toggle state

  // Update storage for that specific domain
  const newState = { [domain]: nextState };
  await chrome.storage.sync.set(newState);

  // Update the badge text
  await chrome.action.setBadgeText({ text: nextState ? 'ON' : 'OFF' });

  // Reload the current tab to reflect the change
  chrome.tabs.reload(tab.id);
});

// Ensure the badge text reflects the current state for the active tab when reloaded
const updateBadgeForTab = (tabId) => {
  chrome.tabs.get(tabId, (tab) => {
    const domain = new URL(tab.url).hostname; // Get the domain of the current tab
    chrome.storage.sync.get([domain], ({ [domain]: isEnabled }) => {
      chrome.action.setBadgeText({ tabId, text: isEnabled ? 'ON' : 'OFF' });
    });
  });
};

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === 'complete') {
    updateBadgeForTab(tabId);
  }
});

chrome.tabs.onCreated.addListener((tab) => {
  updateBadgeForTab(tab.id);
});
