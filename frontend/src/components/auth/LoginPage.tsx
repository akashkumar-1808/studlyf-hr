import React from "react";
import AuthLayout from "./AuthLayout";
import AuthVisualPanel from "./AuthVisualPanel";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout 
      leftContent={<AuthVisualPanel variant="login" />}
      rightContent={<LoginForm />}
    />
  );
}
