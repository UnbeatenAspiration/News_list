import React, {useCallback, useState} from 'react';
import { useCurrentNews } from './news/useCurrentNews';
import { BuildNewsBlock } from '~/components/utils/buildNewsBlock';
import { useBookmarks } from '~/components/utils/useBookmarks';
import { Pagination } from '~/components/utils/pagination';
import { equals, not } from 'ramda';
import { Helmet } from 'react-helmet';
import { Loader } from '../utils/Loader';

function News(){
    const [currentPage, setCurrentPage] = useState(0),
          [isBookmark, toggleBookmark] = useBookmarks(currentPage), // bookmarks actions hook
          changePage = useCallback(page => setCurrentPage(page), [setCurrentPage]);
          
    let currentNews = useCurrentNews(currentPage); // I made a hook to get all info I need for this page
    
    console.log(currentNews)
    if(!currentNews?.data){
        return <Loader />
    }
    return (
        <div className="news-container">
            <Helmet>
                <title>News - Darqube</title>
            </Helmet>
            <div className="left-side">
                <BuildNewsBlock
                    item={currentNews.first}
                    mainItem
                    toggleBookmark={toggleBookmark(currentNews.first.id)} // All logic stays here to not fetch allBookmarks in item Component
                    isBookmark={isBookmark(currentNews.first.id)}
                />
            </div>
            <div className="right-side">
                <div className="news-list">
                    {currentNews.data.map(item => 
                        <BuildNewsBlock
                            item={item}
                            key={item?.id}
                            toggleBookmark={toggleBookmark(item.id)}
                            isBookmark={isBookmark(item.id)}
                        /> 
                    )}
                </div>
            {not(equals(currentNews.totalPages, 1)) && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={currentNews.totalPages}
                    totalNews={currentNews.totalNews}
                    changePage={changePage}
                />
            )}
            </div>
        </div>
    )
}

export default React.memo(News);
