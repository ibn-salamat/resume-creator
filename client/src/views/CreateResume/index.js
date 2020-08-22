import React, { useEffect, useState } from "react";
import { Button } from "grommet";
import { Link } from "react-router-dom";

import { First } from "./steps/First";
import { Second } from "./steps/Second";
import { Third } from "./steps/Third";

export const CreateResume = () => {
  const [stepStates, changeStepStates] = useState({
    first: null,
    second: null,
  });

  const changeStep = (step, state) => {
    changeStepStates({ ...stepStates, [step]: state });
  };

  return (
    <div>
      <h1>Create new</h1>
      {/* steps */}
      {!stepStates.first && <First changeStep={changeStep} />}
      {stepStates.first && !stepStates.second && (
        <Second changeStep={changeStep} template={stepStates.first} />
      )}
      {stepStates.second && <Third data={stepStates.second} />}
    </div>
  );
};
