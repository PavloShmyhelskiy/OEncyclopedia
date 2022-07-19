import { useEffect, useState } from "react";
import "./newGroup.css";
import axios from "axios";

export default function NewGroup() {
  const [group, setGroup] = useState({});

  const [articles, setArticles] = useState([]);
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
  const handleChange = (e) => {
    const value = e.target.value;
    setGroup({ ...group, [e.target.name]: value });
  };

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setGroup({ ...group, [e.target.name]: value });
  };

  const createGroup = async () => {
    console.log(Object.keys(group).length);
    if (Object.keys(group).length === 2){
    try {
      await axios.post(`/groups/`, group,{
        headers: {
          token:
            `Bearer ${JSON.parse(localStorage.getItem("user")).accessToken}`,
        },
      });
      } catch (err) {
        console.log(err);
      }
    }
  }
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Group</h1>
      <form className="addProductForm">
        <div className="formLeft">
          <div className="addProductItem">
            <label>Title</label>
            <input
              type="text"
              placeholder="Science"
              name="title"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="formRight">
          <div className="addProductItem">
            <label>Content</label>
            <select
              multiple
              name="content"
              onChange={handleSelect}
              style={{ height: "280px" }}
            >
              {articles.map((article) => (
                <option key={article._id} value={article._id}>
                  {article.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button className="addProductButton" onClick={createGroup}>
          Create
        </button>
      </form>
    </div>
  );
}
