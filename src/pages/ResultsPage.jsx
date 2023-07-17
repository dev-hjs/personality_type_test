import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function ResultsPage() {
  return (
    <>
      <div>🐟사조참치🐟</div>
      <div>X</div>
      <div>캐릭터로 보는 성격 테스트</div>
      <div>결과는??</div>
      <div>이미지 공간</div>
      <div>캐릭터로 보는 나의 성격은?</div>
      <Link to="/">
        <button>다시하기</button>
      </Link>
      <button>링크 복사</button>
      <div>▼OTHER LANGUAGES▼</div>
      <div>
        <img src="이미지1의_경로" alt="이미지1" />
        <img src="이미지2의_경로" alt="이미지2" />
        <img src="이미지3의_경로" alt="이미지3" />
        <img src="이미지4의_경로" alt="이미지4" />
        <img src="이미지5의_경로" alt="이미지5" />
        <img src="이미지6의_경로" alt="이미지6" />
      </div>
    </>
  );
}

export default ResultsPage;
