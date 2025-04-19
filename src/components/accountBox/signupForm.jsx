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
import { AccountContext } from './accountContext';
import { useNavigate } from "react-router";

export function SignupForm(props) {

  const { switchToSignin } = useContext(AccountContext);
  const [full_name, setfullName] = useState();
  const [email, setEmail] = useState();
  const [password, setpassword] = useState();
  const [cnf_password, setcnf_password] = useState();
  let navigate = useNavigate();

  const submitHandle = async (e) => {
    e.preventDefault();

    try {

        if (cnf_password !== password) {
          alert("Passwords do not match");
          return;
        }

        const response = await fetch("http://127.0.0.1:8000/register", {
          method: "POST",
          headers: {
              "Content-Type" : "application/json",
          },
          body: JSON.stringify({email, password, full_name})
      });

      const data = await response.json();

      if (response.ok) {
        // Login success
        console.log("Register successful:", data);
        navigate("/");
        
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
        <Input type="text" placeholder="Full name" value={full_name} onChange={(e) => setfullName(e.target.value)}/>
        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setpassword(e.target.value)}/>
        <Input type="password" placeholder="Confirm password" value={cnf_password} onChange={(e) => setcnf_password(e.target.value)}/>
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit" onClick={submitHandle}>Signup</SubmitButton>
      <Marginer direction="vertical" margin="5px" />
      <LineText>
        Already have an account?{" "}
        <BoldLink onClick={switchToSignin} href="#">
          Signin
        </BoldLink>
      </LineText>
    </BoxContainer>
  );
}