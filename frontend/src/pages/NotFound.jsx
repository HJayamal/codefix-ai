import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="notfound-page">
      <div className="bg-grid"></div>
      <div className="bg-glow glow-one"></div>
      <div className="bg-glow glow-two"></div>

      <main className="notfound-main">
        <section className="error-visual">
          <div className="floating-code status-text">{`{ status: 404 }`}</div>
          <div className="floating-code unreachable-text">unreachable_code</div>

          <div className="bot-card">
            <div className="bot-face">
              <span></span>
              <span></span>
            </div>
            <div className="bot-neck"></div>
          </div>

          <div className="mini-terminal">
            <div className="terminal-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="terminal-line line-one"></div>
            <div className="terminal-line line-two"></div>
            <div className="terminal-line line-three"></div>

            <div className="error-line">
              <span>×</span>
              <div></div>
            </div>
          </div>
        </section>

        <section className="content">
          <h1>
            Syntax Error <span>404</span>
          </h1>

          <p className="subtitle">
            The AI searched through millions of lines of code but couldn&apos;t
            find this page.
          </p>

          <div className="error-pill">
            <span>▣</span>
            <code>Error: Path window.location.href not found in registry.</code>
          </div>

          <Link to="/" className="home-btn">
            <span>⌂</span>
            Back to Home
          </Link>

          <div className="debug-meta">
            <div>
              <h3>LATENCY</h3>
              <p>0.042ms</p>
            </div>

            <div>
              <h3>TRACE_ID</h3>
              <p>CFX-992-ALPHA</p>
            </div>

            <div>
              <h3>ENVIRONMENT</h3>
              <p>production</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="notfound-footer">
        <Link to="/" className="footer-logo">
          CodeFix AI
        </Link>

        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Documentation</a>
          <a href="#">Support</a>
        </div>

        <p>© 2026 CodeFix AI. Built for the next generation of engineers.</p>
      </footer>

      <style>{`
        * {
          box-sizing: border-box;
        }

        .notfound-page {
          width: 100%;
          min-height: 100vh;
          background: #0b101a;
          color: #f8fafc;
          font-family: Inter, Arial, sans-serif;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .bg-grid {
          position: fixed;
          inset: 0;
          background-image:
            radial-gradient(rgba(148, 163, 184, 0.14) 1px, transparent 1px);
          background-size: 34px 34px;
          opacity: 0.1;
          animation: gridMove 14s linear infinite;
          pointer-events: none;
        }

        .bg-glow {
          position: fixed;
          width: 520px;
          height: 520px;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.28;
          pointer-events: none;
        }

        .glow-one {
          top: 10%;
          left: 20%;
          background: #60a5fa;
          animation: glowPulse 6s ease-in-out infinite alternate;
        }

        .glow-two {
          bottom: 12%;
          right: 16%;
          background: #8b5cf6;
          animation: glowPulse 7s ease-in-out infinite alternate-reverse;
        }

        .notfound-main {
          flex: 1;
          min-height: calc(100vh - 145px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 24px 80px;
          position: relative;
          z-index: 2;
        }

        .error-visual {
          width: min(410px, 92vw);
          height: 335px;
          border: 1px solid rgba(148, 163, 184, 0.28);
          border-radius: 14px;
          background:
            radial-gradient(circle at top, rgba(96, 165, 250, 0.1), transparent 45%),
            rgba(17, 24, 39, 0.55);
          position: relative;
          margin-bottom: 64px;
          box-shadow: 0 35px 100px rgba(0, 0, 0, 0.38);
          animation: floatBox 5s ease-in-out infinite;
        }

        .floating-code {
          position: absolute;
          font-family: Georgia, serif;
          color: #67e8f9;
          font-size: 15px;
          font-style: italic;
          opacity: 0.75;
        }

        .status-text {
          top: 24px;
          right: 74px;
          transform: rotate(12deg);
          animation: driftOne 4s ease-in-out infinite;
        }

        .unreachable-text {
          top: 150px;
          left: 80px;
          color: #c4b5fd;
          transform: rotate(-14deg);
          animation: driftTwo 4.5s ease-in-out infinite;
        }

        .bot-card {
          position: absolute;
          top: 42px;
          left: 50%;
          transform: translateX(-50%);
          width: 122px;
          height: 122px;
          border: 3px solid rgba(147, 197, 253, 0.35);
          border-radius: 20px;
          background: #171c28;
          box-shadow:
            0 0 35px rgba(147, 197, 253, 0.14),
            inset 0 0 20px rgba(255, 255, 255, 0.02);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: botFloat 3.4s ease-in-out infinite;
        }

        .bot-face {
          display: flex;
          gap: 18px;
        }

        .bot-face span {
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background: #fca5a5;
          box-shadow: 0 0 18px rgba(252, 165, 165, 0.4);
          animation: eyeBlink 3s infinite;
        }

        .bot-face span:nth-child(2) {
          background: #9f7a83;
        }

        .bot-neck {
          position: absolute;
          width: 60px;
          height: 6px;
          background: #93c5fd;
          border-radius: 999px;
          bottom: -8px;
          opacity: 0.9;
        }

        .mini-terminal {
          position: absolute;
          width: 325px;
          left: 50%;
          bottom: 42px;
          transform: translateX(-50%);
          background: #050814;
          border-radius: 8px;
          padding: 18px 20px 22px;
          box-shadow: 0 22px 70px rgba(0, 0, 0, 0.45);
          animation: terminalRise 0.9s ease forwards;
        }

        .terminal-dots {
          display: flex;
          gap: 8px;
          margin-bottom: 13px;
        }

        .terminal-dots span {
          width: 11px;
          height: 11px;
          border-radius: 50%;
          background: #fca5a5;
          opacity: 0.45;
        }

        .terminal-dots span:nth-child(2) {
          background: #64748b;
        }

        .terminal-dots span:nth-child(3) {
          background: #64748b;
        }

        .terminal-line {
          height: 9px;
          border-radius: 999px;
          background: #374151;
          margin-bottom: 10px;
          position: relative;
          overflow: hidden;
        }

        .terminal-line::after {
          content: "";
          position: absolute;
          inset: 0;
          transform: translateX(-100%);
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.18),
            transparent
          );
          animation: shimmer 2s infinite;
        }

        .line-one {
          width: 72%;
        }

        .line-two {
          width: 94%;
          background: rgba(248, 113, 113, 0.3);
        }

        .line-three {
          width: 48%;
        }

        .error-line {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 10px;
        }

        .error-line span {
          color: #fca5a5;
          font-size: 22px;
        }

        .error-line div {
          height: 10px;
          width: 68%;
          border-radius: 999px;
          background: rgba(248, 113, 113, 0.42);
        }

        .content {
          text-align: center;
          max-width: 720px;
          animation: fadeUp 0.9s ease forwards;
        }

        .content h1 {
          margin: 0 0 22px;
          font-size: clamp(48px, 5vw, 70px);
          line-height: 1;
          letter-spacing: -2.2px;
          color: #bfdbfe;
          text-shadow: 0 12px 40px rgba(96, 165, 250, 0.18);
        }

        .content h1 span {
          color: #67e8f9;
        }

        .subtitle {
          color: #d1d5db;
          font-size: clamp(22px, 2.2vw, 31px);
          line-height: 1.35;
          font-weight: 800;
          margin: 0 auto 30px;
          max-width: 690px;
        }

        .error-pill {
          width: fit-content;
          max-width: 100%;
          margin: 0 auto 58px;
          padding: 12px 22px;
          border-radius: 999px;
          background: rgba(148, 163, 184, 0.12);
          border: 1px solid rgba(148, 163, 184, 0.22);
          color: #e5e7eb;
          display: flex;
          align-items: center;
          gap: 13px;
          box-shadow: 0 18px 50px rgba(0, 0, 0, 0.18);
        }

        .error-pill span {
          color: #c4b5fd;
          font-size: 20px;
        }

        .error-pill code {
          font-family: "Fira Code", Consolas, monospace;
          font-size: 15px;
          color: #e9d5ff;
        }

        .home-btn {
          width: 300px;
          max-width: 100%;
          height: 76px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          border-radius: 11px;
          background: linear-gradient(135deg, #bfdbfe, #8b5cf6);
          color: #0f172a;
          text-decoration: none;
          font-size: 25px;
          font-weight: 950;
          box-shadow: 0 22px 56px rgba(96, 165, 250, 0.32);
          transition: 0.25s ease;
        }

        .home-btn:hover {
          transform: translateY(-4px);
          box-shadow: 0 30px 70px rgba(139, 92, 246, 0.42);
        }

        .debug-meta {
          margin: 90px auto 0;
          display: flex;
          justify-content: center;
          gap: 70px;
          flex-wrap: wrap;
          color: #717989;
        }

        .debug-meta h3 {
          margin: 0 0 10px;
          font-size: 14px;
          letter-spacing: 1.7px;
          font-family: Georgia, serif;
        }

        .debug-meta p {
          margin: 0;
          font-size: 16px;
          font-family: Georgia, serif;
        }

        .notfound-footer {
          position: relative;
          z-index: 3;
          min-height: 145px;
          border-top: 1px solid rgba(148, 163, 184, 0.24);
          background: rgba(5, 8, 20, 0.86);
          backdrop-filter: blur(16px);
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 36px;
          padding: 0 30px;
        }

        .footer-logo {
          color: #bfdbfe;
          text-decoration: none;
          font-size: 28px;
          font-weight: 950;
          letter-spacing: -0.7px;
        }

        .footer-links {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 34px;
          flex-wrap: wrap;
        }

        .footer-links a {
          color: #d1d5db;
          text-decoration: none;
          font-size: 16px;
          transition: 0.25s ease;
        }

        .footer-links a:hover {
          color: #67e8f9;
        }

        .notfound-footer p {
          color: #9ca3af;
          font-size: 16px;
          text-align: right;
          margin: 0;
        }

        @keyframes gridMove {
          from {
            background-position: 0 0;
          }

          to {
            background-position: 34px 34px;
          }
        }

        @keyframes glowPulse {
          from {
            opacity: 0.18;
            transform: scale(1);
          }

          to {
            opacity: 0.36;
            transform: scale(1.16);
          }
        }

        @keyframes floatBox {
          0%, 100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-16px);
          }
        }

        @keyframes botFloat {
          0%, 100% {
            transform: translateX(-50%) translateY(0);
          }

          50% {
            transform: translateX(-50%) translateY(-10px);
          }
        }

        @keyframes eyeBlink {
          0%, 92%, 100% {
            transform: scaleY(1);
          }

          95% {
            transform: scaleY(0.2);
          }
        }

        @keyframes driftOne {
          0%, 100% {
            transform: rotate(12deg) translateY(0);
          }

          50% {
            transform: rotate(12deg) translateY(-9px);
          }
        }

        @keyframes driftTwo {
          0%, 100% {
            transform: rotate(-14deg) translateX(0);
          }

          50% {
            transform: rotate(-14deg) translateX(12px);
          }
        }

        @keyframes terminalRise {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(24px);
          }

          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }

        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
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

        @media (max-width: 900px) {
          .notfound-main {
            padding-top: 40px;
          }

          .notfound-footer {
            grid-template-columns: 1fr;
            text-align: center;
            padding: 30px 24px;
          }

          .notfound-footer p {
            text-align: center;
          }

          .footer-links {
            gap: 18px;
          }
        }

        @media (max-width: 560px) {
          .error-visual {
            height: 300px;
            margin-bottom: 44px;
          }

          .mini-terminal {
            width: 280px;
          }

          .error-pill {
            border-radius: 16px;
            align-items: flex-start;
          }

          .error-pill code {
            font-size: 13px;
          }

          .debug-meta {
            gap: 28px;
            margin-top: 60px;
          }

          .home-btn {
            height: 64px;
            font-size: 20px;
          }
        }
      `}</style>
    </div>
  );
}

export default NotFound;