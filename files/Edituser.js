import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";
import Nav from "./Nav";

export const EditUser = () => {
  //sending to Dash bord
  const history = useHistory();
  const cancleUser = () => {
    history.push("/Dashboard");
  };
  return (
    <div>
      <form>
        <Nav />
        <h1>Edit-user</h1>
        <label>Name</label>
        <input
          class="form-control form-control-sm "
          type="text"
          placeholder="Enter your name "
          aria-label=".form-control-sm example"
        />
        <label>User-name</label>
        <input
          class="form-control form-control-sm"
          type="text"
          placeholder="User name"
          aria-label=".form-control-sm example"
        />
        <label>
          <b>Gender</b>
        </label>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
          />

          <label class="form-check-label" for="flexRadioDefault1">
            Male
          </label>
          <br />
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault2"
            checked
          />
          <label class="form-check-label" for="flexRadioDefault2">
            Female
          </label>
        </div>
        <label>Pho.Num</label>
        <input
          class="form-control form-control-sm"
          type="text"
          placeholder="Phone Number"
          aria-label=".form-control-sm example"
        />
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>

          <input
            class="form-control form-control-sm"
            type="email"
            placeholder="E-mail ID "
            aria-label=".form-control-sm example"
          />
        </div>
        <button type="submit" class="btn btn-primary my-4 mx-3">
          AddUser
        </button>
        <button onClick={cancleUser} type="button" class="btn btn-danger ">
          Cancle
        </button>
      </form>
    </div>
  );
};

// export default EditUser;
