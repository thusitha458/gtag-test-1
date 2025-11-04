import { Link } from "react-router";

export function About() {
  return (
    <>
      <h1>About</h1>
      <p className="read-the-docs">
        We are some people. Don't have anymore infomation sadly. :)
      </p>
      <Link to="/">Home</Link>
    </>
  );
}
