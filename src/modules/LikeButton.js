import React from "react";
import styled from "styled-components";

export const LikeButton = ({ disabled, onClick }) => (
  <Button disabled={disabled} onClick={onClick}>
    <span role="img" aria-label="Like">
      ❤︎
    </span>
  </Button>
);

const Button = styled.button`
  transition: all 0.33s ease-in-out;
  border-radius: 5px;

  &:hover {
    background-color: var(--pink);
    cursor: pointer;
  }

  &:disabled {
    cursor: default;
  }

  span {
    color: var(--creamy-white);
  }
`;
