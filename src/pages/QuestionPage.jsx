import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Question from './contents/Question';

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

const QuestionPage = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const youtubeVideoId = 'DwuJeGYlYyw';

  const handleCheckboxChange = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption !== '') {
      const answer = {
        question: currentQuestionData.question,
        answer: selectedOption,
        name: currentQuestionData.answer.find((ans) => ans.text === selectedOption)?.name
      };
      saveAnswerToServer(answer);

      if (currentQuestion < Question.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption('');
      } else {
        navigate('/result');
      }
    } else {
      alert('질문에 답변해주세요!');
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption('');
    } else {
      alert('첫번째 질문입니다!');
    }
  };

  const currentQuestionData = Question[currentQuestion];

  const iframeRef = useRef(null);

  const saveAnswerToServer = (answer) => {
    fetch('http://localhost:4000/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(answer)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Answer saved to server:', data);
      })
      .catch((error) => {
        console.error('Error saving answer to server:', error);
      });
  };

  return (
    <>
      <div>QuestionPage</div>
      <span>{currentQuestionData.question}</span>
      <QuestionContainer>
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
      </QuestionContainer>
      <button onClick={handlePreviousQuestion}>이전 질문</button>
      <button onClick={handleNextQuestion}>다음 질문</button>
      <Link to="/result">
        <button>결과 보러 가기</button>
      </Link>
    </>
  );
};

export default QuestionPage;
