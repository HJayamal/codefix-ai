import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav
      style={{
        height: "72px",
        borderBottom: "1px solid rgba(148, 163, 184, 0.15)",
        background: "rgba(15, 23, 42, 0.85)",
        backdropFilter: "blur(14px)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          height: "100%",
          margin: "0 auto",
          padding: "0 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          to="/"
          style={{
            color: "#ffffff",
            fontSize: "22px",
            fontWeight: "900",
          }}
        >
          CodeFix <span style={{ color: "#38bdf8" }}>AI</span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Link to="/" style={linkStyle}>Home</Link>
          <Link to="/debugger" style={linkStyle}>Debugger</Link>
          <Link to="/history" style={linkStyle}>History</Link>
          <Link to="/dashboard" style={linkStyle}>Dashboard</Link>

          {!token ? (
            <>
              <Link to="/login" style={linkStyle}>Login</Link>
              <Link to="/register" className="btn-primary">Register</Link>
            </>
          ) : (
            <button onClick={logout} className="btn-secondary">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

const linkStyle = {
  color: "#cbd5e1",
  fontWeight: "600",
};

export default Navbar;