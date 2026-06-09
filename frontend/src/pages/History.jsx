import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Debug History</h1>
            <p style={styles.subtitle}>
              View your previously analyzed code and AI bug reports.
            </p>
          </div>

          <Link to="/debugger" style={styles.backButton}>
            Back to Debugger
          </Link>
        </div>

        {loading && <p style={styles.message}>Loading history...</p>}

        {!loading && history.length === 0 && (
          <div style={styles.emptyBox}>
            <h2>No history found</h2>
            <p>Analyze some code first to see your saved reports here.</p>
          </div>
        )}

        <div style={styles.historyList}>
          {history.map((item) => (
            <div key={item._id} style={styles.card}>
              <div style={styles.cardHeader}>
                <div>
                  <h2 style={styles.language}>{item.language}</h2>
                  <p style={styles.date}>
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>

                <span style={styles.badge}>{item.bugType}</span>
              </div>

              <div style={styles.infoGrid}>
                <div style={styles.infoBox}>
                  <h3 style={styles.sectionTitle}>Bug Location</h3>
                  <p style={styles.text}>{item.bugLocation}</p>
                </div>

                <div style={styles.infoBox}>
                  <h3 style={styles.sectionTitle}>Prevention Tip</h3>
                  <p style={styles.text}>{item.preventionTip}</p>
                </div>
              </div>

              <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Explanation</h3>
                <p style={styles.text}>{item.explanation}</p>
              </div>

              <div style={styles.codeGrid}>
                <div>
                  <h3 style={styles.sectionTitle}>Original Code</h3>
                  <pre style={styles.originalCode}>
                    <code>{item.originalCode}</code>
                  </pre>
                </div>

                <div>
                  <h3 style={styles.sectionTitle}>Fixed Code</h3>
                  <pre style={styles.fixedCode}>
                    <code>{item.fixedCode}</code>
                  </pre>
                </div>
              </div>
            </div>
          ))}
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

  backButton: {
    textDecoration: "none",
    background: "#2563eb",
    color: "#ffffff",
    padding: "10px 16px",
    borderRadius: "8px",
    fontWeight: "bold",
  },

  message: {
    color: "#cbd5e1",
  },

  emptyBox: {
    background: "#111827",
    border: "1px dashed #475569",
    borderRadius: "12px",
    padding: "50px",
    textAlign: "center",
    color: "#94a3b8",
  },

  historyList: {
    display: "flex",
    flexDirection: "column",
    gap: "25px",
  },

  card: {
    background: "#111827",
    border: "1px solid #334155",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    gap: "20px",
  },

  language: {
    margin: "0",
    color: "#ffffff",
  },

  date: {
    color: "#94a3b8",
    marginTop: "6px",
  },

  badge: {
    background: "#1e40af",
    color: "#dbeafe",
    padding: "8px 14px",
    borderRadius: "999px",
    fontWeight: "bold",
    fontSize: "14px",
  },

  infoGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "18px",
    marginBottom: "20px",
  },

  infoBox: {
    background: "#020617",
    border: "1px solid #334155",
    borderRadius: "10px",
    padding: "16px",
  },

  section: {
    marginBottom: "20px",
  },

  sectionTitle: {
    color: "#38bdf8",
    marginBottom: "10px",
  },

  text: {
    color: "#dbeafe",
    lineHeight: "1.6",
  },

  codeGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "18px",
  },

  originalCode: {
    background: "#020617",
    color: "#ffffff",
    padding: "16px",
    borderRadius: "8px",
    overflowX: "auto",
    whiteSpace: "pre-wrap",
    lineHeight: "1.5",
    minHeight: "160px",
  },

  fixedCode: {
    background: "#020617",
    color: "#22c55e",
    padding: "16px",
    borderRadius: "8px",
    overflowX: "auto",
    whiteSpace: "pre-wrap",
    lineHeight: "1.5",
    minHeight: "160px",
  },
};

export default History;