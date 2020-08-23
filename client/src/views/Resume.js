import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "effector-react";
import { Button } from "grommet";

import { $loader, GET_RESUME_BY_ID } from "../store/loader";
import { getResumeById } from "../api/resume";
import { $user } from "../store/user";

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

      {loader[GET_RESUME_BY_ID] ? (
        <p>Loading</p>
      ) : (
        <div>
          <p>{resume.title}</p>
          {user && resume.authorId === user.id && <Button>Change</Button>}
        </div>
      )}
    </div>
  );
}
