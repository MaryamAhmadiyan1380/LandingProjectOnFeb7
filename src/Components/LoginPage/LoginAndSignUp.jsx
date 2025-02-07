import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';
import NavbarPage from "../NavbarPage";
import Login from "./Login";
import SignUp from "./SignUp";



const LoginAndSignUp = () => {
   const [action , setAction] = useState('Login')

  return (
    <>
      <NavbarPage />
      {action === 'Login' ? (
        <Login  onSwitchToSignUp={() => setAction('SignUp')} />
      ) : (
        <SignUp onSwitchToLogin={() => setAction('Login')} />
      )}
    </>
  );
}

export default LoginAndSignUp;
