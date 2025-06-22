declare global {
  interface FeedResponse {
    posts: {
      likes: number;
      retweets: number;
      quotes: number;
      replies: number;
      text: string;
      html: string;
      images: string[];
      originalHtml: string;
      timestamp: string;
    }[];
    loadMoreUrl: string;
  }
}

export {}; 