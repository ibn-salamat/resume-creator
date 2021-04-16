import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useStore } from "effector-react";
import { Button } from "grommet";

import { $loader } from "../store/loader";
import { getResumeById } from "../api/resume";
import { $user } from "../store/user";
import { A } from "../utils/styles";

export function Resume() {
  const params = useParams();
  const user = useStore($user);
  const { resumeId } = params;
  const loader = useStore($loader);
  const [resume, setResume] = useState(false);

  const getResume = async () => {
    const data = await getResumeById(resumeId);
    setResume(data.data);
  };

  useEffect(() => {
    getResume();
  }, []);

  console.log(user);
  return (
    <div>
      <h1>Resume</h1>

      {loader ? (
        <p>Loading</p>
      ) : (
        <div>
          <p>{resume.title}</p>
          {user && resume.authorId === user.id && (
            <A as={NavLink} to={`/resumes/edit/${resume._id}`}>
              Edit
            </A>
          )}
        </div>
      )}
    </div>
  );
}
