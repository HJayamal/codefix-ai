import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>CodeFix AI</h1>
      <p>AI-powered bug detection and code correction platform.</p>

      <Link to="/login">Login</Link>
      <br />
      <Link to="/register">Register</Link>
      <br />
      <Link to="/debugger">Debugger</Link>
    </div>
  );
}

export default Home;