"use client";

import { redirect } from "next/navigation";
import { useState } from "react";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("https://localhost:4001/api/onboarding/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) redirect("/maps");
    else setFormError("Login failed. Please check your credentials.");
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>{formError}</p>
      <input
        placeholder="File Name..."
        type="text"
        onChange={handleEmailChange}
      />
      <input
        placeholder="Password..."
        type="password"
        onChange={handlePasswordChange}
      />
      <button type="submit">Login</button>
    </form>
  );
};
