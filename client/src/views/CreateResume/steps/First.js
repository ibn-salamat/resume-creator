import React, { useState } from "react";
import { Button } from "grommet";
import styled from "styled-components";

const resumeTemplatePreviews = [
  {
    id: 1,
    img: process.env.PUBLIC_URL + "/assets/img/resume-templates/resume-template-1.png",
  },
  {
    id: 2,
    img: process.env.PUBLIC_URL + "/assets/img/resume-templates/resume-template-1.png",
  },
];

export function First({ changeStep }) {
  const [resumeTemplate, selectResumeTemplate] = useState(null);
  const [selected, changeSelected] = useState(null);

  return (
    <div>
      <H2>Choose template</H2>
      <ResumeTemplates>
        {resumeTemplatePreviews.map(({ id, img }) => (
          <ResumeTemplatePreview
            className={selected === id ? "selected" : ""}
            key={id}
            src={img}
            onClick={() => {
              selectResumeTemplate(id);
              changeSelected(id);
            }}
          />
        ))}
      </ResumeTemplates>

      <Button
        primary
        disabled={!resumeTemplate}
        onClick={() => {
          changeStep("first", resumeTemplate);
        }}
      >
        Next
      </Button>
    </div>
  );
}

const ResumeTemplatePreview = styled.img`
  max-width: 300px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  cursor: pointer;
  margin: 10px;
  border: 1px solid transparent;

  &.selected {
    border: 1px solid red;
  }

  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    transition: 0.2s all ease;
  }
`;

const ResumeTemplates = styled.div`
  border: 1px solid red;
  padding: 10px 15px;
`;

const H2 = styled.h2`
  font-weight: 100;
`;
