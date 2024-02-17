import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as ReduxStoreProvider } from "react-redux";
import { LoadingProvider, Loading } from "./components";
import { Toaster } from "react-hot-toast";
import store from "./redux/store.ts";
import "./assets/css/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <ReduxStoreProvider store={store}>
        <Router>
          <Suspense fallback={<Loading />}>
            <LoadingProvider loadingComponent={<Loading />}>
              <App />
              <Toaster
                containerClassName="font-sans"
                position="top-center"
                reverseOrder={false}
                toastOptions={{ duration: 10000 }}
              />
            </LoadingProvider>
          </Suspense>
        </Router>
      </ReduxStoreProvider>
    </HelmetProvider>
  </React.StrictMode>
);
