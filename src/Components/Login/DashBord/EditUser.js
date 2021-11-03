import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory, useParams } from "react-router-dom";
import Nav from "./Nav";
import { FormGroup } from "@material-ui/core";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from "react-toastify";
import "./EditUser.css"

export const EditUser = () => {
  //Route Add new user
  const history = useHistory();
  const cancleUser = () => {
    history.push("/Dashboard");
  };

  const dataPass = {
    name: "",
    gender: "",
    phone_number: "",
  };
  const { id } = useParams();
  const [user, setUser] = useState(dataPass);
  //Destucture object
  const { name, gender, phone_number } = user;

  const [errorData, setErrorData] = useState("");
  let error = {
    errname: "",
    errphone: "",
  };

  //onChage Function
  const userChange = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  //onSubmit function with built in api call
  const sumbit = (e) => {
    e.preventDefault();
    let xx = handleValidation();
    setErrorData(xx);
   

    const putUrl = `http://192.168.1.196:8090/api/user/edit-user`;
    axios
      .put(putUrl, user, {
        headers: {
          "content-type": "application/json",
          accept: "application/json",
          Authorization: "bearer " + localStorage.getItem("TOKEN"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          erHandling(response.data.message);
          setTimeout(() => {
            history.push("/Dashboard");
          }, 1000);
        } else {
          data(response.data.message);
        }
      });
  };
  const erHandling = (message) => {
    toast(message);
  };
  const data = (message) => {
    toast(message);
  };

  const handleValidation = () => {
    // user.name == ""  ? (error.errname = "Name is required"): (error.errname = "");

    if (user.name === "") {
      error.errname = "Name is required";
    }

    if (user.phone_number === "") {
      error.errphone = "phone is require";
    }

    setErrorData(error);
    return error;
  };

  //GET user By id API
  useEffect(async () => {
    const url = `http://192.168.1.196:8090/api/user/get-user/${id}/`;
    await axios
      .get(url, {
        headers: {
          Authorization: `bearer ` + localStorage.getItem("TOKEN"),
        },
      })
      .then((response) => {
        const userResponse = response.data.data;
        setUser(userResponse);
      });
  }, []);

  return (
    <div>
      <Nav />
      <FormGroup className="continer">
        <h1>Edit-User</h1>
        <div className="form-group my-3">

          <label>Name:</label>
          <input
            onChange={(e) => {
              userChange(e);
              handleValidation();
            }}
            value={name}
            name="name"
            className="col-xs-4 my-3"
            type="text"
            placeholder="Enter name"
          />
          <br /> <span className="error"> {errorData.errname} </span>
          <br />
          <label>Gender :</label>
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
            <option name="female" value="female">
              female
            </option>
            <option name="other" value="other">
              other
            </option>
          </select>
          <br />
          <label>PhoneNo</label>
          <input
            value={phone_number}
            onChange={(e) => {
              userChange(e);
              handleValidation();
            }}
            className="col-xs-4 my-3"
            name="phone_number"
            type="number"
            placeholder="phone"
          />
          <br />
          <span className="error"> {errorData.errphone} </span> <br />
          <br />
          <button
            type="submit"
            onClick={sumbit}
            className="btn btn-primary mx-3"
          >
            Update -user
          </button>
          <button type="button" onClick={cancleUser} className="btn btn-danger">
            Cancle
          </button>
        </div>
        <ToastContainer />
      </FormGroup>
    </div>
  );
};
