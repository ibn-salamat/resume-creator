import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Anchor } from "grommet";
import { useStore } from "effector-react";
import styled from "styled-components";

import { $loader } from "../store/loader";
import { getResumes } from "../api/resume";
import { SNavLink } from "../utils/styles";

export function Resumes() {
  const [resumes, setResumes] = useState([]);
  const loader = useStore($loader);

  async function asyncGetResumes() {
    const data = await getResumes("all");
    setResumes(data.data);
  }

  useEffect(() => {
    asyncGetResumes();
  }, []);

  return (
    <div>
      <h1>Resumes list</h1>
      {loader.get_resumes ? (
        <p>Loading</p>
      ) : (
        resumes?.map(({ _id, name, lastname, title, authorId }) => {
          return (
            <div key={_id}>
              <Resume>
                <SNavLink to={"resumes/get/" + _id} color="colors">
                  {title}
                </SNavLink>
                <br />

                <SNavLink to={"users/" + authorId} color="#7D4CDB">
                  {name} {lastname}
                </SNavLink>
              </Resume>
            </div>
          );
        })
      )}
    </div>
  );
}

const Resume = styled.div`
  margin: 5px 0;
  border: 1px solid red;
`;
