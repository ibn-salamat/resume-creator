import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useStore } from "effector-react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { TextInput, CheckBox, Button } from "grommet";
import uid from "uid";

import { getResumeById, saveResume } from "../api/resume";
import { $loader } from "../store/loader";
import { DateMaskedInput } from "../components/DateMaskedInput";
import { transformData } from "./CreateResume/steps/transformData";

export function EditResume() {
  const { register, handleSubmit, watch, errors } = useForm();
  const params = useParams();
  const history = useHistory();
  const { resumeId } = params;
  const [resume, setResume] = useState({});
  const loader = useStore($loader);
  const [visibilityBirthDate, setVisibilityBirthDate] = useState(true);

  const [additionalInfo, setAdditionalInfo] = useState({
    contacts: [],
    work: [],
    education: [],
  });

  const addAdditionalInfo = (type, data) => {
    setAdditionalInfo({
      ...additionalInfo,
      [type]: [...additionalInfo[type], data],
    });
  };

  const deleteAdditionalInfo = (type, id) => {
    const copy = additionalInfo[type].filter((datas) => datas.id != id);
    setAdditionalInfo({ ...additionalInfo, [type]: copy });
  };

  const onSubmit = async (value) => {
    let transformed = transformData(value);
    const newValues = {
      ...transformed,
      _id: resumeId,
      authorId: resume.authorId,
      id: resumeId,
      birthday: visibilityBirthDate ? value.birthday : "0",
    };
    console.log(transformed);
    await saveResume(newValues);
    // history.push("/myprofile");
  };

  useEffect(() => {
    getResume();
  }, []);

  const getResume = async () => {
    const data = await getResumeById(resumeId);
    setResume(data.data);
    setAdditionalInfo({
      work: data.data.work.map((item) => ({ ...item, id: uid() })),
      education: data.data.education.map((item) => ({ ...item, id: uid() })),
      contacts: data.data.contacts.map((item) => ({ ...item, id: uid() })),
    });

    if (data.data.birthday == "0") setVisibilityBirthDate(false);
  };

  const { name, lastname, title, about, birthday, skills } = resume;
  const { work, contacts, education } = additionalInfo;

  return (
    <div>
      <h1>Edit resume</h1>
      {loader && <p>Loading</p>}
      {about && (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Field>
              <p>Title:</p>
              <TextInput
                name="title"
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

            <Field>
              <p>Skills:</p>
              <TextInput
                name="skills"
                ref={register({ required: true })}
                defaultValue={skills}
              />
            </Field>

            {contacts.map(({ id, title, value }) => {
              return (
                <Field key={id}>
                  <p>{watch(`%%%_contactTitle_${id}`)}:</p>
                  <TextInput
                    name={"%%%_contactTitle_" + id}
                    ref={register({ required: true })}
                    placeholder="My email/phone number/website"
                    defaultValue={title}
                  />

                  <TextInput
                    name={"%%%_contactValue_" + id}
                    ref={register({ required: true })}
                    placeholder="example@email.com"
                    defaultValue={value}
                  />
                  <Button onClick={() => deleteAdditionalInfo("contacts", id)}>
                    Delete
                  </Button>
                </Field>
              );
            })}

            {work.map(({ id, place, position, startDate, endDate }) => {
              return (
                <Field key={id}>
                  <p>Work place:</p>
                  <TextInput
                    name={`%%%_workPlace_${id}`}
                    ref={register({ required: true })}
                    placeholder="KFC"
                    defaultValue={place}
                  />
                  <p>Position:</p>

                  <TextInput
                    name={`%%%_workPosition_${id}`}
                    ref={register({ required: true })}
                    placeholder="Director"
                    defaultValue={position}
                  />
                  <p>Start date:</p>
                  <DateMaskedInput
                    name={`%%%_workStartDate_${id}`}
                    register={register({ required: true })}
                    placeholder="14.04.2015"
                    defaultValue={startDate}
                  />

                  <p>End date:</p>
                  <DateMaskedInput
                    name={`%%%_workEndDate_${id}`}
                    register={register({ required: true })}
                    placeholder="14.04.2020"
                    defaultValue={endDate}
                  />

                  <Button onClick={() => deleteAdditionalInfo("work", id)}>
                    Delete
                  </Button>
                </Field>
              );
            })}

            {education.map(({ id, place, profession, startDate, endDate }) => {
              return (
                <Field key={id}>
                  <p>Education place:</p>
                  <TextInput
                    name={`%%%_educationPlace_${id}`}
                    ref={register({ required: true })}
                    placeholder="Harvard"
                    defaultValue={place}
                  />
                  <p>Profession:</p>
                  <TextInput
                    name={`%%%_educationProfession_${id}`}
                    ref={register({ required: true })}
                    placeholder="Designer"
                    defaultValue={profession}
                  />
                  <p>Start date:</p>
                  <DateMaskedInput
                    name={`%%%_educationStartDate_${id}`}
                    register={register({ required: true })}
                    placeholder="14.04.2015"
                    defaultValue={startDate}
                  />
                  <p>End date:</p>
                  <DateMaskedInput
                    name={`%%%_educationEndDate_${id}`}
                    register={register({ required: true })}
                    placeholder="14.04.2020"
                    defaultValue={endDate}
                  />
                  <Button onClick={() => deleteAdditionalInfo("education", id)}>
                    Delete
                  </Button>
                </Field>
              );
            })}

            <Button
              onClick={() => addAdditionalInfo("contacts", { id: uid() })}
            >
              Add contacts
            </Button>
            <Button onClick={() => addAdditionalInfo("work", { id: uid() })}>
              Add work history
            </Button>
            <Button
              onClick={() => addAdditionalInfo("education", { id: uid() })}
            >
              Add education history
            </Button>

            <Button type="submit">Save</Button>
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
