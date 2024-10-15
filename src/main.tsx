import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { StartPage } from "./Pages/StartPage";
import { UrlCollectionPage } from "./Pages/UrlCollectionPage";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" Component={StartPage} />
          <Route path="/UrlCollectionPage" Component={UrlCollectionPage} />
        </Routes>
      </Router>
    </ChakraProvider>
  </React.StrictMode>
);
