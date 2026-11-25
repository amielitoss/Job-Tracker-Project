import { useState, useEffect } from "react";
import type { SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(300);
  const [name, setName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!showVerification || timeLeft <= 0) return;

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [showVerification, timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email: registerEmail,
          password: registerPassword,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setMessage(data.message);
        return;
      }
      setMessage(data.message);
      setShowVerification(true);
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerify(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/verify-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: registerEmail,
            code: verificationCode,
          }),
        },
      );

      const data = await response.json();
      if (!response.ok) {
        setMessage(data.message);
        return;
      }

      if (data.status === "OK") {
        setMessage(data.message);
        navigate("/login");
      }
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/resend-verification",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: registerEmail,
          }),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        setMessage(data.message);
        return;
      }
      if (data.status === "OK") {
        setMessage(data.message);
        setTimeLeft(300);
      }
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (showVerification) {
    return (
      <div className="register-form">
        <form onSubmit={handleVerify}>
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Enter 6-digit code"
          />

          <button type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Verify email"}
          </button>
          <button
            type="button"
            onClick={handleResend}
            disabled={timeLeft > 0 || loading}
          >
            {loading ? "Sending..." : "Resend code"}
          </button>
          <p>
            {timeLeft > 0
              ? `Code expires in ${minutes}:${seconds.toString().padStart(2, "0")}`
              : "Code expired. You can request a new one."}
          </p>
        </form>
        <p>{message}</p>
      </div>
    );
  }

  return (
    <div className="register-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="email"
          value={registerEmail}
          onChange={(e) => setRegisterEmail(e.target.value)}
          placeholder="example@gmail.com"
        />
        <input
          type="password"
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Register"}
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Register;
