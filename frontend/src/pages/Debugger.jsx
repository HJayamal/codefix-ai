import { useState } from "react";
import Editor from "@monaco-editor/react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

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

  const clearForm = () => {
    setCode("");
    setErrorMessage("");
    setResult(null);
  };

  const copyFixedCode = () => {
    if (result?.fixedCode) {
      navigator.clipboard.writeText(result.fixedCode);
      alert("Fixed code copied");
    }
  };

  return (
    <div className="page">
      <Navbar />

      <div className="container">
        <div style={styles.headingBlock}>
          <span className="badge">AI Code Debugger</span>
          <h1 style={styles.pageTitle}>Analyze, understand, and fix bugs faster</h1>
          <p style={styles.pageSubtitle}>
            Paste your code, add the exact error message, and CodeFix AI will
            generate a beginner-friendly bug report with corrected code.
          </p>
        </div>

        <div style={styles.mainGrid}>
          {/* Left Panel */}
          <div className="card" style={styles.panel}>
            <div style={styles.panelHeader}>
              <div>
                <h2 style={styles.panelTitle}>Code Input</h2>
                <p style={styles.panelText}>Select language and paste your code.</p>
              </div>

              <select
                className="select"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                style={styles.languageSelect}
              >
                <option>JavaScript</option>
                <option>Python</option>
                <option>Java</option>
                <option>C++</option>
              </select>
            </div>

            <div style={styles.editorShell}>
              <div style={styles.editorTopBar}>
                <div style={styles.windowDots}>
                  <span style={{ ...styles.dot, background: "#ef4444" }}></span>
                  <span style={{ ...styles.dot, background: "#f59e0b" }}></span>
                  <span style={{ ...styles.dot, background: "#22c55e" }}></span>
                </div>

                <span style={styles.fileName}>
                  {language.toLowerCase()}-bug-example
                </span>
              </div>

              <Editor
                height="380px"
                language={language.toLowerCase()}
                value={code}
                onChange={(value) => setCode(value || "")}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  wordWrap: "on",
                  automaticLayout: true,
                  padding: { top: 15 },
                }}
              />
            </div>

            <label style={styles.label}>Error Message</label>
            <textarea
              className="textarea"
              placeholder="Paste error message here..."
              value={errorMessage}
              onChange={(e) => setErrorMessage(e.target.value)}
              style={styles.errorBox}
            />

            <p style={styles.helperText}>
              Tip: Adding the exact error message improves AI accuracy.
            </p>

            <div style={styles.actionRow}>
              <button
                onClick={analyzeCode}
                disabled={loading}
                className="btn-primary"
                style={styles.actionButton}
              >
                {loading ? "Analyzing..." : "Analyze Code"}
              </button>

              <button
                onClick={clearForm}
                className="btn-secondary"
                style={styles.clearButton}
              >
                Clear
              </button>
            </div>
          </div>

          {/* Right Panel */}
          <div className="card" style={styles.panel}>
            <div style={styles.panelHeader}>
              <div>
                <h2 style={styles.panelTitle}>AI Bug Report</h2>
                <p style={styles.panelText}>Your AI-generated result appears here.</p>
              </div>

              {result && <span className="badge">Saved</span>}
            </div>

            {!result && !loading && (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>⚡</div>
                <h3 style={styles.emptyTitle}>No analysis yet</h3>
                <p style={styles.emptyText}>
                  Enter your code and click Analyze Code to generate a bug report.
                </p>
              </div>
            )}

            {loading && (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>🤖</div>
                <h3 style={styles.emptyTitle}>AI is analyzing...</h3>
                <p style={styles.emptyText}>
                  CodeFix AI is checking your code and preparing the fix.
                </p>
              </div>
            )}

            {result && (
              <div>
                <div style={styles.reportGrid}>
                  <div style={styles.infoCard}>
                    <h3 style={styles.infoTitle}>Bug Type</h3>
                    <p style={styles.infoText}>{result.bugType}</p>
                  </div>

                  <div style={styles.infoCard}>
                    <h3 style={styles.infoTitle}>Bug Location</h3>
                    <p style={styles.infoText}>{result.bugLocation}</p>
                  </div>
                </div>

                <div style={styles.section}>
                  <h3 style={styles.sectionTitle}>Explanation</h3>
                  <p style={styles.resultText}>{result.explanation}</p>
                </div>

                <div style={styles.section}>
                  <div style={styles.codeHeader}>
                    <h3 style={styles.sectionTitle}>Fixed Code</h3>
                    <button onClick={copyFixedCode} style={styles.copyButton}>
                      Copy Code
                    </button>
                  </div>

                  <pre className="code-block" style={styles.fixedCodeBlock}>
                    <code>{result.fixedCode}</code>
                  </pre>
                </div>

                <div style={styles.tipBox}>
                  <h3 style={styles.tipTitle}>Prevention Tip</h3>
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
  headingBlock: {
    textAlign: "center",
    maxWidth: "820px",
    margin: "0 auto 34px auto",
    paddingTop: "28px",
  },

  pageTitle: {
    fontSize: "44px",
    lineHeight: "1.1",
    color: "#ffffff",
    margin: "18px 0 14px",
  },

  pageSubtitle: {
    color: "#cbd5e1",
    fontSize: "17px",
    lineHeight: "1.7",
  },

  mainGrid: {
    display: "grid",
    gridTemplateColumns: "1.05fr 0.95fr",
    gap: "24px",
    alignItems: "start",
  },

  panel: {
    padding: "24px",
  },

  panelHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "16px",
    marginBottom: "20px",
  },

  panelTitle: {
    color: "#ffffff",
    margin: "0 0 6px 0",
  },

  panelText: {
    color: "#94a3b8",
    margin: 0,
  },

  languageSelect: {
    maxWidth: "190px",
  },

  editorShell: {
    border: "1px solid #334155",
    borderRadius: "14px",
    overflow: "hidden",
    background: "#020617",
    marginBottom: "18px",
  },

  editorTopBar: {
    height: "42px",
    background: "#020617",
    borderBottom: "1px solid #1e293b",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 14px",
  },

  windowDots: {
    display: "flex",
    gap: "7px",
  },

  dot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    display: "inline-block",
  },

  fileName: {
    color: "#94a3b8",
    fontSize: "13px",
  },

  label: {
    display: "block",
    color: "#cbd5e1",
    marginBottom: "8px",
    fontWeight: "bold",
  },

  errorBox: {
    height: "110px",
  },

  helperText: {
    color: "#94a3b8",
    fontSize: "14px",
    marginTop: "10px",
  },

  actionRow: {
    display: "flex",
    gap: "12px",
    marginTop: "18px",
  },

  actionButton: {
    flex: 1,
  },

  clearButton: {
    width: "120px",
  },

  emptyState: {
    minHeight: "520px",
    border: "1px dashed #334155",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "#94a3b8",
    padding: "30px",
  },

  emptyIcon: {
    fontSize: "44px",
    marginBottom: "16px",
  },

  emptyTitle: {
    color: "#ffffff",
    marginBottom: "8px",
  },

  emptyText: {
    maxWidth: "360px",
    lineHeight: "1.6",
  },

  reportGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "14px",
    marginBottom: "20px",
  },

  infoCard: {
    background: "#020617",
    border: "1px solid #334155",
    borderRadius: "12px",
    padding: "18px",
  },

  infoTitle: {
    color: "#38bdf8",
    marginTop: 0,
    marginBottom: "8px",
  },

  infoText: {
    color: "#dbeafe",
    lineHeight: "1.5",
  },

  section: {
    marginBottom: "22px",
  },

  sectionTitle: {
    color: "#38bdf8",
    marginBottom: "10px",
  },

  resultText: {
    color: "#dbeafe",
    lineHeight: "1.7",
  },

  codeHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  copyButton: {
    background: "#1e293b",
    color: "#ffffff",
    border: "1px solid #334155",
    borderRadius: "8px",
    padding: "8px 12px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  fixedCodeBlock: {
    marginTop: "10px",
    minHeight: "180px",
  },

  tipBox: {
    background: "rgba(34, 197, 94, 0.08)",
    border: "1px solid rgba(34, 197, 94, 0.25)",
    borderRadius: "12px",
    padding: "18px",
  },

  tipTitle: {
    color: "#22c55e",
    marginTop: 0,
  },
};

export default Debugger;