import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [password, setPasword] = useState("");
  const [email, setEmail] = useState("");

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
  }, [token]);

  const flipVariants = {
    hidden: { rotateY: 180, opacity: 0 },
    visible: { rotateY: 0, opacity: 1, transition: { duration: 0.6 } },
    exit: { rotateY: -180, opacity: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-2">
      <AnimatePresence mode="wait">
        <motion.form
          key={currentState}
          variants={flipVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onSubmit={onSubmitHandler}
          className="flex flex-col items-center w-full sm:max-w-md m-auto gap-4 text-gray-800 bg-white p-6 shadow-lg rounded-xl border border-pink-500"
        >
          <div className="inline-flex items-center gap-2 mb-2 mt-4">
            <p className="prata-regular text-3xl text-pink-600">
              {currentState}
            </p>
            <hr className="border-none h-[2px] w-8 bg-pink-500" />
          </div>

          {currentState === "Sign Up" && (
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              className="w-full px-3 py-2 border border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300 rounded-md"
              placeholder="Name"
              required
            />
          )}

          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className="w-full px-3 py-2 border border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300 rounded-md"
            placeholder="Email"
            required
          />

          <input
            onChange={(e) => setPasword(e.target.value)}
            value={password}
            type="password"
            className="w-full px-3 py-2 border border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300 rounded-md"
            placeholder="Password"
            required
          />

          <div className="w-full flex justify-end text-sm mt-[-8px] text-gray-600">
            {currentState === "Login" ? (
              <p
                onClick={() => setCurrentState("Sign Up")}
                className="cursor-pointer hover:text-pink-500 transition"
              >
                Create account
              </p>
            ) : (
              <p
                onClick={() => setCurrentState("Login")}
                className="cursor-pointer hover:text-pink-500 transition"
              >
                Login Here
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-pink-600 hover:bg-pink-700 text-white font-medium px-8 py-2 mt-4 rounded-md transition"
          >
            {currentState === "Login" ? "Sign In" : "Sign Up"}
          </button>
        </motion.form>
      </AnimatePresence>
    </div>
  );
};

export default Login;
