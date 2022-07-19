import "./articlesList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const handleDelete = async (id) => {
    setArticles(articles.filter((article) => article.id !== id));
    try {
      await axios.delete(`/articles/${id}`, {
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
    const getArticles = async () => {
      try {
        const res = await axios.get("/articles", {
          headers: {
            token:
              `Bearer ${JSON.parse(localStorage.getItem("user")).accessToken}`,
          },
        });
        const artcl = await res.data.map(article => ({...article, id: article._id}))
        setArticles(artcl);
      } catch (err) {
        console.log(err);
      }
    };
    getArticles();
  }, []);
  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    {
      field: "article",
      headerName: "Article",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.thumbnail || "https://cdn-icons-png.flaticon.com/512/337/337118.png"} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "created_by", headerName: "Creator", width: 170},
    { field: "createdAt", headerName: "Date", width: 120,
    renderCell: (params) => {
      const date = new Date(params.row.createdAt);
      const stringDate = date.getFullYear()+"/"+("0"+(date.getMonth()+1)).slice(-2)+"/"+("0"+date.getDate()).slice(-2);
  
      return (
        <div className="productListItem">
          {stringDate}
        </div>
      );
    },},
    { field: "views", headerName: "Views", width: 120 },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{ pathname: "/article/" + params.row._id}}
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
        rows={articles}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        checkboxSelection
        getRowId={(r) => r._id}
      />
    </div>
  );
}
