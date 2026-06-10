import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

function Debugger() {
  const navigate = useNavigate();

  const [language, setLanguage] = useState("JavaScript");
  const [code, setCode] = useState(`async function fetchUserData(userId) {
  const response = await fetch(\`api/users/\${userId}\`);
  const data = response.json(); // Potential Bug

  if (data.status === 'error') {
    throw new Error(data.message);
  }

  return data.user;
}`);
  const [errorMessage, setErrorMessage] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "John Doe",
    email: "john@codefix.ai",
  };

  const handleAnalyze = async () => {
    if (!code.trim()) {
      alert("Please paste your code first");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/debug/analyze", {
        language,
        code,
        errorMessage,
      });

      setResult(res.data.result);
    } catch (error) {
      alert(error.response?.data?.message || "Code analysis failed");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setCode("");
    setErrorMessage("");
    setResult(null);
  };

  const handleCopy = async () => {
    if (!result?.fixedCode) return;
    await navigator.clipboard.writeText(result.fixedCode);
    alert("Fixed code copied!");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const getInitials = (name) => {
    return name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <div className="debugger-page">
      <aside className="sidebar">
        <div>
          <div className="brand">
            <h1>CodeFix AI</h1>
            <p>Student Plan</p>
          </div>

          <nav className="side-nav">
            <Link to="/debugger" className="nav-item active">
              <span>⚙</span>
              Debugger
            </Link>

            <Link to="/history" className="nav-item">
              <span>↺</span>
              History
            </Link>

            <Link to="/dashboard" className="nav-item">
              <span>▦</span>
              Dashboard
            </Link>
          </nav>
        </div>

        <div className="sidebar-bottom">
          <div className="user-mini">
            <div className="avatar">{getInitials(user.name)}</div>
            <div>
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>
          </div>

          <button className="logout-btn" onClick={logout}>
            <span>⇱</span>
            Logout
          </button>
        </div>
      </aside>

      <main className="debugger-main">
        <header className="topbar">
          <div>
            <h1>AI Code Debugger</h1>
            <p>Intelligent bug detection and automated remediation</p>
          </div>

          <div className="engine-row">
            <div className="engine-badge">
              <span></span>
              AI Engine Active
            </div>
            <div className="profile-orb">{getInitials(user.name)}</div>
          </div>
        </header>

        <section className="debugger-grid">
          <div className="source-panel">
            <div className="panel-header">
              <h2>
                <span>‹›</span>
                Source Code
              </h2>

              <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option>JavaScript</option>
                <option>Python</option>
                <option>Java</option>
                <option>C++</option>
                <option>PHP</option>
                <option>React</option>
                <option>Node.js</option>
              </select>
            </div>

            <div className="editor-window">
              <div className="editor-top">
                <div className="dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <p>script.js</p>
              </div>

              <div className="editor-body">
                <div className="line-numbers">
                  {Array.from({ length: 18 }).map((_, index) => (
                    <span key={index}>{index + 1}</span>
                  ))}
                </div>

                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  spellCheck="false"
                  placeholder="Paste your source code here..."
                />
              </div>
            </div>

            <label className="error-label">Compiler/Console Error (Optional)</label>

            <textarea
              className="error-input"
              value={errorMessage}
              onChange={(e) => setErrorMessage(e.target.value)}
              placeholder="Paste stack trace or error message here..."
            />

            <div className="action-row">
              <button className="analyze-btn" onClick={handleAnalyze} disabled={loading}>
                <span>⚡</span>
                {loading ? "Analyzing..." : "Analyze Code"}
              </button>

              <button className="clear-btn" onClick={handleClear}>
                <span>▱</span>
                Clear
              </button>
            </div>
          </div>

          <div className="report-panel">
            <div className="report-title">
              <span>✦</span>
              <h2>AI Bug Report</h2>
            </div>

            {!result && !loading && (
              <div className="demo-report">
                <div className="bug-type-card">
                  <div className="warning-icon">△</div>

                  <div>
                    <p>BUG TYPE</p>
                    <h3>Missing Await / Unresolved Promise</h3>
                  </div>
                </div>

                <div className="analysis-card">
                  <p className="small-title">ANALYSIS</p>
                  <p>
                    The <code>response.json()</code> method is asynchronous and
                    returns a promise. You are accessing the data immediately
                    without waiting for the promise to resolve, which can result in{" "}
                    <code>undefined</code> errors.
                  </p>
                </div>

                <div className="fix-card">
                  <div className="fix-header">
                    <p>PROPOSED FIX</p>
                    <button onClick={() => navigator.clipboard.writeText("const data = await response.json();")}>
                      Copy
                    </button>
                  </div>

                  <pre>const data = await response.json();</pre>
                </div>

                <div className="tips-card">
                  <p className="small-title">PREVENTION TIPS</p>

                  <div className="tip">
                    <span>✓</span>
                    Always check return types of Web APIs.
                  </div>

                  <div className="tip">
                    <span>✓</span>
                    Enable linting rules for unawaited promises.
                  </div>
                </div>

                <div className="code-image"></div>
              </div>
            )}

            {loading && (
              <div className="loading-report">
                <div className="loader"></div>
                <h3>Analyzing your code...</h3>
                <p>CodeFix AI is checking syntax, logic, and possible fixes.</p>
              </div>
            )}

            {result && !loading && (
              <div className="real-report">
                <div className="bug-type-card">
                  <div className="warning-icon">△</div>

                  <div>
                    <p>BUG TYPE</p>
                    <h3>{result.bugType || "Code Issue Detected"}</h3>
                  </div>
                </div>

                <div className="analysis-card">
                  <p className="small-title">ANALYSIS</p>
                  <p>{result.explanation}</p>

                  {result.bugLocation && (
                    <div className="location-box">
                      <strong>Location:</strong> {result.bugLocation}
                    </div>
                  )}
                </div>

                <div className="fix-card">
                  <div className="fix-header">
                    <p>PROPOSED FIX</p>
                    <button onClick={handleCopy}>Copy</button>
                  </div>

                  <pre>{result.fixedCode}</pre>
                </div>

                <div className="tips-card">
                  <p className="small-title">PREVENTION TIPS</p>

                  <div className="tip">
                    <span>✓</span>
                    {result.preventionTip || "Review your code carefully before running."}
                  </div>

                  <div className="tip">
                    <span>✓</span>
                    Test your fix and save this solution in your debug history.
                  </div>
                </div>

                <div className="code-image"></div>
              </div>
            )}
          </div>
        </section>
      </main>

      <style>{`
        * {
          box-sizing: border-box;
        }

        .debugger-page {
          width: 100%;
          min-height: 100vh;
          display: grid;
          grid-template-columns: 280px 1fr;
          background:
            radial-gradient(circle at 85% 15%, rgba(96, 165, 250, 0.08), transparent 30%),
            radial-gradient(circle at 30% 85%, rgba(139, 92, 246, 0.07), transparent 28%),
            #0b101a;
          color: #f8fafc;
          font-family: Inter, Arial, sans-serif;
          overflow-x: hidden;
        }

        .sidebar {
          min-height: 100vh;
          background: linear-gradient(180deg, #111827, #0f1420);
          border-right: 1px solid rgba(148, 163, 184, 0.12);
          padding: 22px 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: sticky;
          top: 0;
        }

        .brand {
          padding: 0 26px 42px;
        }

        .brand h1 {
          margin: 0;
          font-size: 23px;
          color: #bfdbfe;
          letter-spacing: -0.6px;
        }

        .brand p {
          margin: 10px 0 0;
          color: #cbd5e1;
          font-size: 17px;
          letter-spacing: 1.8px;
          font-family: Consolas, monospace;
        }

        .side-nav {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .nav-item {
          height: 52px;
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 0 26px;
          color: #d1d5db;
          text-decoration: none;
          font-weight: 500;
          font-size: 19px;
          border-left: 4px solid transparent;
          letter-spacing: 0.6px;
          transition: 0.25s ease;
        }

        .nav-item span {
          font-size: 22px;
        }

        .nav-item:hover {
          background: rgba(148, 163, 184, 0.08);
          color: #ffffff;
        }

        .nav-item.active {
          background: rgba(148, 163, 184, 0.12);
          border-left-color: #9db8ff;
          color: #bfdbfe;
        }

        .sidebar-bottom {
          padding: 0 26px;
        }

        .user-mini {
          display: none;
          align-items: center;
          gap: 12px;
          padding: 13px;
          border-radius: 12px;
          background: rgba(31, 41, 55, 0.75);
          margin-bottom: 22px;
        }

        .avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #334155;
          color: #bfdbfe;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
        }

        .user-mini h3 {
          margin: 0;
          font-size: 14px;
        }

        .user-mini p {
          margin: 3px 0 0;
          color: #94a3b8;
          font-size: 11px;
        }

        .logout-btn {
          width: 100%;
          height: 46px;
          display: flex;
          align-items: center;
          gap: 14px;
          background: transparent;
          border: none;
          color: #e5e7eb;
          font-size: 18px;
          cursor: pointer;
          letter-spacing: 1px;
          transition: 0.25s ease;
        }

        .logout-btn:hover {
          color: #93c5fd;
          transform: translateX(4px);
        }

        .debugger-main {
          min-height: 100vh;
          padding: 0 26px 24px;
          animation: fadeIn 0.7s ease forwards;
        }

        .topbar {
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(148, 163, 184, 0.1);
          position: sticky;
          top: 0;
          z-index: 20;
          background: rgba(11, 16, 26, 0.86);
          backdrop-filter: blur(18px);
        }

        .topbar h1 {
          margin: 0;
          font-size: 20px;
          letter-spacing: -0.4px;
        }

        .topbar p {
          margin: 5px 0 0;
          color: #d1d5db;
          font-size: 18px;
        }

        .engine-row {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .engine-badge {
          height: 34px;
          padding: 0 14px;
          border-radius: 7px;
          border: 1px solid rgba(148, 163, 184, 0.28);
          background: rgba(17, 24, 39, 0.9);
          display: flex;
          align-items: center;
          gap: 10px;
          color: #e5e7eb;
          font-family: Consolas, monospace;
          font-size: 13px;
        }

        .engine-badge span {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #67e8f9;
          box-shadow: 0 0 18px #67e8f9;
          animation: pulseDot 1.6s infinite alternate;
        }

        .profile-orb {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid rgba(147, 197, 253, 0.6);
          background:
            radial-gradient(circle at 50% 30%, rgba(103, 232, 249, 0.35), transparent 38%),
            #111827;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #bfdbfe;
          font-size: 12px;
          font-weight: 900;
        }

        .debugger-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          padding: 14px 0;
        }

        .source-panel,
        .report-panel {
          min-height: calc(100vh - 88px);
          background: rgba(17, 24, 39, 0.72);
          border: 1px solid rgba(148, 163, 184, 0.16);
          border-radius: 12px;
          padding: 18px;
          box-shadow: 0 25px 70px rgba(0, 0, 0, 0.22);
          animation: cardUp 0.65s ease forwards;
        }

        .panel-header,
        .report-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
        }

        .panel-header h2,
        .report-title h2 {
          margin: 0;
          font-size: 21px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .panel-header h2 span,
        .report-title span {
          color: #93c5fd;
          font-weight: 900;
        }

        .report-title {
          justify-content: flex-start;
          gap: 12px;
        }

        .report-title span {
          color: #67e8f9;
          font-size: 24px;
          animation: sparkle 1.8s ease-in-out infinite alternate;
        }

        .panel-header select {
          height: 42px;
          min-width: 200px;
          border-radius: 8px;
          border: 1px solid rgba(148, 163, 184, 0.34);
          background: #1f2430;
          color: #f8fafc;
          font-family: Consolas, monospace;
          font-size: 19px;
          padding: 0 14px;
          outline: none;
        }

        .editor-window {
          border: 1px solid rgba(148, 163, 184, 0.34);
          border-radius: 9px;
          overflow: hidden;
          background: #000000;
          min-height: 700px;
        }

        .editor-top {
          height: 38px;
          display: flex;
          align-items: center;
          gap: 60px;
          background: #1d1d1c;
          padding: 0 18px;
        }

        .dots {
          display: flex;
          gap: 9px;
        }

        .dots span {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          display: block;
        }

        .dots span:nth-child(1) {
          background: #9f6a6a;
        }

        .dots span:nth-child(2) {
          background: #159a9b;
        }

        .dots span:nth-child(3) {
          background: #38a6b7;
        }

        .editor-top p {
          margin: 0;
          color: #6b7280;
          font-family: Consolas, monospace;
          font-size: 13px;
        }

        .editor-body {
          display: grid;
          grid-template-columns: 52px 1fr;
          min-height: 662px;
          background: #000000;
        }

        .line-numbers {
          padding-top: 18px;
          border-right: 1px solid rgba(148, 163, 184, 0.08);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: #334155;
          font-family: Consolas, monospace;
          font-size: 19px;
        }

        .editor-body textarea {
          width: 100%;
          min-height: 662px;
          resize: none;
          border: none;
          outline: none;
          background: #000000;
          color: #e9d5ff;
          padding: 18px 20px;
          font-size: 20px;
          line-height: 1.55;
          font-family: Consolas, monospace;
        }

        .editor-body textarea::placeholder,
        .error-input::placeholder {
          color: #7d8495;
        }

        .error-label {
          display: block;
          margin: 18px 0 10px;
          font-family: Consolas, monospace;
          font-size: 20px;
          color: #d1d5db;
        }

        .error-input {
          width: 100%;
          height: 104px;
          resize: none;
          border-radius: 8px;
          border: 1px solid rgba(148, 163, 184, 0.36);
          background: #070d19;
          color: #f8fafc;
          outline: none;
          padding: 18px;
          font-size: 18px;
          line-height: 1.5;
          font-family: Consolas, monospace;
          transition: 0.25s ease;
        }

        .error-input:focus,
        .editor-window:focus-within {
          border-color: rgba(96, 165, 250, 0.65);
          box-shadow: 0 0 0 4px rgba(96, 165, 250, 0.08);
        }

        .action-row {
          display: grid;
          grid-template-columns: 1fr 140px;
          gap: 12px;
          margin-top: 24px;
        }

        .analyze-btn,
        .clear-btn {
          height: 54px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          color: #0f172a;
          font-size: 19px;
          font-family: Consolas, monospace;
          transition: 0.25s ease;
        }

        .analyze-btn {
          background: linear-gradient(135deg, #60a5fa, #8b5cf6);
          box-shadow: 0 18px 44px rgba(96, 165, 250, 0.24);
        }

        .analyze-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 24px 60px rgba(139, 92, 246, 0.34);
        }

        .analyze-btn:disabled {
          opacity: 0.65;
          cursor: not-allowed;
          transform: none;
        }

        .clear-btn {
          background: #323846;
          color: #ffffff;
        }

        .clear-btn:hover {
          background: #40485a;
          transform: translateY(-2px);
        }

        .analyze-btn span,
        .clear-btn span {
          margin-right: 10px;
        }

        .demo-report,
        .real-report {
          display: flex;
          flex-direction: column;
          gap: 18px;
          animation: fadeUp 0.7s ease forwards;
        }

        .bug-type-card {
          display: flex;
          align-items: center;
          gap: 18px;
          background: rgba(31, 41, 55, 0.55);
          border-radius: 12px;
          padding: 18px;
        }

        .warning-icon {
          width: 48px;
          height: 48px;
          border-radius: 8px;
          background: rgba(239, 68, 68, 0.24);
          border: 1px solid rgba(248, 113, 113, 0.35);
          color: #fecaca;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
        }

        .bug-type-card p,
        .small-title,
        .fix-header p {
          margin: 0 0 8px;
          color: #aeb8ca;
          font-family: Consolas, monospace;
          font-size: 12px;
          letter-spacing: 1px;
        }

        .bug-type-card h3 {
          margin: 0;
          color: #fca5a5;
          font-size: 20px;
        }

        .analysis-card,
        .tips-card {
          border: 1px solid rgba(148, 163, 184, 0.12);
          border-radius: 12px;
          padding: 20px;
          background: rgba(31, 41, 55, 0.48);
        }

        .analysis-card p:last-child,
        .analysis-card p {
          color: #f8fafc;
          font-size: 18px;
          line-height: 1.65;
          margin-bottom: 0;
        }

        .analysis-card code {
          color: #bfdbfe;
          background: rgba(96, 165, 250, 0.12);
          padding: 2px 5px;
          border-radius: 4px;
        }

        .location-box {
          margin-top: 18px;
          padding: 13px;
          background: rgba(15, 23, 42, 0.72);
          border: 1px solid rgba(148, 163, 184, 0.16);
          border-radius: 8px;
          color: #dbeafe;
        }

        .fix-card {
          border: 1px solid rgba(148, 163, 184, 0.32);
          border-radius: 12px;
          overflow: hidden;
          background: #111827;
        }

        .fix-header {
          height: 42px;
          background: #41495c;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 18px;
        }

        .fix-header p {
          margin: 0;
          color: #bfdbfe;
        }

        .fix-header button {
          background: transparent;
          border: none;
          color: #dbeafe;
          cursor: pointer;
          font-size: 13px;
        }

        .fix-card pre {
          margin: 0;
          padding: 20px;
          color: #dbeafe;
          background: #1d2029;
          font-size: 15px;
          line-height: 1.6;
          white-space: pre-wrap;
          font-family: Consolas, monospace;
          max-height: 260px;
          overflow: auto;
        }

        .tip {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #f8fafc;
          font-size: 18px;
          margin-top: 16px;
        }

        .tip span {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid #67e8f9;
          color: #67e8f9;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
        }

        .code-image {
          height: 138px;
          border-radius: 10px;
          background:
            linear-gradient(90deg, rgba(11, 16, 26, 0.2), rgba(11, 16, 26, 0.84)),
            repeating-linear-gradient(
              0deg,
              rgba(148, 163, 184, 0.22) 0px,
              rgba(148, 163, 184, 0.22) 7px,
              transparent 7px,
              transparent 18px
            ),
            #1f2937;
          filter: blur(0.2px);
          opacity: 0.72;
          overflow: hidden;
          position: relative;
        }

        .code-image::after {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 60% 20%, rgba(96, 165, 250, 0.12), transparent 40%);
          animation: imageGlow 3s ease-in-out infinite alternate;
        }

        .loading-report {
          min-height: 620px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: #94a3b8;
        }

        .loader {
          width: 52px;
          height: 52px;
          border: 4px solid rgba(148, 163, 184, 0.2);
          border-top-color: #67e8f9;
          border-radius: 50%;
          animation: spin 0.85s linear infinite;
          margin-bottom: 18px;
        }

        .loading-report h3 {
          color: #ffffff;
          margin: 0 0 8px;
        }

        .loading-report p {
          margin: 0;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(22px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes cardUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulseDot {
          from {
            opacity: 0.5;
            transform: scale(0.9);
          }

          to {
            opacity: 1;
            transform: scale(1.15);
          }
        }

        @keyframes sparkle {
          from {
            transform: rotate(0deg) scale(1);
            opacity: 0.7;
          }

          to {
            transform: rotate(12deg) scale(1.12);
            opacity: 1;
          }
        }

        @keyframes imageGlow {
          from {
            opacity: 0.35;
          }

          to {
            opacity: 0.9;
          }
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 1200px) {
          .debugger-page {
            grid-template-columns: 230px 1fr;
          }

          .debugger-grid {
            grid-template-columns: 1fr;
          }

          .editor-window {
            min-height: 560px;
          }

          .editor-body,
          .editor-body textarea {
            min-height: 522px;
          }
        }

        @media (max-width: 850px) {
          .debugger-page {
            grid-template-columns: 1fr;
          }

          .sidebar {
            position: relative;
            min-height: auto;
          }

          .side-nav {
            flex-direction: row;
            overflow-x: auto;
            padding: 0 18px;
          }

          .nav-item {
            min-width: 150px;
          }

          .sidebar-bottom {
            display: none;
          }

          .topbar {
            height: auto;
            padding: 16px 0;
            gap: 14px;
            flex-direction: column;
            align-items: flex-start;
          }

          .debugger-main {
            padding: 0 16px 24px;
          }

          .action-row {
            grid-template-columns: 1fr;
          }

          .panel-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 14px;
          }

          .panel-header select {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

export default Debugger;