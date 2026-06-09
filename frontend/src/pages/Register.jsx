import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await API.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/debugger");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="page">
      <div style={styles.authContainer}>
        <div style={styles.brandPanel}>
          <h1 style={styles.logo}>
            CodeFix <span style={{ color: "#38bdf8" }}>AI</span>
          </h1>

          <h2 style={styles.brandTitle}>Create your AI debugging workspace.</h2>

          <p style={styles.brandText}>
            Register free and start fixing JavaScript, Python, Java, and C++
            bugs with AI-powered explanations.
          </p>

          <div style={styles.demoCard}>
            <p style={styles.demoLabel}>What you get</p>
            <ul style={styles.list}>
              <li>AI bug detection</li>
              <li>Fixed code generation</li>
              <li>Debug history</li>
              <li>Beginner-friendly explanations</li>
            </ul>
          </div>
        </div>

        <div style={styles.formPanel}>
          <div className="card" style={styles.formCard}>
            <h1 style={styles.title}>Create Account</h1>
            <p style={styles.subtitle}>
              Start debugging faster with CodeFix AI.
            </p>

            <form onSubmit={handleRegister}>
              <label style={styles.label}>Full Name</label>
              <input
                className="input"
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <label style={styles.label}>Email</label>
              <input
                className="input"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <label style={styles.label}>Password</label>
              <input
                className="input"
                type="password"
                name="password"
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <label style={styles.label}>Confirm Password</label>
              <input
                className="input"
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />

              <button type="submit" className="btn-primary" style={styles.fullButton}>
                Register
              </button>
            </form>

            <p style={styles.switchText}>
              Already have an account?{" "}
              <Link to="/login" style={styles.link}>
                Login
              </Link>
            </p>

            <Link to="/" style={styles.backHome}>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  authContainer: {
    minHeight: "100vh",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
  },

  brandPanel: {
    padding: "70px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    background:
      "linear-gradient(135deg, rgba(37,99,235,0.25), rgba(124,58,237,0.18))",
    borderRight: "1px solid rgba(148, 163, 184, 0.15)",
  },

  logo: {
    fontSize: "30px",
    marginBottom: "60px",
    color: "#ffffff",
  },

  brandTitle: {
    fontSize: "44px",
    lineHeight: "1.1",
    color: "#ffffff",
    marginBottom: "20px",
  },

  brandText: {
    color: "#cbd5e1",
    fontSize: "18px",
    lineHeight: "1.7",
    maxWidth: "520px",
  },

  demoCard: {
    marginTop: "40px",
    background: "rgba(15, 23, 42, 0.75)",
    border: "1px solid rgba(59, 130, 246, 0.35)",
    borderRadius: "18px",
    padding: "24px",
    maxWidth: "480px",
  },

  demoLabel: {
    color: "#38bdf8",
    fontWeight: "bold",
    marginTop: 0,
  },

  list: {
    color: "#dbeafe",
    lineHeight: "1.9",
    paddingLeft: "20px",
  },

  formPanel: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
  },

  formCard: {
    width: "100%",
    maxWidth: "460px",
    padding: "34px",
  },

  title: {
    color: "#ffffff",
    marginBottom: "8px",
  },

  subtitle: {
    color: "#94a3b8",
    marginBottom: "28px",
  },

  label: {
    display: "block",
    color: "#cbd5e1",
    marginBottom: "8px",
    marginTop: "16px",
    fontWeight: "bold",
  },

  fullButton: {
    width: "100%",
    marginTop: "24px",
  },

  switchText: {
    textAlign: "center",
    color: "#94a3b8",
    marginTop: "24px",
  },

  link: {
    color: "#38bdf8",
    fontWeight: "bold",
  },

  backHome: {
    display: "block",
    textAlign: "center",
    color: "#cbd5e1",
    marginTop: "16px",
  },
};

export default Register;