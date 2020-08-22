import React from "react";
import styled from "styled-components";

import { transformData } from "./transformData";

export function Third({ data }) {
  const resume = transformData(data);
  console.log(resume);
  return (
    <div>
      <H2>Is it right?</H2>
    </div>
  );
}

const H2 = styled.h2`
  font-weight: 100;
`;
