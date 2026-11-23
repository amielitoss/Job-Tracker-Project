import { useState } from "react";
import type { SubmitEvent } from "react";
import type { CurrentUser } from "../types/types";
import { Link } from "react-router-dom";

type LoginProps = {
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | null>>;
};

function Login({ setCurrentUser }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "OK") {
          setCurrentUser(data.user);
        }
      });
  }

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <Link to="/forgot-password">Forgot password?</Link>
      </form>
    </div>
  );
}

export default Login;
