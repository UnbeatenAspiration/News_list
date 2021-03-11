import {CommonConstants} from "../actions/common";

export const commonReducer = (state = {toastMsg: null, language: 'en'}, action) => {
    switch (action.type) {
        case CommonConstants.setLanguage:
            return {...state, language: action.payload}
        case CommonConstants.setToast:
            return {...state, toastMsg: action.payload}
        case CommonConstants.removeToast:
            return {...state, toastMsg: null}
        default:
            return {...state}
    }
};
