console.log('LifeInject script running');

// Function to get the current domain
function getDomain() {
  return window.location.hostname;
}

// Function to get a random Bible verse
async function getRandomVerse() {
  const API_KEY = 'bb45709aa76b6319fafa30b3640e384e'; // Replace later
  const BIBLE_ID = 'de4e12af7f28f599-01'; // KJV Bible ID

  // Random Psalms chapter and verse range
  const randomChapter = Math.floor(Math.random() * 150) + 1; // Psalms has 150 chapters
  const randomVerse = Math.floor(Math.random() * 10) + 1; // Select up to 10 verses per chapter

  const url = `https://api.scripture.api.bible/v1/bibles/${BIBLE_ID}/verses/PSA.${randomChapter}.${randomVerse}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'api-key': API_KEY },
    });
    const data = await response.json();

    if (!data.data || !data.data.content) {
      throw new Error('Invalid verse data');
    }

    // Extract the verse content and remove HTML tags
    const rawContent = data.data.content;
    const plainText = rawContent.replace(/<[^>]+>/g, ''); // Remove HTML tags

    // Extract the text after the number
    const verseText = plainText.replace(/^\d+[.\s]*/, ''); // Remove leading numbers and punctuation

    const verseRef = `📖 Psalm ${randomChapter}:${randomVerse}`;

    console.log(`📖 Psalm (${randomChapter}:${randomVerse}): ${verseText}`);
    return { verseText, verseRef };
  } catch (error) {
    console.error('Error fetching random Psalm', error);
    return {
      verseText:
        'For God so loved the world that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life',
      verseRef: 'John 3:16',
    };
  }
}

// Function to hide ads and replace them with Bible verses
async function replaceAds() {
  const domain = getDomain();

  chrome.storage.sync.get([domain], async ({ [domain]: isEnabled }) => {
    if (!isEnabled) return; // Stop if not enabled for this site

    console.log(`🚀 LifeInject is active on ${domain}`);

    // Ad selectors
    const adSelectors = [
      'iframe[id^="google_ads"]',
      'div[class^="ad-"]',
      'div[id^="ad-"]',
      'div[data-ad="true"]',
      'ins.adsbygoogle',
      'div.trc_rbox_container',
      'span.branding-inner.inline-branding',
      'a.trc_desktop_disclosure_link',
      'a.trc_mobile_disclosure_link',
      'div.logoDiv.link-disclosure',
      'div.side-ad-trail',
    ];

    const ads = document.querySelectorAll(adSelectors.join(','));

    for (const ad of ads) {
      console.log('🚀 Hiding an ad:', ad);

      // Get the original ad dimensions
      const rect = ad.getBoundingClientRect();

      // Remove iframes inside the ad container
      const iframe = ad.querySelector('iframe');
      if (iframe) {
        console.log('🚀 Found iframe inside ad, removing it...');
        iframe.remove(); // Remove iframe first
      }

      // Get image path from extension storage
      const backgroundImage = chrome.runtime.getURL('images/paper.jpg');

      // Create replacement widget
      const replacement = document.createElement('div');
      replacement.style.cssText = `
          border-left: 3px solid #800020;
          background-image: url('${backgroundImage}');
          background-size: cover;
          border-radius: 10px;
          padding: 20px;
          font-size: 18px;
          color: #333333;
          text-align: center;
          font-family: Georgia, Times, "Times New Roman", serif;
          width: ${rect.width}px;  /* Match ad width */
          height: ${rect.height}px; /* Match ad height */
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* Slight shadow for depth */
        `;

      // Add verse text with handwritten font style
      const text = document.createElement('p');
      text.textContent = 'Loading verse...'; // Placeholder while fetching
      text.style.margin = '0';
      text.style.fontSize = '16px';
      // text.style.fontFamily = '"Dancing Script", cursive'; // Handwritten font
      text.style.lineHeight = '1.5';
      text.style.whiteSpace = 'pre-wrap'; // Ensure the verse wraps correctly
      replacement.appendChild(text);

      // Create footer for the verse reference
      // Create footer for the verse reference
      const footer = document.createElement('div');
      footer.style.cssText = `
          margin-top: 15px;
          font-size: 14px;
          font-family: "Calibri", sans-serif;
          color: #555555;
          font-style: italic;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        `;
      const { verseText, verseRef } = await getRandomVerse();
      // Add the text content to the footer
      footer.textContent = verseRef;

      // Add pseudo-elements for the artistic curls
      footer.style.position = 'relative'; // Ensure pseudo-elements are positioned correctly

      // Create a style element for the pseudo-elements
      // Create a style element for the pseudo-elements
      const style = document.createElement('style');
      style.textContent = `
          .footer-with-lines::before,
          .footer-with-lines::after {
            content: '';
            position: absolute;
            top: 50%;
            width: 50px; /* Length of the line */
            height: 1px; /* Thickness of the line */
            background-color: #800020; /* Color of the line */
            transform: translateY(-50%);
          }

          .footer-with-lines::before {
            left: -60px; /* Position to the left of the text */
          }

          .footer-with-lines::after {
            right: -60px; /* Position to the right of the text */
          }
        `;

      // Append the style element to the document head
      document.head.appendChild(style);

      // Add the class to the footer
      footer.classList.add('footer-with-lines');

      // Append the footer to the replacement widget
      replacement.appendChild(footer);

      // Fetch a random verse and update text
      text.textContent = verseText;

      // Add placeholder reference (e.g., Psalm 12:3)
      footer.textContent = verseRef;
      replacement.appendChild(footer);

      // Insert the widget into the page
      ad.replaceWith(replacement);
    }
  });
}

// Initial ad replacement on page load
replaceAds();

// Observe DOM changes to replace newly added ads if the toggle is active
const observer = new MutationObserver(replaceAds);
observer.observe(document.body, { childList: true, subtree: true });
