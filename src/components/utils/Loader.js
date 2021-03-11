import React from 'react';
import "./css/loader.scss";

function LoaderTemplate() {
    return (
        <div className="loader_container">
            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export const Loader = React.memo(LoaderTemplate);