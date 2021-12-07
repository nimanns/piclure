import React, { useEffect, useRef } from "react";

function Editor({ onChange, editorLoaded, name }) {
  const editorRef = useRef<{CKEditor:any,DecoupledEditor:any}>();
  const { CKEditor, DecoupledEditor } = editorRef.current || {CKEditor:null,DecoupledEditor:null};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
      DecoupledEditor: require("@ckeditor/ckeditor5-build-decoupled-document"),
    };
  }, []);
  if (DecoupledEditor) {
    DecoupledEditor.defaultConfig = {
      toolbar: {
        id: "Test",
        items: [
          "heading",
          "|",
          "bold",
          "italic",
          "underline",
          "|",
          "bulletedList",
          "numberedList",
          "blockquote",
          "|",
          "insertTable",
          "|",
          "undo",
          "redo",
        ],
      },
      table: {
        contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
      },
      language: "en",
    };
  }
  return (
    <div>
      {editorLoaded ? (
        <>
          <div className="document-editor">
            <div className="document-editor__toolbar"></div>
            <div className="document-editor__editable-container"></div>
            <CKEditor
              onReady={(editor) => {
                const toolbarContainer = document.querySelector(
                  ".document-editor__toolbar"
                );
                toolbarContainer.appendChild(editor.ui.view.toolbar.element);
              }}
              type=""
              name={name}
              editor={DecoupledEditor}
              // data={value}
              onChange={(event, editor) => {
                const data = editor.getData();
                // console.log({ event, editor, data });
                onChange(data);
              }}
            />
          </div>
        </>
      ) : (
        <div>Editor loading</div>
      )}
    </div>
  );
}

export default Editor;
