import React, { useState, useEffect, useContext} from "react";
import { toast } from "react-toastify";
import { createArticle } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";


const ArticleCreate = ({articles}) => {
  
  let navigate = useNavigate();
  const {user} = useContext(UserContext)
  useEffect(() => {
    if (!user.userInfo.name) return navigate("/accounts/login");
  },[user,navigate])
  
  const [article, setArticle] = useState({
    title: "",
    body: "",
    thumb:"./assets/default.png"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
     createArticle(article,user.userInfo.token).then(res => {
      console.log(res)
      navigate("/")
    }).catch(err=>{
      toast.error("Pls try again later!")
      console.log(err)
  });
  }
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
              const file = target.files[0];
              const formData = new FormData();
              formData.append('thumb',file)
            console.log(target.files[0])
            setArticle({...article,thumb:file})
            }}
          />

          <input type="submit" value="Create" />
        </form>
      </div>
  );
};

export default ArticleCreate;
