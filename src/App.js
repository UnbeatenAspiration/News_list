import React, {Suspense, useEffect} from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Redirect, Route, Router, Switch } from "react-router-dom";
import { history } from './history';
import { Loader } from './components/utils/Loader';
import { Header } from './components/header/Header';
import { getAllNews } from './components/utils/getAllNews';
import { Toast } from './components/utils/toast';



const News = React.lazy(() => import("~/components/pages/News"));
const Bookmarks = React.lazy(() => import("~/components/pages/Bookmarks"));
const SearchPage = React.lazy(() => import("~/components/pages/SearchPage"));
// Dynamic Imports for TimeSaving;

function AppTemplate(){

    useEffect(() => {
        getAllNews();
    }, []);
    // IAmVariable - Uncoment this to check the Error Boundary

    return (
        <Provider store={store}>
            <Router history={history}>
                <h1 key="SEO-title" className="hidden"> {/* h1 is hidden, but it's required for SEO */}
                    {"Darqube Test App"}
                </h1>
                <Header /> {/* It will be on every page and not it's dynamic */}
                <main>
                    <Suspense key="suspense" fallback={<Loader />}>
                        <Switch>
                            <Route path="/" exact component={News}/> {/* Exact cause of every path includes '/' */}
                            <Route path="/s/:query" component={SearchPage}/> {/* search param to use in any place */}
                            <Route path="/bookmarks"  component={Bookmarks}/>
                            <Route path="/*" component={RedirectToMain}/> {/* To prevent 404 page */}
                        </Switch>
                        {/* 
                            We don't use config.pages.map cause 
                            we have to build component for any path we use
                            and we don't want it to be wrapped in Array or Object
                        */}
                    </Suspense>
                    <Toast />
                </main>
            </Router>
        </Provider>
    )
}


const RedirectToMain = () => (
    <Redirect to="/" />
)
export const App = React.memo(AppTemplate)