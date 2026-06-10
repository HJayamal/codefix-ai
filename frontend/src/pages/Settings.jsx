import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";

function Settings() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [primaryLanguage, setPrimaryLanguage] = useState("JavaScript");
  const [autoFix, setAutoFix] = useState(true);
  const [theme, setTheme] = useState("Dark");
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);

  const getProfile = async () => {
    try {
      const res = await API.get("/users/profile");

      setProfile({
        name: res.data.name,
        email: res.data.email,
      });

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: res.data.name,
          email: res.data.email,
        })
      );
    } catch (error) {
      alert(error.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const saveProfile = async () => {
    if (!profile.name.trim() || !profile.email.trim()) {
      alert("Name and email are required");
      return;
    }

    try {
      setSavingProfile(true);

      const res = await API.put("/users/profile", {
        name: profile.name,
        email: profile.email,
      });

      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Profile updated successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update profile");
    } finally {
      setSavingProfile(false);
    }
  };

  const updateSecurity = async () => {
    if (
      !security.currentPassword ||
      !security.newPassword ||
      !security.confirmPassword
    ) {
      alert("Please fill all password fields");
      return;
    }

    if (security.newPassword !== security.confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    if (security.newPassword.length < 6) {
      alert("New password must be at least 6 characters");
      return;
    }

    try {
      setUpdatingPassword(true);

      await API.put("/users/password", {
        currentPassword: security.currentPassword,
        newPassword: security.newPassword,
      });

      alert("Password updated successfully!");

      setSecurity({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update password");
    } finally {
      setUpdatingPassword(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return "U";

    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  if (loading) {
    return (
      <div className="settings-loading">
        <div className="loader"></div>
        <p>Loading settings...</p>

        <style>{`
          .settings-loading {
            min-height: 100vh;
            background: #0b101a;
            color: white;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-family: Inter, Arial, sans-serif;
          }

          .loader {
            width: 50px;
            height: 50px;
            border: 4px solid rgba(148, 163, 184, 0.25);
            border-top-color: #67e8f9;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
            margin-bottom: 18px;
          }

          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="settings-page">
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

            <Link to="/history" className="nav-item">
              <span>↺</span>
              History
            </Link>

            <Link to="/dashboard" className="nav-item">
              <span>▦</span>
              Dashboard
            </Link>

            <Link to="/settings" className="nav-item active">
              <span>⚙</span>
              Settings
            </Link>
          </nav>
        </div>

        <button className="logout-btn" onClick={logout}>
          <span>⇱</span>
          Logout
        </button>
      </aside>

      <main className="settings-main">
        <header className="settings-header">
          <h1>Account Settings</h1>
          <p>Manage your profile, preferences, and security.</p>
        </header>

        <section className="settings-layout">
          <div className="left-column">
            <div className="profile-card card">
              <div className="avatar-section">
                <div className="profile-avatar">
                  <div className="face-glow"></div>
                  <span>{getInitials(profile.name)}</span>
                </div>

                <button
                  className="edit-avatar"
                  onClick={() => alert("Profile image upload coming soon")}
                >
                  ✎
                </button>
              </div>

              <div className="profile-form">
                <label>FULL NAME</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                />

                <label>EMAIL ADDRESS</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                />

                <button
                  className="save-btn"
                  onClick={saveProfile}
                  disabled={savingProfile}
                >
                  {savingProfile ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>

            <div className="security-card card">
              <h2>
                <span>🛡</span>
                Security & Password
              </h2>

              <label>CURRENT PASSWORD</label>
              <input
                type="password"
                placeholder="••••••••"
                value={security.currentPassword}
                onChange={(e) =>
                  setSecurity({
                    ...security,
                    currentPassword: e.target.value,
                  })
                }
              />

              <div className="password-grid">
                <div>
                  <label>NEW PASSWORD</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={security.newPassword}
                    onChange={(e) =>
                      setSecurity({
                        ...security,
                        newPassword: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label>CONFIRM NEW PASSWORD</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={security.confirmPassword}
                    onChange={(e) =>
                      setSecurity({
                        ...security,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <button
                className="security-btn"
                onClick={updateSecurity}
                disabled={updatingPassword}
              >
                {updatingPassword ? "Updating..." : "Update Security"}
              </button>
            </div>
          </div>

          <div className="right-column">
            <div className="usage-card card">
              <h3>USAGE ANALYTICS</h3>

              <div className="usage-row">
                <span>AI Suggestions</span>
                <strong>1,240 / 5,000</strong>
              </div>

              <div className="progress-track">
                <div className="progress-fill suggestions"></div>
              </div>

              <div className="usage-row">
                <span>Active Projects</span>
                <strong className="cyan-text">8 / 15</strong>
              </div>

              <div className="progress-track">
                <div className="progress-fill projects"></div>
              </div>

              <button
                className="upgrade-btn"
                onClick={() => alert("Upgrade plan coming soon")}
              >
                Upgrade Plan
              </button>
            </div>

            <div className="preferences-card card">
              <h2>
                <span>☷</span>
                Preferences
              </h2>

              <label>PRIMARY LANGUAGE</label>
              <select
                value={primaryLanguage}
                onChange={(e) => setPrimaryLanguage(e.target.value)}
              >
                <option>JavaScript</option>
                <option>TypeScript</option>
                <option>Python</option>
                <option>Java</option>
                <option>C++</option>
              </select>

              <label>INTERFACE THEME</label>

              <div className="theme-grid">
                <button
                  className={
                    theme === "Dark" ? "theme-card selected" : "theme-card"
                  }
                  onClick={() => setTheme("Dark")}
                >
                  <span>☾</span>
                  Dark
                </button>

                <button
                  className={
                    theme === "System" ? "theme-card selected" : "theme-card"
                  }
                  onClick={() => setTheme("System")}
                >
                  <span>▣</span>
                  System
                </button>
              </div>

              <div className="toggle-row">
                <span>Auto-fix on save</span>

                <button
                  className={autoFix ? "toggle active" : "toggle"}
                  onClick={() => setAutoFix(!autoFix)}
                >
                  <span></span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="danger-zone">
          <div>
            <h2>⚠ Danger Zone</h2>
            <p>
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
          </div>

          <button onClick={() => alert("Account delete feature not connected yet")}>
            Delete My Account
          </button>
        </section>

        <footer className="settings-footer">
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

        .settings-page {
          width: 100%;
          min-height: 100vh;
          display: grid;
          grid-template-columns: 280px 1fr;
          background:
            radial-gradient(circle at 84% 12%, rgba(96, 165, 250, 0.08), transparent 30%),
            radial-gradient(circle at 52% 88%, rgba(139, 92, 246, 0.07), transparent 28%),
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
          margin: 10px 0 0;
          color: #cbd5e1;
          font-size: 15px;
          font-family: Consolas, monospace;
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
          font-size: 14px;
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

        .settings-main {
          min-height: 100vh;
          padding: 28px 66px 48px;
          animation: fadeIn 0.7s ease forwards;
        }

        .settings-header {
          margin-bottom: 36px;
          animation: fadeUp 0.7s ease forwards;
        }

        .settings-header h1 {
          margin: 0 0 8px;
          font-size: 38px;
          letter-spacing: -1px;
        }

        .settings-header p {
          margin: 0;
          color: #d1d5db;
          font-size: 19px;
        }

        .settings-layout {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 14px;
        }

        .left-column,
        .right-column {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .card {
          background: rgba(17, 24, 39, 0.78);
          border: 1px solid rgba(148, 163, 184, 0.17);
          border-radius: 12px;
          box-shadow: 0 24px 70px rgba(0, 0, 0, 0.24);
          transition: 0.28s ease;
          animation: cardUp 0.65s ease forwards;
        }

        .card:hover {
          border-color: rgba(147, 197, 253, 0.38);
          transform: translateY(-4px);
        }

        .profile-card {
          min-height: 265px;
          padding: 18px;
          display: grid;
          grid-template-columns: 150px 1fr;
          gap: 24px;
          align-items: center;
        }

        .avatar-section {
          position: relative;
          display: flex;
          justify-content: center;
        }

        .profile-avatar {
          width: 135px;
          height: 135px;
          border-radius: 50%;
          border: 2px solid rgba(147, 197, 253, 0.38);
          background:
            radial-gradient(circle at 50% 25%, rgba(34, 211, 238, 0.35), transparent 35%),
            linear-gradient(135deg, #1f2937, #020617);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #bfdbfe;
          font-size: 34px;
          font-weight: 950;
          box-shadow: 0 0 60px rgba(34, 211, 238, 0.16);
          position: relative;
          overflow: hidden;
        }

        .face-glow {
          position: absolute;
          inset: 18px;
          background:
            radial-gradient(circle at 50% 35%, rgba(236, 72, 153, 0.22), transparent 32%),
            radial-gradient(circle at 40% 65%, rgba(34, 211, 238, 0.25), transparent 35%);
          filter: blur(15px);
        }

        .profile-avatar span {
          position: relative;
          z-index: 2;
        }

        .edit-avatar {
          position: absolute;
          right: 12px;
          bottom: 0;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: none;
          background: #a7bfff;
          color: #0f172a;
          font-size: 19px;
          cursor: pointer;
          box-shadow: 0 14px 35px rgba(167, 191, 255, 0.3);
          transition: 0.25s ease;
        }

        .edit-avatar:hover {
          transform: rotate(-12deg) scale(1.08);
        }

        .profile-form label,
        .security-card label,
        .preferences-card label {
          display: block;
          color: #bfdbfe;
          font-size: 13px;
          font-weight: 950;
          letter-spacing: 1.6px;
          font-family: Consolas, monospace;
          margin-bottom: 10px;
        }

        .profile-form input,
        .security-card input,
        .preferences-card select {
          width: 100%;
          height: 46px;
          border-radius: 8px;
          border: 1px solid rgba(148, 163, 184, 0.18);
          background: #343946;
          color: #f8fafc;
          padding: 0 18px;
          font-size: 18px;
          outline: none;
          margin-bottom: 22px;
          transition: 0.25s ease;
        }

        .profile-form input:focus,
        .security-card input:focus,
        .preferences-card select:focus {
          border-color: #93c5fd;
          box-shadow: 0 0 0 4px rgba(147, 197, 253, 0.1);
          transform: translateY(-1px);
        }

        .save-btn,
        .security-btn,
        .upgrade-btn {
          height: 38px;
          border-radius: 8px;
          border: none;
          background: #a7bfff;
          color: #0f172a;
          padding: 0 26px;
          font-weight: 950;
          font-family: Consolas, monospace;
          cursor: pointer;
          transition: 0.25s ease;
        }

        .save-btn:hover,
        .security-btn:hover,
        .upgrade-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 18px 42px rgba(167, 191, 255, 0.24);
        }

        .save-btn:disabled,
        .security-btn:disabled {
          opacity: 0.65;
          cursor: not-allowed;
          transform: none;
        }

        .security-card {
          min-height: 365px;
          padding: 22px;
        }

        .security-card h2,
        .preferences-card h2 {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 0 0 34px;
          font-size: 25px;
        }

        .security-card h2 span {
          color: #bfdbfe;
        }

        .password-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }

        .security-btn {
          background: #343946;
          color: #ffffff;
          margin-top: 2px;
        }

        .usage-card {
          min-height: 265px;
          padding: 20px;
        }

        .usage-card h3 {
          color: #d1d5db;
          font-family: Consolas, monospace;
          letter-spacing: 1.4px;
          margin: 0 0 24px;
        }

        .usage-row {
          display: flex;
          justify-content: space-between;
          color: #f8fafc;
          font-size: 16px;
          margin-bottom: 14px;
        }

        .usage-row strong {
          color: #bfdbfe;
          font-family: Consolas, monospace;
          font-weight: 500;
        }

        .cyan-text {
          color: #67e8f9 !important;
        }

        .progress-track {
          width: 100%;
          height: 7px;
          border-radius: 999px;
          background: #333845;
          overflow: hidden;
          margin-bottom: 22px;
        }

        .progress-fill {
          height: 100%;
          border-radius: 999px;
          transform-origin: left;
          animation: growLine 1.1s ease forwards;
        }

        .suggestions {
          width: 24%;
          background: #a7bfff;
        }

        .projects {
          width: 53%;
          background: #67e8f9;
        }

        .upgrade-btn {
          width: 100%;
          margin-top: 8px;
          background: transparent;
          color: #ffffff;
          border: 1px solid rgba(148, 163, 184, 0.28);
        }

        .preferences-card {
          min-height: 365px;
          padding: 22px;
        }

        .preferences-card h2 span {
          color: #67e8f9;
        }

        .theme-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 28px;
        }

        .theme-card {
          height: 84px;
          border-radius: 8px;
          border: 2px solid rgba(148, 163, 184, 0.22);
          background: #1f2430;
          color: #ffffff;
          font-weight: 950;
          font-family: Consolas, monospace;
          cursor: pointer;
          transition: 0.25s ease;
        }

        .theme-card span {
          display: block;
          font-size: 24px;
          margin-bottom: 8px;
        }

        .theme-card:hover,
        .theme-card.selected {
          border-color: #bfdbfe;
          box-shadow: 0 0 28px rgba(191, 219, 254, 0.14);
          transform: translateY(-3px);
        }

        .toggle-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #f8fafc;
          font-size: 16px;
        }

        .toggle {
          width: 44px;
          height: 24px;
          border-radius: 999px;
          border: none;
          background: #334155;
          padding: 3px;
          cursor: pointer;
          transition: 0.25s ease;
        }

        .toggle span {
          width: 18px;
          height: 18px;
          display: block;
          border-radius: 50%;
          background: white;
          transition: 0.25s ease;
        }

        .toggle.active {
          background: #a7bfff;
        }

        .toggle.active span {
          transform: translateX(20px);
        }

        .danger-zone {
          margin-top: 48px;
          min-height: 92px;
          border: 1px solid rgba(248, 113, 113, 0.28);
          background: rgba(127, 29, 29, 0.08);
          border-radius: 12px;
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          animation: fadeUp 0.75s ease forwards;
        }

        .danger-zone h2 {
          margin: 0 0 8px;
          color: #fca5a5;
          font-size: 22px;
        }

        .danger-zone p {
          margin: 0;
          color: #d1d5db;
        }

        .danger-zone button {
          height: 48px;
          padding: 0 24px;
          border-radius: 8px;
          border: 1px solid #fca5a5;
          background: transparent;
          color: #fecaca;
          font-weight: 950;
          font-family: Consolas, monospace;
          cursor: pointer;
          transition: 0.25s ease;
        }

        .danger-zone button:hover {
          background: rgba(248, 113, 113, 0.12);
          transform: translateY(-3px);
        }

        .settings-footer {
          margin-top: 14px;
          border-top: 1px solid rgba(148, 163, 184, 0.22);
          padding-top: 56px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 30px;
        }

        .settings-footer h2 {
          margin: 0 0 8px;
          color: #bfdbfe;
        }

        .settings-footer p {
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
          transition: 0.25s ease;
        }

        .footer-links a:hover {
          color: #67e8f9;
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

        @keyframes growLine {
          from {
            transform: scaleX(0);
          }

          to {
            transform: scaleX(1);
          }
        }

        @media (max-width: 1200px) {
          .settings-page {
            grid-template-columns: 230px 1fr;
          }

          .settings-main {
            padding: 28px;
          }

          .settings-layout {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 850px) {
          .settings-page {
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

          .profile-card {
            grid-template-columns: 1fr;
          }

          .password-grid,
          .theme-grid {
            grid-template-columns: 1fr;
          }

          .danger-zone,
          .settings-footer {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
}

export default Settings;