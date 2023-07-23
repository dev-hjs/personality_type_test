import axios from 'axios';

const API_KEY = 'AIzaSyCopZfPpt-zCyRy971Uigz3tdUaE3flcUk';
// const API_KEY = 'AIzaSyCMxB7YSVasOixzejb_hZCH3Sm4VBygyoo';
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export const searchVideos = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        key: API_KEY,
        part: 'snippet',
        maxResults: 5, // 가져올 비디오 결과 수
        q: query, // 검색할 쿼리
        type: 'video' // 비디오 타입만 가져오도록 설정
      }
    });

    return response.data.items;
  } catch (error) {
    console.error('Error searching videos:', error);
    return [];
  }
};
