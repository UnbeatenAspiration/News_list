import React, {useEffect} from 'react';
import ReactDom from 'react-dom';
import { store } from '~/store/store';
import { removeToast } from '~/store/actions/common';
import { useRedux } from '~/helpers';
import "./css/toast.scss";

let timeout = null;

function ToastTemplate(){
    const toastMsg = useRedux("commonThings.toastMsg");
    
    useEffect(() => {
        clearTimeout(timeout)
        timeout = setTimeout(() => store.dispatch(removeToast()), 5000);
    }, [toastMsg]);
    
    if(!toastMsg){
        return null
    }
    let PopupComponent = (
        <div className="toast">
            <div className="toast__close_btn" onClick={() => store.dispatch(removeToast())}>
                <div></div>
                <div></div>
            </div>
            <div className="toast__body">
                {toastMsg}
            </div>
            <div className="toast__timeline">
            </div>
        </div>
    )
    return (
        ReactDom.createPortal(PopupComponent, document.getElementById('modal-root'))
        // I will use portal cause it will render in another root div, so it has higher z-index.
    )
}

export const Toast = React.memo(ToastTemplate)