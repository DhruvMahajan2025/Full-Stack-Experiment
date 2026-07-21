import { useState } from "react";
import "./App.css";

function App() {
  const limits = {
    Twitter: 280,
    Facebook: 5000,
    Instagram: 2200,
    LinkedIn: 3000,
  };

  const [platform, setPlatform] = useState("Twitter");
  const [post, setPost] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [media, setMedia] = useState(null);

  const maxLimit = limits[platform];
  const remaining = maxLimit - post.length;

  const handlePlatformChange = (e) => {
    setPlatform(e.target.value);
  };

  const handlePostChange = (e) => {
    setPost(e.target.value);
  };

  const handleMediaChange = (e) => {
    if (e.target.files.length > 0) {
      setMedia(e.target.files[0]);
    }
  };

  const clearPost = () => {
    setPost("");
    setHashtags("");
    setMedia(null);
  };

  const publishPost = () => {
    if (post.trim() === "") {
      alert("Please enter a post.");
      return;
    }

    if (post.length > maxLimit) {
      alert("Character limit exceeded.");
      return;
    }

    alert("Post Published Successfully!");
  };

  return (
    <div className="container">
      <h1>Multi Platform Post Composer</h1>
      <p className="subtitle">
        Create and validate posts for multiple social media platforms.
      </p>

      <div className="section">
        <label>Write Your Post</label>

        <textarea
          placeholder="What's on your mind?"
          value={post}
          onChange={handlePostChange}
        ></textarea>

        <div className="counter">
          Characters: {post.length} / {maxLimit}
        </div>

        {remaining < 0 ? (
          <p className="error">
            Character limit exceeded by {-remaining} characters.
          </p>
        ) : remaining <= 20 ? (
          <p className="warning">
            Warning: Only {remaining} characters remaining.
          </p>
        ) : (
          <p className="success">Post is valid.</p>
        )}
      </div>

      <div className="section">
        <h3>Select Platform</h3>

        {Object.keys(limits).map((item) => (
          <label key={item} className="radio">
            <input
              type="radio"
              value={item}
              checked={platform === item}
              onChange={handlePlatformChange}
            />
            {item}
          </label>
        ))}
      </div>

      <div className="section">
        <h3>Hashtags</h3>

        <input
          type="text"
          placeholder="#react #coding"
          value={hashtags}
          onChange={(e) => setHashtags(e.target.value)}
        />
      </div>

      <div className="section">
        <h3>Attach Media</h3>

        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleMediaChange}
        />

        {media && (
          <p className="mediaName">
            Selected File: {media.name}
          </p>
        )}
      </div>

      <div className="section">
        <h3>Live Preview</h3>

        <div className="preview">
          <p>{post || "Your post preview will appear here..."}</p>

          {hashtags && (
            <p className="hashtags">{hashtags}</p>
          )}

          {media && (
            <p className="mediaName">
              📎 {media.name}
            </p>
          )}
        </div>
      </div>

      <div className="buttons">
        <button className="clearBtn" onClick={clearPost}>
          Clear
        </button>

        <button className="publishBtn" onClick={publishPost}>
          Publish
        </button>
      </div>
    </div>
  );
}

export default App;