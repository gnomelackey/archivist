import Link from "next/link";
import { LoginForm } from "./_components/LoginForm";

export default function Login() {
  return (
    <div>
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
