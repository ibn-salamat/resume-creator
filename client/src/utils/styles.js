import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const SNavLink = styled(NavLink)`
  color: ${(props) => (props.color ? props.color : "unset")};
`;
