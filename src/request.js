import fetch from "cross-fetch";
import { equals, or } from "ramda";
import { config } from './config';

const url = 'https://finnhub.io/api/';

export const request = async (path, method, body = {}, type = 'JSON') => {
    let data = body;
    try {
        let options = {
            method: method || 'POST',
            body: type === 'JSON'? JSON.stringify(data) : data,
            credentials: 'same-origin',
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json',
            }
        };
        if(["GET", "HEAD"].includes(method)){
            delete options.body
        }

        let addArguments = ~path.indexOf('?')? '&' : '?';
        // We don't know if there are arguments. ~ can be explaned in this case as "IF EXIST" cause 
        let resData = await fetch(url  + path + addArguments + 'token=' + config.apiKey, options);

        let ok = resData.ok;
        resData = resData.headers.get('content-type').indexOf('application/json') > -1 ? await resData.json() : resData;

        if (!ok) {
            return Promise.reject(new Error(resData.displayMessage));
        }
        return Promise.resolve(resData)
    } catch (err) {
        return Promise.reject(err);
    }
};
