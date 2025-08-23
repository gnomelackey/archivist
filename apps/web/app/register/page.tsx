import Link from "next/link";

import { RegisterForm } from "./_components/RegisterForm";

export default function Register() {
  return (
    <div className="flex flex-col justify-center gap-8 h-screen items-center">
      <RegisterForm />
      <p>
        {`Already have an account? `}
        <Link className="text-error-600" href="/login" prefetch>
          Login
        </Link>
      </p>
    </div>
  );
}
