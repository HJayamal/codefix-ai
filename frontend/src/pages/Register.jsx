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
    terms: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!formData.terms) {
      alert("Please agree to the Terms of Service and Privacy Policy");
      return;
    }

    try {
      setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="animated-bg"></div>

      <section className="register-left">
        <div className="brand-top">
          <div className="brand-icon">⚙</div>
          <h1>
            CodeFix <span>AI</span>
          </h1>
        </div>

        <div className="hero-content">
          <h2>
            Engineering the future of <span>autonomy.</span>
          </h2>

          <p>
            Elevate your development workflow with high-precision AI diagnostics
            and seamless code transformations.
          </p>
        </div>

        <div className="image-card">
          <div className="image-glow"></div>
          <div className="monitor-visual">
            <div className="screen-lines">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>

        <div className="stats-row">
          <div className="system-card">
            <span className="online-dot"></span>
            AI System Online
          </div>

          <div className="stat">
            <h3>99%</h3>
            <p>Accuracy</p>
          </div>

          <div className="stat">
            <h3>2.4k</h3>
            <p>Fixes/Day</p>
          </div>

          <div className="stat">
            <h3>50ms</h3>
            <p>Latency</p>
          </div>
        </div>
      </section>

      <section className="register-right">
        <div className="form-wrapper">
          <h2>Create an account</h2>
          <p className="form-subtitle">
            Create your free account and start fixing bugs with AI.
          </p>

          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="name@company.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="split-row">
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <label className="terms-row">
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
              />
              <span>
                I agree to the <a href="#">Terms of Service</a> and{" "}
                <a href="#">Privacy Policy</a>.
              </span>
            </label>

            <button className="register-btn" type="submit" disabled={loading}>
              {loading ? "Creating Account..." : "Register"}
              {!loading && <span>→</span>}
            </button>
          </form>

          <div className="divider">
            <span></span>
            <p>or join with</p>
            <span></span>
          </div>

          <div className="social-row">
            <button onClick={() => alert("GitHub auth not connected yet")}>
              <span>●</span> GitHub
            </button>

            <button onClick={() => alert("Google auth not connected yet")}>
              <span>G</span> Google
            </button>
          </div>

          <p className="login-text">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>

        <div className="right-footer">
          <p>© 2026 CodeFix AI. Built for the next generation of engineers.</p>

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

        .register-page {
          width: 100%;
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1.45fr 1fr;
          background: #070b14;
          color: #f8fafc;
          font-family: Inter, Arial, sans-serif;
          overflow: hidden;
          position: relative;
        }

        .animated-bg {
          position: fixed;
          inset: 0;
          background:
            radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.12), transparent 26%),
            radial-gradient(circle at 72% 14%, rgba(139, 92, 246, 0.14), transparent 28%),
            radial-gradient(circle at 48% 92%, rgba(236, 72, 153, 0.08), transparent 26%);
          animation: bgMove 8s ease-in-out infinite alternate;
          pointer-events: none;
          z-index: 0;
        }

        .register-left,
        .register-right {
          position: relative;
          z-index: 1;
        }

        .register-left {
          min-height: 100vh;
          padding: 44px 70px 38px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-right: 1px solid rgba(148, 163, 184, 0.08);
          background:
            linear-gradient(135deg, rgba(7, 11, 20, 0.96), rgba(10, 15, 26, 0.9));
        }

        .brand-top {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 18px;
          animation: fadeDown 0.8s ease forwards;
        }

        .brand-icon {
          width: 46px;
          height: 46px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #dbeafe, #8b5cf6);
          color: #0f172a;
          font-size: 26px;
          box-shadow: 0 15px 40px rgba(139, 92, 246, 0.35);
        }

        .brand-top h1 {
          font-size: 34px;
          margin: 0;
          font-weight: 900;
          color: #bfdbfe;
          letter-spacing: -0.6px;
        }

        .brand-top span {
          color: #f8fafc;
        }

        .hero-content {
          text-align: center;
          max-width: 850px;
          margin: 40px auto 30px;
          animation: fadeUp 0.9s ease forwards;
        }

        .hero-content h2 {
          font-size: clamp(42px, 5vw, 70px);
          line-height: 1.05;
          margin: 0 0 28px;
          font-weight: 950;
          letter-spacing: -2px;
        }

        .hero-content h2 span {
          display: block;
          color: #a9c5ff;
          font-style: italic;
        }

        .hero-content p {
          max-width: 720px;
          margin: 0 auto;
          color: #d1d5db;
          font-size: 20px;
          line-height: 1.7;
        }

        .image-card {
          width: min(760px, 100%);
          height: 430px;
          margin: 0 auto;
          border: 1px solid rgba(148, 163, 184, 0.16);
          border-radius: 16px;
          padding: 18px;
          background: rgba(15, 23, 42, 0.55);
          box-shadow: 0 35px 100px rgba(0, 0, 0, 0.45);
          position: relative;
          overflow: hidden;
          animation: floatVisual 5s ease-in-out infinite;
        }

        .image-glow {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 25% 50%, rgba(6, 182, 212, 0.28), transparent 35%),
            radial-gradient(circle at 75% 40%, rgba(236, 72, 153, 0.22), transparent 35%);
          filter: blur(20px);
          opacity: 0.8;
        }

        .monitor-visual {
          position: relative;
          height: 100%;
          border-radius: 12px;
          background:
            linear-gradient(135deg, rgba(2, 6, 23, 0.75), rgba(15, 23, 42, 0.35)),
            radial-gradient(circle at 38% 46%, rgba(34, 211, 238, 0.24), transparent 30%),
            radial-gradient(circle at 72% 38%, rgba(236, 72, 153, 0.28), transparent 28%),
            #020617;
          overflow: hidden;
        }

        .monitor-visual::before {
          content: "";
          position: absolute;
          width: 76%;
          height: 42%;
          left: 13%;
          top: 28%;
          background: linear-gradient(110deg, rgba(34, 211, 238, 0.18), rgba(236, 72, 153, 0.18));
          transform: skewY(-12deg) rotate(-7deg);
          border: 1px solid rgba(148, 163, 184, 0.18);
          box-shadow: 0 0 50px rgba(34, 211, 238, 0.16);
        }

        .screen-lines {
          position: absolute;
          left: 24%;
          top: 31%;
          width: 52%;
          transform: rotate(-7deg);
        }

        .screen-lines span {
          display: block;
          height: 8px;
          margin-bottom: 12px;
          border-radius: 999px;
          background: linear-gradient(90deg, rgba(56, 189, 248, 0.45), rgba(236, 72, 153, 0.48));
          animation: linePulse 1.8s ease-in-out infinite alternate;
        }

        .screen-lines span:nth-child(2) {
          width: 82%;
          animation-delay: 0.1s;
        }

        .screen-lines span:nth-child(3) {
          width: 96%;
          animation-delay: 0.2s;
        }

        .screen-lines span:nth-child(4) {
          width: 76%;
          animation-delay: 0.3s;
        }

        .screen-lines span:nth-child(5) {
          width: 88%;
          animation-delay: 0.4s;
        }

        .screen-lines span:nth-child(6) {
          width: 68%;
          animation-delay: 0.5s;
        }

        .stats-row {
          display: flex;
          align-items: center;
          gap: 42px;
          animation: fadeUp 1.1s ease forwards;
        }

        .system-card {
          min-width: 190px;
          height: 58px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 22px;
          background: rgba(17, 24, 39, 0.85);
          border: 1px solid rgba(148, 163, 184, 0.16);
          font-weight: 800;
          color: #e5e7eb;
        }

        .online-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #67e8f9;
          box-shadow: 0 0 18px #67e8f9;
        }

        .stat h3 {
          margin: 0;
          font-size: 32px;
          color: #bfdbfe;
          line-height: 1;
        }

        .stat:nth-child(3) h3 {
          color: #22d3ee;
        }

        .stat:nth-child(4) h3 {
          color: #c4b5fd;
        }

        .stat p {
          margin: 8px 0 0;
          color: #e5e7eb;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .register-right {
          min-height: 100vh;
          padding: 88px 82px 34px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: rgba(10, 15, 26, 0.92);
        }

        .form-wrapper {
          width: 100%;
          max-width: 470px;
          margin: auto;
          animation: fadeLeft 0.9s ease forwards;
        }

        .form-wrapper h2 {
          font-size: 34px;
          margin: 0 0 12px;
          letter-spacing: -0.8px;
        }

        .form-subtitle {
          color: #d1d5db;
          font-size: 17px;
          line-height: 1.5;
          margin: 0 0 42px;
        }

        .form-group {
          margin-bottom: 26px;
        }

        .form-group label {
          display: block;
          color: #d1d5db;
          font-size: 14px;
          font-weight: 900;
          letter-spacing: 1.4px;
          margin-bottom: 10px;
        }

        .form-group input {
          width: 100%;
          height: 62px;
          border-radius: 12px;
          border: 1px solid rgba(148, 163, 184, 0.25);
          background: #ffffff;
          color: #0f172a;
          font-size: 18px;
          padding: 0 20px;
          outline: none;
          transition: 0.25s ease;
        }

        .form-group input::placeholder {
          color: #aeb6c5;
        }

        .form-group input:focus {
          border-color: #93c5fd;
          box-shadow: 0 0 0 4px rgba(96, 165, 250, 0.15);
          transform: translateY(-1px);
        }

        .split-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .terms-row {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          color: #d1d5db;
          font-size: 16px;
          line-height: 1.5;
          margin: 4px 0 34px;
          cursor: pointer;
        }

        .terms-row input {
          width: 20px;
          height: 20px;
          margin-top: 2px;
          accent-color: #60a5fa;
        }

        .terms-row a {
          color: #bfdbfe;
          text-decoration: none;
        }

        .register-btn {
          width: 100%;
          height: 72px;
          border: none;
          border-radius: 12px;
          background: linear-gradient(135deg, #60a5fa, #8b5cf6);
          color: #ffffff;
          font-size: 26px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 22px 55px rgba(96, 165, 250, 0.28);
          transition: 0.25s ease;
        }

        .register-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 28px 70px rgba(139, 92, 246, 0.36);
        }

        .register-btn:disabled {
          opacity: 0.65;
          cursor: not-allowed;
          transform: none;
        }

        .register-btn span {
          margin-left: 10px;
        }

        .divider {
          display: flex;
          align-items: center;
          gap: 18px;
          margin: 54px 0 34px;
        }

        .divider span {
          height: 1px;
          flex: 1;
          background: rgba(148, 163, 184, 0.28);
        }

        .divider p {
          margin: 0;
          color: #d1d5db;
          font-weight: 700;
        }

        .social-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }

        .social-row button {
          height: 58px;
          border-radius: 12px;
          border: 1px solid rgba(148, 163, 184, 0.25);
          background: transparent;
          color: #f8fafc;
          font-size: 20px;
          cursor: pointer;
          transition: 0.25s ease;
        }

        .social-row button:hover {
          border-color: #93c5fd;
          transform: translateY(-2px);
          background: rgba(148, 163, 184, 0.06);
        }

        .social-row span {
          margin-right: 10px;
          font-weight: 900;
        }

        .login-text {
          text-align: center;
          color: #d1d5db;
          margin-top: 58px;
          font-size: 16px;
        }

        .login-text a {
          color: #bfdbfe;
          font-weight: 900;
          text-decoration: none;
        }

        .right-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #8b95a7;
          font-size: 14px;
          font-weight: 700;
          margin-top: 30px;
        }

        .right-footer p {
          margin: 0;
          max-width: 380px;
        }

        .right-footer div {
          display: flex;
          gap: 28px;
        }

        .right-footer a {
          color: #9ca3af;
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
            transform: translateY(-20px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeLeft {
          from {
            opacity: 0;
            transform: translateX(30px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes floatVisual {
          0%, 100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-14px);
          }
        }

        @keyframes linePulse {
          from {
            opacity: 0.35;
            transform: translateX(0);
          }

          to {
            opacity: 1;
            transform: translateX(12px);
          }
        }

        @keyframes bgMove {
          from {
            opacity: 0.65;
            transform: scale(1);
          }

          to {
            opacity: 1;
            transform: scale(1.08);
          }
        }

        @media (max-width: 1200px) {
          .register-page {
            grid-template-columns: 1fr;
          }

          .register-left {
            min-height: auto;
            padding: 42px 32px;
          }

          .register-right {
            min-height: auto;
            padding: 60px 32px 34px;
          }

          .stats-row {
            justify-content: center;
            flex-wrap: wrap;
            margin-top: 36px;
          }

          .right-footer {
            max-width: 470px;
            margin: 50px auto 0;
          }
        }

        @media (max-width: 700px) {
          .hero-content h2 {
            font-size: 42px;
          }

          .image-card {
            height: 300px;
          }

          .split-row {
            grid-template-columns: 1fr;
            gap: 0;
          }

          .social-row {
            grid-template-columns: 1fr;
          }

          .right-footer {
            flex-direction: column;
            gap: 18px;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}

export default Register;