import { useState } from "react";
import type { SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const navigate = useNavigate();

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
