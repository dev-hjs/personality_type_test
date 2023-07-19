import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { GoogleSpreadsheet } from 'google-spreadsheet';
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

  useEffect(() => {
    console.log(data);
  }, [data]);

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

      // 데이터를 JSON 서버에 저장
      try {
        const response = await fetch('http://localhost:4000/data', {
          // 엔드포인트 변경
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ selectedAnswer, additionalData })
        });

        if (response.ok) {
          console.log('데이터가 성공적으로 저장되었습니다.');
        } else {
          console.log('데이터 저장에 실패하였습니다.');
        }
      } catch (error) {
        console.error('오류 발생:', error);
      }

      // 다음 질문으로 이동
      setSelectedCheckboxIndex(-1);
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
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
              {row._rawData[1].split('\n').map((answer, answerIndex) => (
                <QuestionBox key={answerIndex}>
                  <CheckboxInput
                    type="checkbox"
                    checked={selectedCheckboxIndex === answerIndex}
                    onChange={() => handleAnswerSelection(answerIndex)}
                  />
                  <span>{`${answerIndex + 1}: ${answer}`}</span>
                  {/* <span>{row._rawData[2].split('\n')[answerIndex]}</span> */}
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
        <NextButton onClick={handleNextQuestion} disabled={selectedCheckboxIndex === -1}>
          다음
        </NextButton>
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
