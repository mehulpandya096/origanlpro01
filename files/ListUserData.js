import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";

const data = {
  page: 0,
  limit: 10,
  search: "",
  phonenumber: "",
};

const columns = [
  {
    name: "name",
    selector: (row) => row.name,
  },

  {
    name: "email",
    selector: (row) => row.email,
  },
  {
    name: "Phone_number",
    selector: (row) => row.phone_number,
  },
  {
    name: "Username",
    selector: (row) => row.username,
  },
  {
    name: "Gender",
    selector: (row) => row.gender,
  },
];

const ListData = () => {
  const [totalRow, settotalRow] = useState(null);
  const [post, setPost] = useState(data);
  const [respo, setRespo] = useState([]);
  //For Pagination
  const [users, setUsers] = useState({});
  const [page, setPage] = useState(0);
  const countPerPage = 1;

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
        settotalRow(response.data.count);
        setRespo(response.data.data);
        setUsers(response.data);
      })
      .catch((error) => {
        setUsers({});
      });
  };

  // Api function call
  useEffect(() => {
    userList();
  }, [page]);

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
  const handlePerRowsChange = () => {
    console.log("fdff");
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

      <table className="table my-1">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Sr-no</th>
            <th scope="col">Name</th>
            <th scope="col">E-mail</th>
            <th scope="col">Phone-No</th>
            <th scope="col">User-name</th>
            <th scope="col">Gender</th>
            <th scope="col">Created Date</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        {respo.map((usrData, index) => {
          return (
            <tbody>
              <tr>
                <td>{index + 1}</td>
                <td>{usrData.name}</td>
                <td>{usrData.email}</td>
                <td>{usrData.phone_number}</td>
                <td>{usrData.username}</td>
                <td>{usrData.gender}</td>
                <td>{usrData.created_at}</td>
                <td>
                  <button
                    onClick={(e) => {
                      editUser(usrData._id);
                    }}
                    type="button"
                    className="btn btn-warning mx-2"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="btn btn-danger mx-2"
                    onClick={() => {
                      const confirmBox = window.confirm(
                        "Do you really want to delete this User ?"
                      );
                      if (confirmBox === true) {
                        userdelete(usrData._id);
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
      <div className="App">
        <DataTable
          title="Employees"
          columns={columns}
          data={users.data}
          highlightOnHover
          pagination
          paginationServer
          paginationTotalRows={totalRow}
          paginationPerPage={countPerPage}
          // onChangeRowsPerPage={handlePerRowsChange}
          paginationComponentOptions={{
            noRowsPerPage: true,
          }}
          onChangePage={(page) => setPage(page)}
        />
      </div>
    </div>
  );
};

export default ListData;
