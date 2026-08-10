import { useAuth } from "../context/AuthContext";

function Editor() {

  const { user } = useAuth();


  return (
    <div className="page">

      <h1>Editor Panel</h1>


      <div className="editor-panel">

        <h2>
          Content Management
        </h2>

        <p>
          Welcome, {user.username}.
        </p>

        <p>
          Your Editor role allows you
          to manage application content.
        </p>


        <div className="actions">

          <button>
            Create Content
          </button>

          <button>
            Edit Content
          </button>

          <button>
            Publish Content
          </button>

        </div>

      </div>

    </div>
  );
}

export default Editor;