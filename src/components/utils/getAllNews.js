import { setNews } from '~/store/actions/news';
import { store } from '~/store/store';
import { request } from '~/request';


async function getAllNews(){
    try{
        const result = await request('v1/company-news?symbol=AAPL&from=2020-01-01', 'GET');
        store.dispatch(setNews(result))
    } catch(err) {
        // Toast
    }
}

export {getAllNews}