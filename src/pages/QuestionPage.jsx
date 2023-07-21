import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import styled, { keyframes } from 'styled-components';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { __addSurvey } from '../redux/modules/survey';

const credential = require('../libs/typetest1-0282f9b10c39.json');

// Google 스프레드시트를 가져오는 함수
export const getGoogleSheet = async () => {
  const doc = new GoogleSpreadsheet('1zcM_t4HRDzfI2WR5l6nkW9fEEPMK13xskvxV6gbjez8');
  // Google 인증이 필요합니다.
  await doc.useServiceAccountAuth(credential);
  await doc.loadInfo();
  return doc;
};

// Google 스프레드시트 행을 가져오는 커스텀 훅
export const useGoogleSheet = (sheetId) => {
  const [googleSheetRows, setGoogleSheetRows] = useState([]);
  const fetchGoogleSheetRows = async () => {
    const googleSheet = await getGoogleSheet();
    const sheetsByIdElement = googleSheet.sheetsById[sheetId];
    // 행들을 가져옵니다.
    const rows = await sheetsByIdElement.getRows();
    setGoogleSheetRows(rows);
  };
  useEffect(() => {
    fetchGoogleSheetRows();
  }, []);
  return [googleSheetRows];
};

function QuestionPage() {
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태를 저장하는 state 추가
  const [data] = useGoogleSheet('16447129');
  const [selectedCheckboxIndex, setSelectedCheckboxIndex] = useState(-1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const navigate = useNavigate();
  const isLastQuestion = currentQuestionIndex === data.length - 1;
  const [showResultButton, setShowResultButton] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const shortId = searchParams.get('shortId');

  const [clickedResultButton, setClickedResultButton] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false); // 로딩 상태를 저장하는 state 추가

  const survey = useSelector(function (state) {
    return state.survey.survey;
  });
  console.log('survey', survey);

  const dispatch = useDispatch();

  const fetchGoogleSheetRows = async () => {
    try {
      const googleSheet = await getGoogleSheet();
      const sheetsByIdElement = googleSheet.sheetsById['16447129'];
      // 행들을 가져옵니다.
      const rows = await sheetsByIdElement.getRows();
      setIsLoading(false); // 데이터 로딩이 완료되면 로딩 상태를 false로 설정
    } catch (error) {
      console.error('데이터 로딩 오류:', error);
      setIsLoading(false); // 에러가 발생해도 로딩 상태를 false로 설정
    }
  };

  const handleNextQuestion = async () => {
    if (selectedCheckboxIndex !== -1) {
      // 현재 질문의 답변 선택
      const selectedAnswer = data[currentQuestionIndex]._rawData[1].split('\n')[selectedCheckboxIndex];
      const additionalData = data[currentQuestionIndex]._rawData[2].split('\n')[selectedCheckboxIndex];

      console.log(selectedAnswer);
      console.log(additionalData);
      console.log(shortId);

      try {
        dispatch(
          __addSurvey({
            selectedAnswer,
            additionalData,
            shortId
          })
        );
      } catch (error) {
        console.error('오류 발생:', error);
      }

      // 마지막 질문이라면 결과 보러가기 버튼을 보여주도록 설정
      if (isLastQuestion) {
        setShowResultButton(true);
      } else {
        setSelectedCheckboxIndex(-1);
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      }

      // "결과 보러가기" 버튼이 보이고, "다음" 버튼을 누른 경우에만 로딩 상태를 설정하고 로딩 컴포넌트를 보여줍니다.
      if (showResultButton) {
        setIsNavigating(true); // 로딩 상태 설정

        // 2초 후에 "/result" 페이지로 이동합니다.
        setTimeout(() => {
          navigate('/result');
        }, 2000);
      }
    }
  };

  const handleAnswerSelection = (answerIndex) => {
    setSelectedCheckboxIndex(answerIndex);
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const isPrevButtonVisible = currentQuestionIndex > 0;

  useEffect(() => {
    fetchGoogleSheetRows();
  }, []);

  return (
    <>
      {isLoading || isNavigating ? ( // 로딩 중 또는 결과 보러가기 버튼 클릭 후 로딩 상태라면 로딩 스피너를 표시합니다.
        <LoadingContainer>
          <LoadingCircle />
        </LoadingContainer>
      ) : (
        // 데이터 로딩이 완료되면 기존 컴포넌트를 렌더링
        <>
          {data.map(
            (row, index) =>
              // 현재 질문과 답변 리스트만 보여주도록 설정
              index === currentQuestionIndex && (
                <QuestionContainer key={index}>
                  <div> {row._rawData[0]}</div>
                  <div> {row._rawData[3]}</div>

                  {row._rawData[1].split('\n').map((answer, answerIndex) => (
                    <QuestionBox key={answerIndex}>
                      <CheckboxInput
                        type="checkbox"
                        checked={selectedCheckboxIndex === answerIndex}
                        onChange={() => handleAnswerSelection(answerIndex)}
                      />
                      <span>{`${answerIndex + 1}: ${answer}`}</span>
                    </QuestionBox>
                  ))}
                </QuestionContainer>
              )
          )}
          <ButtonContainer>
            {isPrevButtonVisible && (
              <PrevButton onClick={handlePrevQuestion} disabled={currentQuestionIndex === 0}>
                이전
              </PrevButton>
            )}
            {showResultButton ? (
              <NextButton onClick={handleNextQuestion} disabled={selectedCheckboxIndex === -1}>
                결과 보러가기
              </NextButton>
            ) : (
              <NextButton onClick={handleNextQuestion} disabled={selectedCheckboxIndex === -1}>
                다음!
              </NextButton>
            )}
          </ButtonContainer>
        </>
      )}
    </>
  );
}

export default QuestionPage;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LoadingCircle = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  border-top: 4px solid #eb0f3e; /* 회전 시 보여질 색상을 지정합니다. */
  animation: ${keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  `} 1.5s infinite linear;
`;

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
  margin-top: 40px;
  text-align: center;
  font-size: 24px;
  font-weight: 550;
`;

const QuestionBox = styled.label`
  width: 500px;
  height: 90px;
  border: 4px solid #080070;
  padding: 10;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: auto;
  font-size: 20px;
  border-radius: 10px;
  &:hover {
    background-color: #e0e0e0;
    color: black;
  }
`;

const CheckboxInput = styled.input`
  margin-right: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
`;

const PrevButton = styled.button`
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  background-color: ${({ disabled }) => (disabled ? '#ccc' : '#c6c306')};
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
`;

const NextButton = styled.button`
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  background-color: ${({ disabled }) => (disabled ? '#ccc' : '#687aee')};
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
`;
