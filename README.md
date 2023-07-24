# 프로젝트 소개


## Elemental Character Personality Test !
- 영화 '엘리멘탈'을 주제로 한 성격 유형 검사로 가볍게 즐기면서 영화에 대한 흥미와 관심을 올릴 수 있습니다. JSON을 활용하여 데이터를 저장하였습니다.

### 배포주소
- https://personality-type-test.vercel.app

![제목 없는 다이어그램 drawio](https://github.com/hyungjungson/personality_type_test/assets/133640361/0be0cabc-78a8-475f-bac0-c07d5f0c8b97)


🥊 개발기간
(23.07.17~23.07.23)


## 화면구성

### *시작페이지 
![image](https://github.com/hyungjungson/personality_type_test/assets/133503493/8bc3f24e-e732-4a5d-a2b4-224a5095d6cd)


### *메인페이지
![image](https://github.com/hyungjungson/personality_type_test/assets/133503493/06f0082c-767a-4c0a-bef8-e7e6c88ec04d)


### *질문페이지
![image](https://github.com/hyungjungson/personality_type_test/assets/133503493/f50521ab-1e96-490d-953d-3bf69be91dd7)


### *결과페이지
![image](https://github.com/hyungjungson/personality_type_test/assets/133503493/dd033978-ed54-41f7-a4f5-e22347b7c898)
![image](https://github.com/hyungjungson/personality_type_test/assets/133503493/72587772-0641-47db-add7-27e61dc37a66)


## 주요기능
---
## 시작페이지
* LINK기능을 넣어 이미지 클릭시 메인페이지로 넘어가도록 구성하였습니다.
* 헤더부분에 있는 LOGO를 클릭하면 어느 페이지에서든 시작페이지로 올 수 있습니다.

## 메인페이지
* BACKGOUND에 영상을 넣어 시각적인 효과를 극대화하였습니다.
* JSON을 이용하여 테스트에 참여한 인원을 볼 수 있도록 구현하였습니다
* LINK 기능을 넣어 '테스트 하러 가기' 클릭시 질문 페이지로 넘어가도록 구성하였습니다.
  'LINK COPY'를 클릭시 Alert 창으로 링크가 복사 되었음을 알리고, 링크 복사가 가능합니다.

## 질문페이지
*구글 스프레드시트와 JSON을 이용하여 질문 페이지를 구성하였습니다.
*총 10가지 질문을 통해 알맞는 ID값이 결과값으로 나올 수 있게 구성하였습니다.

## 결과페이지
* 결과에 맞는 캐릭터 성격에 대한 간단 소개가 나와있습니다.
* '다시하기'를 클릭시 첫 화면으로 돌아가며 '링크복사'는 메인페이지와 동일하게 작동합니다.
* 하단부분에 유튜브API를 이용하여 '엘리멘탈'관련 영상들이 나올 수 있도록 하였고, 검색 기능을 통해 다른 영상도 찾아 볼 수 있습니다.
