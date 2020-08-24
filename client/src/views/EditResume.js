import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "effector-react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { TextInput, CheckBox } from "grommet";

import { getResumeById, saveResume } from "../api/resume";
import { $loader, GET_RESUME_BY_ID } from "../store/loader";
import { DateMaskedInput } from "../components/DateMaskedInput";

export function EditResume() {
  const { register, handleSubmit, watch, errors } = useForm();
  const params = useParams();
  const { resumeId } = params;
  const [resume, setResume] = useState({});
  const loader = useStore($loader);
  const [visibilityBirthDate, setVisibilityBirthDate] = useState(true);

  const getResume = async () => {
    const data = await getResumeById(resumeId);
    setResume(data.data);
    if (data.data.birthday == "0") setVisibilityBirthDate(false);
  };

  const onSubmit = async (value) => {
    const newValues = {
      ...value,
      _id: resumeId,
      authorId: resume.authorId,
      id: resumeId,
      birthday: visibilityBirthDate ? value.birthday : "0",
    };

    // await saveResume(data)
    console.log(newValues);
  };

  useEffect(() => {
    getResume();
  }, []);

  const { name, lastname, title, about, birthday } = resume;
  return (
    <div>
      <h1>Edit resume</h1>
      {loader[GET_RESUME_BY_ID] && <p>Loading</p>}
      {about && (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Field>
              <p>Title:</p>
              <TextInput
                name="name"
                ref={register({ required: true })}
                defaultValue={title}
              />
            </Field>
            <Field>
              <p>Name:</p>
              <TextInput
                name="name"
                ref={register({ required: true })}
                defaultValue={name}
              />
            </Field>

            <Field>
              <p>Lastname:</p>
              <TextInput
                name="lastname"
                ref={register({ required: true })}
                defaultValue={lastname}
              />
            </Field>

            <Field>
              <p>Date of birth:</p>
              <DateMaskedInput
                name="birthday"
                register={register({ required: true })}
                disabled={!visibilityBirthDate}
                defaultValue={birthday}
              />

              <CheckBox
                label="Show"
                checked={visibilityBirthDate}
                onChange={() => setVisibilityBirthDate(!visibilityBirthDate)}
              />
            </Field>

            <button type="submit">Save</button>
          </form>
        </>
      )}
    </div>
  );
}

const Field = styled.div`
  border: 1px solid red;
  margin: 10px 0;
  padding: 7px 5px;
`;
