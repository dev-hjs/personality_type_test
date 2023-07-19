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
  const [data] = useGoogleSheet('714994551');

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      {data.map((row, index) => (
        <div key={index}>
          <div> {row._rawData[0]}</div>
          <div> {row._rawData[1]}</div>
          <div> {row._rawData[2]}</div>
        </div>
      ))}
      <div>QuestionPage</div>
    </>
  );
}

export default QuestionPage;
