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
    // console.log(location);
  }, [location]);
  return (
    <>
      <StResultsHeader>
        <div>🐟사조참치🐟</div>
        <div>X</div>
        <div>엘리멘탈 캐릭터로 보는 성격 테스트</div>
        <div>결과는???</div>
        <StResultMessage>싫은소리 하는건 정말 어려워 😋</StResultMessage>
        <StResultsText>"웨이드"</StResultsText>
      </StResultsHeader>
      <div>
        <STresultsImg src="water.png" alt="물이미지" />
        <br />

        <StResultExplane>
          당신은 낯선 사람을 보면 도망가는 부끄럼쟁이군요! 🤧
          <br /> 나에게만 쏠리는 많은 관심은 사절!! 과도한 관심보다 적당한 관심이 더 기분 좋게 만들어요 😑
          <br /> 하지만 이런 나와 친해진다면 그 누구보다도 빙구같은 매력을 보여줄 수 있어요! 🤪
          <br /> 내 사람은 내가 챙긴다! 라는 마인드가 있어 친해지기 어려워도 한번 친해지면 깊은 관계를 맺을 수 있어요.
          👩‍❤️‍💋‍👩
          <br /> 친구들에게 괴롭힘도 종종 당할 것 같네요! 그러나 그런 관심은 싫지 않다!! 몰이 당하는 줄 알면서도
          당해주는 편이에요 😉
          <br /> 귀찮아하는 것 같지만 그래도 할건 하는 스타일! 해야겠다고 마음 먹으면 누구보다 계획적이죠! 🕐
          <br /> 혼자 계획을 세우고 행동하는 신중한 성격이지만 단체생활에도 적응하는데는 무리없어요!! 🤝
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
          <img src="ReStart.png" alt="다시하기" />
        </Link>
        <img
          src="LinkCopy.png"
          onClick={() => handleLinkCopy(`https://personality-type-test.vercel.app`)}
          alt="링크복사"
        />
      </StResultsButton1>
      <br />
      <StResultsText>▼OTHER LANGUAGES▼</StResultsText>
      <StFlagimg>
        <img src="USflag.png" alt="영문" />
        <img src="CAflag.png" alt="중문" />
        <img src="JPflag.png" alt="일문" />
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
//
