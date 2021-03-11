import { combineReducers } from 'redux'

import {commonReducer} from './common';
import {newsReducer} from './news';

export const rootReducer = combineReducers({
    commonThings: commonReducer,
    news: newsReducer,
});
