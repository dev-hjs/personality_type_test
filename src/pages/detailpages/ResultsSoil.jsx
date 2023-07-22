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
        <StResultsText>클로드 이군요</StResultsText>
      </StResultsHeader>
      <div>
        <STresultsImg src="soil.png" />
        <br />
        <StResultsText>밝은 얼굴에 근심걱정 한방울 💧</StResultsText>
        <StResultsText>
          생각보다 귀차니즘을 많이 타는 성격이에요! 할 필요성을 못느끼면 그 필요성이 생길 때까지 미루죠 😪그러나
          하겠다고 마음만 먹으면 그 누구보다 열심히!!! 원하는 분야에서는 최고가 되고 싶어 해요. 💪항상 밝지만 내면에는
          걱정이 많답니다. 은근 고민 거리도 많지만 누군가에게 피해주는 행동은 할 수 없어요..! 그렇기 때문에 착하다는
          소리를 자주 들어요 😉즐겁게 노는 것을 좋아하는데 다수의 사람은 싫어요! 저랑 정말 친한 사람들이랑 놀고 싶어요
          😚\n조용해보여도 사교성이 좋아요. 모든 사람들과 원만한 관계를 유지하는 사람이네요 👭혼자만의 시간이 필요하고
          쉴 때는 혼자 내가 하고 싶은 걸 하면서 보내고 싶어요. 🏖️
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
        <img src="LinkCopy.png" onClick={() => handleLinkCopy(`https://personality-type-test-q1.vercel.app`)} />
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
