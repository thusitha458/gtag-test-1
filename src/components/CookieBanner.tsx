import { useEffect, useState } from "react";

export function CookieBanner() {
  const { showCookieBanner, onCloseCookieBanner } = useCookieConsent();

  const onAccept = () => {
    onCloseCookieBanner();
    setCookie(
      CONSENT_COOKIE_NAME,
      JSON.stringify({
        necessary: true,
        statistics: true,
      })
    );
  };

  const onDeny = () => {
    onCloseCookieBanner();
    setCookie(
      CONSENT_COOKIE_NAME,
      JSON.stringify({
        necessary: false,
        statistics: false,
      })
    );
  };

  if (!showCookieBanner) {
    return null;
  }

  return (
    <div
      style={{
        backgroundColor: "pink",
        padding: "1rem",
        borderRadius: "0.25rem",
        marginBottom: "1rem",
      }}
    >
      <h2>Cookie consent</h2>
      <p>Do you consent to the usage of cookies?</p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <button style={{ marginRight: "1rem" }} onClick={onAccept} id="cookie-banner-accept-btn">
          Accept
        </button>
        <button onClick={onDeny} id="cookie-banner-deny-btn">Deny</button>
      </div>
    </div>
  );
}

const CONSENT_COOKIE_NAME = "CookieConsent";

const useCookieConsent = () => {
  const [showCookieBanner, setShowCookieBanner] = useState(false);

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
    setShowCookieBanner(true);
  }, []);

  return {
    showCookieBanner,
    onCloseCookieBanner: () => setShowCookieBanner(false),
  };
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
