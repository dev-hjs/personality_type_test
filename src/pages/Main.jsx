import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import shortid from 'shortid';

function Main() {
  const [shortId, setShortId] = useState(null);
  const navigate = useNavigate();

  const handleCopyClipBoard = (text) => {
    try {
      navigator.clipboard.writeText(text);
      alert('링크 복사 완료!');
    } catch (error) {
      alert('다시 시도해주세요~');
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
      const response = await fetch('http://localhost:4000/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          shortId: shortId
        })
      });

      if (response.ok) {
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
      <div>엘리멘탈 캐릭터로 보는 나의 성격은?</div>
      <div>character personality test</div>
      <div>캐릭터로 보는 나의 성격은?</div>
      <Link to={`/quest?shortId=${shortId}`}>
        <button onClick={sendDataToServer}>테스트하러 가기</button>
      </Link>
      <div>▼OTHER LANGUAGES▼</div>
      <button onClick={() => handleCopyClipBoard('http://localhost:3000/')}>링크 복사</button>
    </>
  );
}

export default Main;
