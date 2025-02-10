console.log('AdFriend script running');

// Function to get the current domain
function getDomain() {
  return window.location.hostname;
}

// Function to get a random quote
function getRandomQuote() {
  const quotes = [
    // Motivational Quotes
    {
      quote:
        'I am not a product of my circumstances. I am a product of my decisions.',
    },
    { quote: 'Live out of your imagination, not your history.' },
    { quote: 'The main thing is to keep the main thing the main thing.' },
    {
      quote:
        "To achieve goals you've never achieved before, you need to start doing things you've never done before.",
    },
    {
      quote:
        "Effective people are not problem-minded; they're opportunity-minded. They feed opportunities and starve problems.",
    },
    {
      quote:
        'Make small commitments and keep them. Be a light, not a judge. Be a model, not a critic. Be a part of the solution, not the problem.',
    },
    {
      quote:
        'We immediately become more effective when we decide to change ourselves rather than asking things to change for us.',
    },
    {
      quote:
        'You can learn great things from your mistakes when you aren’t busy denying them.',
    },
    {
      quote:
        'To begin with the end in mind means to start with a clear understanding of your destination.',
    },
    { quote: 'You have to water the flowers you want to grow.' },
    {
      quote:
        'Where you are headed is more important than how fast you are going.',
    },
    {
      quote:
        'When you show deep empathy toward others, their defensive energy goes down, and positive energy replaces it.',
    },
    {
      quote:
        'Your most important work is always ahead of you, never behind you.',
    },
    { quote: 'What you see often depends on what you are looking for.' },
    {
      quote:
        'We are free to choose our actions, but we are not free to choose the consequences of these actions.',
    },
    {
      quote:
        'Habit 1: Be Proactive. Habit 2: Begin with the End in Mind. Habit 3: Put First Things First. Habit 4: Think Win/Win. Habit 5: Seek First to Understand, Then to Be Understood. Habit 6: Synergize. Habit 7: Sharpen the Saw.',
    },
    { quote: 'Beginners are many; finishers are few.' },
    {
      quote:
        'Habit is the intersection of knowledge (what to do), skill (how to do), and desire (want to do).',
    },
    {
      quote:
        'Each of us guards a gate of change that can only be opened from the inside.',
    },
    { quote: 'Trust is a function of two things: character and competence.' },
    {
      quote:
        'There are three constants in life: change, choice, and principles.',
    },
    {
      quote:
        'If the ladder is not leaning against the right wall, every step we take just gets us to the wrong place faster.',
    },
    {
      quote:
        'Free your heart from hatred - forgive. Free your mind from worries - most never happen. Live simply and appreciate what you have. Give more. Expect less.',
    },
    {
      quote:
        'Every human has four endowments: self-awareness, conscience, independent will, and creative imagination. These give us the ultimate human freedom... The power to choose, to respond, to change.',
    },
    { quote: 'Listen with the intent to understand, not the intent to reply.' },
    {
      quote:
        'When you show deep empathy toward others, their defensive energy goes down, and positive energy replaces it.',
    },
    { quote: 'Accountability breeds response-ability.' },
    {
      quote:
        'Stop setting goals. Goals are pure fantasy unless you have a specific plan to achieve them.',
    },
    {
      quote:
        'Effective leadership is putting first things first. Effective management is discipline, carrying it out.',
    },
    {
      quote:
        'Just as we develop our physical muscles through overcoming opposition - such as lifting weights - we develop our character muscles by overcoming challenges and adversity.',
    },
    { quote: 'Life is not accumulation, it is about contribution.' },
    {
      quote:
        'Synergy is what happens when one plus one equals ten or a hundred or even a thousand!',
    },
    { quote: 'Strength lies in differences, not in similarities.' },
    {
      quote:
        "It takes a great deal of character strength to apologize quickly out of one's heart rather than out of pity.",
    },
    {
      quote:
        'The proactive approach to a mistake is to acknowledge it instantly, correct and learn from it.',
    },
    { quote: 'Find your voice and inspire others to find theirs.' },
    {
      quote:
        "Every time you think the problem is 'out there,' that very thought is the problem.",
    },
    {
      quote:
        'A mission statement is not something you write overnight... But fundamentally, your mission statement becomes your constitution, the solid expression of your vision and values.',
    },
    {
      quote:
        'Management is efficiency in climbing the ladder of success; leadership determines whether the ladder is leaning against the right wall.',
    },
    {
      quote:
        "If we keep doing what we're doing, we're going to keep getting what we're getting.",
    },
    { quote: 'The deepest desire of the human spirit is to be acknowledged.' },
    {
      quote:
        "Want balance in your life? Then sure, get your own act together, but don't forget four powerful disciplines of execution in your team and organization.",
    },
    { quote: 'Begin with the end in mind.' },
    {
      quote:
        "When you really listen to another person from their point of view, and reflect back to them that understanding, it's like giving them emotional oxygen.",
    },
    {
      quote:
        'Moral authority comes from following universal and timeless principles like honesty, integrity, treating people with respect.',
    },
    {
      quote:
        'If you want small changes in your life, work on your attitude. But if you want big and primary changes, work on your paradigm.',
    },
    {
      quote:
        "You can't talk your way out of problems you behave yourself into.",
    },
    {
      quote:
        'The more people rationalize cheating, the more it becomes a culture of dishonesty.',
    },
    { quote: 'Our character is basically a composite of our habits.' },
    {
      quote:
        'We are the creative force of our life, and through our own decisions rather than our conditions, if we carefully learn to do certain things, we can accomplish those goals.',
    },
    { quote: 'Leadership is a choice, not a position.' },
    { quote: "Synergy is better than my way or your way. It's our way." },
    {
      quote:
        "You can retire from a job, but don't ever retire from making extremely meaningful contributions in life.",
    },
    { quote: 'Live out of your imagination, not your history.' },
    { quote: 'Listen with your eyes for feelings.' },
    {
      quote:
        'Between stimulus and response, there is a space where we choose our response.',
    },
    {
      quote:
        'Reactive people... are often affected by their physical environment. They find external sources to blame for their behavior.',
    },
    {
      quote:
        'Every time I see high-trust cultures, I see a lessening of adversarialism.',
    },
    { quote: "What is common sense isn't common practice." },
    { quote: 'Mind over mattress.' },
    {
      quote:
        'An empowered organisation is one in which individuals have the knowledge, skill, desire, and opportunity to personally succeed in a way that leads to collective organisational success.',
    },
    { quote: 'Mind over mattress.' },
  ];
  return quotes[Math.floor(Math.random() * quotes.length)];
}

// Function to hide ads and replace them with widgets
async function replaceAds() {
  const domain = getDomain();

  chrome.storage.sync.get([domain], ({ [domain]: isEnabled }) => {
    if (!isEnabled) return; // Stop if not enabled for this site

    console.log(`🚀 AdFriend is active on ${domain}`);

    // Ad selectors
    const adSelectors = [
      'iframe[id^="google_ads"]',
      'div[class^="ad-"]',
      'div[id^="ad-"]',
      'div[data-ad="true"]',
      'ins.adsbygoogle',
    ];

    const ads = document.querySelectorAll(adSelectors.join(','));

    ads.forEach((ad) => {
      console.log('🚀 Hiding an ad:', ad);

      // Create replacement widget
      let replacement = document.createElement('div');
      replacement.style.cssText = `
        background-color: #008080;
        border: 1px solid #000000;
        border-radius: 5px;
        padding: 10px;
        font-size: 18px;
        color: #ffffff;
        text-align: center;
        font-family: Calibri, sans-serif;
        max-width: 300px;
      `;

      // Add quote text
      const text = document.createElement('p');
      text.textContent = getRandomQuote().quote;
      text.style.margin = '0';
      text.style.fontSize = '16px';

      replacement.appendChild(text);

      // Replace the ad
      ad.replaceWith(replacement);
    });
  });
}

// Initial ad replacement on page load
replaceAds();

// Observe DOM changes to replace newly added ads if the toggle is active
const observer = new MutationObserver(replaceAds);
observer.observe(document.body, { childList: true, subtree: true });
