import { equals, not } from 'ramda';
import React, { useCallback, useState, useRef } from 'react';
import { BuildNewsBlock } from '~/components/utils/buildNewsBlock';
import { Pagination } from '~/components/utils/pagination';
import { useBookmarks } from '~/components/utils/useBookmarks';
import { useCurrentBookmarks } from './bookmarks/useCurrentBookmarks';
import notFound from '~/static/img/not-found.png';
import { Helmet } from 'react-helmet';
import { debounce } from '../../helpers';
import searchIcon from '~/static/img/search.png';

function Bookmarks(){
        const [currentPage, setCurrentPage] = useState(0),
              [search, setSearch ] = useState(""),
              [isBookmark, toggleBookmark] = useBookmarks(currentPage),
              searchInput = useRef(null),
              bookmarks = useCurrentBookmarks(currentPage, search),
              changePage = useCallback(page => setCurrentPage(page), [setCurrentPage]),
              changeSearch = (e) => setSearch(e.target.value)
              

    if(!bookmarks.data.length){
        return (
            <div className="not-found">
                <div className="search" key="search">
                    <img
                        src={searchIcon}
                        alt=""
                    />
                    <input
                        type="text"
                        defaultValue={search}
                        ref={searchInput}
                        placeholder="Search Bookmarks"
                        onChange={debounce(changeSearch, 300)} // To prevent too many rerenders while typing
                    />
                </div>
                <img src={notFound} alt=""/>
                <h1>You don't have any notes yet. Want to add one? </h1>
            </div>
        )
    }
    let startElement = bookmarks.limit * currentPage;
    
    let data = search
        ? bookmarks.data.slice(startElement, startElement + bookmarks.limit)
        : bookmarks.data;

    return (
        <div>
            <Helmet>
                <title>Bookmarks - Darqube</title>
            </Helmet>
            <div className="search" key="search">
                <img
                    src={searchIcon}
                    alt=""
                />
                <input
                    type="text"
                    defaultValue={search}
                    ref={searchInput}
                    placeholder="Search Bookmarks"
                    onChange={debounce(changeSearch, 300)} // To prevent too many rerenders while typing
                />
            </div> {/* Here is better to dublicate than put in another function cause of rerender */}
            <div className="plain-container">
                {data.map(item => (
                    <BuildNewsBlock
                        item={item}
                        key={item?.id}
                        toggleBookmark={toggleBookmark(item.id)}
                        isBookmark={isBookmark(item.id)}
                    /> 
                ))}
            </div>
            {not(equals(bookmarks.totalPages, 1)) && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={bookmarks.totalPages}
                    totalNews={bookmarks.totalNews}
                    changePage={changePage}
                    BookmarksPage
                />
            )}
        </div>
    )
}

export default Bookmarks