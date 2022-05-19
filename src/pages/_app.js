import "/src/common/styles/globals.css";
import { Provider } from "react-redux";
import store from "src/store/store";
// import { PersistGate } from 'redux-persist/integration/react';
// import { persistor } from "src/store";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />;
    </Provider>
  );
}

export default MyApp;
