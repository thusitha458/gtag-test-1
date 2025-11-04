import { Link } from "react-router";
import { useState } from "react";

export function Home() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Home</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <p className="read-the-docs">Hello there! Welcome to the Home Page.</p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Link to="/contact-us">Contact Us</Link>
        <Link to="/about">About</Link>
      </div>
    </>
  );
}
