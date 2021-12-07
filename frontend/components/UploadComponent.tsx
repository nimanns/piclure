import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";
import ClientOnly from "./ClientOnly";
import Editor from "./Editor";
import React, { useState, useEffect } from "react";
import { CustomBtn } from "./styled-components/StyledComponents";
import ErrorDisplay from "./Error";

export const UploadForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  label {
    margin-top: 2em;
  }
  input#title {
    font-size: 24px;
    padding: 0.5em;
  }
  div.ck-content {
    background-color: #fff;
    height: 200px;
    div {
      height: 100%;
    }
  }
  /* button {
    all: unset;
    background: pink;
    text-align: center;
    padding: 1em;
    cursor: pointer;
    margin: 1em 0;
  } */
`;

const mutation = gql`
  mutation ($description: String!, $title: String!, $file: Upload!) {
    uploadImage(description: $description, title: $title, file: $file) {
      post {
        id
      }
    }
  }
`;

export default function UploadComponent() {
  const [mutate, { data, loading, error }] = useMutation(mutation);

  const [editorLoaded, setEditorLoaded] = useState(false);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [files, setFiles] = useState();

  useEffect(() => {
    setEditorLoaded(true);
  }, []);
  async function onChange(e) {
    const {
      target: {
        validity,
        files: [...file],
      },
    } = e;
    if (validity.valid) setFiles(file);
  }

  async function mutatePics(e) {
    e.preventDefault();
    if (title === "" || description === "")
      return console.log("No empty fields");
    const data = await mutate({
      variables: {
        title,
        description,
        file: files,
      },
    });
  }

  return (
    <>
      {error && <ErrorDisplay message={error.message}></ErrorDisplay>}
      <UploadForm action="" onSubmit={mutatePics}>
        <label htmlFor="title">Title</label>
        <input
          onChange={(data) => {
            setTitle(data.target.value);
          }}
          type="text"
          name="title"
          id="title"
        />
        <label htmlFor="description">Description</label>
        <Editor
          name="description"
          onChange={(data) => {
            setDescription(data);
          }}
          editorLoaded={editorLoaded}
        />

        <label htmlFor="files">Pictures</label>
        <input
          name="files"
          type="file"
          multiple
          required
          onChange={(e) => onChange(e)}
        />
        <CustomBtn style={{ margin: "1.2em auto" }} type="submit">
          Upload
        </CustomBtn>
      </UploadForm>
    </>
  );
}
