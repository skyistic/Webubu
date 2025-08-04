import { formatRelativeTime } from "@/utils/timeUtils";

interface StatsProps {
  likes: number;
  retweets: number;
  quotes: number;
  replies: number;
  text: string;
  html: string;
  images: string[];
  originalHtml: string;
  timestamp: string;
  isHovered: boolean;
}

const shadow = "shadow-[0_0px_60px_-15px_rgba(0,0,0,0.1)]";

function Stats({likes, replies, retweets, quotes, timestamp, isHovered}: StatsProps) {
  //MageIcons
  return (
    <div className="flex items-center text-[11px] text-white mt-3 gap-2">
      {/* <div className="flex items-center bg-green-400 rounded-xl px-2 py-1">
        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.25 7.506v6.607a3.963 3.963 0 0 1-3.964 3.965h-2.643l-2.18 2.18a.636.636 0 0 1-.925 0l-2.18-2.18H6.713a3.964 3.964 0 0 1-3.964-3.965V7.506a3.964 3.964 0 0 1 3.964-3.964h10.572a3.964 3.964 0 0 1 3.964 3.964"></path></svg>
        <span className="mx-1 font-medium text-sm">{replies}</span>
      </div> */}
      <div className={`${isHovered ? shadow : ""} flex items-center bg-gray-300 rounded-xl px-2 py-1`}>
        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 7.23c-1.733-3.924-5.764-4.273-7.641-2.562c-1.529 1.373-2.263 4.665-.867 7.695C5.9 17.573 12 20.309 12 20.309s6.101-2.736 8.508-7.946c1.396-3.03.662-6.322-.867-7.695C17.764 2.957 13.733 3.306 12 7.229"></path></svg>
        <span className="mx-1 font-medium text-sm">{likes}</span>
      </div>
      <div className={`${isHovered ? shadow : ""} flex items-center bg-gray-200 rounded-xl px-2 py-1`}>
        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 4.625H7a4 4 0 0 0-4 4v8.75a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4v-8.75a4 4 0 0 0-4-4m-14 6h18m-4-8v4m-10-4v4"></path></svg>
        <span className="mx-1 font-medium text-sm">{formatRelativeTime(timestamp.split(' · ')[0])}</span>
      </div>
    </div>
  )
}

export default Stats; 