import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";
import Nav from "./Nav";

const dataPass = {
  name: " ",
  email: " ",
  phone: " ",
  username: " ",
  gender: " ",
  date: " ",
};

export const AddUser = () => {
  //Route Add new user
  const history = useHistory();
  const cancleUser = () => {
    history.push("/Dashboard");
  };
  const [user, setUser] = useState(dataPass);
  const { name, email, phone, username, gender, date } = user;

  // //gender Manage Function
  // const [sex, setSex] = useState();

  //Event function
  const onValueChange = (e) => {
    const target = e.target.value;

    // if (target.checked) {
    //   setSex(target.value);
    // }
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };

  return (
    <div>
      <form>
        <Nav />
        <h1>New-user</h1>
        <label>Name</label>
        <input
          onChange={(e) => onValueChange(e)}
          name="name"
          classNae="form-control form-control-sm "
          type="text"
          placeholder="Enter your name "
          aria-label=".form-control-sm example"
        />{" "}
        <br />
        <label>User-name</label>
        <input
          onChange={(e) => onValueChange(e)}
          name="username"
          classNae="form-control form-control-sm"
          type="text"
          placeholder="User name"
          aria-label=".form-control-sm example"
        />{" "}
        <br />
        <div class="form-check">
          <label>
            <b>Gender</b>
          </label>
          <br />
          <input
            type="radio"
            name="gender"
            value="male"
            onChange={(e) => onValueChange(e)}
          />{" "}
          Male
          <br />
          <input
            type="radio"
            name="gender"
            value="female"
            onChange={(e) => onValueChange(e)}
          />{" "}
          Female
          <br />
          <input
            type="radio"
            name="gender"
            value="other"
            onChange={(e) => onValueChange(e)}
          />{" "}
          Other <br />
        </div>
        <br />
        <label>Pho.Num</label>
        <input
          onChange={(e) => onValueChange(e)}
          name="phone"
          classNae="form-control form-control-sm"
          type="number"
          placeholder="Phone Number"
          aria-label=".form-control-sm example"
        />
        <div classNae="mb-3">
          <label for="exampleInputEmail1" classNae="form-label">
            Email address
          </label>

          <input
            onChange={(e) => onValueChange(e)}
            name="email"
            classNae="form-control form-control-sm"
            type="email"
            placeholder="E-mail ID "
            aria-label=".form-control-sm example"
          />
        </div>
        <label for="birthday">Birthday:</label>
        <input
          onChange={(e) => onValueChange(e)}
          name="date"
          type="date"
          id="birthday"
          name="birthday"
        />
        <br />
        {/* <input type="submit" value="Submit"></input> */}
        <button type="submit" classNae="btn btn-primary my-4 mx-3">
          AddUser
        </button>
        <button onClick={cancleUser} type="button" classNae="btn btn-danger ">
          Cancle
        </button>
      </form>
    </div>
  );
};
