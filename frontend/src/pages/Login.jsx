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
    <div className="login-page">
      <div className="animated-bg"></div>

      {/* LEFT SIDE */}
      <section className="login-left">
        <div className="brand-row">
          <div className="brand-icon">⚙</div>
          <h1>
            CodeFix <span>AI</span>
          </h1>
        </div>

        <div className="left-content">
          <h2>
            Your AI debugging <br /> partner.
          </h2>

          <p>
            The next-generation workspace for engineers. CodeFix AI identifies
            bottlenecks, suggests optimizations, and writes documentation in
            real-time.
          </p>
        </div>

        <div className="ai-log-card">
          <div className="log-header">
            <div className="dots">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <p>AI_ANALYZER.LOG</p>
          </div>

          <div className="skeleton skeleton-1"></div>
          <div className="skeleton skeleton-2"></div>

          <div className="bug-alert">
            <span>✦</span>
            Critical bug detected in main.py:124. Applying fix...
          </div>

          <div className="skeleton skeleton-3"></div>
          <div className="skeleton skeleton-4"></div>
        </div>
      </section>

      {/* RIGHT SIDE */}
      <section className="login-right">
        <div className="grid-pattern"></div>

        <div className="login-card">
          <h2>Welcome Back</h2>
          <p className="card-subtitle">
            Access your intelligent developer console.
          </p>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>EMAIL ADDRESS</label>

              <div className="input-box">
                <span className="input-icon">@</span>
                <input
                  type="email"
                  name="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="password-row">
                <label>PASSWORD</label>

                <button
                  type="button"
                  className="forgot-btn"
                  onClick={() => alert("Forgot password feature coming soon")}
                >
                  FORGOT?
                </button>
              </div>

              <div className="input-box">
                <span className="input-icon">▣</span>

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login to Console"}
              {!loading && <span>→</span>}
            </button>
          </form>

          <div className="divider">
            <span></span>
            <p>OR CONTINUE WITH</p>
            <span></span>
          </div>

          <div className="social-row">
            <button onClick={() => alert("GitHub login not connected yet")}>
              <span>▣</span>
              GitHub
            </button>

            <button onClick={() => alert("Google login not connected yet")}>
              <span>◐</span>
              Google
            </button>
          </div>

          <p className="register-text">
            Don&apos;t have an account? <Link to="/register">Register</Link>
          </p>
        </div>

        <div className="login-footer">
          <span>v2.4.0-STABLE</span>

          <div>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </section>

      <style>{`
        * {
          box-sizing: border-box;
        }

        .login-page {
          width: 100%;
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: #070b14;
          color: #f8fafc;
          font-family: Inter, Arial, sans-serif;
          overflow: hidden;
          position: relative;
        }

        .animated-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background:
            radial-gradient(circle at 16% 20%, rgba(96, 165, 250, 0.13), transparent 28%),
            radial-gradient(circle at 78% 25%, rgba(139, 92, 246, 0.12), transparent 30%),
            radial-gradient(circle at 45% 85%, rgba(56, 189, 248, 0.08), transparent 30%);
          animation: bgPulse 8s ease-in-out infinite alternate;
        }

        .login-left,
        .login-right {
          position: relative;
          z-index: 1;
          min-height: 100vh;
        }

        .login-left {
          padding: 70px 76px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background:
            linear-gradient(145deg, rgba(7, 11, 20, 0.98), rgba(12, 17, 30, 0.96));
          border-right: 1px solid rgba(148, 163, 184, 0.08);
        }

        .brand-row {
          display: flex;
          align-items: center;
          gap: 18px;
          animation: fadeDown 0.8s ease forwards;
        }

        .brand-icon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          background: linear-gradient(135deg, #c4b5fd, #8b5cf6);
          color: #0f172a;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
          box-shadow: 0 18px 42px rgba(139, 92, 246, 0.36);
        }

        .brand-row h1 {
          font-size: 30px;
          margin: 0;
          color: #bfdbfe;
          font-weight: 950;
          letter-spacing: -0.5px;
        }

        .brand-row span {
          color: #f8fafc;
        }

        .left-content {
          max-width: 640px;
          animation: fadeUp 0.9s ease forwards;
        }

        .left-content h2 {
          font-size: clamp(48px, 5vw, 74px);
          line-height: 1.12;
          letter-spacing: -2px;
          margin: 0 0 34px;
          color: #f8fafc;
          font-weight: 950;
        }

        .left-content p {
          font-size: 21px;
          line-height: 1.55;
          color: #d1d5db;
          margin: 0;
          max-width: 610px;
        }

        .ai-log-card {
          width: min(640px, 100%);
          min-height: 260px;
          background: rgba(30, 41, 59, 0.74);
          border: 1px solid rgba(148, 163, 184, 0.18);
          border-radius: 16px;
          padding: 28px;
          box-shadow: 0 35px 100px rgba(0, 0, 0, 0.45);
          overflow: hidden;
          position: relative;
          animation: floatCard 4.5s ease-in-out infinite;
        }

        .ai-log-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 15% 20%, rgba(96, 165, 250, 0.12), transparent 30%),
            linear-gradient(135deg, transparent 60%, rgba(148, 163, 184, 0.08) 60%);
          pointer-events: none;
        }

        .log-header {
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .dots {
          display: flex;
          gap: 10px;
        }

        .dots span {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          display: block;
        }

        .dots span:nth-child(1) {
          background: #a78bfa;
        }

        .dots span:nth-child(2) {
          background: #64748b;
        }

        .dots span:nth-child(3) {
          background: #38bdf8;
        }

        .log-header p {
          margin: 0;
          color: #94a3b8;
          letter-spacing: 2px;
          font-size: 13px;
          font-weight: 900;
        }

        .skeleton {
          position: relative;
          height: 18px;
          border-radius: 5px;
          background: rgba(148, 163, 184, 0.14);
          margin-bottom: 15px;
          overflow: hidden;
        }

        .skeleton::after {
          content: "";
          position: absolute;
          inset: 0;
          transform: translateX(-100%);
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.09),
            transparent
          );
          animation: shimmer 2s infinite;
        }

        .skeleton-1 {
          width: 74%;
        }

        .skeleton-2 {
          width: 50%;
        }

        .skeleton-3 {
          width: 66%;
        }

        .skeleton-4 {
          width: 82%;
        }

        .bug-alert {
          position: relative;
          z-index: 2;
          margin: 18px 0;
          padding: 15px 18px;
          border-radius: 9px;
          border: 1px solid rgba(147, 197, 253, 0.38);
          background: rgba(148, 163, 184, 0.08);
          color: #dbeafe;
          font-size: 16px;
          line-height: 1.5;
        }

        .bug-alert span {
          color: #a78bfa;
          margin-right: 10px;
        }

        .login-right {
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(10, 15, 26, 0.94);
          overflow: hidden;
        }

        .grid-pattern {
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(rgba(148, 163, 184, 0.15) 1px, transparent 1px);
          background-size: 34px 34px;
          opacity: 0.12;
          animation: gridMove 12s linear infinite;
        }

        .login-card {
          width: min(530px, calc(100% - 48px));
          padding: 48px;
          border-radius: 18px;
          background: rgba(17, 24, 39, 0.9);
          border: 1px solid rgba(148, 163, 184, 0.2);
          box-shadow: 0 35px 100px rgba(0, 0, 0, 0.45);
          position: relative;
          z-index: 2;
          animation: fadeLeft 0.9s ease forwards;
        }

        .login-card h2 {
          font-size: 40px;
          margin: 0 0 10px;
          line-height: 1.1;
          color: #f8fafc;
          letter-spacing: -1px;
        }

        .card-subtitle {
          color: #d1d5db;
          font-size: 17px;
          margin: 0 0 42px;
        }

        .form-group {
          margin-bottom: 28px;
        }

        .form-group label {
          display: block;
          color: #94a3b8;
          font-size: 13px;
          font-weight: 950;
          letter-spacing: 1.6px;
          margin-bottom: 10px;
        }

        .password-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .forgot-btn {
          background: transparent;
          border: none;
          color: #bfdbfe;
          font-size: 12px;
          font-weight: 950;
          cursor: pointer;
          letter-spacing: 0.8px;
        }

        .input-box {
          height: 64px;
          border-radius: 13px;
          border: 1px solid rgba(148, 163, 184, 0.34);
          background: #070b14;
          display: flex;
          align-items: center;
          padding: 0 18px;
          gap: 14px;
          transition: 0.25s ease;
        }

        .input-box:focus-within {
          border-color: #60a5fa;
          box-shadow: 0 0 0 4px rgba(96, 165, 250, 0.12);
          transform: translateY(-1px);
        }

        .input-icon {
          font-size: 26px;
          color: #9ca3af;
          font-weight: 900;
        }

        .input-box input {
          flex: 1;
          height: 100%;
          background: transparent;
          border: none;
          outline: none;
          color: #f8fafc;
          font-size: 18px;
        }

        .input-box input::placeholder {
          color: #6b7280;
        }

        .eye-btn {
          border: none;
          background: transparent;
          cursor: pointer;
          font-size: 22px;
          opacity: 0.8;
        }

        .login-btn {
          width: 100%;
          height: 72px;
          border: none;
          border-radius: 13px;
          margin-top: 22px;
          background: linear-gradient(135deg, #bfdbfe, #60a5fa);
          color: #0f172a;
          font-size: 21px;
          font-weight: 500;
          cursor: pointer;
          box-shadow: 0 20px 46px rgba(96, 165, 250, 0.32);
          transition: 0.25s ease;
        }

        .login-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 26px 60px rgba(96, 165, 250, 0.44);
        }

        .login-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .login-btn span {
          margin-left: 10px;
          font-size: 28px;
        }

        .divider {
          display: flex;
          align-items: center;
          gap: 18px;
          margin: 44px 0 30px;
        }

        .divider span {
          height: 1px;
          flex: 1;
          background: rgba(148, 163, 184, 0.15);
        }

        .divider p {
          margin: 0;
          color: #64748b;
          font-size: 13px;
          font-weight: 950;
          letter-spacing: 1.4px;
        }

        .social-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }

        .social-row button {
          height: 58px;
          border-radius: 13px;
          border: 1px solid rgba(148, 163, 184, 0.28);
          background: rgba(17, 24, 39, 0.7);
          color: #f8fafc;
          cursor: pointer;
          font-size: 18px;
          transition: 0.25s ease;
        }

        .social-row button:hover {
          border-color: #93c5fd;
          transform: translateY(-2px);
          background: rgba(148, 163, 184, 0.06);
        }

        .social-row span {
          margin-right: 10px;
        }

        .register-text {
          text-align: center;
          margin: 42px 0 0;
          color: #d1d5db;
          font-size: 16px;
        }

        .register-text a {
          color: #bfdbfe;
          font-weight: 950;
          text-decoration: none;
        }

        .login-footer {
          position: absolute;
          bottom: 68px;
          width: min(530px, calc(100% - 48px));
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #64748b;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 1.4px;
          z-index: 2;
        }

        .login-footer div {
          display: flex;
          gap: 28px;
        }

        .login-footer a {
          color: #64748b;
          text-decoration: none;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(28px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeDown {
          from {
            opacity: 0;
            transform: translateY(-22px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeLeft {
          from {
            opacity: 0;
            transform: translateX(32px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes floatCard {
          0%, 100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-16px);
          }
        }

        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes bgPulse {
          from {
            opacity: 0.72;
            transform: scale(1);
          }

          to {
            opacity: 1;
            transform: scale(1.08);
          }
        }

        @keyframes gridMove {
          from {
            background-position: 0 0;
          }

          to {
            background-position: 34px 34px;
          }
        }

        @media (max-width: 1100px) {
          .login-page {
            grid-template-columns: 1fr;
          }

          .login-left {
            min-height: auto;
            padding: 46px 32px;
            gap: 46px;
          }

          .login-right {
            min-height: 780px;
            padding: 70px 0 130px;
          }

          .left-content h2 {
            font-size: 48px;
          }

          .login-footer {
            bottom: 38px;
          }
        }

        @media (max-width: 620px) {
          .brand-row h1 {
            font-size: 24px;
          }

          .left-content h2 {
            font-size: 40px;
          }

          .left-content p {
            font-size: 17px;
          }

          .ai-log-card {
            min-height: 230px;
            padding: 22px;
          }

          .login-card {
            padding: 30px 24px;
          }

          .login-card h2 {
            font-size: 32px;
          }

          .social-row {
            grid-template-columns: 1fr;
          }

          .login-footer {
            flex-direction: column;
            gap: 14px;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}

export default Login;