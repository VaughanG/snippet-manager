import Axios from "axios";

const Snippet = ({ snippet, getSnippets }) => {
  async function deleteSnippet() {
    if (window.confirm("Do you want to delete this snippet?")) {
      await Axios.delete(`http://localhost:5000/snippet/${snippet._id}`);

      getSnippets();
    }
  }
  return (
    <div className="snippet">
      {snippet.title && <h2>{snippet.title}</h2>}
      {snippet.description && <p>{snippet.description}</p>}
      {snippet.code && (
        <pre>
          <code>{snippet.code}</code>
        </pre>
      )}
      {/* <button className="btn-edit" onClick={() => editSnippet(snippet)}>
        Edit
      </button> */}
      <button onClick={deleteSnippet}>Delete</button>
    </div>
  );
};
export default Snippet;
