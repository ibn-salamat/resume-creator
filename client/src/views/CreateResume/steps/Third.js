import React, { useState } from "react";
import styled from "styled-components";
import { Button, TextInput } from "grommet";

import { transformData } from "./transformData";
import { saveResume } from "../../../api/resume";

export function Third({ data }) {
  const [titleResume, setTitleResume] = useState("");
  const resume = { ...data };

  const create = () => {
    resume.title = titleResume;
    if (titleResume.trim().length > 5) {
      saveResume(resume);
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
