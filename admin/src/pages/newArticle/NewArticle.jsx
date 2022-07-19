import { useState } from "react";
import "./newArticle.css";
import axios from "axios";

export default function NewArticle() {
  const [article, setArticle] = useState({});

  const handleChange = (e) => {
    const value = e.target.value;
    setArticle({ ...article, [e.target.name]: value });
  };
  const handleLinksChange = (e) => {
    const value = e.target.value;
    const links = value.split(", ")
    setArticle({ ...article, [e.target.name]: links });
  };
  
  const createArticle = async () => {
    if (Object.keys(article).length === 4){
    const completeArticle = {...article, created_by: JSON.parse(localStorage.getItem("user")).username, views:0}
    try {
      await axios.post(`/articles/`, completeArticle,{
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
      <h1 className="addProductTitle">New Article</h1>
      <form className="addProductForm">
        <div className="thumbnailContainer">
          <div className="addProductItem">
            <label>Thumbnail</label>
            <input
              type="text"
              placeholder="link to your image"
              name="thumbnail"
              onChange={handleChange}
            />
          </div>
          <img
            src={article.thumbnail || "https://cdn-icons-png.flaticon.com/512/337/337118.png"}
            alt=""
            className="productUploadImg"
          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            type="text"
            placeholder="title for your article"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="content">
          <label>Content</label>
          <textarea
            placeholder="content for your article"
            name="content"
            onChange={handleChange}
            className="textarea"
          />
        </div>
        <div className="addProductItem">
          <label>Link</label>
          <input
            type="text"
            placeholder="links for sources"
            name="links"
            onChange={handleLinksChange}
          />
        </div>
          <button className="addProductButton" onClick={createArticle}>
            Create
          </button>
      </form>
    </div>
  );
}
