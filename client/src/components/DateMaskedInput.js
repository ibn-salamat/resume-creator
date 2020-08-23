import React from "react";
import { MaskedInput } from "grommet";

export function DateMaskedInput({ register, ...props }) {
  return (
    <MaskedInput
      {...props}
      ref={register}
      mask={[
        {
          length: [1, 2],
          regexp: /3[01]|[12]\d|^\d$/,
          placeholder: "dd",
        },
        { fixed: "." },
        {
          length: [1, 2],
          regexp: /^1[1-2]$|^[0-9]$/,
          placeholder: "mm",
        },
        { fixed: "." },
        {
          length: 4,
          regexp: /^\d+$/,
          placeholder: "yy",
        },
      ]}
    />
  );
}
