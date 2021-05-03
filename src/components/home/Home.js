import Axios from "axios";
import { useContext, useEffect, useState } from "react";
import Snippet from "./Snippet";
import UserContext from "../../context/UserContext";
import SnippetEditor from "./SnippetEditor";
import { Link } from "react-router-dom";
import "./Home.scss";

const Home = () => {
  const [snippets, setSnippets] = useState([]);
  const [newSnippetEditorOpen, setNewSnippetEditorOpen] = useState(false);
  const [editSnippetData, setEditSnippetData] = useState(null);

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      setSnippets([]);
      return;
    }
    getSnippets();
  }, [user]);

  async function getSnippets() {
    const snippetsRes = await Axios.get("http://localhost:5000/snippet/");
    console.log(snippetsRes);
    setSnippets(snippetsRes.data);
  }
  function editSnippet(snippetData) {
    setEditSnippetData(snippetData);
    setNewSnippetEditorOpen(true);
  }

  const renderSnippets = () => {
    let sortedSnippets = [...snippets];
    sortedSnippets = sortedSnippets.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return sortedSnippets.map((snippet, i) => {
      return (
        <Snippet
          key={i}
          snippet={snippet}
          getSnippets={getSnippets}
          editSnippet={editSnippet}
        />
      );
    });
  };

  return (
    <div className="home">
      {!newSnippetEditorOpen && user && (
        <button
          className="btn-editor-toggle"
          onClick={() => setNewSnippetEditorOpen(true)}
        >
          Add Snippet
        </button>
      )}
      {newSnippetEditorOpen && (
        <SnippetEditor
          setNewSnippetEditorOpen={setNewSnippetEditorOpen}
          getSnippets={getSnippets}
          editSnippetData={editSnippetData}
        />
      )}
      {snippets.length > 0
        ? renderSnippets()
        : user && (
            <p className="no-snippets-msg">No snippets have been added yet.</p>
          )}
      {user === null && (
        <div className="no-user-message">
          <h2>Welcome to Snippet manager</h2>
          <Link to="/register">Register here</Link>
        </div>
      )}
    </div>
  );
};

export default Home;
