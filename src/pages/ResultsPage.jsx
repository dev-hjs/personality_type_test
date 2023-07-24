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
    // console.log(location);
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
      resultelemental = '엠버 !!';
      resultMessage = '아무도 내 흥을 막을 수 없어 :바보같은_얼굴:';
      resultexplane =
        '흥을 빼면 0인 당신!!\n 주체할 수 없는 흥을 마구 발산시키는 분위기 메이커네요! :파티하는_얼굴:\n집에서 쉬는 것보다 일하는게 좋아!!\n 바쁘고 즐거운 삶을 추구해 정적인 라이프와는 맞지 않군요.\n 3일동안 말 못 하는 것보단 3일 동안 떠드는게 차라리 나아요! :폭발하는_머리:\n술을 잘한다면 술자리는 최고!\n 술을 못한다면 물을 마셔서라도 술자리는 가야해요!\n 왜냐구요? 내 흥을 발산시켜야하거든요! :건배:\n밖에서 에너지를 다 쓰면 집에서는 가만히 있어야 해요.\n 충전해야 하거든요 어떻게 사람이 매일 매일 기분이 업 되어있을 수 있겠어요?  :히죽거림:\n노는 것도 열심히, 일도 열심히 해요.\n 일을 못하는 자기 자신을 보는 게 너무 싫어요! :수심_어린:\n원하는게 분명해서 선택 장애는 없어요. 아주 단번에 고른답니다 :두꺼운_확인_표시:';
      photo = 'fire.png';
      link = '/result_fire';
      break;
    case '물':
      resultelemental = '웨이드 !!';
      resultMessage = '싫은소리 하는건 정말 어려워 :냠냠:';
      resultexplane =
        '당신은 낯선 사람을 보면 도망가는 부끄럼쟁이군요! :재채기하는_얼굴:\n나에게만 쏠리는 많은 관심은 사절!! 과도한 관심보다 적당한 관심이 더 기분 좋게 만들어요 :무표정:\n하지만 이런 나와 친해진다면 그 누구보다도 빙구같은 매력을 보여줄 수 있어요! :바보같은_얼굴:\n내 사람은 내가 챙긴다! 라는 마인드가 있어 친해지기 어려워도 한번 친해지면 깊은 관계를 맺을 수 있어요. :키스하는_두_여성:\n친구들에게 괴롭힘도 종종 당할 것 같네요! 그러나 그런 관심은 싫지 않다!! 몰이 당하는 줄 알면서도 당해주는 편이에요 :윙크:\n귀찮아하는 것 같지만 그래도 할건 하는 스타일! 해야겠다고 마음 먹으면 누구보다 계획적이죠! :시계_1시:\n혼자 계획을 세우고 행동하는 신중한 성격이지만 단체생활에도 적응하는데는 무리없어요!! :악수:"';
      photo = 'water.png';
      link = '/result_water';
      break;
    case '흙':
      resultelemental = '클로드 !!';
      resultMessage = '밝은 얼굴에 근심걱정 한방울 :물방울:';
      resultexplane =
        '생각보다 귀차니즘을 많이 타는 성격이에요!\n 할 필요성을 못느끼면 그 필요성이 생길 때까지 미루죠 :졸림:\n그러나 하겠다고 마음만 먹으면 그 누구보다 열심히!!!\n 원하는 분야에서는 최고가 되고 싶어 해요. :근육:\n항상 밝지만 내면에는 걱정이 많답니다.\n 은근 고민 거리도 많지만 누군가에게 피해주는 행동은 할 수 없어요..!\n 그렇기 때문에 착하다는 소리를 자주 들어요 :윙크:\n즐겁게 노는 것을 좋아하는데 다수의 사람은 싫어요!\n 저랑 정말 친한 사람들이랑 놀고 싶어요 :눈을_감고_키스하는_얼굴:\n조용해보여도 사교성이 좋아요.\n 모든 사람들과 원만한 관계를 유지하는 사람이네요 :손을_잡고_있는_두_여성:\n혼자만의 시간이 필요하고\n 쉴 때는 혼자 내가 하고 싶은 걸 하면서 보내고 싶어요. :파라솔이_있는_해변:';
      photo = 'soil.png';
      link = '/result_soil';
      break;
    case '바람':
      resultelemental = '게일 !!';
      resultMessage = '내키는 대로 사는 삶이 좋아 :하트_3개가_있는_웃는_얼굴:';
      resultexplane =
        '자유 분방한 성격이라 누가 뭐라던 나의 길을 걸어요! 마이웨이 :완전히_반한:\n호기심도 많고 항상 열린 마음으로 바라봐요. 세상 모든게 재밌고 좋아요! :단안경을_쓴_얼굴:\n친구들과 어울리는 것도 좋아하고, 장난치는 것도 좋아해요 또 타인의 감정을 잘 이해하고 공감할 수 있는 최고의 친구랍니다~! :키스_하트:\n상상력이 풍부하고, 이상주의자 기질이 있어 혼자서 나만의 세계를 상상하는 걸 즐거워하군요? 이런 이유로 가끔은 4차원적이란 소리를 들을 때도 있어요 :생각_풍선:\n모든 일에 열정이 넘치고 하나보다는 여러 곳에 관심을 두는 성격이랍니다. :눈을_감고_혀를_내민_얼굴:\n여러가지 생각이 많아서 창의적일 때가 있어요! 그러다보니 예술 분야에서 두각을 나타낼 때가 있어요 :마이크:"';
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
        <div>:물고기:사조참치:물고기:</div>
        <div>X</div>
        <div>엘리멘탈 캐릭터로 보는 성격 테스트 결과는??</div>
        <StResultMessage>{resultMessage}</StResultMessage>
        <StResultsText>{resultelemental}</StResultsText>
        <br></br>
        <STresultsImg src={photo} alt="이미지" />
      </StResultsHeader>
      <StResultExplane>{resultexplane}</StResultExplane>
      <StResultsButton1>
        <br></br>
        <Link to="/">
          <img src="ReStart.png" alt="다시하기 버튼" />
        </Link>
        <img
          src="LinkCopy.png"
          onClick={() => handleLinkCopy(`https://personality-type-test.vercel.app${link}`)}
          alt="링크 복사"
        />
      </StResultsButton1>
      <br></br>
      <StResultsText>▼OTHER LANGUAGES▼</StResultsText>
      <StFlagimg>
        <Multilingual src="USflag.png" alt="영문" />
        <Multilingual src="CAflag.png" alt="중문" />
        <Multilingual src="JPflag.png" alt="일문" />
        <br></br>
      </StFlagimg>
      <Videopart>
        <VideoListWrap>
          <br></br>
          <h1>
            귀여운 엘리멘탈 속 친구들이 더 궁금하다면!?
            <SearchForm>
              <SearchInput type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              <SearchButton onClick={handleSearch}>검색</SearchButton>
            </SearchForm>
          </h1>
          <VideoList>
            {videos.map((video) => (
              <VideoItem key={video.id.videoId}>
                <Thumbnail
                  src={video.snippet.thumbnails.default.url}
                  alt="thumbnail"
                  onClick={() => handleVideoClick(video.id.videoId)}
                />
                <VideoTitle>{video.snippet.title}</VideoTitle>
              </VideoItem>
            ))}
          </VideoList>
        </VideoListWrap>
      </Videopart>
    </>
  );
}
export default ResultsPage;
const StFlagimg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 40%;
  margin: 0 auto;
`;
const Multilingual = styled.img`
  width: 50px;
  margin: 0 4px;
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
  font-size: 20px; /* 텍스트 크기를 원하는 크기로 조정 */
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
const VideoListWrap = styled.div`
  margin: 0 auto;
  width: 800px;
  height: 300px;
  h1 {
    padding: 10px 13px 0;
    font-size: 20px;
    font-weight: bold;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
const SearchForm = styled.div`
  float: right;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Videopart = styled.div`
  margin-top: 30px;
  background-color: #ffffff;
  border: 5px solid #d6e8f9;
`;
const StResultsButton1 = styled.button`
  margin: auto;
  display: block;
  background-color: #fff;
  border: #fff;
`;
const VideoList = styled.ul`
  margin: 20px auto 30px;
  display: flex;
  justify-content: space-around;
  list-style: none;
  padding: 0;
`;
const VideoItem = styled.li`
  flex: 1;
  max-width: 134px;
`;
const VideoTitle = styled.h3`
  font-size: 15px;
  margin: 5px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;
const Thumbnail = styled.img`
  width: 100%;
  height: auto;
  cursor: pointer;
  &:hover {
    border: 3px solid #0e82e0;
  }
`;

const SearchInput = styled.input`
  padding: 6px;
  border: 2px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease-in-out;

  &:focus {
    border-color: #6e9ee6;
  }
`;
const SearchButton = styled.button`
  /* 원하는 스타일을 여기에 추가합니다 */
  background-color: #6e9ee6;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: #5b8cdb;
  }
`;
