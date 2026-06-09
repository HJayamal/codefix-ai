import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/debugger");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      {/* Left Branding Section */}
      <section style={styles.leftPanel}>
        <div style={styles.logoWrap}>
          <div style={styles.logoIcon}>⚙</div>
          <h1 style={styles.logoText}>
            CodeFix <span style={styles.logoAccent}>AI</span>
          </h1>
        </div>

        <div style={styles.leftContent}>
          <h2 style={styles.heroTitle}>
            Your AI debugging <br /> partner.
          </h2>

          <p style={styles.heroText}>
            The next-generation workspace for engineers. CodeFix AI identifies
            bottlenecks, suggests optimizations, and writes documentation in
            real-time.
          </p>
        </div>

        <div style={styles.mockCard}>
          <div style={styles.mockHeader}>
            <div style={styles.dots}>
              <span style={{ ...styles.dot, background: "#a78bfa" }}></span>
              <span style={{ ...styles.dot, background: "#64748b" }}></span>
              <span style={{ ...styles.dot, background: "#38bdf8" }}></span>
            </div>

            <span style={styles.mockFile}>AI_ANALYZER.LOG</span>
          </div>

          <div style={styles.skeletonLineLarge}></div>
          <div style={styles.skeletonLineSmall}></div>

          <div style={styles.alertBox}>
            <span style={styles.alertIcon}>✦</span>
            <span>Critical bug detected in main.py:124. Applying fix...</span>
          </div>

          <div style={styles.skeletonLineMedium}></div>
          <div style={styles.skeletonLineLarge2}></div>
        </div>
      </section>

      {/* Right Login Section */}
      <section style={styles.rightPanel}>
        <div style={styles.gridOverlay}></div>

        <div style={styles.loginCard}>
          <h1 style={styles.title}>Welcome Back</h1>
          <p style={styles.subtitle}>Access your intelligent developer console.</p>

          <form onSubmit={handleLogin}>
            <div style={styles.formGroup}>
              <label style={styles.label}>EMAIL ADDRESS</label>

              <div style={styles.inputWrap}>
                <span style={styles.inputIcon}>@</span>
                <input
                  type="email"
                  name="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <div style={styles.passwordLabelRow}>
                <label style={styles.label}>PASSWORD</label>
                <button
                  type="button"
                  style={styles.forgotButton}
                  onClick={() => alert("Forgot password feature coming soon")}
                >
                  FORGOT?
                </button>
              </div>

              <div style={styles.inputWrap}>
                <span style={styles.inputIcon}>▣</span>

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                >
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} style={styles.loginButton}>
              {loading ? "Logging in..." : "Login to Console"}
              {!loading && <span style={styles.arrow}>→</span>}
            </button>
          </form>

          <div style={styles.dividerWrap}>
            <div style={styles.divider}></div>
            <span style={styles.dividerText}>OR CONTINUE WITH</span>
            <div style={styles.divider}></div>
          </div>

          <div style={styles.socialRow}>
            <button
              style={styles.socialButton}
              onClick={() => alert("GitHub login not connected yet")}
            >
              <span style={styles.socialIcon}>▣</span>
              GitHub
            </button>

            <button
              style={styles.socialButton}
              onClick={() => alert("Google login not connected yet")}
            >
              <span style={styles.googleDot}></span>
              Google
            </button>
          </div>

          <p style={styles.registerText}>
            Don&apos;t have an account?{" "}
            <Link to="/register" style={styles.registerLink}>
              Register
            </Link>
          </p>
        </div>

        <div style={styles.footerRow}>
          <span>v2.4.0-STABLE</span>

          <div style={styles.footerLinks}>
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    background: "#070b14",
    color: "#e5e7eb",
    fontFamily: "Inter, Arial, sans-serif",
  },

  leftPanel: {
    position: "relative",
    overflow: "hidden",
    padding: "70px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    background:
      "linear-gradient(145deg, #070b14 0%, #0b1020 55%, #151a2e 100%)",
  },

  logoWrap: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },

  logoIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #c4b5fd, #8b5cf6)",
    color: "#0f172a",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "900",
    fontSize: "22px",
    boxShadow: "0 18px 35px rgba(139, 92, 246, 0.35)",
  },

  logoText: {
    margin: 0,
    fontSize: "28px",
    fontWeight: "900",
    color: "#dbeafe",
  },

  logoAccent: {
    color: "#38bdf8",
  },

  leftContent: {
    marginTop: "70px",
  },

  heroTitle: {
    fontSize: "58px",
    lineHeight: "1.15",
    margin: "0 0 28px 0",
    color: "#f8fafc",
    fontWeight: "900",
    letterSpacing: "-1.5px",
  },

  heroText: {
    maxWidth: "590px",
    color: "#cbd5e1",
    fontSize: "20px",
    lineHeight: "1.55",
    margin: 0,
  },

  mockCard: {
    width: "100%",
    maxWidth: "610px",
    background: "rgba(30, 41, 59, 0.7)",
    border: "1px solid rgba(148, 163, 184, 0.16)",
    borderRadius: "14px",
    padding: "28px",
    boxShadow: "0 25px 80px rgba(0, 0, 0, 0.4)",
    position: "relative",
    overflow: "hidden",
  },

  mockHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "22px",
  },

  dots: {
    display: "flex",
    gap: "10px",
  },

  dot: {
    width: "14px",
    height: "14px",
    borderRadius: "50%",
    display: "inline-block",
  },

  mockFile: {
    color: "#94a3b8",
    letterSpacing: "2px",
    fontSize: "13px",
    fontWeight: "800",
  },

  skeletonLineLarge: {
    height: "18px",
    width: "75%",
    background: "rgba(148, 163, 184, 0.13)",
    borderRadius: "5px",
    marginBottom: "14px",
  },

  skeletonLineSmall: {
    height: "18px",
    width: "50%",
    background: "rgba(148, 163, 184, 0.13)",
    borderRadius: "5px",
    marginBottom: "16px",
  },

  alertBox: {
    border: "1px solid rgba(147, 197, 253, 0.35)",
    background: "rgba(148, 163, 184, 0.08)",
    borderRadius: "8px",
    padding: "14px 16px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    color: "#dbeafe",
    marginBottom: "16px",
  },

  alertIcon: {
    color: "#a78bfa",
    fontWeight: "900",
  },

  skeletonLineMedium: {
    height: "18px",
    width: "65%",
    background: "rgba(148, 163, 184, 0.13)",
    borderRadius: "5px",
    marginBottom: "14px",
  },

  skeletonLineLarge2: {
    height: "18px",
    width: "83%",
    background: "rgba(148, 163, 184, 0.13)",
    borderRadius: "5px",
  },

  rightPanel: {
    position: "relative",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "radial-gradient(circle at top right, rgba(59, 130, 246, 0.12), transparent 32%), #0b1020",
    overflow: "hidden",
  },

  gridOverlay: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "radial-gradient(rgba(148, 163, 184, 0.12) 1px, transparent 1px)",
    backgroundSize: "34px 34px",
    opacity: 0.12,
  },

  loginCard: {
    position: "relative",
    width: "100%",
    maxWidth: "530px",
    background: "rgba(17, 24, 39, 0.92)",
    border: "1px solid rgba(148, 163, 184, 0.22)",
    borderRadius: "18px",
    padding: "46px",
    boxShadow: "0 30px 90px rgba(0, 0, 0, 0.45)",
  },

  title: {
    fontSize: "38px",
    lineHeight: "1.1",
    color: "#f8fafc",
    margin: "0 0 8px 0",
    fontWeight: "900",
  },

  subtitle: {
    color: "#cbd5e1",
    fontSize: "17px",
    margin: "0 0 38px 0",
  },

  formGroup: {
    marginBottom: "26px",
  },

  label: {
    display: "block",
    color: "#94a3b8",
    fontSize: "13px",
    fontWeight: "900",
    letterSpacing: "1.6px",
    marginBottom: "10px",
  },

  passwordLabelRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  forgotButton: {
    background: "transparent",
    border: "none",
    color: "#bfdbfe",
    fontSize: "12px",
    fontWeight: "900",
    cursor: "pointer",
    letterSpacing: "0.6px",
  },

  inputWrap: {
    height: "64px",
    border: "1px solid rgba(148, 163, 184, 0.36)",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    padding: "0 18px",
    background: "#070b14",
    gap: "14px",
  },

  inputIcon: {
    color: "#9ca3af",
    fontSize: "28px",
    fontWeight: "800",
  },

  input: {
    flex: 1,
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#f8fafc",
    fontSize: "18px",
  },

  eyeButton: {
    background: "transparent",
    border: "none",
    color: "#94a3b8",
    cursor: "pointer",
    fontSize: "22px",
  },

  loginButton: {
    width: "100%",
    height: "72px",
    marginTop: "22px",
    border: "none",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #bfdbfe 0%, #3b82f6 100%)",
    color: "#0f172a",
    fontSize: "20px",
    fontWeight: "500",
    cursor: "pointer",
    boxShadow: "0 18px 38px rgba(59, 130, 246, 0.32)",
  },

  arrow: {
    marginLeft: "10px",
    fontSize: "28px",
  },

  dividerWrap: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    margin: "42px 0 28px",
  },

  divider: {
    height: "1px",
    flex: 1,
    background: "rgba(148, 163, 184, 0.14)",
  },

  dividerText: {
    color: "#64748b",
    fontSize: "13px",
    fontWeight: "900",
    letterSpacing: "1.4px",
  },

  socialRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "18px",
  },

  socialButton: {
    height: "58px",
    borderRadius: "12px",
    border: "1px solid rgba(148, 163, 184, 0.28)",
    background: "rgba(17, 24, 39, 0.72)",
    color: "#f8fafc",
    fontSize: "18px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "12px",
  },

  socialIcon: {
    background: "#ffffff",
    color: "#111827",
    width: "22px",
    height: "22px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "10px",
  },

  googleDot: {
    width: "22px",
    height: "22px",
    borderRadius: "4px",
    background:
      "linear-gradient(135deg, #111827 0%, #111827 45%, #7c3aed 45%, #7c3aed 100%)",
    boxShadow: "inset 0 0 0 2px #020617",
  },

  registerText: {
    textAlign: "center",
    margin: "42px 0 0",
    color: "#d1d5db",
    fontSize: "16px",
  },

  registerLink: {
    color: "#bfdbfe",
    fontWeight: "900",
  },

  footerRow: {
    position: "absolute",
    bottom: "70px",
    width: "100%",
    maxWidth: "530px",
    display: "flex",
    justifyContent: "space-between",
    color: "#64748b",
    fontSize: "13px",
    fontWeight: "900",
    letterSpacing: "1.4px",
  },

  footerLinks: {
    display: "flex",
    gap: "28px",
  },
};

export default Login;