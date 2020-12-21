import styled from "styled-components";

export const A = styled.a`
  color: ${(props) => (props.color ? props.color : "unset")};
`;
