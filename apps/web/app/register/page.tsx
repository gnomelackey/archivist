import Link from "next/link";

import { RegisterForm } from "./_components/RegisterForm";

export default function Register() {
  return (
    <div className="flex flex-col justify-center gap-8">
      <RegisterForm />
      <p>
        {`Already have an account? `}
        <Link style={{ color: "#FFFF11" }} href="/login" prefetch>
          Login
        </Link>
      </p>
    </div>
  );
}
