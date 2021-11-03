import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";

const ListData = () => {
  const columns = [
    {
      name: <h4>ID</h4>,
      selector: (row, index) => index + 1,
    },
    {
      name: <h4>Name</h4>,
      selector: (row) => row.name,
    },

    {
      name: <h4>Email</h4>,
      selector: (row) => row.email,
    },
    {
      name: <h4>Phone</h4>,
      selector: (row) => row.phone_number,
    },
    {
      name: <h4>Username</h4>,
      selector: (row) => row.username,
    },
    {
      name: <h4>Gender</h4>,
      selector: (row) => row.gender,
    },
    {
      name: <h4></h4>,
      selector: (row) => (
        <button
          onClick={(e) => {
            editUser(row._id);
          }}
          type="button"
          className="btn btn-warning mx-2"
        >
          Edit
        </button>
      ),

      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: <h4>Action</h4>,
      selector: (row) => (
        <button
          type="button"
          className="btn btn-danger mx-2"
          onClick={() => {
            const confirmBox = window.confirm(
              "Do you really want to delete this User ?"
            );
            if (confirmBox === true) {
              userdelete(row._id);
            }
          }}
        >
          Delete
        </button>
      ),

      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];
  const [perPage, setPerPage] = useState(10);
  const [respo, setRespo] = useState([]);
  const [totalRow, settotalRow] = useState(null);
  const countPerPage = 1;

  const searchData = {
    page: 1,
    limit: perPage,
    search: "",
    phonenumber: "",
  };
  const [searchValue, setsearchValue] = useState(searchData);

  const { search, phonenumber } = searchValue;

  const onChangeEdit = (e) => {
    setsearchValue({ ...searchValue, [e.target.name]: e.target.value });
    console.log("searchValue", searchValue);
  };

  //Submit handler
  const submitHandler = async (e) => {
    e.preventDefault();
    data.phonenumber = searchValue.phonenumber;
    data.search = searchValue.search;
    userList();
  };

  const data = {
    page: 1,
    limit: perPage,
    search: "",
    phonenumber: "",
  };

  // //API
  const userList = async () => {
    const baseURL = `http://192.168.1.196:8090/api/user/user-list`;
    await axios
      .post(baseURL, data, {
        headers: {
          Authorization: "bearer " + localStorage.getItem("TOKEN"),
        },
      })
      .then((response) => {
        setRespo(response.data.data);
      })
      .catch((error) => {
        console.log(`ERROR>>>>>>>`, error);
      });
  };

  const handlePerRowsChange = async (type, no) => {
    if (type == "main") {
      data.limit = no;
    } else {
      data.page = no;
    }
    userList();
  };

  // Api function call
  useEffect(() => {
    userList();
  }, [perPage]);

  // Edit User  routing with id
  const history = useHistory();
  const editUser = (id) => {
    history.push("/EditUser/" + id);
  };

    // Delete User
    function userdelete(id) {
      const deleteUrl = `http://192.168.1.196:8090/api/user//delete-user/${id}`;
      axios
        .delete(deleteUrl, {
          headers: {
            Authorization: "bearer " + localStorage.getItem("TOKEN"),
          },
        })
        .then((response) => {
          const status = response.data.status;
          if (status === 200) {
            userList();
          }
          console.log(response.data.data);
        });
    }
  // LogoutFunction
  const userLogout = useHistory();

  const logOut = () => {
    localStorage.clear("TOKEN");
    userLogout.push("/");
  };

  //Route Add new user
  const addUser = useHistory();
  const addNewUser = () => {
    addUser.push("/AddUser");
  };

  return (
    <div>
      <button
        onClick={addNewUser}
        type="button"
        className="btn btn-primary my-3 mx-2"
      >
        Add User
      </button>
      <button onClick={logOut} type="button" className="btn btn-danger mx-3">
        Log-out
      </button>

      <form className="d-flex">
        <input
          value={phonenumber}
          name="phonenumber"
          type="text"
          onChange={onChangeEdit}
          className="form-control me-2 my-3  mx-2"
          placeholder="Search number"
          aria-label="Search"
        />
        <input
          value={search}
          name="search"
          onChange={onChangeEdit}
          type="text"
          className="form-control me-2 my-3  mx-2"
          placeholder="Search name"
          aria-label="Search"
        />
        <button
          type="Submit"
          onClick={submitHandler}
          className="btn btn-primary my-3 mx-2"
        >
          Search
        </button>
      </form>

      <div className="App">
        <DataTable
          title="Employees"
          columns={columns}
          data={respo}
          highlightOnHover
          pagination
          paginationServer
          paginationTotalRows={totalRow}
          paginationPerPage={countPerPage}
          onChangeRowsPerPage={(limit) => handlePerRowsChange("main", limit)}
          paginationComponentOptions={{
            noRowsPerPage: false,
          }}
          onChangePage={(page) => handlePerRowsChange("sub", page)}
        />
      </div>
    </div>
  );
};

export default ListData;
