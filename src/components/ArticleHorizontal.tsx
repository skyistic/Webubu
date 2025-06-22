export default function ArticleHorizontal({ image, title, description }: { image: string, title: string, description: string }) {
  return (
    <div className="flex flex-row"> 
        <img src={"https://nitter.net" + image} className="w-[100px] h-[100px]" alt="article" />
        <div className="flex flex-col text-black">
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    </div>
  );
}
