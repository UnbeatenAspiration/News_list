import {useCallback} from 'react';
import { setToast } from '~/store/actions/common';
import { store } from '~/store/store';
import { setBookmark, removeBookmark } from '~/store/actions/news';
import { useRedux } from '~/helpers';

const useBookmarks = () => {
    const allBookmarks = useRedux("news.bookmarks", []),
          isBookmark = useCallback((id) => allBookmarks.includes(id), [allBookmarks]),
          toggleBookmark = useCallback((id) => () => {
              if(isBookmark(id)){
                  store.dispatch(removeBookmark(allBookmarks, id));
                  store.dispatch(setToast('Bookmark deleted'))
              } else {
                  store.dispatch(setBookmark(id));
                  store.dispatch(setToast('Bookmark set')) 
              }
          },[isBookmark, allBookmarks]); // To transfer it through props
    return [
        isBookmark,
        toggleBookmark
    ]  
}

export {useBookmarks}