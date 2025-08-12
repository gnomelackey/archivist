"use client";

import { Button, ErrorMessage, Input } from "@repo/components";
import { redirect } from "next/navigation";
import { useState } from "react";

export const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");

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

  const error = formError ? <ErrorMessage>{formError}</ErrorMessage> : null;

  return (
    <form className="flex flex-col gap-6 min-w-sm" onSubmit={handleSubmit}>
      {error}
      <Input
        name="email"
        placeholder="Email..."
        type="text"
        onChange={handleEmailChange}
      />
      <Input
        name="name"
        placeholder="Name..."
        type="text"
        onChange={handleNameChange}
      />
      <Input
        name="password"
        placeholder="Password..."
        type="password"
        onChange={handlePasswordChange}
      />
      <Input
        name="confirm"
        placeholder="Confirm Password..."
        type="password"
        onChange={handleConfirmPasswordChange}
      />
      <Button type="submit">Register</Button>
    </form>
  );
};
