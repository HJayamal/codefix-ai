import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

function History() {
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("All Languages");

  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "John Doe",
    email: "john@codefix.ai",
  };

  const getHistory = async () => {
    try {
      const res = await API.get("/debug/history");
      setHistory(res.data);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to load history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHistory();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const languages = useMemo(() => {
    const unique = [...new Set(history.map((item) => item.language))];
    return ["All Languages", ...unique];
  }, [history]);

  const filteredHistory = history.filter((item) => {
    const search = searchText.toLowerCase();

    const matchesSearch =
      item.language?.toLowerCase().includes(search) ||
      item.bugType?.toLowerCase().includes(search) ||
      item.bugLocation?.toLowerCase().includes(search) ||
      item.explanation?.toLowerCase().includes(search) ||
      item.originalCode?.toLowerCase().includes(search) ||
      item.fixedCode?.toLowerCase().includes(search);

    const matchesLanguage =
      selectedLanguage === "All Languages" || item.language === selectedLanguage;

    return matchesSearch && matchesLanguage;
  });

  const getInitials = (name) => {
    return name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <div className="history-page">
      <aside className="sidebar">
        <div>
          <div className="brand">
            <h1>CodeFix AI</h1>
            <p>Student Plan</p>
          </div>

          <nav className="side-nav">
            <Link to="/debugger" className="nav-item">
              <span>⚙</span>
              Debugger
            </Link>

            <Link to="/history" className="nav-item active">
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
          <div className="user-card">
            <div className="avatar">{getInitials(user.name)}</div>
            <div>
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>
          </div>

          <button onClick={logout} className="logout-btn">
            <span>⇱</span>
            Logout
          </button>
        </div>
      </aside>

      <main className="history-main">
        <header className="topbar">
          <div className="title-row">
            <h1>Debug History</h1>
            <span>{filteredHistory.length} SOLUTIONS</span>
          </div>

          <div className="toolbar">
            <div className="search-box">
              <span>⌕</span>
              <input
                type="text"
                placeholder="Search fixes, errors, or files..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>

            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              {languages.map((language) => (
                <option key={language}>{language}</option>
              ))}
            </select>

            <button className="icon-btn">≡</button>
            <button className="icon-btn" onClick={getHistory}>
              ↻
            </button>
          </div>
        </header>

        {loading && (
          <div className="loading-state">
            <div className="loader"></div>
            <p>Loading debug history...</p>
          </div>
        )}

        {!loading && filteredHistory.length === 0 && (
          <div className="empty-state">
            <h2>No debug history found</h2>
            <p>Analyze code in the debugger first. Your AI reports will appear here.</p>
            <Link to="/debugger">Go to Debugger</Link>
          </div>
        )}

        {!loading && filteredHistory.length > 0 && (
          <section className="history-grid">
            {filteredHistory.map((item, index) => (
              <article
                className="history-card"
                key={item._id}
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className="card-top">
                  <div className="badges">
                    <span className="language-badge">{item.language}</span>
                    <span className="bug-badge">{item.bugType || "BUG FIX"}</span>
                  </div>

                  <button className="open-btn">↗</button>
                </div>

                <h2>{item.bugType || "Code Issue Fixed"}</h2>

                <p className="date">
                  {new Date(item.createdAt).toLocaleDateString()} •{" "}
                  {new Date(item.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>

                <p className="description">{item.explanation}</p>

                <div className="code-preview-grid">
                  <div className="mini-code">
                    <span className="code-label original">ORIGINAL</span>
                    <pre>{item.originalCode}</pre>
                  </div>

                  <div className="mini-code">
                    <span className="code-label fixed">FIXED</span>
                    <pre>{item.fixedCode}</pre>
                  </div>
                </div>

                <div className="card-footer">
                  <div className="metrics">
                    <span>◴ 0.8s Fix</span>
                    <span>☼ 98% Conf.</span>
                  </div>

                  <Link to={`/history/${item._id}`} className="details-btn">
  View Details
</Link>
                </div>
              </article>
            ))}
          </section>
        )}

        <div className="load-more">
          <div>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <p>Loading more history...</p>
        </div>

        <footer className="history-footer">
          <div>
            <h2>CodeFix AI</h2>
            <p>© 2026 CodeFix AI. Built for the next generation of engineers.</p>
          </div>

          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Documentation</a>
            <a href="#">Support</a>
          </div>
        </footer>
      </main>

      <style>{`
        * {
          box-sizing: border-box;
        }

        .history-page {
          width: 100%;
          min-height: 100vh;
          display: grid;
          grid-template-columns: 280px 1fr;
          background:
            radial-gradient(circle at 85% 10%, rgba(59, 130, 246, 0.08), transparent 30%),
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
          font-size: 29px;
          line-height: 1;
          color: #bfdbfe;
          letter-spacing: -1px;
        }

        .brand p {
          margin: 10px 0 0;
          color: #d1d5db;
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 1.2px;
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
          font-size: 14px;
          border-left: 4px solid transparent;
          transition: 0.25s ease;
        }

        .nav-item span {
          font-size: 21px;
        }

        .nav-item:hover {
          background: rgba(148, 163, 184, 0.08);
          color: #ffffff;
        }

        .nav-item.active {
          background: rgba(148, 163, 184, 0.12);
          border-left-color: #9db8ff;
          color: #ffffff;
        }

        .sidebar-bottom {
          padding: 0 26px;
        }

        .user-card {
          display: flex;
          align-items: center;
          gap: 14px;
          background: rgba(31, 41, 55, 0.85);
          border-radius: 12px;
          padding: 14px;
          margin-bottom: 24px;
          animation: fadeUp 0.7s ease forwards;
        }

        .avatar {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #334155;
          color: #bfdbfe;
          font-weight: 900;
        }

        .user-card h3 {
          margin: 0;
          font-size: 15px;
          color: #ffffff;
        }

        .user-card p {
          margin: 4px 0 0;
          font-size: 12px;
          color: #cbd5e1;
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
          font-weight: 900;
          letter-spacing: 1px;
          cursor: pointer;
          padding: 0 12px;
          transition: 0.25s ease;
        }

        .logout-btn:hover {
          color: #93c5fd;
          transform: translateX(4px);
        }

        .history-main {
          min-height: 100vh;
          padding: 0 26px;
          animation: fadeIn 0.7s ease forwards;
        }

        .topbar {
          min-height: 62px;
          display: grid;
          grid-template-columns: auto 1fr;
          align-items: center;
          gap: 24px;
          border-bottom: 1px solid rgba(148, 163, 184, 0.08);
          background: rgba(11, 16, 26, 0.86);
          backdrop-filter: blur(16px);
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .title-row {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .title-row h1 {
          margin: 0;
          font-size: 23px;
          letter-spacing: -0.5px;
        }

        .title-row span {
          background: rgba(148, 163, 184, 0.18);
          color: #e5e7eb;
          padding: 5px 10px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 1px;
        }

        .toolbar {
          display: grid;
          grid-template-columns: 1fr 150px 42px 42px;
          gap: 14px;
          align-items: center;
        }

        .search-box {
          height: 40px;
          background: #252b38;
          border: 1px solid rgba(148, 163, 184, 0.1);
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 14px;
        }

        .search-box span {
          color: #cbd5e1;
          font-size: 22px;
        }

        .search-box input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: #ffffff;
          font-size: 14px;
        }

        .search-box input::placeholder {
          color: #818898;
        }

        .toolbar select,
        .icon-btn {
          height: 40px;
          border-radius: 8px;
          border: 1px solid rgba(148, 163, 184, 0.08);
          background: #252b38;
          color: #ffffff;
          padding: 0 12px;
          outline: none;
          cursor: pointer;
          font-weight: 700;
        }

        .icon-btn {
          font-size: 21px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: 0.25s ease;
        }

        .icon-btn:hover {
          background: #334155;
          transform: translateY(-2px);
        }

        .history-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
          padding: 28px 0 70px;
        }

        .history-card {
          background: rgba(17, 24, 39, 0.86);
          border: 1px solid rgba(148, 163, 184, 0.16);
          border-radius: 14px;
          padding: 26px;
          min-height: 370px;
          box-shadow: 0 22px 60px rgba(0, 0, 0, 0.24);
          animation: cardUp 0.55s ease forwards;
          opacity: 0;
          transform: translateY(20px);
          transition: 0.28s ease;
        }

        .history-card:hover {
          transform: translateY(-7px);
          border-color: rgba(147, 197, 253, 0.4);
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.38);
        }

        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .badges {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .language-badge,
        .bug-badge {
          padding: 5px 9px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 950;
          letter-spacing: 1.4px;
          text-transform: uppercase;
        }

        .language-badge {
          background: rgba(59, 130, 246, 0.18);
          color: #bfdbfe;
        }

        .bug-badge {
          background: rgba(239, 68, 68, 0.2);
          color: #fecaca;
        }

        .open-btn {
          background: transparent;
          border: none;
          color: #e5e7eb;
          font-size: 26px;
          cursor: pointer;
          transition: 0.25s ease;
        }

        .open-btn:hover {
          color: #38bdf8;
          transform: translate(3px, -3px);
        }

        .history-card h2 {
          margin: 0 0 8px;
          font-size: 24px;
          letter-spacing: -0.5px;
        }

        .date {
          margin: 0 0 20px;
          color: #e5e7eb;
          opacity: 0.88;
        }

        .description {
          color: #d1d5db;
          line-height: 1.55;
          margin: 0 0 28px;
          min-height: 52px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .code-preview-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 22px;
        }

        .mini-code {
          background: #050814;
          border-radius: 7px;
          min-height: 82px;
          padding: 14px;
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(148, 163, 184, 0.08);
        }

        .mini-code pre {
          margin: 0;
          color: #fca5a5;
          font-size: 12px;
          line-height: 1.55;
          white-space: pre-wrap;
          max-height: 65px;
          overflow: hidden;
        }

        .mini-code:nth-child(2) pre {
          color: #22d3ee;
        }

        .code-label {
          position: absolute;
          right: 0;
          top: 0;
          padding: 4px 8px;
          font-size: 9px;
          font-weight: 950;
          letter-spacing: 0.8px;
          border-bottom-left-radius: 5px;
        }

        .code-label.original {
          background: rgba(248, 113, 113, 0.24);
          color: #fecaca;
        }

        .code-label.fixed {
          background: rgba(34, 211, 238, 0.24);
          color: #67e8f9;
        }

        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .metrics {
          display: flex;
          align-items: center;
          gap: 16px;
          color: #d1d5db;
          font-size: 13px;
        }

        .details-btn {
  height: 36px;
  min-width: 130px;
  border: none;
  border-radius: 8px;
  background: #252f44;
  color: #dbeafe;
  font-weight: 950;
  letter-spacing: 1px;
  cursor: pointer;
  transition: 0.25s ease;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

        .details-btn:hover {
          background: #334155;
          transform: translateY(-2px);
        }

        .loading-state,
        .empty-state {
          min-height: 460px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: #94a3b8;
        }

        .loader {
          width: 44px;
          height: 44px;
          border: 3px solid rgba(148, 163, 184, 0.22);
          border-top-color: #60a5fa;
          border-radius: 50%;
          animation: spin 0.85s linear infinite;
          margin-bottom: 16px;
        }

        .empty-state h2 {
          color: #ffffff;
          margin-bottom: 8px;
        }

        .empty-state a {
          margin-top: 18px;
          color: #0f172a;
          background: #bfdbfe;
          text-decoration: none;
          padding: 12px 22px;
          border-radius: 10px;
          font-weight: 900;
        }

        .load-more {
          text-align: center;
          color: #5f6878;
          margin-bottom: 36px;
        }

        .load-more div {
          display: flex;
          justify-content: center;
          gap: 6px;
          margin-bottom: 16px;
        }

        .load-more span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #6b7280;
          animation: dotPulse 1s infinite alternate;
        }

        .load-more span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .load-more span:nth-child(3) {
          animation-delay: 0.4s;
        }

        .history-footer {
          min-height: 105px;
          border-top: 1px solid rgba(148, 163, 184, 0.2);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 30px;
          padding: 24px 0;
        }

        .history-footer h2 {
          margin: 0 0 6px;
          color: #bfdbfe;
        }

        .history-footer p {
          margin: 0;
          color: #d1d5db;
        }

        .footer-links {
          display: flex;
          gap: 34px;
          flex-wrap: wrap;
        }

        .footer-links a {
          color: #d1d5db;
          text-decoration: none;
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
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes dotPulse {
          from {
            opacity: 0.35;
            transform: translateY(0);
          }

          to {
            opacity: 1;
            transform: translateY(-5px);
          }
        }

        @media (max-width: 1200px) {
          .history-page {
            grid-template-columns: 230px 1fr;
          }

          .history-grid {
            grid-template-columns: 1fr;
          }

          .toolbar {
            grid-template-columns: 1fr 140px 40px 40px;
          }
        }

        @media (max-width: 850px) {
          .history-page {
            grid-template-columns: 1fr;
          }

          .sidebar {
            position: relative;
            min-height: auto;
          }

          .side-nav {
            flex-direction: row;
            overflow-x: auto;
            padding: 0 20px;
          }

          .nav-item {
            min-width: 150px;
          }

          .sidebar-bottom {
            display: none;
          }

          .topbar {
            grid-template-columns: 1fr;
            padding: 16px 0;
          }

          .toolbar {
            grid-template-columns: 1fr;
          }

          .code-preview-grid,
          .card-footer,
          .history-footer {
            grid-template-columns: 1fr;
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
}

export default History;