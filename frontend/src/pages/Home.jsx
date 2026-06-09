import { Link } from "react-router-dom";
import "../styles/home.css";

function Home() {
  return (
    <div className="home-page">
      <nav className="home-navbar">
        <Link to="/" className="home-logo">
          CodeFix <span>AI</span>
        </Link>

        <div className="home-nav-links">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#workflow">How It Works</a>
        </div>

        <div className="home-nav-actions">
          <Link to="/login" className="home-login">
            Login
          </Link>
          <Link to="/register" className="home-register">
            Register
          </Link>
        </div>
      </nav>

      <section id="home" className="hero-section">
        <div className="hero-glow"></div>

        <div className="hero-content">
          <div className="hero-badge">⚡ AI-powered debugging assistant</div>

          <h1 className="hero-title">
            Fix Code Bugs Faster with <span>AI</span>
          </h1>

          <p className="hero-description">
            Stop wasting hours tracing stack traces. Paste your problematic
            code and error logs, then let CodeFix AI generate precise fixes,
            clear explanations, and prevention tips instantly.
          </p>

          <div className="hero-buttons">
            <Link to="/debugger" className="btn-main">
              Start Debugging
            </Link>

            <a href="#features" className="btn-outline">
              View Demo
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="code-window">
            <div className="code-top">
              <div className="window-dots">
                <span style={{ background: "#ef4444" }}></span>
                <span style={{ background: "#f59e0b" }}></span>
                <span style={{ background: "#22c55e" }}></span>
              </div>

              <span className="file-name">main.py</span>
            </div>

            <pre className="code-body">
{`def calculate_total(items):
    total = 0
    `}
<span className="line-error">for item in items</span>
{`
        total += item.price

print(calculate_total(cart))`}
            </pre>
          </div>

          <div className="ai-card">
            <p className="ai-card-title">✦ FIX SUGGESTION</p>
            <p>
              Missing colon <strong>:</strong> at the end of the for-loop
              declaration on line 3.
            </p>
            <code className="ai-code">for item in items:</code>
          </div>
        </div>
      </section>

      <section className="languages-section">
        <span className="languages-label">SUPPORTED LANGUAGES</span>

        <div className="languages-list">
          <span>🟨 JavaScript</span>
          <span>🐍 Python</span>
          <span>☕ Java</span>
          <span>◼ C++</span>
        </div>
      </section>

      <section id="features" className="features-section">
        <div className="section-header">
          <p className="section-kicker">FEATURES</p>
          <h2 className="section-title">Advanced Debugging Suite</h2>
          <p className="section-subtitle">
            Everything you need to ship cleaner code and learn from mistakes
            faster than ever.
          </p>
        </div>

        <div className="feature-grid">
          {features.map((feature) => (
            <div className="feature-card" key={feature.title}>
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-text">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="workflow" className="workflow-section">
        <div className="section-header">
          <p className="section-kicker">WORKFLOW</p>
          <h2 className="section-title">4 Steps to Code Perfection</h2>
          <p className="section-subtitle">
            A simple workflow for debugging, learning, and improving your code.
          </p>
        </div>

        <div className="workflow-grid">
          {workflow.map((step) => (
            <div className="workflow-card" key={step.number}>
              <span className="workflow-number">{step.number}</span>
              <div className="workflow-icon">{step.icon}</div>
              <h3 className="workflow-title">{step.title}</h3>
              <p className="workflow-text">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-box">
          <h2 className="cta-title">Ready to Eliminate Your Tech Debt?</h2>
          <p className="cta-text">
            Join developers who are building faster with CodeFix AI&apos;s
            intelligent debugging environment.
          </p>

          <div className="cta-buttons">
            <Link to="/register" className="btn-main">
              Get Started for Free
            </Link>

            <Link to="/debugger" className="btn-outline">
              Try Debugger
            </Link>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <h3>CodeFix AI</h3>
            <p>
              Empowering developers to solve complex programming problems with
              AI-powered bug detection and code correction.
            </p>
          </div>

          <div className="footer-columns">
            <div>
              <h4 className="footer-heading">Product</h4>
              <p className="footer-link">Features</p>
              <p className="footer-link">Debugger</p>
              <p className="footer-link">History</p>
            </div>

            <div>
              <h4 className="footer-heading">Resources</h4>
              <p className="footer-link">Documentation</p>
              <p className="footer-link">Community</p>
              <p className="footer-link">Support</p>
            </div>

            <div>
              <h4 className="footer-heading">Legal</h4>
              <p className="footer-link">Privacy Policy</p>
              <p className="footer-link">Terms of Service</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 CodeFix AI. Built by Harsha Jayamal.</span>
          <span>Status · Changelog</span>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: "🔍",
    title: "AI Bug Detection",
    description:
      "Scan code patterns to find syntax errors, logical bugs, runtime issues, and performance problems instantly.",
  },
  {
    icon: "🪄",
    title: "Fixed Code Generator",
    description:
      "Receive corrected code snippets that are ready to copy, test, and improve inside your project.",
  },
  {
    icon: "🎓",
    title: "Beginner Explanation",
    description:
      "Understand the reason behind each bug with simple explanations designed for students and beginners.",
  },
  {
    icon: "↺",
    title: "Debug History",
    description:
      "Save every AI debugging report and build your own personal knowledge base of solved issues.",
  },
  {
    icon: "🌐",
    title: "Multi-language",
    description:
      "Support for JavaScript, Python, Java, C++, and more programming languages in future versions.",
  },
  {
    icon: "🛡",
    title: "Prevention Tips",
    description:
      "Learn how to avoid similar mistakes, write cleaner code, and prevent security issues in the future.",
  },
];

const workflow = [
  {
    number: "01",
    icon: "▣",
    title: "Paste Code",
    description:
      "Drop your problematic code snippet into the intelligent editor interface.",
  },
  {
    number: "02",
    icon: "ⓘ",
    title: "Add Error",
    description:
      "Paste the console error message or stack trace to give AI full context.",
  },
  {
    number: "03",
    icon: "⚡",
    title: "Get Report",
    description:
      "Generate a bug report with root cause, fixed code, and explanation.",
  },
  {
    number: "04",
    icon: "▰",
    title: "Review History",
    description:
      "Save the solution to your history and continue coding with confidence.",
  },
];

export default Home;