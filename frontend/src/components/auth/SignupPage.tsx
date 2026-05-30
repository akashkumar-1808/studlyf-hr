import React from "react";
import AuthLayout from "./AuthLayout";
import AuthVisualPanel from "./AuthVisualPanel";
import SignupForm from "./SignupForm";

export default function SignupPage() {
  return (
    <AuthLayout 
      leftContent={<SignupForm />}
      rightContent={<AuthVisualPanel variant="signup" />}
    />
  );
}
