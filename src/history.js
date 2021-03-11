import { createBrowserHistory } from "history";

const history = createBrowserHistory();

export {history}; // Now, if we want to change link in a function,
// we don't have to send history through props
