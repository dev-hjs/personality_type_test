import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function StartPage() {
  return (
    <>
      <StartWrap>
        <Startimg>
          <Link to="/main">
            <VisualImg src="startimage.png" alt="elemental test 이미지" />
          </Link>
        </Startimg>
      </StartWrap>
    </>
  );
}

export default StartPage;

const StartWrap = styled.div`
  height: calc(100vh - 224px);
  background: black;
`;

const Startimg = styled.div`
  display: block;
  margin: auto;
  height: 150px;
  text-align: center;
`;

const VisualImg = styled.img`
  overflow: hidden;
  height: calc(100vh - 224px);
`;
