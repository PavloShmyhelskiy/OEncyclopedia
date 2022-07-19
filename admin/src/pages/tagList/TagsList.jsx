import "./tagsList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function TagsList() {
  const [tags, setTags] = useState([]);
  const handleDelete = async (id) => {
    setTags(tags.filter((tag) => tag.id !== id));
    try {
      await axios.delete(`/tags/${id}`, {
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
    const getTags = async () => {
      try {
        const res = await axios.get("/tags", {
          headers: {
            token:
              `Bearer ${JSON.parse(localStorage.getItem("user")).accessToken}`,
          },
        });
        const tg = await res.data.map(tag => ({...tag, id: tag._id}))
        setTags(tg);
      } catch (err) {
        console.log(err);
      }
    };
    getTags();
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
              to={{ pathname: "/tag/" + params.row._id}}
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
        rows={tags}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        checkboxSelection
        getRowId={(r) => r._id}
      />
    </div>
  );
}
