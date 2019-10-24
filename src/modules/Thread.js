import React from "react";
import styled from "styled-components";
import { rgba } from "polished";
import { timeDifferenceForDate } from "../utils/timeDiff";
import { LikeButton } from "./LikeButton";

const LIKE_THREAD_MUTATION = `
  mutation($id: ID!) {
    likeThread(threadId: $id) {
      id
      hasUserLiked
      likesNumber
    }
  }
`;

const Thead = ({
  title,
  text,
  createdBy,
  likesNumber,
  repliesNumber,
  id,
  createdAt
}) => {
  let result = { fetching: true };
  let like = id => {};

  return (
    <Wrapper>
      <Title>{title}</Title>
      <Content>{text}</Content>
      <Footer>
        <CreatedBy>
          Created by: {createdBy.username} - {timeDifferenceForDate(createdAt)}
        </CreatedBy>
        <TextGroup>
          <LikeButton disabled={result.fetching} onClick={() => like({ id })} />
          <Likes>{likesNumber} likes</Likes>
        </TextGroup>
      </Footer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  transition: all 0.33s ease-in-out;
  background-color: var(--midnight-blue);
  color: var(--light-blue);
  margin-bottom: 12px;
  padding: 16px;
  border-radius: 5px;
  box-shadow: 2px 2px 5px 0px ${rgba("#fd79a8", 0.8)};
`;

const Title = styled.h3`
  color: var(--light-pink);
  margin-bottom: 6px;
  margin-top: 0;
`;

const Content = styled.p`
  font-family: "Rajdhani";
  margin-bottom: 8px;
  margin-top: 0;
`;

const CreatedBy = styled.p`
  font-family: "Rajdhani";
  font-size: 12px;
  margin-bottom: 2px;
  margin-top: 0;
`;

const Likes = styled(CreatedBy)`
  font-family: "Rajdhani";
  margin-left: 12px;
  margin-right: 12px;
`;

const TextGroup = styled.div`
  align-items: center;
  display: flex;
`;

const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default Thead;
