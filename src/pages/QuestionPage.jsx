import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { __addSurvey } from '../redux/modules/survey';
const credential = require('../libs/typetest1-0282f9b10c39.json');
export const getGoogleSheet = async () => {
  const doc = new GoogleSpreadsheet('1zcM_t4HRDzfI2WR5l6nkW9fEEPMK13xskvxV6gbjez8');
  await doc.useServiceAccountAuth(credential);
  await doc.loadInfo();
  return doc;
};
export const useGoogleSheet = (sheetId) => {
  const [googleSheetRows, setGoogleSheetRows] = useState([]);
  const fetchGoogleSheetRows = async () => {
    const googleSheet = await getGoogleSheet();
    const sheetsByIdElement = googleSheet.sheetsById[sheetId];
    const rows = await sheetsByIdElement.getRows();
    setGoogleSheetRows(rows);
  };
  useEffect(() => {
    fetchGoogleSheetRows();
  }, []);
  return [googleSheetRows];
};
function QuestionPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [data] = useGoogleSheet('16447129');
  const [selectedCheckboxIndex, setSelectedCheckboxIndex] = useState(-1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const navigate = useNavigate();
  const isLastQuestion = currentQuestionIndex === data.length - 1;
  const [showResultButton, setShowResultButton] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const shortId = searchParams.get('shortId');
  const [progress, setProgress] = useState(0);
  const [clickedResultButton, setClickedResultButton] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const survey = useSelector(function (state) {
    return state.survey.survey;
  });
  console.log('survey', survey);
  const dispatch = useDispatch();
  const fetchGoogleSheetRows = async () => {
    try {
      const googleSheet = await getGoogleSheet();
      const sheetsByIdElement = googleSheet.sheetsById['16447129'];
      const rows = await sheetsByIdElement.getRows();
      setIsLoading(false);
    } catch (error) {
      console.error('데이터 로딩 오류:', error);
      setIsLoading(false);
    }
  };
  const handleNextQuestion = async () => {
    if (selectedCheckboxIndex !== -1) {
      const selectedAnswer = data[currentQuestionIndex]._rawData[1].split('\n')[selectedCheckboxIndex];
      const additionalData = data[currentQuestionIndex]._rawData[2].split('\n')[selectedCheckboxIndex];
      // console.log(selectedAnswer);
      // console.log(additionalData);
      // console.log(shortId);
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
      const totalQuestions = data.length;
      const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;
      setProgress(progressPercentage);
      if (isLastQuestion) {
        setShowResultButton(true);
      } else {
        setSelectedCheckboxIndex(-1);
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      }
      if (showResultButton) {
        setIsNavigating(true);
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
      <QuestionBg>
        {isLoading || isNavigating ? (
          <LoadingContainer>
            <LoadingCircle />
          </LoadingContainer>
        ) : (
          <>
            <LoadingBar progress={progress} />
            {data.map(
              (row, index) =>
                index === currentQuestionIndex && (
                  <QuestionContainer key={index}>
                    <QuestionTitle> {row._rawData[0]}</QuestionTitle>
                    {/* <div> {row._rawData[3]}</div> */}
                    {/* <QuestionImg src="이미지.png" alt="이미지" /> */}
                    {/* 수정된 부분: 체크박스 대신 div 요소로 변경 */}
                    {row._rawData[1].split('\n').map((answer, answerIndex) => (
                      <QuestionBox
                        key={answerIndex}
                        checked={selectedCheckboxIndex === answerIndex}
                        onClick={() => handleAnswerSelection(answerIndex)}
                      >
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
      </QuestionBg>
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
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #0e82e0;
  animation: ${keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  `} 1.5s infinite linear;
`;
const QuestionBg = styled.div`
  background: #ffffff;
  height: calc(100vh - 68px);
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
const QuestionTitle = styled.h1``;
const QuestionImg = styled.img`
  margin: 0 auto;
  width: 100px;
`;
const QuestionBox = styled.div`
  width: 500px;
  height: 90px;
  padding: 10;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: auto;
  font-size: 20px;
  border-radius: 10px;
  border: 4px solid ${({ checked }) => (checked ? '#0E82E0' : '#D6E8F9')};
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
  background-color: ${({ disabled }) => (disabled ? '687aee' : '#C5DFF8')};
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
`;
const NextButton = styled.button`
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  background-color: ${({ disabled }) => (disabled ? '#ccc' : '#7895CB')};
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
`;
const LoadingBar = styled.div`
  width: ${(props) => props.progress}%;
  height: 5px;
  background-color: #687aee;
  transition: width 0.3s ease-in-out;
`;
