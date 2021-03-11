import { equals } from 'ramda';
import { config } from '~/config';
import { useRedux } from '~/helpers';

function useCurrentBookmarks(currentPage, search){
    const allBookmarksIds = useRedux("news.bookmarks", []),
          allNews = useRedux("news.data", []),
          startElement = config.plainContainer.limit * currentPage;
          
    let selectedBookmarks = search
        ? allBookmarksIds
        : allBookmarksIds.slice(startElement, startElement + config.plainContainer.limit),
        newBookmarks = [];
    
    for(let i = 0; i < selectedBookmarks.length; i++){
        let index = allNews.findIndex(it => equals(selectedBookmarks[i], it.id));
        
        if(~index){
            if(search){
                if(
                    ~allNews[index]?.headline?.indexOf(search)
                    || ~allNews[index]?.summary?.indexOf(search)
                ){ 
                    newBookmarks.push(allNews[index]);
                }
            } else {
                newBookmarks.push(allNews[index]); // I know. Looks hard, but it's easier than it feels
            }
        }
    }
    
    let statisticLength = search? newBookmarks.length : allBookmarksIds.length
    
    return {
        data: newBookmarks,
        totalPages: Math.ceil(statisticLength / config.plainContainer.limit),
        totalNews: statisticLength,
        limit: config.plainContainer.limit
    }
}

export {useCurrentBookmarks}