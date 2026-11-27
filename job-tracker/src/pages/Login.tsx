import { useState } from "react";
import type { SubmitEvent } from "react";
import type { CurrentUser } from "../types/types";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";

type LoginProps = {
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | null>>;
};

function Login({ setCurrentUser }: LoginProps) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
          rememberMe,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setMessage(data.message);
        return;
      }
      setCurrentUser(data.user);
      navigate("/")
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

return (
  <div className="auth-page">
    <div className="auth-card">
      <div className="auth-header">
        <h1>Welcome back</h1>
        <p>Sign in to continue to JobTrackly</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div className="auth-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        <div className="auth-options">
          <label className="remember-option" htmlFor="rememberMe">
            <input
              id="rememberMe"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember me
          </label>

          <Link className="auth-link" to="/forgot-password">
            Forgot password?
          </Link>
        </div>

        {message && <p className="auth-message">{message}</p>}

        <button
          className="auth-submit"
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="auth-footer-text">
        Don't have an account?{" "}
        <Link className="auth-link" to="/register">
          Register
        </Link>
      </p>
    </div>
  </div>
);
}

export default Login;
