import { getCollection } from "astro:content";

export async function getFilteredArticles(cap?:number) {
  const articleList = (await getCollection('blog')).filter((a) => a.data.datePublished),
        articles = (articleList.sort((a,b) => 
          b.data.datePublished!.valueOf() - a.data.datePublished!.valueOf())
        ).slice(0, cap ? cap : articleList.length);

  return articles;
}