import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { searchVideos } from '../libs/youtube';
import { useSelector } from 'react-redux';

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

function ResultsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [videos, setVideos] = useState([]);
  const location = useLocation();
  const [data] = useGoogleSheet('1017683245');

  const handleSearch = async () => {
    const results = await searchVideos(searchTerm);
    setVideos(results);
  };

  const handleLinkCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('링크 복사 완료!');
    } catch (error) {
      alert('링크 복사 실패');
    }
  };

  useEffect(() => {
    console.log(location);
  }, [location]);

  const reduxResults = useSelector(function (state) {
    return state.survey.survey;
  });

  // 합산

  // results => [{~~~}, {~~}, {~~}]

  // YouTube API를 사용하여 Elemental 영화 검색
  const searchElementalMovies = async () => {
    try {
      const query = 'Elemental 영화'; // 검색할 쿼리
      const results = await searchVideos(query);
      return results;
    } catch (error) {
      console.error('Error searching Elemental movies:', error);
      return [];
    }
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 Elemental 영화 검색하여 설정
    searchElementalMovies().then((results) => setVideos(results));
  }, []);

  // 클릭한 비디오 재생
  const handleVideoClick = (videoId) => {
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    window.open(videoUrl, '_blank');
  };

  return (
    <>
      <StResultsHeader>
        <div>🐟사조참치🐟</div>
        <div>X</div>
        <div>엘리멘탈 캐릭터로 보는 성격 테스트</div>
        <div>결과는??</div>
      </StResultsHeader>
      <div>
        <STresultsImg src="water.png" />
        <br />
        <StResultsText>
          엠버이군요!
          <br />
          <div>{row._rawData[0]}</div>
          당신과 닮은 캐릭터가 궁금하시다구요?!
          <br />
        </StResultsText>
        <br />
      </div>
      <StResultsButton1>
        <Link to="/">
          <img src="ReStart.png" alt="Restart" />
        </Link>
        <img
          src="LinkCopy.png"
          alt="LinkCopy"
          onClick={() => handleLinkCopy(`http://localhost:3000${location.pathname}`)}
        />
      </StResultsButton1>
      <br />
      <StResultsText>▼OTHER LANGUAGES▼</StResultsText>
      <StFlagimg>
        <img src="USflag.png" alt="이미지1" />
        <img src="CAflag.png" alt="이미지2" />
        <img src="JPflag.png" alt="이미지3" />
      </StFlagimg>

      <div>
        <h1>그냥 엘리멘탈 영화리스트</h1>
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <button onClick={handleSearch}>Search</button>
        <ul>
          {videos.map((video) => (
            <li key={video.id.videoId}>
              <h3>{video.snippet.title}</h3>
              <Thumbnail
                src={video.snippet.thumbnails.default.url}
                alt="thumbnail"
                onClick={() => handleVideoClick(video.id.videoId)}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default ResultsPage;

const STresultsImg = styled.img`
  width: 400px;
  height: 550px;
  margin: auto;
  display: block;
`;
const StResultsText = styled.div`
  text-align: center;
`;
const StResultsButton1 = styled.button`
  margin: auto;
  display: block;
  background-color: #fff;
  border: #fff;
`;
const StResultsHeader = styled.div`
  text-align: center;
  font-size: 20px;
  margin: 20px;
`;
const StFlagimg = styled.div`
  display: block;
  margin: auto;
  text-align: center;
  cursor: pointer;
  width: 40%;
`;
const Thumbnail = styled.img`
  cursor: pointer;
`;
