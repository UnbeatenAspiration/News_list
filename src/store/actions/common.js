const CommonConstants = {
    setLanguage: 'SET_LANGUAGE',
    setToast: 'SET_TOAST',
    removeToast: "REMOVE_TOAST"
}

export const setStoreLanguage = (language) => ({
    type: CommonConstants.setLanguage,
    payload: language
});
export const setToast = (msg) => ({
    type: CommonConstants.setToast,
    payload: msg
});
export const removeToast = (msg) => ({
    type: CommonConstants.removeToast
});

export {CommonConstants};
