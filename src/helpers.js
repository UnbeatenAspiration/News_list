import { useSelector } from "react-redux";
import { path } from 'ramda'


const useRedux = (strPath, defValue) => {
    /* if we want to uninstall REDUX, just need to overwrite this function */
    const res = useSelector(state => path(strPath?.split('.'), state));
    
    return res || defValue
}

const debounce = (func, wait, immediate) => {
    let timeout;
    return function() {
        let context = this, args = arguments;
        let later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};


export {useRedux, debounce}