import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

function ResultsPage() {
  const handleLinkCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('링크 복사 완료!');
    } catch (error) {
      alert('링크 복사 실패');
    }
  };

  const location = useLocation();
  useEffect(() => {
    console.log(location);
  }, [location]);
  return (
    <>
      <StResultsHeader>
        <div>🐟사조참치🐟</div>
        <div>X</div>
        <div>엘리멘탈 캐릭터로 보는 성격 테스트</div>
        <div>결과는???</div>
        <StResultMessage>내키는 대로 사는 삶이 좋아 🥰</StResultMessage>
        <StResultsText>"게일"</StResultsText>
      </StResultsHeader>
      <div>
        <STresultsImg src="wind.png" />
        <br />

        <StResultExplane>
          자유 분방한 성격이라 누가 뭐라던 나의 길을 걸어요! 마이웨이 🤩
          <br /> 호기심도 많고 항상 열린 마음으로 바라봐요. 세상 모든게 재밌고 좋아요! 🧐 <br />
          친구들과 어울리는 것도 좋아하고, 장난치는 것도 좋아해요 또 타인의 감정을 잘 이해하고 공감할 수 있는 최고의
          친구랍니다~! 😘 <br />
          상상력이 풍부하고, 이상주의자 기질이 있어 혼자서 나만의 세계를 상상하는 걸 즐거워하군요? 이런 이유로 가끔은
          4차원적이란 소리를 들을 때도 있어요 💭 <br />
          모든 일에 열정이 넘치고 하나보다는 여러 곳에 관심을 두는 성격이랍니다. 😝 <br />
          여러가지 생각이 많아서 창의적일 때가 있어요! 그러다보니 예술 분야에서 두각을 나타낼 때가 있어요 🎤
        </StResultExplane>
        <StResultsText>
          <br />
          당신과 닮은 캐릭터가 궁금하시다구요?!
          <br />
          <div>
            <iframe
              id="ytplayer"
              type="text/html"
              width="640"
              height="360"
              src="https://www.youtube.com/embed/BOqFRHCrN-k"
              frameborder="0"
              style={{ margin: '20px' }}
            ></iframe>
          </div>
        </StResultsText>
        <br />
      </div>
      <StResultsButton1>
        <Link to="/">
          <img src="ReStart.png" />
        </Link>
        <img src="LinkCopy.png" onClick={() => handleLinkCopy(`http://localhost:3000${location.pathname}`)} />
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
  width: 400px;
  height: 550px;
  margin: auto;
  display: block;
`;
const StResultsText = styled.div`
  text-align: center;
  font-size: 28px; /* 텍스트 크기를 원하는 크기로 조정 */
  font-weight: bold; /* 텍스트 강조를 위해 폰트 굵기를 추가 */
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
  cursor: pointer;
  width: 40%;
`;

const StResultExplane = styled.div`
  margin: 0 auto;
  text-align: left;
  white-space: pre-line; /* 줄바꿈을 활성화합니다. */
  max-width: 600px;
  padding: 20px;
  border: 2px solid #ccc;
  border-radius: 10px;
  background-color: #f7f7f7;
  line-height: 1.5;
`;
const StResultMessage = styled.div`
  margin: 20px auto;
  text-align: center;
  font-size: 24px; /* 텍스트 크기를 원하는 크기로 조정 */
  line-height: 1.5;
  max-width: 600px;
  font-weight: bold; /* 텍스트 강조를 위해 폰트 굵기를 추가 */
`;
