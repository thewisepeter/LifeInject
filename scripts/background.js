// Set initial state on installation
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ enabled: true });
});

// Toggle extension on/off when the action button is clicked
chrome.action.onClicked.addListener(async (tab) => {
  try {
    // Get the current state
    let { enabled } = await chrome.storage.local.get('enabled');
    enabled = !enabled; // Toggle the state
    await chrome.storage.local.set({ enabled });

    // Update the action button badge
    chrome.action.setBadgeText({
      tabId: tab.id,
      text: enabled ? 'ON' : 'OFF',
    });

    // Send a message to the content script to enable/disable ad replacement
    chrome.tabs.sendMessage(tab.id, { action: 'toggleAdFriend', enabled });
  } catch (error) {
    console.error('Error toggling AdFriend:', error);
  }
});

// Notify content script when the tab is updated or reloaded
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    chrome.storage.local.get('enabled', ({ enabled }) => {
      chrome.tabs.sendMessage(tabId, { action: 'toggleAdFriend', enabled });
    });
  }
});
