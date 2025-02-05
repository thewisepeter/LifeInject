// Prevent multiple injections of content.js in the same tab
if (window.adFriendInjected) {
  console.log('⏳ AdFriend already injected, skipping execution...');
} else {
  window.adFriendInjected = true;

  // Function to hide ads and replace them with widgets
  function replaceAds() {
    try {
      console.log('🔍 Scanning for ads...');

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

      let ads = document.querySelectorAll(adSelectors.join(', '));

      ads.forEach((ad) => {
        console.log('🚀 Hiding an ad:', ad);

        // Store original display property before hiding
        ad.dataset.originalDisplay = ad.style.display;
        ad.style.display = 'none';

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
        ad.insertAdjacentElement('beforebegin', replacement);
      });

      console.log(`✅ Replaced ${ads.length} ads`);
    } catch (error) {
      console.error('Error replacing ads:', error);
    }
  }

  // Function to restore original ads
  function restoreAds() {
    try {
      document
        .querySelectorAll('.adfriend-widget')
        .forEach((widget) => widget.remove());
      document.querySelectorAll('[data-original-display]').forEach((ad) => {
        ad.style.display = ad.dataset.originalDisplay || 'block';
      });
      console.log('❌ AdFriend is OFF - Restored original ads');
    } catch (error) {
      console.error('Error restoring ads:', error);
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
  chrome.runtime.onMessage.addListener((message) => {
    console.log('📩 Received message in content.js:', message);
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
    if (mutations.some((mutation) => mutation.addedNodes.length > 0)) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        chrome.storage.local.get('enabled', ({ enabled }) => {
          if (enabled) replaceAds();
        });
      }, 500); // Debounce for 500ms
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
}
