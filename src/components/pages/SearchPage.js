import { equals, not } from 'ramda';
import React, { useCallback, useState } from 'react';
import { BuildNewsBlock } from '~/components/utils/buildNewsBlock';
import { Pagination } from '~/components/utils/pagination';
import { useBookmarks } from '~/components/utils/useBookmarks';
import notFound from '~/static/img/not-found.png';
import { useCurrentSearch } from './search-page/useCurrentSearch';
import { Helmet } from 'react-helmet';
function SearchPage(){
    const [currentPage, setCurrentPage] = useState(0),
          [isBookmark, toggleBookmark] = useBookmarks(currentPage), // bookmarks actions hook
          changePage = useCallback(page => setCurrentPage(page), [setCurrentPage]);
          
    let currentNews = useCurrentSearch(currentPage); // I made a hook to get all info I need for this page
    
    if(!currentNews){
       return (
           <div className="not-found">
               <img src={notFound} alt=""/>
               <h1>Someone stole the results. Please try another word</h1>
           </div>
       )
    }
    return (
        <div>
            <Helmet>
                <title>Search News - Darqube</title>
            </Helmet>
            <div className="plain-container">
            {currentNews?.data?.[currentPage]?.map(item => (
                <BuildNewsBlock
                    item={item}
                    key={item?.id}
                    toggleBookmark={toggleBookmark(item.id)}
                    isBookmark={isBookmark(item.id)}
                /> 
            ))}
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
    )
}

export default React.memo(SearchPage);
