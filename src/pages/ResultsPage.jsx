import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function ResultsPage() {
  return (
    <>
      <StResultsHeader>
        <div>🐟사조참치🐟</div>
        <div>X</div>
        <div>캐릭터로 보는 성격 테스트</div>
        <div>결과는??</div>
      </StResultsHeader>
      <STresultsImg src="FS4lWL7VIAETIwm.jpg" />
      <br />
      <StResultsText>무엇을 선택 하셨네요! 당신과 닮은 캐릭터는!</StResultsText>
      <StResultsButton1>
        <Link to="/">
          <img src="ReStart.png" />
        </Link>
        <img src="LinkCopy.png" />
      </StResultsButton1>
      <br />
      <StResultsText>▼OTHER LANGUAGES▼</StResultsText>
      <StFlagimg>
        <img src="USflag.png" alt="이미지1" />
        <img src="CAflag.png" alt="이미지2" />
        <img src="JPflag.png" alt="이미지3" />
      </StFlagimg>
    </>
  );
}

export default ResultsPage;

const STresultsImg = styled.img`
  width: 40%;
  height: 40%;
  margin: auto;
  display: block;
`;
const StResultsText = styled.div`
  text-align: center;
`;
const StResultsButton1 = styled.button`
  margin: auto;
  display: block;
  background-color: #fff;
  border: #fff;
`;
const StResultsHeader = styled.div`
  text-align: center;
  font-size: 20px;
  margin: 20px;
`;
const StFlagimg = styled.div`
  display: block;
  margin: auto;
  text-align: center;
  couser: pointer;
  width: 40%;
`;
