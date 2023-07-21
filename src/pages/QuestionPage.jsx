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
  // const survey = useSelector((state) => state.survey.survey);
  const survey = useSelector(function (state) {
    return state.survey.survey;
  });
  console.log('survey', survey);

  const dispatch = useDispatch();

  // "additionalData"에서 가장 많은 값을 찾는 함수
  const findMostFrequentAdditionalData = async () => {
    // db.json에 입력된 값 전체를 가져와!
    const dbResult = await axios.get(`${process.env.REACT_APP_SERVER_URL}/data`);

    const filteredData = dbResult.data
      .filter((result) => result.shortId === shortId && result.additionalData)
      .map((item) => {
        return item.additionalData;
      });

    let 물count = 0;
    let 불count = 0;
    let 흙count = 0;
    let 바람count = 0;

    for (let i = 0; i < filteredData.length; i++) {
      const splitData = filteredData[i].split(', ');
      console.log(splitData);
      if (splitData.length > 1) {
        for (const data of splitData) {
          switch (data) {
            case '물':
              물count++;
              break;
            case '불':
              불count++;
              break;
            case '흙':
              흙count++;
              break;
            case '바람':
              바람count++;
              break;
            default:
              break;
          }
        }
      } else {
        switch (filteredData[i]) {
          case '물':
            물count++;
            break;
          case '불':
            불count++;
            break;
          case '흙':
            흙count++;
            break;
          case '바람':
            바람count++;
            break;
          default:
            break;
        }
      }
    }
    console.log(물count);
    console.log(불count);
    console.log(흙count);
    console.log(바람count);

    let mostFrequentData = '물';
    let maxCount = 물count;

    if (불count > maxCount) {
      mostFrequentData = '불';
      maxCount = 불count;
    }
    if (흙count > maxCount) {
      mostFrequentData = '흙';
      maxCount = 불count;
    }
    if (바람count > maxCount) {
      mostFrequentData = '바람';
      maxCount = 불count;
    }

    return mostFrequentData;
  };

  const handleShowResult = async () => {
    // "additionalData"에서 가장 많은 값을 찾고 결과 페이지로 이동

    const splitData = await findMostFrequentAdditionalData();
    console.log(splitData);
    switch (splitData) {
      case '불':
        navigate('/result'); // '/result_fire'는 "불"이 가장 많을 경우의 결과 페이지 경로입니다. 실제 경로에 맞게 수정하세요.
        break;
      case '물':
        navigate('/result'); // '/result_water'는 "물"이 가장 많을 경우의 결과 페이지 경로입니다. 실제 경로에 맞게 수정하세요.
        break;
      case '흙':
        navigate('/result'); // '/result_soil'는 "흙"이 가장 많을 경우의 결과 페이지 경로입니다. 실제 경로에 맞게 수정하세요.
        break;
      case '바람':
        navigate('/result'); // '/result_wind'는 "바람"이 가장 많을 경우의 결과 페이지 경로입니다. 실제 경로에 맞게 수정하세요.
        break;
      default:
        navigate('/result'); // 일반적인 결과 페이지의 경로입니다. 가장 많은 요소가 불, 물, 흙, 바람이 아닐 경우 이동할 경로를 정해주세요.
        break;
    }
  };

  const handleAnswerSelection = (answerIndex) => {
    setSelectedCheckboxIndex(answerIndex);
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
    }
  };

  const handlePrevQuestion = () => {
    //가장 최근에 들어온 데이터중 shortid가 지금유저인 경우 삭제
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
          <NextButton onClick={handleShowResult} disabled={selectedCheckboxIndex === -1}>
            결과 보러가기
          </NextButton>
        ) : (
          <NextButton onClick={handleNextQuestion} disabled={selectedCheckboxIndex === -1}>
            다음
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
