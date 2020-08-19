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

  const onSubmit = (data) => {
    console.log(data);
  };

  const showContactsField = () => {
    const uniqueId = Number(new Date());
    const _contacts = [
      ...contacts,
      {
        id: uniqueId,
        title: "Email/phone number/website",
        value: "example@mail.com",
      },
    ];
    setContacts(_contacts);
  };

  const handleChangeContacts = ({ target }) => {
    console.log(target.value);
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

    console.log(_contacts);

    setContacts(_contacts);
  };

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
                  defaultValue={title}
                  onChange={handleChangeContacts}
                />

                <TextInput
                  name={"value=" + id}
                  ref={register({ required: true })}
                  defaultValue={value}
                  onChange={handleChangeContacts}
                />
              </Field>
            );
          })}

          <Button onClick={showContactsField}>Add contacts</Button>

          <Button>Add skills</Button>

          <Button>Add work history</Button>

          <Button>Add education history</Button>

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
