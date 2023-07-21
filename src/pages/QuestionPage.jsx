import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import axios from 'axios';
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
  const [data] = useGoogleSheet('16447129');
  const [selectedCheckboxIndex, setSelectedCheckboxIndex] = useState(-1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const navigate = useNavigate();
  const isLastQuestion = currentQuestionIndex === data.length - 1;
  const [showResultButton, setShowResultButton] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const shortId = searchParams.get('shortId');

  const survey = useSelector(function (state) {
    return state.survey.survey;
  });
  console.log('survey', survey);

  const dispatch = useDispatch();

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

      // "결과 보러가기" 버튼이 보이고, "다음" 버튼을 누른 경우에만 "/result" 페이지로 이동합니다.
      if (showResultButton) {
        navigate('/result');
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

  return (
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
          <NextButton onClick={() => navigate('/result')} disabled={selectedCheckboxIndex === -1}>
            결과 보러가기
          </NextButton>
        ) : (
          <NextButton onClick={handleNextQuestion} disabled={selectedCheckboxIndex === -1}>
            다음!
          </NextButton>
        )}
      </ButtonContainer>
    </>
  );
}

export default QuestionPage;

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

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
`;

const PrevButton = styled.button`
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  background-color: ${({ disabled }) => (disabled ? '#ccc' : '#DC3545')};
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
`;

const NextButton = styled.button`
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  background-color: ${({ disabled }) => (disabled ? '#ccc' : '#007BFF')};
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
`;
