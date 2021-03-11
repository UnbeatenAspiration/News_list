import { config } from '~/config';
import { useRedux } from '~/helpers';

function useCurrentNews(currentPage){
    const allNews = useRedux("news.data", []),
    startElement = config.news.limit * currentPage + 1;
    
    return {
        first: allNews[0],
        data: allNews.slice(startElement, startElement + config.news.limit),
        totalPages: Math.ceil((allNews.length - 1) / config.news.limit),
        totalNews: allNews.length,
        limit: config.news.limit
    }
}

export {useCurrentNews}