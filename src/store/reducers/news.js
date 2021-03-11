import {NewsConstants} from "../actions/news";

let savedBookmarks = JSON.parse(sessionStorage.getItem('bookmarks'));

export const newsReducer = (state = { data: [], bookmarks: savedBookmarks || []}, action) => {
    switch (action.type) {
        case NewsConstants.setNews:
            return {...state, data: [...action.payload]}
        case NewsConstants.setBookmark:
            return {...state, bookmarks: [...state.bookmarks, action.payload]}
        case NewsConstants.setAllBookmarks:
            return {...state, bookmarks: [...action.payload]}
        default:
            return {...state}
    }
};
