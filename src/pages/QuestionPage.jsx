import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function QuestionPage() {
  return (
    <>
      <div>QuestionPage</div>
      <Link to="/result">
        <button>결과 보러 가기</button>
      </Link>
    </>
  );
}

export default QuestionPage;
