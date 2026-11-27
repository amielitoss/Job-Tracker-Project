import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        setMessage(data.message);
        return;
      }
      navigate("/reset-password", {
        state: { email },
      });
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
  <div className="auth-page">
    <div className="auth-card">
      <div className="auth-header">
        <h1>Forgot your password?</h1>
        <p>
          Enter your email and we’ll send you a code to reset your password.
        </p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-field">
          <label htmlFor="forgot-email">Email</label>

          <input
            id="forgot-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@gmail.com"
            autoComplete="email"
          />
        </div>

        {message && <p className="auth-message">{message}</p>}

        <button
          className="auth-submit"
          type="submit"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send reset code"}
        </button>
      </form>

      <p className="auth-footer-text">
        Remember your password?{" "}
        <Link className="auth-link" to="/login">
          Back to login
        </Link>
      </p>
    </div>
  </div>
);
}

export default ForgotPassword;
