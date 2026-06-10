import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "John Doe",
    email: "john@codefix.ai",
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
    <div className="dashboard-page">
      <aside className="sidebar">
        <div>
          <div className="brand">
            <h1>CodeFix AI</h1>
            <p>STUDENT PLAN</p>
          </div>

          <nav className="side-nav">
            <Link to="/debugger" className="nav-item">
              <span>⚙</span>
              Debugger
            </Link>

            <Link to="/history" className="nav-item">
              <span>↺</span>
              History
            </Link>

            <Link to="/dashboard" className="nav-item active">
              <span>▦</span>
              Dashboard
            </Link>
          </nav>
        </div>

        <button className="logout-btn" onClick={logout}>
          <span>⇱</span>
          Logout
        </button>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div className="topbar-left">
            <h1>Dashboard</h1>
            <span className="divider-line"></span>
            <p>
              <span>▣</span>
              Oct 24, 2023 - Today
            </p>
          </div>

          <div className="topbar-right">
            <button className="bell-btn">♙</button>
            <div className="profile-orb">{getInitials(user.name)}</div>
          </div>
        </header>

        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-head">
              <p>Total Bugs Fixed</p>
              <span className="success-icon">✓</span>
            </div>
            <h2>
              1,284 <span>+12%</span>
            </h2>
          </div>

          <div className="stat-card">
            <div className="stat-head">
              <p>Top Language</p>
              <span className="blue-icon">‹›</span>
            </div>
            <h2>
              TypeScript <span>42%</span>
            </h2>
          </div>

          <div className="stat-card">
            <div className="stat-head">
              <p>Critical Issue</p>
              <span className="danger-icon">△</span>
            </div>
            <h2 className="critical-title">
              Null <br /> Pointer
              <span>89 Found</span>
            </h2>
          </div>

          <div className="stat-card">
            <div className="stat-head">
              <p>Last Analysis</p>
              <span className="purple-icon">↺</span>
            </div>
            <h2>
              2m ago <span className="live-dot">● Live</span>
            </h2>
          </div>
        </section>

        <section className="analytics-grid">
          <div className="chart-card language-card">
            <div className="card-header">
              <h2>Language Usage Analysis</h2>

              <div className="toggle-row">
                <button className="active">Weekly</button>
                <button>Monthly</button>
              </div>
            </div>

            <div className="bar-chart">
              {languageUsage.map((item, index) => (
                <div className="bar-item" key={item.name}>
                  <div className="bar-track">
                    <div
                      className="bar-fill"
                      style={{
                        height: `${item.value}%`,
                        animationDelay: `${index * 0.12}s`,
                      }}
                    ></div>
                  </div>
                  <p>{item.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="chart-card bug-card">
            <h2>Bug Types</h2>

            <div className="donut-wrap">
              <div className="donut-chart">
                <div className="donut-center">
                  <h3>4.2k</h3>
                  <p>Total Points</p>
                </div>
              </div>
            </div>

            <div className="bug-list">
              <div>
                <span className="dot dot-blue"></span>
                Syntax Errors
                <strong>58%</strong>
              </div>

              <div>
                <span className="dot dot-cyan"></span>
                Logic Flaws
                <strong>32%</strong>
              </div>

              <div>
                <span className="dot dot-gray"></span>
                Security Risks
                <strong>10%</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="activity-card">
          <div className="activity-header">
            <h2>Recent Analysis Activity</h2>
            <button>View All</button>
          </div>

          <div className="activity-table">
            <div className="table-row table-head">
              <span>Repository</span>
              <span>Action</span>
              <span>Issues Found</span>
              <span>Status</span>
              <span>Timestamp</span>
            </div>

            {activities.map((item, index) => (
              <div
                className="table-row"
                key={item.repository}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="repo-name">{item.repository}</span>
                <span>{item.icon} {item.action}</span>
                <span className={item.issueClass}>{item.issues}</span>
                <span>
                  <strong className={`status-pill ${item.statusClass}`}>
                    {item.status}
                  </strong>
                </span>
                <span>{item.time}</span>
              </div>
            ))}
          </div>
        </section>

        <button className="floating-add">＋</button>

        <footer className="dashboard-footer"></footer>
      </main>

      <style>{`
        * {
          box-sizing: border-box;
        }

        .dashboard-page {
          width: 100%;
          min-height: 100vh;
          display: grid;
          grid-template-columns: 280px 1fr;
          background:
            radial-gradient(circle at 85% 20%, rgba(96, 165, 250, 0.08), transparent 30%),
            radial-gradient(circle at 40% 90%, rgba(139, 92, 246, 0.07), transparent 28%),
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
          padding: 0 26px 56px;
        }

        .brand h1 {
          margin: 0;
          font-size: 28px;
          color: #bfdbfe;
          letter-spacing: -0.8px;
        }

        .brand p {
          margin: 12px 0 0;
          color: #d1d5db;
          font-size: 13px;
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
          font-weight: 800;
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
          display: flex;
          align-items: center;
          gap: 14px;
          background: transparent;
          border: none;
          color: #e5e7eb;
          font-size: 15px;
          font-weight: 900;
          cursor: pointer;
          letter-spacing: 1px;
          transition: 0.25s ease;
        }

        .logout-btn span {
          font-size: 24px;
        }

        .logout-btn:hover {
          color: #93c5fd;
          transform: translateX(4px);
        }

        .dashboard-main {
          min-height: 100vh;
          padding: 0 26px 30px;
          position: relative;
          animation: fadeIn 0.7s ease forwards;
        }

        .dashboard-topbar {
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(148, 163, 184, 0.12);
          background: rgba(11, 16, 26, 0.86);
          backdrop-filter: blur(18px);
          position: sticky;
          top: 0;
          z-index: 20;
        }

        .topbar-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .topbar-left h1 {
          margin: 0;
          color: #bfdbfe;
          font-size: 34px;
          letter-spacing: -1.2px;
        }

        .divider-line {
          width: 1px;
          height: 24px;
          background: rgba(148, 163, 184, 0.34);
        }

        .topbar-left p {
          margin: 0;
          display: flex;
          align-items: center;
          gap: 10px;
          color: #d1d5db;
          font-size: 16px;
        }

        .topbar-right {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .bell-btn {
          background: transparent;
          border: none;
          color: #f8fafc;
          font-size: 24px;
          cursor: pointer;
          transition: 0.25s ease;
        }

        .bell-btn:hover {
          color: #67e8f9;
          transform: rotate(10deg);
        }

        .profile-orb {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid rgba(147, 197, 253, 0.6);
          background:
            radial-gradient(circle at 50% 30%, rgba(103, 232, 249, 0.35), transparent 38%),
            #111827;
          color: #bfdbfe;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 900;
          box-shadow: 0 0 30px rgba(103, 232, 249, 0.12);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          padding: 26px 0 14px;
        }

        .stat-card,
        .chart-card,
        .activity-card {
          background: rgba(17, 24, 39, 0.78);
          border: 1px solid rgba(148, 163, 184, 0.17);
          border-radius: 12px;
          box-shadow: 0 24px 70px rgba(0, 0, 0, 0.24);
        }

        .stat-card {
          min-height: 138px;
          padding: 20px;
          animation: cardUp 0.6s ease forwards;
          transition: 0.28s ease;
        }

        .stat-card:hover,
        .chart-card:hover,
        .activity-card:hover {
          border-color: rgba(147, 197, 253, 0.38);
          transform: translateY(-4px);
        }

        .stat-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 26px;
        }

        .stat-head p {
          margin: 0;
          color: #d1d5db;
          font-family: Consolas, monospace;
          font-size: 14px;
          letter-spacing: 1px;
        }

        .success-icon,
        .blue-icon,
        .danger-icon,
        .purple-icon {
          font-size: 25px;
          font-weight: 900;
        }

        .success-icon {
          color: #93c5fd;
          border: 2px solid #93c5fd;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
        }

        .blue-icon {
          color: #67e8f9;
        }

        .danger-icon {
          color: #fca5a5;
        }

        .purple-icon {
          color: #c4b5fd;
        }

        .stat-card h2 {
          margin: 0;
          font-size: 52px;
          line-height: 1;
          letter-spacing: -2px;
        }

        .stat-card h2 span {
          color: #67e8f9;
          font-size: 14px;
          letter-spacing: 0;
          margin-left: 10px;
        }

        .critical-title {
          font-size: 31px !important;
          line-height: 1.1 !important;
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .critical-title span {
          color: #dbeafe !important;
          font-size: 15px !important;
          line-height: 1.2;
        }

        .live-dot {
          color: #67e8f9 !important;
          font-size: 15px !important;
        }

        .analytics-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 14px;
          margin-bottom: 14px;
        }

        .chart-card {
          min-height: 440px;
          padding: 28px;
          transition: 0.28s ease;
        }

        .card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .card-header h2,
        .bug-card h2,
        .activity-header h2 {
          margin: 0;
          font-size: 25px;
          letter-spacing: -0.6px;
        }

        .toggle-row {
          display: flex;
          gap: 8px;
        }

        .toggle-row button {
          border: none;
          color: #d1d5db;
          background: #323846;
          border-radius: 999px;
          padding: 8px 17px;
          font-size: 12px;
          cursor: pointer;
          transition: 0.25s ease;
        }

        .toggle-row button.active {
          background: #475167;
          color: #bfdbfe;
        }

        .bar-chart {
          height: 325px;
          margin-top: 50px;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 36px;
          align-items: end;
          padding: 0 40px;
        }

        .bar-item {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: end;
          align-items: center;
          gap: 14px;
        }

        .bar-track {
          width: 42px;
          height: 255px;
          border-radius: 999px;
          background: rgba(148, 163, 184, 0.08);
          display: flex;
          align-items: end;
          overflow: hidden;
        }

        .bar-fill {
          width: 100%;
          border-radius: 999px;
          background: linear-gradient(180deg, #67e8f9, #8b5cf6);
          animation: growBar 1.2s ease forwards;
          transform-origin: bottom;
          transform: scaleY(0);
        }

        .bar-item p {
          margin: 0;
          color: #d1d5db;
          font-family: Consolas, monospace;
          font-size: 12px;
        }

        .bug-card {
          display: flex;
          flex-direction: column;
        }

        .donut-wrap {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 20px;
        }

        .donut-chart {
          width: 230px;
          height: 230px;
          border-radius: 50%;
          background:
            conic-gradient(#67e8f9 0deg 190deg, #a7bfff 190deg 285deg, #394150 285deg 360deg);
          position: relative;
          animation: rotateIn 1.2s ease forwards;
          box-shadow: 0 0 50px rgba(103, 232, 249, 0.12);
        }

        .donut-chart::after {
          content: "";
          position: absolute;
          inset: 18px;
          border-radius: 50%;
          background: #171d29;
        }

        .donut-center {
          position: absolute;
          inset: 0;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .donut-center h3 {
          margin: 0;
          font-size: 38px;
          letter-spacing: -1px;
        }

        .donut-center p {
          margin: 9px 0 0;
          color: #d1d5db;
          font-family: Consolas, monospace;
          font-size: 13px;
        }

        .bug-list {
          display: flex;
          flex-direction: column;
          gap: 18px;
          margin-top: 18px;
        }

        .bug-list div {
          display: grid;
          grid-template-columns: 18px 1fr auto;
          align-items: center;
          color: #d1d5db;
          font-size: 16px;
        }

        .dot {
          width: 13px;
          height: 13px;
          border-radius: 50%;
        }

        .dot-blue {
          background: #a7bfff;
        }

        .dot-cyan {
          background: #67e8f9;
        }

        .dot-gray {
          background: #394150;
        }

        .bug-list strong {
          color: #ffffff;
          font-size: 14px;
        }

        .activity-card {
          padding: 28px;
          min-height: 330px;
          transition: 0.28s ease;
        }

        .activity-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .activity-header button {
          border: none;
          background: transparent;
          color: #dbeafe;
          font-family: Consolas, monospace;
          font-size: 14px;
          cursor: pointer;
        }

        .activity-table {
          width: 100%;
        }

        .table-row {
          display: grid;
          grid-template-columns: 1.3fr 1.5fr 0.8fr 0.9fr 0.6fr;
          gap: 18px;
          align-items: center;
          min-height: 62px;
          border-bottom: 1px solid rgba(148, 163, 184, 0.08);
          color: #d1d5db;
          animation: rowIn 0.55s ease forwards;
          opacity: 0;
          transform: translateY(12px);
        }

        .table-head {
          min-height: 38px;
          color: #cbd5e1;
          font-family: Consolas, monospace;
          font-size: 14px;
          opacity: 1;
          transform: none;
          animation: none;
        }

        .repo-name {
          color: #ffffff;
          font-family: Consolas, monospace;
          font-weight: 900;
        }

        .issue-critical {
          color: #fca5a5;
          font-family: Consolas, monospace;
        }

        .issue-good {
          color: #67e8f9;
          font-family: Consolas, monospace;
        }

        .issue-warning {
          color: #d1d5db;
          font-family: Consolas, monospace;
        }

        .status-pill {
          display: inline-block;
          padding: 5px 12px;
          border-radius: 5px;
          font-size: 11px;
          font-family: Consolas, monospace;
          font-weight: 900;
        }

        .status-danger {
          background: #991b1b;
          color: #fecaca;
        }

        .status-success {
          background: #334155;
          color: #bfdbfe;
        }

        .status-progress {
          background: #323846;
          color: #d1d5db;
        }

        .floating-add {
          position: fixed;
          right: 36px;
          bottom: 34px;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          border: none;
          background: #7dd3fc;
          color: #0f172a;
          font-size: 36px;
          cursor: pointer;
          box-shadow: 0 20px 55px rgba(125, 211, 252, 0.35);
          transition: 0.25s ease;
          z-index: 50;
        }

        .floating-add:hover {
          transform: translateY(-5px) rotate(90deg);
          background: #a78bfa;
        }

        .dashboard-footer {
          height: 42px;
          border-top: 1px solid rgba(148, 163, 184, 0.2);
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

        @keyframes growBar {
          to {
            transform: scaleY(1);
          }
        }

        @keyframes rotateIn {
          from {
            opacity: 0;
            transform: rotate(-90deg) scale(0.9);
          }

          to {
            opacity: 1;
            transform: rotate(0deg) scale(1);
          }
        }

        @keyframes rowIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 1200px) {
          .dashboard-page {
            grid-template-columns: 230px 1fr;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .analytics-grid {
            grid-template-columns: 1fr;
          }

          .table-row {
            grid-template-columns: 1fr;
            gap: 6px;
            padding: 18px 0;
          }

          .table-head {
            display: none;
          }
        }

        @media (max-width: 850px) {
          .dashboard-page {
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

          .logout-btn {
            display: none;
          }

          .dashboard-topbar {
            height: auto;
            padding: 18px 0;
            align-items: flex-start;
            gap: 16px;
            flex-direction: column;
          }

          .topbar-left {
            flex-wrap: wrap;
          }

          .dashboard-main {
            padding: 0 16px 30px;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .bar-chart {
            padding: 0;
            gap: 20px;
          }
        }
      `}</style>
    </div>
  );
}

const languageUsage = [
  { name: "TS", value: 88 },
  { name: "Py", value: 66 },
  { name: "Go", value: 45 },
  { name: "Rust", value: 55 },
  { name: "Other", value: 35 },
];

const activities = [
  {
    repository: "auth-microservice",
    icon: "🪄",
    action: "Refactoring Suggestion",
    issues: "12 Critical",
    issueClass: "issue-critical",
    status: "ACTION REQUIRED",
    statusClass: "status-danger",
    time: "10:42 AM",
  },
  {
    repository: "frontend-dashboard",
    icon: "⌕",
    action: "Security Scan",
    issues: "0 Issues",
    issueClass: "issue-good",
    status: "OPTIMIZED",
    statusClass: "status-success",
    time: "09:15 AM",
  },
  {
    repository: "payment-gateway-sdk",
    icon: "⚙",
    action: "Deep Trace Analysis",
    issues: "4 Warnings",
    issueClass: "issue-warning",
    status: "IN PROGRESS",
    statusClass: "status-progress",
    time: "Yesterday",
  },
];

export default Dashboard;