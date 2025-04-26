import React, { useContext, useState } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  LineText,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);
  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnf_password, setCnfPassword] = useState("");
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const submitHandle = async (e) => {
    e.preventDefault();

    if (!full_name || !email || !password || !cnf_password) {
      toast.error("Please fill all the fields!");
      return;
    }

    if (password !== cnf_password) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const baseUrl = process.env.REACT_APP_BACKEND_URL;

      const response = await fetch(`${baseUrl}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, full_name }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Register successful:", data);
        toast.success("Register successful! 🎉");

        setTimeout(() => {
          setLoading(false);
          switchToSignin(); // switch to login form
        }, 2000);
      } else {
        toast.error(data.detail || "Registration failed!");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
      setLoading(false);
    }
  };

  return (
    <BoxContainer>
      <FormContainer>
        <Input
          type="text"
          placeholder="Full name"
          value={full_name}
          onChange={(e) => setFullName(e.target.value)}
        />
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
        <Input
          type="password"
          placeholder="Confirm password"
          value={cnf_password}
          onChange={(e) => setCnfPassword(e.target.value)}
        />
      </FormContainer>

      <Marginer direction="vertical" margin={10} />

      <SubmitButton
        type="submit"
        onClick={submitHandle}
        disabled={loading}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? (
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
          "Signup"
        )}
      </SubmitButton>

      <Marginer direction="vertical" margin="5px" />

      <LineText>
        Already have an account?{" "}
        <BoldLink onClick={switchToSignin} href="#">
          Signin
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
  );
}
