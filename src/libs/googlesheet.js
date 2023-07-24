import { GoogleSpreadsheet } from 'google-spreadsheet';
import { useEffect, useState } from 'react';
import { JWT } from 'google-auth-library';

const credential = require('../libs/typetest1-0282f9b10c39.json');

export const getGoogleSheet = async ({ googleSheetRows }) => {
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
    // 행들을 가져옵니다.
    const rows = await sheetsByIdElement.getRows();
    setGoogleSheetRows(rows);
  };

  useEffect(() => {
    fetchGoogleSheetRows();
  }, []);
  return [googleSheetRows];
};
