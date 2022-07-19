import "./groupList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function GroupList() {
  const [groups, setGroups] = useState([]);
  const handleDelete = async (id) => {
    setGroups(groups.filter((group) => group.id !== id));
    try {
      await axios.delete(`/groups/${id}`, {
        headers: {
          token:
            `Bearer ${JSON.parse(localStorage.getItem("user")).accessToken}`,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const getGroups = async () => {
      try {
        const res = await axios.get("/groups", {
          headers: {
            token:
              `Bearer ${JSON.parse(localStorage.getItem("user")).accessToken}`,
          },
        });
        const grp = await res.data.map(group => ({...group, id: group._id}))
        setGroups(grp);
      } catch (err) {
        console.log(err);
      }
    };
    getGroups();
  }, []);
  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    { field: "title", headerName: "title", width: 250 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{ pathname: "/group/" + params.row._id}}
            >
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={groups}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        checkboxSelection
        getRowId={(r) => r._id}
      />
    </div>
  );
}
