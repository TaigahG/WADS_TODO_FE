import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import "./Login.css";

axios.defaults.withCredentials = true;

const Login = () => {
  const API_URL = "https://127.0.0.1:8000";
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(['user_id']);
  const auth = getAuth()
  async function handleWhoAmI() {
    try {
      const response = await axios.get(API_URL + "/whoami");
      if (response && response.data.username) {
        navigate("/ToDo");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error while checking session:", error);
      return false;
    }
  }

  useEffect(() => {
    if (cookies.user_id) {
      handleWhoAmI();
    }
  }, [cookies.user_id]);
  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const sessionResponse = await axios.post(API_URL + `/create_session/${response.user.uid}`);
      setCookie('user_session', sessionResponse.data, { path: '/' });
      navigate("/ToDo");
    } catch (err) {
      document.getElementById('error_modal').showModal();
      console.error("Login failed:", err);
    }
  }
   async function handleDeleteSession(e) {
    e.preventDefault();
    try {
      await axios.get(API_URL + "/delete_session");
      removeCookie('user_session', { path: '/' });
      navigate("/login");
    } catch (err) {
      console.error("Session deletion failed:", err);
    }

   }

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(getAuth(), provider);
      navigate("/ToDo");
    } catch (error) {
      console.error("Google sign-in error:", error);
      setLoginError("Failed to sign in with Google. Please try again.");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="login">
      <div className="login__container">
        <h1>Sign In</h1>
        {loginError && <p className="login__error">{loginError}</p>}
        <form onSubmit={handleLogin}>
          <input type="email" className="login__textBox" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" className="login__textBox" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="login__btn">
            Sign in
          </button>
        </form>
        <button onClick={handleGoogleSignIn} className="login__btn login__google">
          Sign in with Google
        </button>
        <p>
          Don't have an account?{" "}
          <Link to="/register" className="login__link">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
