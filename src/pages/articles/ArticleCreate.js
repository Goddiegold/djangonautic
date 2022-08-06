import React, { useState, useEffect} from "react";
import { toast } from "react-toastify";
import { createArticle } from "../../services/userService";
import { useNavigate } from "react-router-dom";


const ArticleCreate = ({articles}) => {
  
  let navigate = useNavigate();
  // useEffect(() => {
  //   if (!user) return navigate("/accounts/login");
  // },[user,navigate])
  
  const [article, setArticle] = useState({
    title: "",
    body: "",
    thumb:""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
     createArticle(article).then(res => {
      console.log(res)
    }).catch(err=>console.log(err));
  };

  const { title, body } = article;

  return (
      <div className="create-article">
        <form
          action="post"
          className="site-form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
      >
        {/* {console.log(location)} */}
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            value={title}
            id="id_title"
            maxLength={100}
            required
            onChange={({ target }) =>
              setArticle({ ...article, title: target.value })
            }
          />

          <label htmlFor="title">Body: </label>
          <textarea
            name="body"
            id="body"
            value={body}
            onChange={({ target }) =>
              setArticle({ ...article, body: target.value })
            }
            cols={40}
            rows={10}
            required
          />

          <label htmlFor="title">Thumb: </label>
          <input
            type="file"
            name="thumb"
            accept="image/*"
            id="thumb"
            // value={thumb}
            onChange={({ target }) => {
              const reader = new FileReader();
              reader.onload = () => {
                if (reader.readyState === 2) {
                  setArticle({ ...article, thumb: reader.result });
                }
              };
              reader.readAsDataURL(target.files[0]);
            }}
          />

          <input type="submit" value="Create" />
        </form>
      </div>
  );
};

export default ArticleCreate;
