import { Link, useNavigate } from "react-router-dom";

function ReportDetail() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const copyFixedCode = async () => {
    await navigator.clipboard.writeText(fixedCode);
    alert("Fixed code copied!");
  };

  return (
    <div className="report-page">
      <aside className="sidebar">
        <div>
          <div className="brand-row">
            <div className="brand-icon">⚙</div>
            <div>
              <h1>CodeFix AI</h1>
              <p>STUDENT PLAN</p>
            </div>
          </div>

          <nav className="side-nav">
            <Link to="/debugger" className="nav-item">
              <span>⚙</span>
              DEBUGGER
            </Link>

            <Link to="/history" className="nav-item active">
              <span>↺</span>
              HISTORY
            </Link>

            <Link to="/dashboard" className="nav-item">
              <span>▦</span>
              DASHBOARD
            </Link>
          </nav>
        </div>

        <button className="logout-btn" onClick={logout}>
          <span>⇱</span>
          LOGOUT
        </button>
      </aside>

      <main className="report-main">
        <header className="report-topbar">
          <div className="topbar-left">
            <Link to="/history" className="back-link">
              ← Back to History
            </Link>
            <span className="divider"></span>
            <h1>
              Report Detail: <span>#FIX-8842</span>
            </h1>
          </div>

          <div className="topbar-actions">
            <span className="critical-badge">● CRITICAL BUG</span>
            <button onClick={copyFixedCode} className="copy-btn">
              ▣ Copy Fixed Code
            </button>
          </div>
        </header>

        <section className="summary-grid">
          <div className="summary-card">
            <div className="summary-icon">‹›</div>
            <div>
              <p>LANGUAGE</p>
              <h2>TypeScript</h2>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon danger">▣</div>
            <div>
              <p>BUG TYPE</p>
              <h2>Memory Leak</h2>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon cyan">⌖</div>
            <div>
              <p>BUG LOCATION</p>
              <h2>src/hooks/useData.ts:42</h2>
            </div>
          </div>
        </section>

        <section className="explanation-card">
          <div className="question-mark">?</div>

          <h2>AI Explanation</h2>

          <p>
            The detected issue originates from an uncleaned effect in your custom
            hook. Specifically, the <code>setInterval</code> initiated within
            the <code>useEffect</code> block is not being cleared upon component
            unmount. This leads to cumulative memory consumption and unexpected
            background executions as the user navigates through different views
            of the application.
          </p>

          <div className="quote-box">
            <span>♙</span>
            <em>
              “Cleaning up intervals is critical in React&apos;s lifecycle to
              prevent side-effects from persisting across re-renders or
              unmounts.”
            </em>
          </div>
        </section>

        <section className="code-grid">
          <div className="code-section">
            <div className="code-title">
              <h3>↺ ORIGINAL SOURCE</h3>
              <span className="vulnerable">VULNERABLE</span>
            </div>

            <pre className="code-box original">{originalCode}</pre>
          </div>

          <div className="code-section">
            <div className="code-title">
              <h3>✦ AI FIXED OUTPUT</h3>
              <span className="optimized">OPTIMIZED</span>
            </div>

            <pre className="code-box fixed">{fixedCode}</pre>
          </div>
        </section>

        <section className="tip-card">
          <div className="tip-header">
            <div className="shield-icon">🛡</div>
            <h2>Prevention Tip</h2>
          </div>

          <p>
            Always pair <code>setInterval</code>, <code>setTimeout</code>, or any
            external subscriptions like WebSockets with a return cleanup function
            in your <code>useEffect</code>. Consider using a linter rule like{" "}
            <code>exhaustive-deps</code> to ensure all dependencies and
            side-effects are correctly tracked and disposed.
          </p>
        </section>

        <footer className="bottom-line"></footer>
      </main>

      <style>{`
        * {
          box-sizing: border-box;
        }

        .report-page {
          width: 100%;
          min-height: 100vh;
          display: grid;
          grid-template-columns: 280px 1fr;
          background:
            radial-gradient(circle at 85% 12%, rgba(96, 165, 250, 0.08), transparent 30%),
            radial-gradient(circle at 55% 88%, rgba(139, 92, 246, 0.07), transparent 28%),
            #0b101a;
          color: #f8fafc;
          font-family: Inter, Arial, sans-serif;
          overflow-x: hidden;
        }

        .sidebar {
          min-height: 100vh;
          background: linear-gradient(180deg, #111827, #0f1420);
          border-right: 1px solid rgba(148, 163, 184, 0.12);
          padding: 26px 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: sticky;
          top: 0;
        }

        .brand-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 0 26px 58px;
        }

        .brand-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: linear-gradient(135deg, #dbeafe, #8b5cf6);
          color: #0f172a;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          box-shadow: 0 14px 34px rgba(139, 92, 246, 0.32);
        }

        .brand-row h1 {
          margin: 0;
          color: #bfdbfe;
          font-size: 28px;
          letter-spacing: -0.7px;
        }

        .brand-row p {
          margin: 6px 0 0;
          color: #d1d5db;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 4px;
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
          font-weight: 900;
          letter-spacing: 1px;
          border-left: 4px solid transparent;
          transition: 0.25s ease;
        }

        .nav-item span {
          font-size: 22px;
        }

        .nav-item:hover {
          background: rgba(148, 163, 184, 0.08);
          color: #ffffff;
          transform: translateX(4px);
        }

        .nav-item.active {
          background: rgba(148, 163, 184, 0.12);
          border-left-color: #9db8ff;
          color: #bfdbfe;
          transform: none;
        }

        .logout-btn {
          width: calc(100% - 52px);
          margin: 0 26px;
          height: 48px;
          background: transparent;
          border: none;
          color: #d1d5db;
          display: flex;
          align-items: center;
          gap: 14px;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 1.4px;
          cursor: pointer;
          transition: 0.25s ease;
        }

        .logout-btn span {
          font-size: 24px;
        }

        .logout-btn:hover {
          color: #93c5fd;
          transform: translateX(4px);
        }

        .report-main {
          min-height: 100vh;
          padding: 0 26px 32px;
          animation: fadeIn 0.7s ease forwards;
        }

        .report-topbar {
          height: 60px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(148, 163, 184, 0.12);
          position: sticky;
          top: 0;
          z-index: 20;
          background: rgba(11, 16, 26, 0.86);
          backdrop-filter: blur(18px);
        }

        .topbar-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .back-link {
          color: #d1d5db;
          text-decoration: none;
          font-size: 18px;
          transition: 0.25s ease;
        }

        .back-link:hover {
          color: #93c5fd;
          transform: translateX(-3px);
        }

        .divider {
          width: 1px;
          height: 22px;
          background: rgba(148, 163, 184, 0.32);
        }

        .topbar-left h1 {
          margin: 0;
          font-size: 24px;
          letter-spacing: -0.4px;
        }

        .topbar-left h1 span {
          color: #bfdbfe;
        }

        .topbar-actions {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .critical-badge {
          height: 34px;
          padding: 0 17px;
          border-radius: 999px;
          border: 1px solid rgba(248, 113, 113, 0.34);
          background: rgba(127, 29, 29, 0.28);
          color: #fecaca;
          display: flex;
          align-items: center;
          font-family: Consolas, monospace;
          font-size: 12px;
          letter-spacing: 1px;
        }

        .copy-btn {
          height: 42px;
          border: none;
          border-radius: 9px;
          color: #ffffff;
          background: linear-gradient(135deg, #3b82f6, #a855f7);
          padding: 0 22px;
          font-size: 16px;
          cursor: pointer;
          box-shadow: 0 18px 42px rgba(96, 165, 250, 0.24);
          transition: 0.25s ease;
        }

        .copy-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 26px 60px rgba(168, 85, 247, 0.34);
        }

        .summary-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          padding: 26px 0 14px;
        }

        .summary-card {
          min-height: 88px;
          background: rgba(17, 24, 39, 0.78);
          border: 1px solid rgba(148, 163, 184, 0.16);
          border-radius: 12px;
          padding: 18px;
          display: flex;
          align-items: center;
          gap: 18px;
          animation: cardUp 0.65s ease forwards;
          transition: 0.28s ease;
        }

        .summary-card:hover,
        .explanation-card:hover,
        .tip-card:hover {
          border-color: rgba(147, 197, 253, 0.38);
          transform: translateY(-4px);
        }

        .summary-icon {
          width: 52px;
          height: 52px;
          border-radius: 8px;
          background: #374151;
          color: #bfdbfe;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 29px;
          font-weight: 900;
        }

        .summary-icon.danger {
          color: #fca5a5;
        }

        .summary-icon.cyan {
          color: #67e8f9;
        }

        .summary-card p {
          margin: 0 0 7px;
          color: #9ca3af;
          font-size: 12px;
          letter-spacing: 3px;
          font-family: Consolas, monospace;
        }

        .summary-card h2 {
          margin: 0;
          font-size: 24px;
          letter-spacing: -0.5px;
        }

        .explanation-card {
          position: relative;
          background: rgba(17, 24, 39, 0.78);
          border: 1px solid rgba(148, 163, 184, 0.16);
          border-radius: 12px;
          padding: 36px;
          margin-bottom: 14px;
          overflow: hidden;
          transition: 0.28s ease;
          animation: fadeUp 0.75s ease forwards;
        }

        .question-mark {
          position: absolute;
          right: 36px;
          top: 20px;
          font-size: 140px;
          line-height: 1;
          font-weight: 950;
          color: rgba(148, 163, 184, 0.08);
          animation: floatQuestion 4s ease-in-out infinite;
        }

        .explanation-card h2 {
          color: #bfdbfe;
          font-size: 30px;
          margin: 0 0 24px;
        }

        .explanation-card p {
          max-width: 1040px;
          color: #d1d5db;
          font-size: 19px;
          line-height: 1.75;
          margin: 0;
        }

        code {
          color: #67e8f9;
          background: rgba(34, 211, 238, 0.12);
          padding: 2px 7px;
          border-radius: 5px;
          font-family: Consolas, monospace;
        }

        .quote-box {
          margin-top: 28px;
          border: 1px solid rgba(147, 197, 253, 0.25);
          background: rgba(30, 41, 59, 0.62);
          border-radius: 8px;
          padding: 18px 22px;
          display: flex;
          align-items: center;
          gap: 18px;
          color: #f8fafc;
          font-size: 16px;
        }

        .quote-box span {
          color: #bfdbfe;
          font-size: 24px;
        }

        .code-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 14px;
        }

        .code-title {
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .code-title h3 {
          margin: 0;
          color: #9ca3af;
          font-family: Consolas, monospace;
          font-size: 13px;
          letter-spacing: 1.2px;
        }

        .vulnerable,
        .optimized {
          padding: 5px 10px;
          border-radius: 5px;
          font-size: 11px;
          font-family: Consolas, monospace;
          font-weight: 900;
          letter-spacing: 1px;
        }

        .vulnerable {
          color: #fecaca;
          border: 1px solid rgba(248, 113, 113, 0.45);
          background: rgba(127, 29, 29, 0.18);
        }

        .optimized {
          color: #67e8f9;
          border: 1px solid rgba(34, 211, 238, 0.5);
          background: rgba(8, 145, 178, 0.16);
        }

        .code-box {
          min-height: 320px;
          margin: 0;
          border-radius: 9px;
          border: 1px solid rgba(148, 163, 184, 0.12);
          background: #020617;
          color: #dbeafe;
          padding: 22px;
          font-size: 16px;
          line-height: 1.6;
          white-space: pre-wrap;
          font-family: Consolas, monospace;
          overflow: auto;
          animation: codeGlow 2.8s ease-in-out infinite alternate;
        }

        .code-box.original {
          color: #c4b5fd;
        }

        .code-box.fixed {
          border-color: rgba(147, 197, 253, 0.45);
          color: #dbeafe;
        }

        .tip-card {
          border: 2px solid rgba(34, 211, 238, 0.85);
          background: rgba(17, 24, 39, 0.82);
          border-radius: 12px;
          padding: 22px;
          box-shadow: 0 0 32px rgba(34, 211, 238, 0.12);
          transition: 0.28s ease;
          animation: fadeUp 0.85s ease forwards;
        }

        .tip-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 14px;
        }

        .shield-icon {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(34, 211, 238, 0.14);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .tip-header h2 {
          margin: 0;
          font-size: 25px;
        }

        .tip-card p {
          color: #d1d5db;
          font-size: 18px;
          line-height: 1.75;
          margin: 0;
        }

        .bottom-line {
          height: 42px;
          border-bottom: 1px solid rgba(148, 163, 184, 0.2);
          margin-top: 52px;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
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

        @keyframes floatQuestion {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }

          50% {
            transform: translateY(-10px) rotate(4deg);
          }
        }

        @keyframes codeGlow {
          from {
            box-shadow: 0 0 0 rgba(96, 165, 250, 0);
          }

          to {
            box-shadow: 0 0 34px rgba(96, 165, 250, 0.08);
          }
        }

        @media (max-width: 1200px) {
          .report-page {
            grid-template-columns: 230px 1fr;
          }

          .summary-grid,
          .code-grid {
            grid-template-columns: 1fr;
          }

          .report-topbar {
            height: auto;
            padding: 16px 0;
            align-items: flex-start;
            gap: 16px;
            flex-direction: column;
          }
        }

        @media (max-width: 850px) {
          .report-page {
            grid-template-columns: 1fr;
          }

          .sidebar {
            min-height: auto;
            position: relative;
          }

          .side-nav {
            flex-direction: row;
            overflow-x: auto;
            padding: 0 18px;
          }

          .nav-item {
            min-width: 150px;
          }

          .logout-btn {
            display: none;
          }

          .report-main {
            padding: 0 16px 28px;
          }

          .topbar-left,
          .topbar-actions {
            flex-wrap: wrap;
          }

          .explanation-card {
            padding: 26px;
          }

          .question-mark {
            font-size: 90px;
          }
        }
      `}</style>
    </div>
  );
}

const originalCode = `useEffect(() => {
  const timer = setInterval(() => {
    fetchData();
  }, 5000);

  // Missing return cleanup function
}, []);`;

const fixedCode = `useEffect(() => {
  const timer = setInterval(() => {
    fetchData();
  }, 5000);

  return () => {
    clearInterval(timer);
    // Cleanup successful
  };
}, []);`;

export default ReportDetail;