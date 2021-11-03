import { toast, ToastContainer } from "react-toastify";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Nav from "./Nav";
import { FormGroup } from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./AddUser.css";

export const AddUser = () => {
  //Route Add new user
  const history = useHistory();
  const cancleUser = () => {
    history.push("/Dashboard");
  };

  const userData = {
    name: "",
    username: "",
    gender: "",
    phone_number: "",
    email: "",
    password: "",
  };

  //state manage
  const [user, setUser] = useState(userData);
  const { name, username, gender, phone_number, email, password } = user;
  const [errorData, setErrorData] = useState("");
  let error = {
    errname: "",
    errusername: "",
    errphone: "",
    erremail: "",
    errpassword: "",
  };

  //useState function manage
  const userChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value});
  };
  //onSubmit function
  const sumbit = (e) => {
    e.preventDefault();
    let xx = handleValidation();
    setErrorData(xx);
    console.log(">>>>>>>>>>>>>>>>>>", xx);

    const url = `http://192.168.1.196:8090/api/user/create-user`;

    axios
      .post(url, user, {
        headers: {
          "content-type": "application/json",
          accept: "application/json",
          Authorization: "bearer " + localStorage.getItem("TOKEN"),
        },
      })
      .then((response) => {
        if (response.status !== 200) {
          erHandling(response.data.message);
          setTimeout(() => {
            history.push("/Dashboard");
          }, 3000);
        } else if (response.status === 200) {
          erHandling(response.data.message);
          setTimeout(() => {
            history.push("/Dashboard");
          }, 2000);
        }
      });
  };

  const erHandling = (message) => {
    toast(message);
  };

  const handleValidation = () => {
    // user.name == ""  ? (error.errname = "Name is required"): (error.errname = "");
    // console.log(">>>>>>>fggfc", user)
    // console.log(`user error hende`,user.name)

    // console.log(`user error hende`,user.name == '' )
    if (user.name === "") {
      error.errname = "Name is required";
    }

    if (user.username === "") {
      error.errusername = "username is require";
    }
    if (user.email === "") {
      error.erremail = "email is require";
    }
    if (user.password === "") {
      error.errpassword = "password is require ";
    }

    if (user.phone_number === "") {
      error.errphone = " phone is require ";
    }

    setErrorData(error);
    return error; 
  };

  return (
    <div className="main-page">
      <Nav />

      <FormGroup className="container">
        <h1>AddUser</h1>
        <div className="form-group my-3 main-page">
          <label>Name</label>
          <input
            onChange={(e) => {
              userChange(e);
              handleValidation();
            }}
            value={name}
            name="name"
            className="form-control my-3"
            type="text"
            placeholder="Enter name"
          />
          <span className="error"> {errorData.errname} </span>
          <br />
          <label>User-name</label>
          <input
            onChange={(e) => {
              userChange(e);
              handleValidation();
            }}
            value={username}
            name="username"
            className="form-control my-3"
            type="text"
            placeholder="User name"
          />
          <br />
          <span className="error"> {errorData.errusername} </span> <br />
          <select
            onChange={userChange}
            value={gender}
            name="gender"
            id="Gender"
          >
            <option name="gender" value="gender">
              Gender
            </option>
            <option name="male" value="male">
              male
            </option>
            <option name="feaml" value="female">
              female
            </option>
            <option name="other " value="other">
              other
            </option>
          </select>
          <br />
          <label>Phone:</label>
          <input
            value={phone_number}
            name="phone_number"
            onChange={(e) => {
              userChange(e);
              handleValidation();
            }}
            className="form-control my-3"
            type="text"
            placeholder="phone"
          />
          <br />
          <span className="error"> {errorData.errphone} </span> <br />
          <label>E-mail:</label>
          <input
            value={email}
            onChange={(e) => {
              userChange(e);
              handleValidation();
            }}
            className="form-control my-3"
            type="email"
            name="email"
            placeholder="E-mail"
          />
          <br />
          <span className="error"> {errorData.erremail} </span> <br />
          <label>password</label>
          <input
            onChange={(e) => {
              userChange(e);
              handleValidation();
            }}
            value={password}
            className="form-control my-3"
            type="password"
            name="password"
            placeholder="password"
          />
          <br />
          <span className="error"> {errorData.errpassword} </span> <br />
          <button
            type="submit"
            onClick={sumbit}
            className="btn btn-primary mx-3 my-4"
          >
            AddUser
          </button>
          <button type="button" onClick={cancleUser} className="btn btn-danger">
            Back
          </button>
          <ToastContainer />
        </div>
      </FormGroup>
    </div>
  );
};
