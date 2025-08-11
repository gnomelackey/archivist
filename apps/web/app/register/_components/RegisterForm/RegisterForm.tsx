"use client";

import { redirect } from "next/navigation";
import { useState } from "react";

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/onboarding/register", {
      method: "POST",
      body: JSON.stringify({
        name,
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
      <input placeholder="Email..." type="text" onChange={handleEmailChange} />
      <input placeholder="Name..." type="text" onChange={handleNameChange} />
      <input
        placeholder="Password..."
        type={showPassword ? "text" : "password"}
        onChange={handlePasswordChange}
      />
      <button type="button" onClick={toggleShowPassword}>
        Show
      </button>
      <input
        placeholder="Confirm Password..."
        type={showConfirmPassword ? "text" : "password"}
        onChange={handleConfirmPasswordChange}
      />
      <button type="button" onClick={toggleShowConfirmPassword}>
        Show
      </button>
      <button type="submit">Register</button>
    </form>
  );
};
