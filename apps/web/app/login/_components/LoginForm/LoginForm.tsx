"use client";

import { apiClient } from "@repo/clients";
import { Button, Input, ErrorMessage } from "@repo/components";
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

    const res = await apiClient("/api/onboarding/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) redirect("/campaigns");
    else setFormError("Login failed. Please check your credentials.");
  };

  const error = formError ? (
    <ErrorMessage>{formError}</ErrorMessage>
  ) : null;

  return (
    <form className="flex flex-col gap-6 min-w-sm" onSubmit={handleSubmit}>
      {error}
      <div className="flex flex-col gap-2">
        <Input
          placeholder="Email..."
          type="text"
          onChange={handleEmailChange}
        />
        <Input
          placeholder="Password..."
          type="password"
          onChange={handlePasswordChange}
        />
      </div>
      <Button type="submit">Login</Button>
    </form>
  );
};
