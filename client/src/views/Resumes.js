import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Anchor } from "grommet";
import { useStore } from "effector-react";

import { $loader } from "../store/loader";
import { getResumes } from "../api/resume";
import { A } from "../utils/styles";
import styled from "styled-components";

export function Resumes() {
  const [resumes, setResumes] = useState([]);
  const loader = useStore($loader);

  const asyncGetResumes = async () => {
    const data = await getResumes("all");
    setResumes(data.data);
  };
  useEffect(() => {
    asyncGetResumes();
  }, []);

  console.log(loader);
  return (
    <div>
      <h1>Resumes list</h1>
      {loader && <p>Loading</p>}

      {resumes.map(({ _id, name, lastname, title, authorId }) => {
        return (
          <div key={_id}>
            <Resume>
              <A to={"resumes/get/" + _id} as={NavLink} color="#7D4CDB">
                {title}
              </A>
              <br />

              <A to={"users/" + authorId} as={NavLink} color="#7D4CDB">
                {name} {lastname}
              </A>
            </Resume>
          </div>
        );
      })}
    </div>
  );
}

const Resume = styled.div`
  margin: 5px 0;
  border: 1px solid red;
`;
