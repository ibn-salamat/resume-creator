import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { TextInput, Button, TextArea, CheckBox } from "grommet";
import { useStore } from "effector-react";
import uid from "uid";

import { $user } from "../../../store/user";
import { DateMaskedInput } from "../../../components/DateMaskedInput";
import { transformData } from "./transformData";

export function Second({ changeStep, template }) {
  const user = useStore($user);
  const { register, handleSubmit, watch, errors } = useForm();

  const [visibilityBirthDate, setVisibilityBirthDate] = useState(true);

  const [additionalInfo, setAdditionalInfo] = useState({
    contacts: [],
    work: [],
    education: [],
  });

  const { work, contacts, education } = additionalInfo;

  const addAdditionalInfo = (type) => {
    setAdditionalInfo({
      ...additionalInfo,
      [type]: [...additionalInfo[type], uid()],
    });
  };

  const deleteAdditionalInfo = (type, id) => {
    const copy = additionalInfo[type].filter((_id) => _id != id);
    setAdditionalInfo({ ...additionalInfo, [type]: copy });
  };

  const onSubmit = (data) => {
    let transformed = transformData(data);
    let newData = {
      id: "0",
      ...transformed,
      birthday: visibilityBirthDate ? data.birthday : "0",
      authorId: user._id,
      template,
    };
    changeStep("second", newData);
  };

  return (
    <div>
      <H2>Fill fields</H2>

      {user.fullDataLoaded && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Field>
            <p>Name:</p>
            <TextInput
              name="name"
              ref={register({ required: true })}
              defaultValue={user.name}
            />
          </Field>

          <Field>
            <p>Lastname:</p>
            <TextInput
              name="lastname"
              ref={register({ required: true })}
              defaultValue={user.lastname}
            />
          </Field>

          <Field>
            <p>Date of birth:</p>
            <DateMaskedInput
              name="birthday"
              register={register({ required: true })}
              disabled={!visibilityBirthDate}
              defaultValue={
                user.birthday === 0 ? new Date().toLocaleDateString() : user.birthday
              }
            />

            <CheckBox
              label="Show"
              checked={visibilityBirthDate}
              onChange={() => setVisibilityBirthDate(!visibilityBirthDate)}
            />
          </Field>

          <Field>
            <p>Email:</p>
            <TextInput
              name="email"
              ref={register({ required: true })}
              defaultValue={user.email}
            />
          </Field>

          {contacts.map((id) => {
            return (
              <Field key={id}>
                <p>{watch(`%%%_contactTitle_${id}`)}:</p>
                <TextInput
                  name={"%%%_contactTitle_" + id}
                  ref={register({ required: true })}
                  placeholder="My email/phone number/website"
                />

                <TextInput
                  name={"%%%_contactValue_" + id}
                  ref={register({ required: true })}
                  placeholder="example@email.com"
                />
                <Button onClick={() => deleteAdditionalInfo("contacts", id)}>
                  Delete
                </Button>
              </Field>
            );
          })}

          {work.map((id) => {
            return (
              <Field key={id}>
                <p>Work place:</p>
                <TextInput
                  name={`%%%_workPlace_${id}`}
                  ref={register({ required: true })}
                  placeholder="KFC"
                />
                <p>Position:</p>

                <TextInput
                  name={`%%%_workPosition_${id}`}
                  ref={register({ required: true })}
                  placeholder="Director"
                />
                <p>Start date:</p>
                <DateMaskedInput
                  name={`%%%_workStartDate_${id}`}
                  register={register({ required: true })}
                  placeholder="14.04.2015"
                />

                <p>End date:</p>
                <DateMaskedInput
                  name={`%%%_workEndDate_${id}`}
                  register={register({ required: true })}
                  placeholder="14.04.2020"
                />

                <Button onClick={() => deleteAdditionalInfo("work", id)}>Delete</Button>
              </Field>
            );
          })}

          {education.map((id) => {
            return (
              <Field key={id}>
                <p>Education place:</p>
                <TextInput
                  name={`%%%_educationPlace_${id}`}
                  ref={register({ required: true })}
                  placeholder="Harvard"
                />
                <p>Profession:</p>
                <TextInput
                  name={`%%%_educationProfession_${id}`}
                  ref={register({ required: true })}
                  placeholder="Designer"
                />
                <p>Start date:</p>
                <DateMaskedInput
                  name={`%%%_educationStartDate_${id}`}
                  register={register({ required: true })}
                  placeholder="14.04.2015"
                />
                <p>End date:</p>
                <DateMaskedInput
                  name={`%%%_educationEndDate_${id}`}
                  register={register({ required: true })}
                  placeholder="14.04.2020"
                />
                <Button onClick={() => deleteAdditionalInfo("education", id)}>
                  Delete
                </Button>
              </Field>
            );
          })}

          <Field>
            <p>Skills:</p>
            <TextInput
              name="skills"
              ref={register({ required: true })}
              placeholder="Microsoft Office, English, Python..."
            ></TextInput>
          </Field>

          <Field>
            <p>About yourself:</p>
            <TextArea name="about" ref={register({ required: true })}></TextArea>
          </Field>

          <Button onClick={() => addAdditionalInfo("contacts")}>Add contacts</Button>
          <Button onClick={() => addAdditionalInfo("work")}>Add work history</Button>
          <Button onClick={() => addAdditionalInfo("education")}>
            Add education history
          </Button>

          <Button primary type="submit">
            Next
          </Button>
        </form>
      )}
    </div>
  );
}

const H2 = styled.h2`
  font-weight: 100;
`;

const Field = styled.div`
  border: 1px solid red;
  margin: 10px 0;
  padding: 7px 5px;
`;
