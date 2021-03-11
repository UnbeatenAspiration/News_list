import React, {Suspense} from 'react';
import {render, hydrate} from 'react-dom';
import {App} from './App';
import reportWebVitals from './reportWebVitals';
import { Loader } from './components/utils/Loader';
import "./css/main.scss";
import ErrorBoundary from './components/ErrorBoundary';

function Root(){
    return (
        <Suspense fallback={<Loader />} maxDuration={5000}> {/* To accept dynamic components */}
            <React.StrictMode> {/* To enable strict mode */}
              <ErrorBoundary>
                <App />
              </ErrorBoundary>
            </React.StrictMode>
        </Suspense>
    )
}
const rootElement = document.getElementById('root');

if (rootElement.hasChildNodes()) { // Hydrate to HTML if it is Crawler, render if not
    hydrate(<Root />, rootElement);
} else {
    render(<Root />, rootElement);
}

reportWebVitals(); //to start measuring performance in console or send it
