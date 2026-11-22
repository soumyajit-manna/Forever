import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const authImages = {
  Login: {
    src: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1400&q=85",
    alt: "A fashion model in a red outfit against a pale wall",
  },
  "Sign Up": {
    src: "https://images.unsplash.com/photo-1495385794356-15371f348c31?auto=format&fit=crop&w=1400&q=85",
    alt: "A fashion model in a teal outfit in an urban setting",
  },
};

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [password, setPasword] = useState("");
  const [email, setEmail] = useState("");
  const currentImage = authImages[currentState];

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Signup successful! 🎉");
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Login successful! 👋");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const flipVariants = {
    hidden: { rotateY: 180, opacity: 0 },
    visible: { rotateY: 0, opacity: 1, transition: { duration: 0.6 } },
    exit: { rotateY: -180, opacity: 0, transition: { duration: 0.6 } },
  };

  return (
    <main className="auth-page">
      <section className="auth-visual" aria-label="Forever fashion collection">
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={currentState}
            src={currentImage.src}
            alt={currentImage.alt}
            style={{
              objectPosition:
                currentState === "Sign Up" ? "center top" : undefined,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          />
        </AnimatePresence>
        <div className="auth-visual-shade" />
        <p className="auth-visual-top">FOREVER. <span>THE STYLE JOURNAL</span></p>
        <div className="auth-visual-copy">
          <p>THE FOREVER EDIT · 01</p>
          <h2>Wear what<br />feels like <em>you.</em></h2>
          <span>Thoughtful pieces for every version of you.</span>
        </div>
        <span className="auth-visual-caption">A MORE PERSONAL WAY TO SHOP</span>
      </section>

      <section className="auth-panel">
        <div className="auth-form-shell">
          <p className="auth-overline">
            {currentState === "Login" ? "WELCOME BACK" : "YOUR FOREVER ACCOUNT"}
          </p>
          <AnimatePresence mode="wait">
            <motion.form
              key={currentState}
              variants={flipVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onSubmit={onSubmitHandler}
              className="auth-form"
            >
              <div className="auth-heading">
                <h1>
                  {currentState === "Login" ? (
                    <>Welcome <em>back.</em></>
                  ) : (
                    <>Make it <em>yours.</em></>
                  )}
                </h1>
                <p>
                  {currentState === "Login"
                    ? "Sign in to find your orders and keep your favorites close."
                    : "Create an account and make every find feel like yours."}
                </p>
              </div>

              {currentState === "Sign Up" && (
                <div className="auth-field">
                  <label htmlFor="auth-name">YOUR NAME</label>
                  <input
                    id="auth-name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    required
                  />
                </div>
              )}

              <div className="auth-field">
                <label htmlFor="auth-email">EMAIL ADDRESS</label>
                <input
                  id="auth-email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="auth-field">
                <label htmlFor="auth-password">PASSWORD</label>
                <input
                  id="auth-password"
                  onChange={(e) => setPasword(e.target.value)}
                  value={password}
                  type="password"
                  autoComplete={currentState === "Login" ? "current-password" : "new-password"}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="button"
                onClick={() =>
                  setCurrentState(currentState === "Login" ? "Sign Up" : "Login")
                }
                className="auth-mode-toggle"
              >
                {currentState === "Login" ? "New to Forever? Create an account" : "Already have an account? Sign in"}
                <span aria-hidden="true">↗</span>
              </button>

              <button type="submit" className="auth-submit">
                <span>{currentState === "Login" ? "SIGN IN" : "CREATE ACCOUNT"}</span>
                <span aria-hidden="true">→</span>
              </button>

              <div className="auth-form-footer">
                <span>YOUR STYLE, ALL IN ONE PLACE</span>
                <span>FOREVER. / 01</span>
              </div>
            </motion.form>
          </AnimatePresence>
          <p className="auth-panel-note">A thoughtful wardrobe starts with the pieces that feel like you.</p>
        </div>
      </section>
    </main>
  );
};

export default Login;
