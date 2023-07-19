import React from 'react';
import { Link, Outlet } from 'react-router-dom';
// import ReactPlayer from './player';

function Main() {
  const handleCopyClipBoard = (text) => {
    try {
      navigator.clipboard.writeText(text);
      alert('링크 복사 완료!');
    } catch (error) {
      alert('다시 시도해주세요~');
    }
  };
  return (
    <>
      <div>엘리멘탈 캐릭터로 보는 나의 성격은?</div>
      <div>character personality test</div>
      {/* <ReactPlayer url="https://www.youtube.com/watch?v=IGQbgkNFMhk" controls={true} width="480px" height="360px" /> */}
      <div>캐릭터로 보는 나의 성격은?</div>
      <Link to="/quest">
        <button>테스트하러 가기</button>
      </Link>
      <div>▼OTHER LANGUAGES▼</div>
      <button onClick={() => handleCopyClipBoard('http://localhost:3000/')}>링크 복사</button>
    </>
  );
}

export default Main;
