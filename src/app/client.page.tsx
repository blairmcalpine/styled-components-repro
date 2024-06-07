"use client";

import styled from "styled-components";

export const ClientComponent = () => {
  return <Green>Client Component Styled with styled-components</Green>;
};

const Green = styled.div`
  color: green;
`;
