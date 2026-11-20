import AuthShell from "@/components/AuthShell";
import LoginForm from "@/components/LoginForm";

export const metadata = {
  title: "Sign in",
  description: "Sign in to your ScentTrail Pods account to see orders and saved details.",
};

export default async function LoginPage({ searchParams }) {
  const params = await searchParams;
  const next = typeof params?.next === "string" && params.next.startsWith("/") ? params.next : "/account";
  return (
    <AuthShell variant="login">
      <LoginForm next={next} />
    </AuthShell>
  );
}
