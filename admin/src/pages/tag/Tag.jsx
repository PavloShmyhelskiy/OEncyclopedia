import { Link } from "react-router-dom";
import "./tag.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Tag() {
  const [tag, setTag] = useState({});
  const [updatedTag, setUpdatedTag] = useState({});
  
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
        setArticles(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getArticles();
  }, []);
  useEffect(() => {
    const getTag = async () => {
      try {
        const id = window.location.href.replace("http://localhost:5521/tag/","");
        const res = await axios.get(`/tags/find/${id}`, {
          headers: {
            token:
              `Bearer ${JSON.parse(localStorage.getItem("user")).accessToken}`,
          },
        });
        setTag(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getTag();
  }, []);
  const handleChange = (e) => {
    const value = e.target.value;
    setUpdatedTag({ ...updatedTag, [e.target.name]: value });
  };

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setUpdatedTag({ ...updatedTag, [e.target.name]: value });
  };

  const updateTag = async () => {
    if (Object.keys(updatedTag).length){
    try {
      const id = window.location.href.replace("http://localhost:5521/tag/","");
      await axios.put(`/tags/${id}`, updatedTag,{
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
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Tag</h1>
        <Link to="/groups">
          <button className="userAddButton">Back</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <span className="productName">{tag.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{tag._id}</span>
            </div>
            {tag.content && articles && <div className="productInfoItem">
              <span className="productInfoKey">articles:</span>
              <div className="links">
              {articles.filter((article) => tag.content.includes(article._id)).map((article, idx) => (
                <span key={idx} className="productInfoValue"> {article.title} </span>
              ))}
              </div>
            </div>}
          </div>
        </div>
      </div>
      <div className="productBottom">
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
        <button className="addProductButton" onClick={updateTag}>
          Update
        </button>
      </form>
      </div>
    </div>
  );
}
