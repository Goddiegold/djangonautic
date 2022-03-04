import React, { useState} from "react";
import { toast } from "react-toastify";
import { getCurrentUser } from "../../services/authService";
import { createArticle } from "../../services/userService";

const ArticleCreate = ({ articles }) => {
    const user = getCurrentUser();
  
  const [article, setArticle] = useState({
    title: "",
    body: "",
    thumb:""
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const data = await createArticle(article);
      // history.back();
      articles.push(data);
      console.log(data)
    } catch (ex) {
      if (ex && ex.status === 401 && user) {   
        toast.error("Something went wrong, pls try again later");
      }
   }
  // console.log(article)
  };

  const { title, body } = article;

  if (!user) return location.pathname = "/accounts/login";
  else return (
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
