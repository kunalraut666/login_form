import React, { useContext, useState } from "react";
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

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);

  const [email, setEmail] = useState();
  const [password, setpassword] = useState();
  let navigate = useNavigate();

  const submitHandle = async (e) => {
    e.preventDefault();

    try {
      const baseUrl = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${baseUrl}/login`, {
          method: "POST",
          headers: {
              "Content-Type" : "application/json",
          },
          body: JSON.stringify({email, password})
      });

      const data = await response.json();

      if (response.ok) {
        // Login success
        console.log("Login successful:", data);
        // Optionally store token in localStorage and redirect user
        localStorage.setItem("token", data.token);
        navigate("/dashboard", {
          state: {"fullName": data.full_name}
        })
        
      } else {
        // Login failed
        alert(data.message || "Login failed");
      }
      
    } catch (error) {
        console.error(error)
    }
  }

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setpassword(e.target.value)} />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={submitHandle}>Signin</SubmitButton>
      <Marginer direction="vertical" margin="5px" />
      <LineText>
        Don't have an accoun?{" "}
        <BoldLink onClick={switchToSignup} href="#">
          Signup
        </BoldLink>
      </LineText>
    </BoxContainer>
  );
}
