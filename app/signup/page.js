import AuthShell from "@/components/AuthShell";
import SignupForm from "@/components/SignupForm";

export const metadata = {
  title: "Create account",
  description: "Create a ScentTrail Pods account for faster checkout and order tracking.",
};

export default async function SignupPage({ searchParams }) {
  const params = await searchParams;
  const next = typeof params?.next === "string" && params.next.startsWith("/") ? params.next : "/account";
  return (
    <AuthShell variant="signup">
      <SignupForm next={next} />
    </AuthShell>
  );
}
