import { useEffect, useState } from "react";
import "./newTag.css";
import axios from "axios";

export default function NewTag() {
  const [tag, setTag] = useState({});

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
    setTag({ ...tag, [e.target.name]: value });
  };

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setTag({ ...tag, [e.target.name]: value });
  };

  const createTag = async () => {
    console.log(Object.keys(tag).length);
    if (Object.keys(tag).length === 2){
    try {
      await axios.post(`/tags/`, tag,{
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
      <h1 className="addProductTitle">New Tag</h1>
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
        <button className="addProductButton" onClick={createTag}>
          Create
        </button>
      </form>
    </div>
  );
}
