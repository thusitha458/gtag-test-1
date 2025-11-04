import "./App.css";

import { BrowserRouter, Route, Routes, useLocation } from "react-router";

import { About } from "./components/About";
import { ContactUs } from "./components/ContactUs";
import { CookieBanner } from "./components/CookieBanner";
import { Home } from "./components/Home";
import { useEffect } from "react";

function App() {
  return (
    <BrowserRouter>
      <PageViewSender />
      <CookieBanner />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

function PageViewSender() {
  useGtmPageView();

  return null;
}

function useGtmPageView() {
  const location = useLocation();

  useEffect(() => {
    if (
      (window as Window & typeof globalThis & { dataLayer: unknown[] })
        .dataLayer
    ) {
      (
        window as Window & typeof globalThis & { dataLayer: unknown[] }
      ).dataLayer.push({
        event: "custom-page-view",
        page: location.pathname + location.search,
      });
    }
  }, [location]);
}
