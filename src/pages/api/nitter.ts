import { NextApiRequest, NextApiResponse } from 'next';

interface NitterRequest extends NextApiRequest {
  query: {
    username?: string;
    id?: string;
    path?: string;
    sort?: 'newest' | 'oldest';
    // Search parameters
    q?: string;
    f?: 'tweets' | 'users' | 'videos' | 'news' | 'photos';
    since?: string;
    until?: string;
    near?: string;
    cursor?: string;
  }
}

export default async function handler(req: NitterRequest, res: NextApiResponse) {
  const { username, id, path, sort, q, f, since, until, near, cursor } = req.query;

  try {
    let url = 'https://nitter.tiekoetter.com';
    
    // Search view
    if (username) {
      // User-specific search
      //view more using cursor searchParam needs ?search
      url += cursor ?
      `/${username}/search`
      :
      `/${username}/search`;
    } else {
      // Global search
      url += '/search';
    }
    
    const searchParams = new URLSearchParams();
    
    if(true) {
      if (q) searchParams.append('q', q);
      if (f) searchParams.append('f', f);
      if (since) searchParams.append('since', since);
      if (until) searchParams.append('until', until);
      if (near) searchParams.append('near', near);
      if (cursor) searchParams.append('cursor', cursor);
    }
    
    const queryString = searchParams.toString();
    if (queryString) {
      url += url.includes('?') ? '&' : '?';
      url += queryString;
    }
  

    // Add sorting parameter if specified (only for non-search, non-tweet views)
    if (sort && !id && path !== 'search') {
      url += url.includes('?') ? '&' : '?';
      url += `sort=${sort}`;
    }

    const response = await fetch(url);
    const html = await response.text();
    
    res.status(200).json({ 
      html,
      originalUrl: url,
      metadata: {
        username,
        id,
        path,
        sort,
        search: {
          q,
          f,
          since,
          until,
          near,
          cursor
        },
        url
      }
    });
  } catch (error) {
    console.error('Error fetching from nitter:', error);
    res.status(500).json({ error: 'Failed to fetch content' });
  }
} 