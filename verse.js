async function getPsalm23_1() {
  const API_KEY = 'bb45709aa76b6319fafa30b3640e384e'; // Replace later
  const BIBLE_ID = 'de4e12af7f28f599-01'; // KJV Bible ID
  const url = `https://api.scripture.api.bible/v1/bibles/${BIBLE_ID}/verses/PSA.23.1`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'api-key': API_KEY },
    });
    const data = await response.json();

    // Extract the verse content and remove HTML tags
    const rawContent = data.data.content;
    const plainText = rawContent.replace(/<[^>]+>/g, ''); // Remove all HTML tags

    console.log('Psalm 23:1 (KJV):', plainText);
    return plainText;
  } catch (error) {
    console.error('Error fetching Psalm 23:1', error);
  }
}

getPsalm23_1();
