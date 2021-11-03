import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import { useHistory } from 'react-router';
import editAction from "../redux/actions/editAction";
import DataTable from "react-data-table-component";
import { useHistory, useParams } from "react-router-dom";

function ListUser() {
  // let history = useHistory()
  // Set BaseUrl for All request
  const baseUrl = "http://123.201.20.186:8090";

  // set variable for dispaching redux action

  const dispatch = useDispatch();
  // usehistory function
  let history = useHistory();
  console.log(history);

  const createUserHandler = () => {
    history.push("/create_user");
  };

  const [perPage, setPerPage] = useState(10);
  const [outpage, setoutpage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [searchValue, setsearchValue] = useState({});

  const onChangeEdit = (e) => {
    setsearchValue({ ...searchValue, [e.target.name]: e.target.value });
    console.log("searchValue", searchValue);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(searchValue);

    fetchUsers(outpage);
  };

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Username",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
    },
    {
      name: "Phone number",
      selector: (row) => row.phone_number,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Edit",
      selector: (row) => (
        <div>
          <button
            className="btn btn-primary "
            id={row._id}
            onClick={handleEdit}
          >
            Edit
          </button>{" "}
        </div>
      ),
    },
    {
      name: "Delete",
      selector: (row) => (
        <div>
          <button
            className="btn btn-primary"
            id={row._id}
            onClick={deleteHandler}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

//   const deleteRequestHandler = async (id) => {
//     const response = await axios({
//       method: "delete",
//       url: `${baseUrl}/api/user/delete-user/${id}`,
//       // data: credentials,
//       headers: {
//         Authorization: `bearer ${localStorage.getItem("token")}`,
//         "Content-Type": "application/json",
//       },
//     });
//     console.log(response);
//   };

//   const deleteHandler = async (e) => {
//     let id = e.target.id;
//     const promptyData = prompt("If you want to delete than select ");
//     if (promptyData === "yes") {
//       console.log("Delete");
//       deleteRequestHandler(id);
//       console.log(outpage);
//       setTimeout(() => {
//         fetchUsers(outpage);
//       }, 1000);
//     }
//   };

  const handleEdit = async (e) => {
    let id = e.target.id;
    console.log(id);

    const response = await axios({
      method: "get",
      url: `${baseUrl}/api/user/get-user/${id}`,
      // data: credentials,
      headers: {
        Authorization: `bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    console.log("Edit Responce", response);
    dispatch(editAction(response.data.data));
    history.push("/edit");
  };
  const fetchUsers = async (page) => {
    if (searchValue.search === undefined) {
      searchValue.search = "";
    }
    if (searchValue.phone_number === undefined) {
      searchValue.phone_number = "";
    }
    const credentials = {
      page: page,
      limit: perPage,
      search: searchValue.search,
      phonenumber: searchValue.phone_number,
    };
    console.log(credentials);
    setLoading(true);

    const response = await axios({
      method: "post",
      url: `${baseUrl}/api/user/user-list`,
      data: credentials,
      headers: {
        Authorization: `bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    let i = 0;
    response.data.data.forEach((element) => {
      i++;
      element.id = `${page === 1 ? "" : page - 1}${i}`;
    });

    console.log(response.data.data);
    setData(response.data.data);
    setTotalRows(response.data.count);
    setLoading(false);
    //  console.log(document.referrer);
  };

  const handlePageChange = (page) => {
    setoutpage(page);
    fetchUsers(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    console.log("Handle data");
    console.log(page);
    const credentials = {
      page: page,
      limit: newPerPage,
      search: "",
      phonenumber: "",
    };

    setLoading(true);

    const response = await axios({
      method: "post",
      url: `${baseUrl}/api/user/user-list`,
      data: credentials,
      headers: {
        Authorization: `bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });

    setData(response.data.data);
    setPerPage(newPerPage);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers(1); // fetch page 1 of users
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <button
        className="btn btn-primary mt-4 mx-3 delete"
        onClick={createUserHandler}
      >
        Add User
      </button>

      <form onSubmit={submitHandler}>
        <div className="input-group mt-3 container">
          <input
            type="number"
            className="form-control"
            placeholder="Phone"
            id="phone_number"
            name="phone_number"
            aria-label="phone number"
            onChange={onChangeEdit}
          />
          <span className="input-group-text">||</span>
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            aria-label="Search"
            name="search"
            id="search"
            onChange={onChangeEdit}
          />
          <button type="submit">Submit</button>
        </div>
      </form>
      <DataTable
        title="Users"
        columns={columns}
        data={data}
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
      />
    </>
  );
}

export default ListUser;
