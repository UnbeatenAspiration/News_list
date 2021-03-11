import { splitEvery } from 'ramda';
import { config } from '~/config';
import { useParams } from 'react-router-dom';
import { useRedux } from '~/helpers';

function useCurrentSearch(){
    const allNews = useRedux("news.data", []),
          {query} = useParams();
          
          
    if(!query){
        return null
    }
    
    let selectedNews = [];
    
    for(let i = 0; i < allNews.length; i++){
        if(
            ~allNews[i]?.headline?.indexOf(query)
            || ~allNews[i]?.summary?.indexOf(query)
        ){
            selectedNews.push(allNews[i])
        }
    }


    if(!selectedNews.length){
        return null
    }

    return {
        data: splitEvery(config.plainContainer.limit, selectedNews),
        totalPages: Math.ceil(selectedNews.length / config.plainContainer.limit),
        totalNews: selectedNews.length,
        limit: config.plainContainer.limit
    }
}

export {useCurrentSearch}