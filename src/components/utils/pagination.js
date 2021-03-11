import PropTypes from "prop-types";
import React from 'react';
import {not, equals, dec, compose, always, inc} from 'ramda';
import './css/pagination.scss';

export function Pagination(props){
    const {
        currentPage,
        totalPages,
        totalNews,
        changePage,
        BookmarksPage
    } = props;
    
    const previous = currentPage? compose(changePage, dec, always(currentPage)) : () => null,
          next = not(equals(currentPage, dec(totalPages)))
            ? compose(changePage, inc, always(currentPage))
            : () => null;
            
    return (
        <div className="pagination">
            <div className="pages_count">
                <span>
                    {currentPage + 1} - {totalPages}
                </span>
                out of {totalNews}
            </div>
            <div className="buttons">
                {BookmarksPage && (
                    <span
                        className="pagination__btn"
                        onClick={() => {
                            sessionStorage.clear();
                            window.location.reload();  
                        }}
                    >
                        Clear Bookmarks
                    </span>
                )}
                <span
                    className="pagination__btn"
                    onClick={previous}
                >
                    Previous
                </span>
                <span
                    className="pagination__btn"
                    onClick={next}
                >
                    Next
                </span>
            </div>
        </div>
    )
}

Pagination.propTypes = {
  changePage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalNews: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  BookmarksPage: PropTypes.bool,
}
