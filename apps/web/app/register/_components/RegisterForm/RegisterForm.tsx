"use client";

import { redirect } from "next/navigation";
import { useState } from "react";

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("https://localhost:4001/onboarding/register", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        confirmPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) redirect("/login");
    else setFormError("Registration failed. Please check required fields.");
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
      <input
        placeholder="Confirm Password..."
        type="password"
        onChange={handleConfirmPasswordChange}
      />
      <button type="submit">Login</button>
    </form>
  );
};
