import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { TextInput, Anchor, Button } from "grommet";
import { useStore } from "effector-react";
import { NavLink } from "react-router-dom";
import { $user } from "../../../store/user";

export function Second() {
  const user = useStore($user);
  const { register, handleSubmit, errors } = useForm();

  const [contacts, setContacts] = useState([]);
  const [experienceHistory, setExperienceHistory] = useState({ work: [], education: [] });

  const onSubmit = (data) => {
    console.log(data);
  };

  const showContactsField = () => {
    const _contacts = [
      ...contacts,
      {
        id: Number(new Date()),
        title: "Email/phone number/website",
        value: "example@mail.com",
      },
    ];
    setContacts(_contacts);
  };

  const handleChangeContacts = ({ target }) => {
    const data = target.name.split("=");
    const [key, id] = data;
    const _contacts = contacts.map((contact) =>
      contact.id == id
        ? {
            ...contact,
            [key]: target.value,
          }
        : contact
    );

    setContacts(_contacts);
  };

  const deleteContacts = (id) => {
    const _contacts = contacts.filter((contact) => contact.id != id);
    setContacts(_contacts);
  };

  const showHistory = (type) => {
    const _list = [
      ...experienceHistory[type],
      {
        id: Number(new Date()),
        place: type + " place",
        position: type === "education" ? null : "",
        startDate: "",
        endDate: "",
      },
    ];

    setExperienceHistory({ ...experienceHistory, [type]: _list });
  };

  const handleChangeExperienceHistory = ({ target }) => {
    const data = target.name.split("=");
    const { value } = target;
    const [experienceType, experienceTitle, id] = data;

    let _experiences = experienceHistory[experienceType];

    _experiences = _experiences.map((experience) =>
      experience.id == id
        ? {
            ...experience,
            [experienceTitle]: value,
          }
        : experience
    );

    setExperienceHistory({ ...experienceHistory, [experienceType]: _experiences });
  };

  console.log(experienceHistory);
  return (
    <div>
      <H2>Second step</H2>

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
            <p>if you dont want to show date birth write 00.00.0000</p>
            <TextInput
              name="birthday"
              ref={register({ required: true })}
              defaultValue={
                user.birthday === 0 ? new Date().toLocaleDateString() : user.birthday
              }
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

          {contacts.map(({ title, value, id }) => {
            return (
              <Field key={id}>
                <p>{title}:</p>
                <TextInput
                  name={"title=" + id}
                  ref={register({ required: true })}
                  placeholder={title}
                  onChange={handleChangeContacts}
                />

                <TextInput
                  name={"value=" + id}
                  ref={register({ required: true })}
                  placeholder={value}
                  onChange={handleChangeContacts}
                />
                <Button onClick={() => deleteContacts(id)}>Delete</Button>
              </Field>
            );
          })}

          {experienceHistory.work.map(({ id, place, position, startDate, endDate }) => {
            return (
              <Field key={id}>
                <p>Work place:</p>
                <TextInput
                  name={`work=place=${id}`}
                  ref={register({ required: true })}
                  placeholder={place}
                  onChange={handleChangeExperienceHistory}
                />
                <p>Position:</p>
                <TextInput
                  name={`work=position=${id}`}
                  ref={register({ required: true })}
                  placeholder="Director"
                  onChange={handleChangeExperienceHistory}
                />
                <p>Start date:</p>
                <TextInput
                  name={`work=startDate=${id}`}
                  ref={register({ required: true })}
                  placeholder="14.04.2015"
                  onChange={handleChangeExperienceHistory}
                />
                <p>End date:</p>
                <TextInput
                  name={`work=endDate=${id}`}
                  ref={register({ required: true })}
                  placeholder="14.04.2020"
                  onChange={handleChangeExperienceHistory}
                />
              </Field>
            );
          })}
          <Button onClick={showContactsField}>Add contacts</Button>

          <Button
            onClick={() => {
              showHistory("work");
            }}
          >
            Add work history
          </Button>

          <Button
            onClick={() => {
              showHistory("education");
            }}
          >
            Add education history
          </Button>

          <Button>Add skills</Button>

          <Button>Add description about yourself</Button>

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

const ColoredNavLink = styled(NavLink)`
  color: #7d4cdb;
`;

const Field = styled.div`
  border: 1px solid red;
  margin: 10px 0;
`;
