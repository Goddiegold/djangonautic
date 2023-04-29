import React, { useState } from "react";
import { toast } from "react-toastify";
import { createArticle } from "@/services/userService";
import { useRouter } from "next/router";
import styles from "@/styles/App.module.css"
import PrivateRoute from "@/components/PrivateRoute";


const CreateArticle = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [article, setArticle] = useState({
    title: "",
    body: "",
    thumb: "./assets/default.png"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    createArticle(article).then(res => {
      console.log(res)
      setLoading(false)
      router.push("/")
    }).catch(err => {
      setLoading(false)
      toast.error(err?.response?.data)
      console.log(err)
    });
  }
  const { title, body } = article;

  return (
    <PrivateRoute>


      <div className={styles.create_article}>
        <form
          action="post"
          className={styles.site_form}
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
              formData.append('thumb', file)
              console.log(target.files[0])
              setArticle({ ...article, thumb: file })
            }}
          />

          <input type="submit" value={loading ? "Please wait..." : "Create"} />
        </form>
      </div>
    </PrivateRoute>
  );
};

export default CreateArticle;
