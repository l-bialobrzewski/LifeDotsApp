import { redirect } from "next/navigation";

import { isWaitlistMode } from "@/lib/marketing/config";

import SignupForm from "./SignupForm";

export default function SignupPage() {
  if (isWaitlistMode()) {
    redirect("/");
  }

  return <SignupForm />;
}
