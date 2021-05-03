import React, { useState, useEffect } from "react";
import Axios from "axios";
import ErrorMessage from "../misc/ErrorMessage";
import "./SnippetEditor.scss";

function SnippetEditor({
  getSnippets,
  setNewSnippetEditorOpen,
  editSnippetData,
}) {
  const [editorTitle, setEditorTitle] = useState("");
  const [editorDescription, setEditorDescription] = useState("");
  const [editorCode, setEditorCode] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (editSnippetData) {
      setEditorTitle(editSnippetData.title ? editSnippetData.title : "");
      setEditorDescription(
        editSnippetData.description ? editSnippetData.description : ""
      );
      setEditorCode(editSnippetData.code ? editSnippetData.code : "");
    }
  }, [editSnippetData]);

  async function saveSnippet(e) {
    e.preventDefault();

    const snippetData = {
      title: editorTitle ? editorTitle : undefined,
      description: editorDescription ? editorDescription : undefined,
      code: editorCode ? editorCode : undefined,
    };

    try {
      if (!editSnippetData)
        await Axios.post("http://localhost:5000/snippet/", snippetData);
      else
        await Axios.put(
          `http://localhost:5000/snippet/${editSnippetData._id}`,
          snippetData
        );
    } catch (err) {
      if (err.response) {
        if (err.response.data.errorMessage) {
          setErrorMessage(err.response.data.errorMessage);
        }
      }
      return;
    }

    getSnippets();
    closeEditor();
  }
  function closeEditor() {
    setNewSnippetEditorOpen(false);
    setEditorCode("");
    setEditorDescription("");
    setEditorTitle("");
  }
  return (
    <div className="snippet-editor">
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          clear={() => setErrorMessage(null)}
        />
      )}
      <form className="form" onSubmit={saveSnippet}>
        <label className="label" htmlFor="editor-title">
          Title
        </label>
        <input
          id="editor-title"
          type="text"
          value={editorTitle}
          onChange={(e) => setEditorTitle(e.target.value)}
        />
        <br />
        <label className="label" htmlFor="editor-description">
          Description
        </label>
        <input
          id="editor-description"
          type="text"
          value={editorDescription}
          onChange={(e) => setEditorDescription(e.target.value)}
        />
        <br />
        <label className="label" htmlFor="editor-code">
          Code
        </label>
        <textarea
          id="editor-code"
          value={editorCode}
          onChange={(e) => setEditorCode(e.target.value)}
        />
        <button className="btn-save" type="submit">
          Save
        </button>
        <button className="btn-cancel" type="button" onClick={closeEditor}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default SnippetEditor;
