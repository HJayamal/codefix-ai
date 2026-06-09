import { useState } from "react";
import Editor from "@monaco-editor/react";
import API from "../api/axios";
import { Link } from "react-router-dom";

function Debugger() {
  const [language, setLanguage] = useState("JavaScript");
  const [code, setCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeCode = async () => {
    if (!code.trim()) {
      alert("Please enter code first");
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      const res = await API.post("/debug/analyze", {
        language,
        code,
        errorMessage,
      });

      setResult(res.data.result);
    } catch (error) {
      alert(error.response?.data?.message || "Analysis failed");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const copyFixedCode = () => {
    if (result?.fixedCode) {
      navigator.clipboard.writeText(result.fixedCode);
      alert("Fixed code copied");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>CodeFix AI Debugger</h1>
            <p style={styles.subtitle}>
              Paste your code, add the error message, and let AI explain the bug.
            </p>
          </div>

          <div style={styles.navButtons}>
            <Link to="/history" style={styles.historyLink}>
              History
            </Link>

            <button onClick={logout} style={styles.logoutButton}>
              Logout
            </button>
          </div>
        </div>

        {/* Main Layout */}
        <div style={styles.grid}>
          {/* Left Side */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Code Input</h2>

            <label style={styles.label}>Programming Language</label>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={styles.select}
            >
              <option>JavaScript</option>
              <option>Python</option>
              <option>Java</option>
              <option>C++</option>
            </select>

            <div style={styles.editorBox}>
              <Editor
                height="350px"
                language={language.toLowerCase()}
                value={code}
                onChange={(value) => setCode(value || "")}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  wordWrap: "on",
                  automaticLayout: true,
                }}
              />
            </div>

            <label style={styles.label}>Error Message</label>

            <textarea
              placeholder="Paste error message here..."
              value={errorMessage}
              onChange={(e) => setErrorMessage(e.target.value)}
              style={styles.textarea}
            />

            <button
              onClick={analyzeCode}
              disabled={loading}
              style={loading ? styles.disabledButton : styles.analyzeButton}
            >
              {loading ? "Analyzing..." : "Analyze Code"}
            </button>
          </div>

          {/* Right Side */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>AI Bug Report</h2>

            {!result && !loading && (
              <div style={styles.emptyBox}>
                <p>No result yet.</p>
                <p>Enter code and click Analyze Code.</p>
              </div>
            )}

            {loading && (
              <div style={styles.emptyBox}>
                <p>AI is analyzing your code...</p>
              </div>
            )}

            {result && (
              <div>
                <div style={styles.resultSection}>
                  <h3 style={styles.resultTitle}>Bug Type</h3>
                  <p style={styles.resultText}>{result.bugType}</p>
                </div>

                <div style={styles.resultSection}>
                  <h3 style={styles.resultTitle}>Bug Location</h3>
                  <p style={styles.resultText}>{result.bugLocation}</p>
                </div>

                <div style={styles.resultSection}>
                  <h3 style={styles.resultTitle}>Explanation</h3>
                  <p style={styles.resultText}>{result.explanation}</p>
                </div>

                <div style={styles.resultSection}>
                  <div style={styles.fixedCodeHeader}>
                    <h3 style={styles.resultTitle}>Fixed Code</h3>
                    <button onClick={copyFixedCode} style={styles.copyButton}>
                      Copy
                    </button>
                  </div>

                  <pre style={styles.codeBlock}>
                    <code>{result.fixedCode}</code>
                  </pre>
                </div>

                <div style={styles.resultSection}>
                  <h3 style={styles.resultTitle}>Prevention Tip</h3>
                  <p style={styles.resultText}>{result.preventionTip}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0f172a",
    color: "#e5e7eb",
    padding: "30px",
    fontFamily: "Arial, sans-serif",
  },

  container: {
    maxWidth: "1300px",
    margin: "0 auto",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    gap: "20px",
  },

  title: {
    fontSize: "34px",
    margin: "0",
    color: "#ffffff",
  },

  subtitle: {
    color: "#94a3b8",
    marginTop: "8px",
  },

  navButtons: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  historyLink: {
    textDecoration: "none",
    color: "#ffffff",
    background: "#2563eb",
    padding: "10px 16px",
    borderRadius: "8px",
    fontWeight: "bold",
  },

  logoutButton: {
    background: "#dc2626",
    color: "#ffffff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "25px",
  },

  card: {
    background: "#111827",
    border: "1px solid #334155",
    borderRadius: "12px",
    padding: "22px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
  },

  cardTitle: {
    marginTop: "0",
    marginBottom: "20px",
    color: "#ffffff",
  },

  label: {
    display: "block",
    marginBottom: "8px",
    color: "#cbd5e1",
    fontWeight: "bold",
  },

  select: {
    width: "100%",
    padding: "10px",
    marginBottom: "18px",
    borderRadius: "8px",
    border: "1px solid #475569",
    background: "#020617",
    color: "#ffffff",
  },

  editorBox: {
    border: "1px solid #334155",
    borderRadius: "8px",
    overflow: "hidden",
    marginBottom: "18px",
  },

  textarea: {
    width: "100%",
    height: "100px",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #475569",
    background: "#020617",
    color: "#ffffff",
    resize: "vertical",
    marginBottom: "18px",
    boxSizing: "border-box",
  },

  analyzeButton: {
    width: "100%",
    background: "#22c55e",
    color: "#052e16",
    border: "none",
    padding: "13px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "15px",
  },

  disabledButton: {
    width: "100%",
    background: "#64748b",
    color: "#ffffff",
    border: "none",
    padding: "13px",
    borderRadius: "8px",
    cursor: "not-allowed",
    fontWeight: "bold",
    fontSize: "15px",
  },

  emptyBox: {
    border: "1px dashed #475569",
    borderRadius: "10px",
    padding: "40px",
    textAlign: "center",
    color: "#94a3b8",
  },

  resultSection: {
    marginBottom: "22px",
  },

  resultTitle: {
    marginBottom: "8px",
    color: "#38bdf8",
  },

  resultText: {
    color: "#dbeafe",
    lineHeight: "1.6",
  },

  fixedCodeHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  copyButton: {
    background: "#334155",
    color: "#ffffff",
    border: "1px solid #475569",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  codeBlock: {
    background: "#020617",
    color: "#22c55e",
    padding: "16px",
    borderRadius: "8px",
    overflowX: "auto",
    whiteSpace: "pre-wrap",
    lineHeight: "1.5",
  },
};

export default Debugger;