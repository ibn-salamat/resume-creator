import React, { useState } from "react";
import styled from "styled-components";
import { Button, TextInput } from "grommet";
import { useHistory } from "react-router-dom";

import { transformData } from "./transformData";
import { saveResume } from "../../../api/resume";
import { getUserById } from "../../../api/user";

export function Third({ data }) {
  const history = useHistory();
  const [titleResume, setTitleResume] = useState("");
  const resume = { ...data };

  const create = async () => {
    resume.title = titleResume;
    if (titleResume.trim().length > 5) {
      await saveResume(resume);
      await getUserById(resume.authorId);
      history.push("/myprofile");
    }
  };

  return (
    <div>
      <H2>Is it right?</H2>
      <TextInput
        value={titleResume}
        onChange={(e) => {
          setTitleResume(e.target.value);
        }}
      />

      <Button onClick={create}>Create</Button>
    </div>
  );
}

const H2 = styled.h2`
  font-weight: 100;
`;
