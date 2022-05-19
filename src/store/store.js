import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import rootReducer from "src/store/reducers";

const enchancers = applyMiddleware(thunk, logger);
const store = createStore(rootReducer, enchancers);

export default store;
