import { useState, useEffect } from "react";
import type { SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(300);

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

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: registerEmail,
        password: registerPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "OK") {
          setMessage(data.message);
          setShowVerification(true);
        }
      });
  }

  function handleVerify(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    fetch("http://localhost:5000/api/auth/verify-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: registerEmail,
        code: verificationCode,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMessage(data.message);

        if (data.status === "OK") {
          navigate("/login");
        }
      });
  }

  function handleResend() {
    fetch("http://localhost:5000/api/auth/resend-verification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: registerEmail,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);

        if (data.status === "OK") {
          setTimeLeft(300);
        }
      });
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

          <button type="submit">Verify email</button>
          <button type="button" onClick={handleResend} disabled={timeLeft > 0}>
            Resend code
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
          type="email"
          value={registerEmail}
          onChange={(e) => setRegisterEmail(e.target.value)}
        />
        <input
          type="password"
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Register;
