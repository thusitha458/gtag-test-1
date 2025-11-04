import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router";

import { About } from "./components/About";
import { ContactUs } from "./components/ContactUs";
import { CookieConsent } from "./components/CookieConsent";
import { Home } from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <CookieConsent />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
