export const feedExtract = async (username: string, search: string | null): Promise<FeedResponse> => {
  try {
    const response = await fetch(`/api/nitter?username=${username}` + (search ? `&path=search&q=${search}` : ''));
    const data = await response.json();
    // Create a temporary div to parse the HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(data.html, 'text/html');
    
    // Find all timeline items
    const timelineItems = doc.querySelectorAll('.timeline-item');
    const posts: FeedResponse['posts'] = [];
    
    timelineItems.forEach((item) => {
      const images: string[] = [];
      
      // Get tweet content
      const tweetContent = item.querySelector('.tweet-content');
      const text = tweetContent?.textContent || '';
      
      // Find all images with class still-image
      const imageElements = item.querySelectorAll('.still-image');
      imageElements.forEach((img) => {
        const src = img.getAttribute('href');
        if (src) {
          images.push(src);
        }
      });

      const replies = parseInt(item.querySelector('.icon-comment')?.parentElement?.parentElement?.textContent?.trim() || '0');
      const retweets = parseInt(item.querySelector('.icon-retweet')?.parentElement?.parentElement?.textContent?.trim() || '0');
      const quotes = parseInt(item.querySelector('.icon-quote')?.parentElement?.parentElement?.textContent?.trim() || '0');
      const likes = parseInt(item.querySelector('.icon-heart')?.parentElement?.parentElement?.textContent?.trim() || '0');
      const timestamp = item.querySelector('.tweet-date a')?.getAttribute('title') || '';

      posts.push({
        replies,
        retweets,
        quotes,
        likes,
        text,
        html: tweetContent?.innerHTML || '',
        images,
        originalHtml: item.outerHTML,
        timestamp,
      });
    });
    
    const result = {
      posts,
      loadMoreUrl: doc.querySelector('.show-more a')?.getAttribute('href') || ''
    };
    
    return result;
  } catch (error) {
    console.error('Error fetching feed:', error);
    return { posts: [], loadMoreUrl: '' };
  }
};

export const viewMore = async (username: string, loadMoreUrl: string): Promise<void> => {
  try {
    console.log(loadMoreUrl);
    const response = await fetch(`/api/nitter?username=${username}${loadMoreUrl.replace("?f=tweets&", "&f=tweets&")}`);
    const data = await response.json();
    // Create a temporary div to parse the HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(data.html, 'text/html');
    
    // Find all timeline items
    const timelineItems = doc.querySelectorAll('.timeline-item');
    const posts: FeedResponse['posts'] = [];
    
    timelineItems.forEach((item) => {
      const images: string[] = [];
      
      // Get tweet content
      const tweetContent = item.querySelector('.tweet-content');
      const text = tweetContent?.textContent || '';
      
      // Find all images with class still-image
      const imageElements = item.querySelectorAll('.still-image');
      imageElements.forEach((img) => {
        const src = img.getAttribute('href');
        if (src) {
          images.push(src);
        }
      });

      const replies = parseInt(item.querySelector('.icon-comment')?.parentElement?.parentElement?.textContent?.trim() || '0');
      const retweets = parseInt(item.querySelector('.icon-retweet')?.parentElement?.parentElement?.textContent?.trim() || '0');
      const quotes = parseInt(item.querySelector('.icon-quote')?.parentElement?.parentElement?.textContent?.trim() || '0');
      const likes = parseInt(item.querySelector('.icon-heart')?.parentElement?.parentElement?.textContent?.trim() || '0');
      const timestamp = item.querySelector('.tweet-date a')?.getAttribute('title') || '';

      posts.push({
        replies,
        retweets,
        quotes,
        likes,
        text,
        html: tweetContent?.innerHTML || '',
        images,
        originalHtml: item.outerHTML,
        timestamp,
      });
    });
    
    const result = {
      posts,
      loadMoreUrl: doc.querySelector('.show-more a')?.getAttribute('href') || ''
    };
    console.log("View more");
    console.log(result);
    //return result;
  } catch (error) {
    console.error('Error fetching feed:', error);
    return;
  }
};

