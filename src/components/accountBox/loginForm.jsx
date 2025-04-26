import React, { useContext, useState } from "react";
import { motion } from "framer-motion"; // Add this import
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  LineText,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import { useNavigate } from "react-router";
import { toast } from "react-toastify"; // Import Toastify

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // NEW loading state
  let navigate = useNavigate();

  const submitHandle = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields!");
      return;
    }

    try {
      setIsLoading(true); // Start spinner
      const baseUrl = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${baseUrl}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
        localStorage.setItem("token", data.token);
        toast.success("Login Successful! 🚀");

        setTimeout(() => {
          navigate("/dashboard", {
            state: { fullName: data.full_name },
          });
        }, 1000);
      } else {
        toast.error(data.detail  || "Login failed!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false); // Stop spinner after request
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}  // Starting state (transparent)
      animate={{ opacity: 1 }}   // Animate to fully visible (opaque)
      exit={{ opacity: 0 }}      // When leaving, fade out
      transition={{ duration: 1, ease: "easeOut" }}  // Smooth fade-in transition
    >
      <BoxContainer>
        <FormContainer>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormContainer>

        <Marginer direction="vertical" margin={10} />
        <MutedLink href="#">Forget your password?</MutedLink>
        <Marginer direction="vertical" margin="1.6em" />

        <SubmitButton
          type="submit"
          onClick={submitHandle}
          disabled={isLoading} // disable while loading
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
        >
          {isLoading ? (
            <div
              style={{
                border: "2px solid white",
                borderTop: "2px solid transparent",
                borderRadius: "50%",
                width: "18px",
                height: "18px",
                animation: "spin 1s linear infinite",
              }}
            />
          ) : (
            "Signin"
          )}
        </SubmitButton>

        <Marginer direction="vertical" margin="5px" />

        <LineText>
          Don't have an account?{" "}
          <BoldLink onClick={switchToSignup} href="#">
            Signup
          </BoldLink>
        </LineText>

        {/* Spinner animation CSS */}
        <style>
          {`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}
        </style>
      </BoxContainer>
    </motion.div>
  );
}
