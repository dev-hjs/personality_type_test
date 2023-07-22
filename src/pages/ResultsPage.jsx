import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { searchVideos } from '../libs/youtube';

function ResultsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [videos, setVideos] = useState([]);

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
  const location = useLocation();
  useEffect(() => {
    console.log(location);
  }, [location]);

  const survey = useSelector((state) => state.survey.survey);

  // "additionalData"에서 가장 많은 값을 찾는 함수
  const findMostFrequentAdditionalData = () => {
    // 각 요소의 등장 횟수를 계산하여 빈도수를 저장할 객체
    const frequencies = {};

    // survey 배열의 각 요소의 additionalData 값을 분석하여 빈도수 계산
    survey.forEach((item) => {
      const additionalData = item.additionalData;
      if (additionalData) {
        const elements = additionalData.split(', ');
        elements.forEach((element) => {
          if (frequencies[element]) {
            frequencies[element] += 1;
          } else {
            frequencies[element] = 1;
          }
        });
      }
    });

    // frequencies 객체에서 가장 높은 빈도수를 가진 요소를 찾음
    let mostFrequentData = '';
    let maxCount = 0;
    for (const element in frequencies) {
      if (frequencies[element] > maxCount) {
        mostFrequentData = element;
        maxCount = frequencies[element];
      }
    }

    return mostFrequentData;
  };

  // 결과를 표시할 변수를 만듦
  let resultelemental = '';
  let resultMessage = '';
  let resultexplane = '';
  let photo = '';
  let link = '';

  // "additionalData"에서 가장 많은 값에 따라 결과 메시지 설정
  const mostFrequentData = findMostFrequentAdditionalData();
  switch (mostFrequentData) {
    case '불':
      resultelemental = '엠버 이군요!!';
      resultMessage = '아무도 내 흥을 막을 수 없어 🤪';
      resultexplane =
        '흥을 빼면 0인 당신!!\n 주체할 수 없는 흥을 마구 발산시키는 분위기 메이커네요! 🥳\n집에서 쉬는 것보다 일하는게 좋아!!\n 바쁘고 즐거운 삶을 추구해 정적인 라이프와는 맞지 않군요.\n 3일동안 말 못 하는 것보단 3일 동안 떠드는게 차라리 나아요! 🤯\n술을 잘한다면 술자리는 최고!\n 술을 못한다면 물을 마셔서라도 술자리는 가야해요!\n 왜냐구요? 내 흥을 발산시켜야하거든요! 🍻\n밖에서 에너지를 다 쓰면 집에서는 가만히 있어야 해요.\n 충전해야 하거든요 어떻게 사람이 매일 매일 기분이 업 되어있을 수 있겠어요?  😏\n노는 것도 열심히, 일도 열심히 해요.\n 일을 못하는 자기 자신을 보는 게 너무 싫어요! 😔\n원하는게 분명해서 선택 장애는 없어요. 아주 단번에 고른답니다 ✔️';
      photo = 'fire.png';
      link = '/result_fire';
      break;
    case '물':
      resultelemental = '웨이드 이군요!';
      resultMessage = '홀로 자유로운게 좋아 😋';
      resultexplane =
        '당신은 낯선 사람을 보면 도망가는 부끄럼쟁이군요! 🤧\n나에게만 쏠리는 많은 관심은 사절!! 과도한 관심보다 적당한 관심이 더 기분 좋게 만들어요 😑\n하지만 이런 나와 친해진다면 그 누구보다도 빙구같은 매력을 보여줄 수 있어요! 🤪\n내 사람은 내가 챙긴다! 라는 마인드가 있어 친해지기 어려워도 한번 친해지면 깊은 관계를 맺을 수 있어요. 👩‍❤️‍💋‍👩\n친구들에게 괴롭힘도 종종 당할 것 같네요! 그러나 그런 관심은 싫지 않다!! 몰이 당하는 줄 알면서도 당해주는 편이에요 😉\n귀찮아하는 것 같지만 그래도 할건 하는 스타일! 해야겠다고 마음 먹으면 누구보다 계획적이죠! 🕐\n계획을 세우고 행동하는 신중한 성격이지만 나보다는 단체를 중시해서 나의 계획이 틀어져도 괜찮아요! 🤝"';
      photo = 'water.png';
      link = '/result_water';
      break;
    case '흙':
      resultelemental = '클로드 이군요!!';
      resultMessage = '밝은 얼굴에 근심걱정 한방울 💧';
      resultexplane =
        '생각보다 귀차니즘을 많이 타는 성격이에요!\n 할 필요성을 못느끼면 그 필요성이 생길 때까지 미루죠 😪\n그러나 하겠다고 마음만 먹으면 그 누구보다 열심히!!!\n 원하는 분야에서는 최고가 되고 싶어 해요. 💪\n항상 밝지만 내면에는 걱정이 많답니다.\n 은근 고민 거리도 많지만 누군가에게 피해주는 행동은 할 수 없어요..!\n 그렇기 때문에 착하다는 소리를 자주 들어요 😉\n즐겁게 노는 것을 좋아하는데 다수의 사람은 싫어요!\n 저랑 정말 친한 사람들이랑 놀고 싶어요 😚\n조용해보여도 사교성이 좋아요.\n 모든 사람들과 원만한 관계를 유지하는 사람이네요 👭\n혼자만의 시간이 필요하고\n 쉴 때는 혼자 내가 하고 싶은 걸 하면서 보내고 싶어요. 🏖️"';
      photo = 'soil.png';
      link = '/result_soil';
      break;
    case '바람':
      resultelemental = '게일 이군요!';
      resultMessage = '내키는 대로 사는 삶이 좋아 🥰';
      resultexplane =
        '자유 분방한 성격이라 누가 뭐라던 나의 길을 걸어요! 마이웨이 🤩\n호기심도 많고 항상 열린 마음으로 바라봐요. 세상 모든게 재밌고 좋아요! 🧐\n친구들과 어울리는 것도 좋아하고, 장난치는 것도 좋아해요 또 타인의 감정을 잘 이해하고 공감할 수 있는 최고의 친구랍니다~! 😘\n상상력이 풍부하고, 이상주의자 기질이 있어 혼자서 나만의 세계를 상상하는 걸 즐거워하군요? 이런 이유로 가끔은 4차원적이란 소리를 들을 때도 있어요 💭\n모든 일에 열정이 넘치고 하나보다는 여러 곳에 관심을 두는 성격이랍니다. 😝\n여러가지 생각이 많아서 창의적일 때가 있어요! 그러다보니 예술 분야에서 두각을 나타낼 때가 있어요 🎤"';
      photo = 'wind.png';
      link = '/result_wind';
      break;
    default:
      resultMessage = '결과가 없습니다.';
      break;
  }

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
        <div>엘리멘탈 캐릭터로 보는 성격 테스트 결과는??</div>

        <StResultsText>{resultelemental}</StResultsText>
        <STresultsImg src={photo} alt="이미지" />
      </StResultsHeader>
      <StResultMessage>{resultMessage}</StResultMessage>

      <StResultExplane>{resultexplane}</StResultExplane>
      <StResultsButton1>
        <Link to="/">
          <img src="ReStart.png" />
        </Link>
        <img src="LinkCopy.png" onClick={() => handleLinkCopy(`http://localhost:3000${link}`)} />
      </StResultsButton1>
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

const StFlagimg = styled.div`
  display: block;
  margin: auto;
  text-align: center;
  cursor: pointer;
  width: 40%;
`;
const StResultsHeader = styled.div`
  text-align: center;
  font-size: 20px;
  margin: 20px;
`;
const STresultsImg = styled.img`
  width: 400px;
  height: 550px;
  margin: auto;
  display: block;
`;
const StResultMessage = styled.div`
  margin: 20px auto;
  text-align: center;
  font-size: 24px; /* 텍스트 크기를 원하는 크기로 조정 */
  line-height: 1.5;
  max-width: 600px;
  font-weight: bold; /* 텍스트 강조를 위해 폰트 굵기를 추가 */
`;

const StResultsText = styled.div`
  text-align: center;
  font-size: 28px; /* 텍스트 크기를 원하는 크기로 조정 */
  font-weight: bold; /* 텍스트 강조를 위해 폰트 굵기를 추가 */
`;

const StResultExplane = styled.div`
  margin: 0 auto;
  text-align: left;
  white-space: pre-line; /* 줄바꿈을 활성화합니다. */
  max-width: 600px;
  padding: 20px;
  border: 2px solid #ccc;
  border-radius: 10px;
  background-color: #f7f7f7;
  line-height: 1.5;
`;

const StResultsButton1 = styled.button`
  margin: auto;
  display: block;
  background-color: #fff;
  border: #fff;
`;
const Thumbnail = styled.img`
  cursor: pointer;
`;
