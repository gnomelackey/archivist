import Link from "next/link";
import { LoginForm } from "./_components/LoginForm";

export default function Login() {
  return (
    <div className="flex flex-col justify-center gap-8 h-screen ">
      <LoginForm />
      <p>
        {`Don't have an account? `}
        <Link style={{ color: "#FFFF11" }} href="/register" prefetch>
          Register
        </Link>
      </p>
    </div>
  );
}
