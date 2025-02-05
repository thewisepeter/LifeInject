// Set initial state on installation
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ enabled: true }); // Default to ON
  chrome.action.setBadgeText({ text: 'ON' });
});

// Toggle extension on/off when the action button is clicked
chrome.action.onClicked.addListener(async (tab) => {
  try {
    // Get the current state from storage
    let { enabled } = await chrome.storage.local.get('enabled');
    enabled = !enabled; // Toggle state

    // Save the new state
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
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    try {
      const { enabled } = await chrome.storage.local.get('enabled');

      // Update the badge to reflect the current state
      chrome.action.setBadgeText({
        tabId: tab.id,
        text: enabled ? 'ON' : 'OFF',
      });

      // Send the correct state to the content script
      chrome.tabs.sendMessage(tabId, { action: 'toggleAdFriend', enabled });
    } catch (error) {
      console.error('Error updating AdFriend state on tab update:', error);
    }
  }
});
