import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Main() {
  return (
    <>
      <div>Main</div>
      <div>사조참치</div>
      <div>엘리멘탈 캐릭터로 보는 나의 성격은?</div>
      <div>character personality test</div>
      <div>이미지 공간</div>
      <div>캐릭터로 보는 나의 성격은?</div>
      <Link to="/quest">
        <button>테스트하러 가기</button>
      </Link>
      <div>▼OTHER LANGUAGES▼</div>
      <div>
        <img src="이미지1의_경로" alt="이미지1" />
        <img src="이미지2의_경로" alt="이미지2" />
        <img src="이미지3의_경로" alt="이미지3" />
        <img src="이미지4의_경로" alt="이미지4" />
        <img src="이미지5의_경로" alt="이미지5" />
        <img src="이미지6의_경로" alt="이미지6" />
      </div>
      <button>링크 복사</button>
    </>
  );
}

export default Main;
