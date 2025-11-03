import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router";

import { About } from "./components/About";
import { ContactUs } from "./components/ContactUs";
import { Home } from "./components/Home";
import { useEffect } from "react";

function App() {
  useCookieConsent();

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

const CONSENT_COOKIE_NAME = "CookieConsent";

const useCookieConsent = () => {
  useEffect(() => {
    const cookie = getCookie(CONSENT_COOKIE_NAME);
    if (cookie) {
      try {
        const parsed = JSON.parse(cookie) as {
          necessary: boolean;
          statistics: boolean;
        };
        if (
          Object.prototype.hasOwnProperty.call(parsed, "necessary") &&
          Object.prototype.hasOwnProperty.call(parsed, "statistics")
        ) {
          // Already has shown cookie consent, nothing more to do here
          return;
        }
      } catch {
        // do nothing
      }
    }

    eraseCookie(CONSENT_COOKIE_NAME);
    const hasConfirmed = confirm("Please accept to our cookies");
    setCookie(
      CONSENT_COOKIE_NAME,
      JSON.stringify({
        necessary: hasConfirmed,
        statistics: hasConfirmed,
      })
    );
  }, []);
};

function setCookie(name: string, value: string) {
  document.cookie = name + "=" + (value || "");
}

function getCookie(name: string) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) == 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
}

function eraseCookie(name: string) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
