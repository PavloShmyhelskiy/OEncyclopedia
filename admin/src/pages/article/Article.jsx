import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./article.css";
import axios from "axios";

export default function Article() {
  const [article, setArticle] = useState({});
  const [updatedArticle, setUpdatedArticle] = useState({});
 
  useEffect(() => {
    const getArticle = async () => {
      try {
        const id = window.location.href.replace("http://localhost:5521/article/","");
        const res = await axios.get(`/articles/find/${id}`, {
          headers: {
            token:
              `Bearer ${JSON.parse(localStorage.getItem("user")).accessToken}`,
          },
        });
        setArticle(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getArticle();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setUpdatedArticle({ ...updatedArticle, [e.target.name]: value });
  };
  const handleLinksChange = (e) => {
    const value = e.target.value;
    const links = value.split(", ")
    setUpdatedArticle({ ...updatedArticle, [e.target.name]: links });
  };

  const date = new Date(article.createdAt);
  const stringDate = date.getFullYear()+"/"+("0"+(date.getMonth()+1)).slice(-2)+"/"+("0"+date.getDate()).slice(-2);
  
  const updateArticle = async () => {
    if (Object.keys(updatedArticle).length){
    try {
      const id = window.location.href.replace("http://localhost:5521/article/","");
      await axios.put(`/articles/${id}`, updatedArticle,{
        headers: {
          token:
            `Bearer ${JSON.parse(localStorage.getItem("user")).accessToken}`,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
  };
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Article</h1>
        <Link to="/articles">
          <button className="userAddButton">Back</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={article.thumbnail || "https://cdn-icons-png.flaticon.com/512/337/337118.png"} alt="" className="productInfoImg" />
            <span className="productName">{article.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">content:</span>
              <span className="productInfoValue">{article.content}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{article._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">creator:</span>
              <span className="productInfoValue">{article.created_by}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">date:</span>
              <span className="productInfoValue">{stringDate}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">views:</span>
              <span className="productInfoValue">{article.views}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">rate:</span>
              <span className="productInfoValue">{article.rate || 0}</span>
            </div>
            {article.links && (
            <div className="productInfoItem">
              <span className="productInfoKey">links:</span>
              <div className="links">
              {article.links.map((link, idx) => (
                <a key={idx} href={link} className="productInfoValue"> {link} </a>
              ))}
              </div>
            </div>)}
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Article Title</label>
            <input type="text" placeholder={article.title} name="title"
            onChange={handleChange}/>
            <label>Content</label>
            <input type="text" placeholder={article.content} name="content"
            onChange={handleChange}/>
            <label>Links</label>
            <input type="text" placeholder={article.links} name="links"
            onChange={handleLinksChange}/>
            <label>Thumbnail</label>
            <input type="text" placeholder={article.thumbnail} name="thumbnail"
            onChange={handleChange}/>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img
                src={updatedArticle.thumbnail || "https://cdn-icons-png.flaticon.com/512/337/337118.png"}
                alt=""
                className="productUploadImg"
              />
            </div>
            <button className="productButton" onClick={updateArticle}>Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
