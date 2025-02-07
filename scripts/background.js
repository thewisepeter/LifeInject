chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({ text: 'OFF' });
  chrome.storage.sync.set({ isEnabled: false }); // Default state is OFF
});

chrome.action.onClicked.addListener(async (tab) => {
  // Retrieve the current badge text to check if the extension is 'ON' or 'OFF'
  const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
  const nextState = prevState === 'ON' ? 'OFF' : 'ON';

  // Update badge text
  await chrome.action.setBadgeText({ tabId: tab.id, text: nextState });

  // Update storage state
  const isEnabled = nextState === 'ON';
  await chrome.storage.sync.set({ isEnabled });

  // Send message to the content script in the active tab to toggle the ad replacement
  chrome.tabs.sendMessage(tab.id, { action: isEnabled ? 'ENABLE' : 'DISABLE' });
});

// Listen for tab updates to ensure state persists across reloads
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    chrome.storage.sync.get('isEnabled', ({ isEnabled }) => {
      const badgeText = isEnabled ? 'ON' : 'OFF';
      chrome.action.setBadgeText({ tabId, text: badgeText });

      // Send message to content script to apply the correct state
      chrome.tabs.sendMessage(tabId, {
        action: isEnabled ? 'ENABLE' : 'DISABLE',
      });
    });
  }
});
