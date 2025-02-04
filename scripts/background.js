chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ enabled: true });
});

chrome.action.onClicked.addListener(async (tab) => {
  let { enabled } = await chrome.storage.local.get('enabled');
  enabled = !enabled;
  await chrome.storage.local.set({ enabled });

  // Update action button badge
  chrome.action.setBadgeText({
    tabId: tab.id,
    text: enabled ? 'ON' : 'OFF',
  });

  // Send a message to content script to enable/disable ad replacement
  chrome.tabs.sendMessage(tab.id, { action: 'toggleAdFriend', enabled });
});
