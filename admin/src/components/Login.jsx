import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import { backendUrl } from "../config";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${backendUrl}/api/user/admin`, {
        email,
        password,
      });

      if (response.data.success) {
        setToken(response.data.token);
        toast.success("Welcome back to FOREVER.");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="admin-login">
      <section className="admin-login-story">
        <p className="admin-login-brand">
          FOR<span className="admin-wordmark-accent">EVER</span>
          <span className="admin-wordmark-period">.</span>
        </p>
        <div className="admin-login-story-copy">
          <p className="admin-eyebrow">THE FOREVER EDIT / ADMIN</p>
          <h1>Good style,<br /><em>well managed.</em></h1>
          <p>One considered space for the pieces, orders and people behind the FOREVER edit.</p>
        </div>
        <p className="admin-login-story-foot">GOOD STYLE. GOOD DAYS. <span>01 — 03</span></p>
      </section>

      <section className="admin-login-panel">
        <div className="admin-login-card">
          <p className="admin-eyebrow">STORE OPERATIONS / 01</p>
          <h2>Welcome <em>back.</em></h2>
          <p className="admin-login-intro">Sign in to pick up where you left off.</p>

          <form onSubmit={onSubmitHandler} className="admin-login-form">
            <label className="admin-field">
              <span>EMAIL ADDRESS</span>
              <input
                autoComplete="username"
                type="email"
                placeholder="you@forever.com"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>
            <label className="admin-field">
              <span>PASSWORD</span>
              <input
                autoComplete="current-password"
                type="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
            <button className="admin-primary-button" type="submit" disabled={isSubmitting}>
              <span>{isSubmitting ? "SIGNING IN..." : "SIGN IN"}</span>
              <span aria-hidden="true">↗</span>
            </button>
          </form>

          <p className="admin-login-footnote">PRIVATE STORE ACCESS <span>FOREVER / 01</span></p>
        </div>
      </section>
    </main>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
