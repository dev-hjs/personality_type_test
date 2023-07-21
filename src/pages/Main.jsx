import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import shortid from 'shortid';
import styled from 'styled-components';
import axios from 'axios';

function Main() {
  const [shortId, setShortId] = useState(null);
  const navigate = useNavigate();
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    //비동기 함수 fetchDatat선언
    async function fetchData() {
      //axios를 이용해서 방문자 수 데이터 가져오기
      try {
        const res = await axios.get('http://localhost:4000/visit');
        console.log('res!!', res.data);

        //가져온 방문자 수 저장
        const originalData = res.data.user;

        //방문자 수 증가시켜서 업데이트
        axios.patch('http://localhost:4000/visit', {
          user: originalData + 1
        });

        setVisitCount(originalData + 1);
      } catch (error) {}
    }
    //컴포넌트가 마운트 되면 함수 실행
    fetchData();
  }, []);

  const handleCopyClipBoard = (text) => {
    try {
      navigator.clipboard.writeText(text);
      alert('링크 복사 완료!');
    } catch (error) {
      alert('다시 시도해주세요!');
    }
  };

  const generateShortId = () => {
    const newShortId = shortid.generate();
    setShortId(newShortId);
    return newShortId;
  };

  const sendDataToServer = async () => {
    try {
      const shortId = generateShortId();
      // const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/data`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     shortId: shortId
      //   })
      // });
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/data`, {
        shortId: shortId
      });

      console.log('response', response);

      if (response.status === 201) {
        console.log('데이터가 성공적으로 저장되었습니다.');
        // 페이지 이동 시에 navigate를 사용하여 shortId를 함께 전달
        navigate(`/quest?shortId=${shortId}`);
      } else {
        console.log('데이터 저장에 실패하였습니다.');
      }
    } catch (error) {
      console.error('오류 발생:', error);
    }
  };

  return (
    <>
      <VideoBackground>
        <Video autoPlay loop muted>
          <source src="/Steal The Show From Elemental_1080p.mp4" type="video/mp4" />
        </Video>
      </VideoBackground>
      <ContentContainer>
        <div>엘리멘탈 캐릭터로 보는 나의 성격은?</div>
        <div>character personality test</div>
        <div>캐릭터로 보는 나의 성격은?</div>
        <Link to={`/quest?shortId=${shortId}`}>
          <button onClick={sendDataToServer}>테스트하러 가기</button>
        </Link>

        <div> 방문자 수 : {visitCount} </div>

        <div>▼OTHER LANGUAGES▼</div>
        <button onClick={() => handleCopyClipBoard('http://localhost:3000/')}>링크 복사</button>
      </ContentContainer>
    </>
  );
}

export default Main;

const VideoBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const Video = styled.video`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 1;
  padding: 20px;
  color: white;
  text-align: center;
`;
