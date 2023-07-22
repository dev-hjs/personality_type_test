import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import YouTube from 'react-youtube';

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
        <StResultsText>엠버 이군요</StResultsText>
      </StResultsHeader>
      <div>
        <STresultsImg src="fire.png" />
        <br />
        <StResultsText>아무도 내 흥을 막을 수 없어 🤪</StResultsText>
        <StResultsText>
          흥을 빼면 0인 당신!! 주체할 수 없는 흥을 마구 발산시키는 분위기 메이커네요! 🥳 집에서 쉬는 것보다 일하는게
          좋아!! 바쁘고 즐거운 삶을 추구해 정적인 라이프와는 맞지 않군요. 3일동안 말 못 하는 것보단 3일 동안 떠드는게
          차라리 나아요! 🤯 술을 잘한다면 술자리는 최고! 술을 못한다면 물을 마셔서라도 술자리는 가야해요! 왜냐구요? 내
          흥을 발산시켜야하거든요! 🍻 밖에서 에너지를 다 쓰면 집에서는 가만히 있어야 해요. 충전해야 하거든요 어떻게
          사람이 매일 매일 기분이 업 되어있을 수 있겠어요? 😏\n노는 것도 열심히, 일도 열심히 해요. 일을 못하는 자기
          자신을 보는 게 너무 싫어요! 😔 원하는게 분명해서 선택 장애는 없어요. 아주 단번에 고른답니다 ✔️
        </StResultsText>
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
