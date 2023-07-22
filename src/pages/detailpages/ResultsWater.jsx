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
        <StResultsText>웨이드 이군요</StResultsText>
      </StResultsHeader>
      <div>
        <STresultsImg src="water.png" />
        <br />
        <StResultsText>홀로 자유로운게 좋아 😋</StResultsText>
        <StResultsText>
          당신은 낯선 사람을 보면 도망가는 부끄럼쟁이군요! 🤧 나에게만 쏠리는 많은 관심은 사절!! 과도한 관심보다 적당한
          관심이 더 기분 좋게 만들어요 😑 하지만 이런 나와 친해진다면 그 누구보다도 빙구같은 매력을 보여줄 수 있어요! 🤪
          내 사람은 내가 챙긴다! 라는 마인드가 있어 친해지기 어려워도 한번 친해지면 깊은 관계를 맺을 수 있어요. 👩‍❤️‍💋‍👩
          친구들에게 괴롭힘도 종종 당할 것 같네요! 그러나 그런 관심은 싫지 않다!! 몰이 당하는 줄 알면서도 당해주는
          편이에요 😉\n귀찮아하는 것 같지만 그래도 할건 하는 스타일! 해야겠다고 마음 먹으면 누구보다 계획적이죠! 🕐
          계획을 세우고 행동하는 신중한 성격이지만 나보다는 단체를 중시해서 나의 계획이 틀어져도 괜찮아요! 🤝"
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
