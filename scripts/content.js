// Function to remove inserted widgets and restore original ads
function restoreAds() {
  try {
    document.querySelectorAll('.adfriend-widget').forEach((widget) => {
      widget.remove();
    });
    console.log('❌ AdFriend is OFF - Restored original ads');
  } catch (error) {
    console.error('Error restoring ads:', error);
  }
}

// Function to replace ads with inspirational messages
function replaceAds() {
  try {
    console.log('🔍 Scanning for ads...');

    // Common ad selectors (extend this list over time)
    const adSelectors = [
      'iframe[src*="ads"]',
      'iframe[src*="doubleclick"]',
      'iframe[src*="googlesyndication"]',
      'div[class*="ad"]',
      'div[id*="ad"]',
      'ins.adsbygoogle',
      'div[data-ad-slot]',
      '[aria-label="Advertisement"]',
      '[aria-label="Sponsored"]',
    ];

    // Find all ad elements
    let ads = document.querySelectorAll(adSelectors.join(', '));

    ads.forEach((ad) => {
      console.log('🚀 Replacing an ad:', ad);

      // Create replacement widget
      const replacement = document.createElement('div');
      replacement.className = 'adfriend-widget';
      replacement.style.cssText = `
        width: ${ad.clientWidth || 300}px;
        height: ${ad.clientHeight || 250}px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f9f9f9;
        color: #333;
        font-size: 14px;
        border-radius: 8px;
        text-align: center;
        padding: 10px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      `;

      replacement.textContent = getRandomQuote();

      // Replace ad with the widget
      ad.replaceWith(replacement);
    });

    console.log(`✅ Replaced ${ads.length} ads`);
  } catch (error) {
    console.error('Error replacing ads:', error);
  }
}

// Get a random motivational quote
function getRandomQuote() {
  const quotes = [
    'Believe in yourself!',
    'Stay focused and never give up!',
    'Progress, not perfection.',
    'Your time is now.',
    'You are stronger than you think!',
    'Dream big, work hard.',
  ];
  return quotes[Math.floor(Math.random() * quotes.length)];
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'toggleAdFriend') {
    if (message.enabled) {
      console.log('✅ AdFriend is ON - Replacing ads');
      replaceAds();
    } else {
      console.log('❌ AdFriend is OFF - Restoring original page');
      restoreAds();
    }
  }
});

// Listen for changes in the enabled state
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (changes.enabled) {
    const enabled = changes.enabled.newValue;
    if (enabled) {
      replaceAds();
    } else {
      restoreAds();
    }
  }
});

// Efficient MutationObserver to detect new ads dynamically
let timeoutId;
const observer = new MutationObserver((mutations) => {
  for (let mutation of mutations) {
    if (mutation.addedNodes.length > 0) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        replaceAds();
      }, 300); // Debounce for 300ms
      break;
    }
  }
});

// Start observing the document for changes
observer.observe(document.body, { childList: true, subtree: true });

// Check the initial state when the content script loads
chrome.storage.local.get('enabled', ({ enabled }) => {
  if (enabled) {
    replaceAds();
  }
});
