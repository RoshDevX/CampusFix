import { useState } from "react";
import { useLocation } from "react-router";
import LoginForm from "./LoginForm";
import SignupForm from "./SignUpForm";

function AuthCard() {
  const location = useLocation();
  const [showOtherForm, setShowOtherForm] = useState(null);

  const isSignUp = 
      showOtherForm === null
      ? location.pathname === '/signup'
      : showOtherForm;

  return (
    <div className="w-full max-w-md relative">
      <div
        className={`transition-all duration-300 ease-in-out ${
          isSignUp
            ? "opacity-0 -translate-x-4"
            : "opacity-100 translate-x-0"
        }`}
      >
        {!isSignUp && (
          <LoginForm onCreateAccount={() => setShowOtherForm(true)} />
        )}
      </div>

      <div
        className={`transition-all duration-300 ease-in-out ${
          isSignUp
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-4 absolute inset-0 pointer-events-none"
        }`}
      >
        {isSignUp && (
          <SignupForm onBackToLogin={() => setShowOtherForm(false)} />
        )}
      </div>
    </div>
  );
}

export default AuthCard;