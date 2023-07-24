# 프로젝트 소개


## Elemental Character Personality Test !
- 영화 '엘리멘탈'을 주제로 한 성격 유형 검사로 가볍게 즐기면서 영화에 대한 흥미와 관심을 올릴 수 있습니다. JSON을 활용하여 데이터를 저장하였습니다.

### 배포주소
- https://personality-type-test.vercel.app

![제목 없는 다이어그램 drawio](https://github.com/hyungjungson/personality_type_test/assets/133640361/3d909ca6-7611-41ae-a256-20b6ca87778f)

🥊 개발기간
(23.07.17~23.07.23)
## 🌹: Stacks
### Environment

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)

### Development

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"/>

<br/><br/>
## 화면구성

### *시작페이지 
![image](https://github.com/hyungjungson/personality_type_test/assets/133503493/8bc3f24e-e732-4a5d-a2b4-224a5095d6cd)


### *메인페이지
![image](https://github.com/hyungjungson/personality_type_test/assets/133503493/06f0082c-767a-4c0a-bef8-e7e6c88ec04d)


### *질문페이지
![image](https://github.com/hyungjungson/personality_type_test/assets/133503493/f50521ab-1e96-490d-953d-3bf69be91dd7)


### *결과페이지
![image](https://github.com/hyungjungson/personality_type_test/assets/133503493/b009dd78-58f5-463f-b235-08b19ac42164)
![image](https://github.com/hyungjungson/personality_type_test/assets/133503493/a8cfb587-f8cc-4621-9223-d8f3b6ac5ba4)



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

## 📌 트러블 슈팅

#### 구글스프레드 API 이슈
-현상: 구글 스프레드 API 를 바로 가져오지 못함  
-원인: 리엑트 라이브러리에서 더이상 지원을 하지않음  
-해결책: react: ^18.2.0  
        react-scripts: ^4.0.2  
        google-spreadsheet: ^3.3.0  
버전을 다운그레이드해서 해결  

#### 버셀 배포 이슈
-현상:버셀 배포할때 알수없는 빌드 오류가 발생함  
-원인:스프레드를 불러오기 위해 다운그레이드 했기때문에 버셀 환경변수가 어긋나는 오류 발생  
-해결책:
 "start": "react-scripts --openssl-legacy-provider start",  
 "build": "react-scripts --openssl-legacy-provider build",  
동일하게 세팅해준다!  

#### 유튜브 API 렌더링 이슈
-현상:유튜브 API 동영상 불러오기 오류 (검색을 하다보면 갑자기 검색이 안됨)  
-원인:할당량 문제/ 프로젝트 테스트를 위해 여러번 api 를 발급받고 실행하다보니 axios 에러 발생 !!  
-해결책:새 프로젝트를 생성후 새로운 api 를 발급 받아야 한다.  

#### 데이터베이스 에러 이슈
-현상:배포후 db.json 데이터베이스 서버 오류  
-원인:버셀로 json-server를 쓰면 read-only 에러가 발생하는 경우가 많다  
-해결책: git 으로 json-server를 배포한후에 프로젝트에서 로컬로 지정했던 url 을 글리치로 배포한 url로 수정해준다!  
 
