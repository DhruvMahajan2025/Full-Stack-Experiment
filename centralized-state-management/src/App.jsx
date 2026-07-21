import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  addPost,
  deletePost,
  updatePost,
  saveDraft,
  clearPosts,
} from "./features/postsSlice";

import "./App.css";

function App() {

  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts.posts);

  const drafts = useSelector((state) => state.posts.drafts);

  const platforms = useSelector(
    (state) => state.posts.platforms
  );

  const [content, setContent] = useState("");

  const [platform, setPlatform] = useState("Twitter");

  const [editingId, setEditingId] = useState(null);

  const limits = {
    Twitter: 280,
    Facebook: 5000,
    Instagram: 2200,
    LinkedIn: 3000,
  };

  const maxLimit = limits[platform];

  const remaining = maxLimit - content.length;


  // Add or Update Post

  const handleSubmit = () => {

    if (content.trim() === "") {
      alert("Please enter post content.");
      return;
    }

    if (content.length > maxLimit) {
      alert("Character limit exceeded.");
      return;
    }

    if (editingId !== null) {

      dispatch(
        updatePost({
          id: editingId,
          content,
          platform,
        })
      );

      setEditingId(null);

    } else {

      dispatch(
        addPost({
          content,
          platform,
        })
      );

    }

    setContent("");
  };


  // Delete Post

  const handleDelete = (id) => {

    dispatch(deletePost(id));

  };


  // Edit Post

  const handleEdit = (post) => {

    setContent(post.content);

    setPlatform(post.platform);

    setEditingId(post.id);

  };


  // Save Draft

  const handleDraft = () => {

    if (content.trim() === "") {

      alert("Enter some content before saving draft.");

      return;

    }

    dispatch(
      saveDraft({
        content,
        platform,
      })
    );

    setContent("");

    alert("Draft saved successfully!");

  };


  return (

    <div className="app">

      <header>

        <h1>
          Redux Post Manager
        </h1>

        <p>
          Centralized State Management using Redux Toolkit
        </p>

      </header>


      <main>

        {/* Post Composer */}

        <section className="card">

          <h2>
            Create Post
          </h2>


          <label>
            Select Platform
          </label>


          <select
            value={platform}
            onChange={(e) =>
              setPlatform(e.target.value)
            }
          >

            {platforms.map((item) => (

              <option
                key={item}
                value={item}
              >

                {item}

              </option>

            ))}

          </select>


          <label>
            Post Content
          </label>


          <textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) =>
              setContent(e.target.value)
            }
          />


          <div className="counter">

            Characters:

            {content.length}

            {" / "}

            {maxLimit}

          </div>


          {remaining < 0 ? (

            <p className="error">

              Character limit exceeded by

              {" "}

              {-remaining}

              {" "}

              characters.

            </p>

          ) : remaining <= 20 ? (

            <p className="warning">

              Warning: Only

              {" "}

              {remaining}

              {" "}

              characters remaining.

            </p>

          ) : (

            <p className="success">

              Post is valid.

            </p>

          )}


          <div className="buttons">

            <button
              className="publishBtn"
              onClick={handleSubmit}
            >

              {editingId !== null
                ? "Update Post"
                : "Add Post"}

            </button>


            <button
              className="draftBtn"
              onClick={handleDraft}
            >

              Save Draft

            </button>

          </div>

        </section>


        {/* Global State Information */}

        <section className="stats">

          <div>

            <h3>
              {posts.length}
            </h3>

            <p>
              Total Posts
            </p>

          </div>


          <div>

            <h3>
              {drafts.length}
            </h3>

            <p>
              Drafts
            </p>

          </div>


          <div>

            <h3>
              {platforms.length}
            </h3>

            <p>
              Platforms
            </p>

          </div>

        </section>


        {/* Posts */}

        <section className="card">

          <div className="titleRow">

            <h2>
              Published Posts
            </h2>


            {posts.length > 0 && (

              <button
                className="clearBtn"
                onClick={() =>
                  dispatch(clearPosts())
                }
              >

                Clear All

              </button>

            )}

          </div>


          {posts.length === 0 ? (

            <p className="empty">

              No posts available.

            </p>

          ) : (

            <div className="postList">

              {posts.map((post) => (

                <div
                  className="post"
                  key={post.id}
                >

                  <div className="postHeader">

                    <span className="platform">

                      {post.platform}

                    </span>

                    <span className="date">

                      {post.createdAt}

                    </span>

                  </div>


                  <p>

                    {post.content}

                  </p>


                  <div className="postButtons">

                    <button
                      className="editBtn"
                      onClick={() =>
                        handleEdit(post)
                      }
                    >

                      Edit

                    </button>


                    <button
                      className="deleteBtn"
                      onClick={() =>
                        handleDelete(post.id)
                      }
                    >

                      Delete

                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>


        {/* Drafts */}

        <section className="card">

          <h2>
            Saved Drafts
          </h2>


          {drafts.length === 0 ? (

            <p className="empty">

              No drafts saved.

            </p>

          ) : (

            drafts.map((draft) => (

              <div
                className="draft"
                key={draft.id}
              >

                <strong>

                  {draft.platform}

                </strong>

                <p>

                  {draft.content}

                </p>

              </div>

            ))

          )}

        </section>

      </main>

    </div>

  );

}

export default App;