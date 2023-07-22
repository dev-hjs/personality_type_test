import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function StartPage() {
  return (
    <>
      <StartWrap>
        <Startimg>
          <Link to="/">
            <img src="startimage.png" />
          </Link>
        </Startimg>
      </StartWrap>
    </>
  );
}

export default StartPage;

const StartWrap = styled.div`
  height: calc(100vh - 68px);
  background: black;
`;

const Startimg = styled.div`
  display: block;
  margin: auto;
  height: 150px;
  height: 150px;
  text-align: center;
  a > img {
    margin-top: 20px;
  }
`;
