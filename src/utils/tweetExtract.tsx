interface TweetResponse {
  text: string;
}

export const tweetExtract = async (username: string, id: string): Promise<TweetResponse> => {
  try {
    const response = await fetch(`/api/nitter?username=${username}&id=${id}`);
    const data = await response.json();
    
    // Create a temporary div to parse the HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(data.html, 'text/html');
    
    // Find the tweet content
    const tweetDiv = doc.querySelector('.tweet-content');
    const tweetText = tweetDiv?.textContent || '';
    
    return {
      text: tweetText
    };
  } catch (error) {
    console.error('Error fetching tweet:', error);
    return {
      text: ''
    };
  }
};
