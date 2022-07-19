import { Link } from "react-router-dom";
import "./group.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Group() {
  const [group, setGroup] = useState({});
  const [updatedGroup, setUpdatedGroup] = useState({});
  
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
    const getGroup = async () => {
      try {
        const id = window.location.href.replace("http://localhost:5521/group/","");
        const res = await axios.get(`/groups/find/${id}`, {
          headers: {
            token:
              `Bearer ${JSON.parse(localStorage.getItem("user")).accessToken}`,
          },
        });
        setGroup(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getGroup();
  }, []);
  const handleChange = (e) => {
    const value = e.target.value;
    setUpdatedGroup({ ...updatedGroup, [e.target.name]: value });
  };

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setUpdatedGroup({ ...updatedGroup, [e.target.name]: value });
  };

  const updateGroup = async () => {
    if (Object.keys(updatedGroup).length){
    try {
      const id = window.location.href.replace("http://localhost:5521/group/","");
      await axios.put(`/groups/${id}`, updatedGroup,{
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
        <h1 className="productTitle">Group</h1>
        <Link to="/groups">
          <button className="userAddButton">Back</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <span className="productName">{group.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{group._id}</span>
            </div>
            {group.content && articles && <div className="productInfoItem">
              <span className="productInfoKey">articles:</span>
              <div className="links">
              {articles.filter((article) => group.content.includes(article._id)).map((article, idx) => (
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
        <button className="addProductButton" onClick={updateGroup}>
          Update
        </button>
      </form>
      </div>
    </div>
  );
}
