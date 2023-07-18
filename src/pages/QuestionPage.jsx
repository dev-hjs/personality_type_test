import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

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
  padding-left: 10px;
  cursor: pointer;
`;

const CheckboxInput = styled.input`
  margin-right: 10px;
`;

function QuestionPage() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0); // 현재 질문 인덱스를 추적하는 상태 변수
  const [selectedOption, setSelectedOption] = useState(''); // 선택한 옵션을 추적하는 상태 변수
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    questionData();
  }, []);

  const questionData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/question');
      setQuestions(response.data); // 수정: response.data.question 대신 response.data를 사용
      console.log(response.data);
    } catch (error) {
      console.error('error :', error);
    }
  };

  // 체크박스 선택 시 호출되는 핸들러 함수
  const handleCheckboxChange = (option) => {
    setSelectedOption(option);
  };

  // "다음 질문" 버튼 클릭 시 호출되는 핸들러 함수
  const handleNextQuestion = () => {
    if (selectedOption !== '') {
      if (currentQuestion < questions.length - 1) {
        // 마지막 질문이 아닌 경우에만 진행
        setCurrentQuestion(currentQuestion + 1); // 다음 질문으로 인덱스 업데이트
        setSelectedOption(''); // 선택한 옵션 초기화
      } else {
        navigate('/result'); // 마지막 질문에서는 "/result" 경로로 이동
      }
    } else {
      alert('질문에 답변해주세요오오!!!!!!!!!!.'); // 체크박스를 선택하지 않았을 때 알림 띄우기
    }
  };

  const currentQuestionData = questions[currentQuestion]; // 현재 질문의 데이터 가져오기

  return (
    <>
      <div>QuestionPage</div>
      {/* 현재 질문 표시 */}
      {/* <span>{currentQuestionData.question}</span> */}
      <span>{currentQuestionData && currentQuestionData.question}</span>
      {currentQuestionData &&
        currentQuestionData.answer.map((ans, ansIndex) => (
          <QuestionBox key={ansIndex}>
            <CheckboxInput
              type="checkbox"
              checked={selectedOption === ans.text}
              onChange={() => handleCheckboxChange(ans.text)}
              id={`question${currentQuestion + 1}`}
            />
            <span>{ans.text}</span>
          </QuestionBox>
        ))}
      {/* <QuestionContainer>
        {currentQuestionData.answer.map((ans, ansIndex) => (
          <QuestionBox key={ansIndex}>
            <CheckboxInput
              type="checkbox"
              checked={selectedOption === ans.text}
              onChange={() => handleCheckboxChange(ans.text)}
              id={`question${currentQuestion + 1}`}
            />
            <span>{ans.text}</span>
          </QuestionBox>
        ))}
      </QuestionContainer> */}
      <button onClick={handleNextQuestion}>다음 질문</button> {/* "다음 질문" 버튼 */}
      <Link to="/result">
        <button>결과 보러 가기</button> {/* "결과 보러 가기" 버튼 */}
      </Link>
    </>
  );
}

export default QuestionPage;
