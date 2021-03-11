import {is,not, equals} from 'ramda';

const NewsConstants = {
    setNews: 'SET_NEWS',
    setBookmark: "SET_BOOKMARK",
    setAllBookmarks: "SET_ALL_BOOKMARKS"
}; // to evade synt errors

function getBookmarksToSessionStorage(it){
    let savedBookmarks = JSON.parse(sessionStorage.getItem('bookmarks')) || [];
    
    if(is(Array, it)){
        savedBookmarks = it;   
    } else if(is(Number, it)){
        savedBookmarks.push(it);   
    } else {
        return
    }

    sessionStorage.setItem('bookmarks', JSON.stringify(savedBookmarks))
}
const setNews = (news) => {
    if(not(is(Array, news))){ // Just a fast check if we have an array
        return {
            type: NewsConstants.setNews,
            payload: []
        };   
    }

    return {
        type: NewsConstants.setNews,
        payload: news
    }
}
const setBookmark = (id) => {
    if(not(is(Number, id))){ // Just a fast check if we have a number
        return {
            type: NewsConstants.setBookmark,
            payload: 0
        };   
    }
    getBookmarksToSessionStorage(id);
    
    return {
        type: NewsConstants.setBookmark,
        payload: id
    }
}


const removeBookmark = (allBookmarks, id) => {
    let newBookmarks = [...allBookmarks];
    let index = allBookmarks.findIndex(it => equals(it, id));

    if(!~index){ // if not found. if -1 ==> ~-1 = 0 ==> !0 === true
        return {
            type: NewsConstants.setAllBookmarks,
            payload: newBookmarks
        }
    }

    newBookmarks.splice(index, 1);  // Remove from Index 1 elem

    getBookmarksToSessionStorage(newBookmarks);
    
    return {
        type: NewsConstants.setAllBookmarks,
        payload: newBookmarks
    }
}

export {
    NewsConstants,
    setNews,
    setBookmark,
    removeBookmark
};
