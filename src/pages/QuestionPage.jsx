import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
`;

const QuestionBox = styled.label`
  width: 700px;
  height: 100px;
  border: 1px solid #000;
  display: flex;
  align-items: center;
  padding-left: 10px; /* 왼쪽 여백 추가 */
  cursor: pointer; /* 커서를 포인터로 변경하여 클릭 가능한 상태 표시 */
`;

const CheckboxInput = styled.input`
  margin-right: 10px; /* 체크박스와 텍스트 사이의 간격 설정 */
`;

function QuestionPage() {
  const [selectedOption, setSelectedOption] = useState('');

  const handleCheckboxChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <>
      <div>QuestionPage</div>
      <QuestionContainer>
        <QuestionBox>
          <CheckboxInput
            type="checkbox"
            checked={selectedOption === 'option1'}
            onChange={() => handleCheckboxChange('option1')}
            id="question1" //
          />
          <span>Question 1</span>
        </QuestionBox>
        <QuestionBox>
          <CheckboxInput
            type="checkbox"
            checked={selectedOption === 'option2'}
            onChange={() => handleCheckboxChange('option2')}
            id="question2" //
          />
          <span>Question 2</span>
        </QuestionBox>
        <QuestionBox>
          <CheckboxInput
            type="checkbox"
            checked={selectedOption === 'option3'}
            onChange={() => handleCheckboxChange('option3')}
            id="question3" //
          />
          <span>Question 3</span>
        </QuestionBox>
        <QuestionBox>
          <CheckboxInput
            type="checkbox"
            checked={selectedOption === 'option4'}
            onChange={() => handleCheckboxChange('option4')}
            id="question4" //
          />
          <span>Question 4</span>
        </QuestionBox>
      </QuestionContainer>
      <Link to="/result">
        <button>결과 보러 가기</button>
      </Link>
    </>
  );
}

export default QuestionPage;
