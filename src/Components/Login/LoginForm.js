import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "./Button";
import "./LoginForm.css";
import { useHistory } from "react-router-dom";

const LoginForm = () => {
  //input State
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  //email handler
  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  //password handler
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  //submit handler
  const formSubmitHandler = (event) => {
    const Logindata = {
      email: email,
      password: password,
    };
    login(Logindata);
    event.preventDefault();
    setEmail("");
    setPassword("");
  };

  //Login Api Call
  const login = (Logindata) => {
    fetchData(Logindata);
  };
  const history = useHistory();
  const url = "http://192.168.1.196:8090/api/user/login";

  //pass api Login data
  const fetchData = async (Logindata) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(Logindata),
      });
      const json = await response.json();

      //user Login validation
      if (json.status === 200) {
        localStorage.setItem("TOKEN", json.token);
        history.push("/Dashboard");
      }

      //pending plase Enter valid user and mail
      error(json.message);
    } catch (error) {
      console.log("error", error);
    }
  };
  // Error-using toast
  const error = (message) => {
    toast(message);
  };
  return (
    <div>
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <h2 className="active"> Sign In </h2>
          <div className="fadeIn first"></div>
          <form onSubmit={formSubmitHandler}>
            <input
              onChange={emailHandler}
              value={email}
              type="email"
              id="email"
              className="fadeIn second"
              name="email"
              placeholder="e-mail"
            />

            <input
              onChange={passwordHandler}
              value={password}
              type="password"
              id="password"
              className="fadeIn third"
              name="login"
              placeholder="password"
            />
            <Button />
            <ToastContainer />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
