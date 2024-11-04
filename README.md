# 구글 플레이 게임 순위 크롤링

Selenium과 Node.js를 사용하여 Google Play Store의 게임 순위를 크롤링하는 프로젝트

## 학습 내용

- selenium, nodejs를 활용한 웹크롤링
- axios 라이브러리가 아닌, fetch를 활용한 개발
- 크롤링 및 화면 렌더링에 대해 async/await로 비동기 처리
- fs 모듈을 활용한 파일 생성

## 프로젝트 구조

-- index.js # 크롤링 스크립트

-- index.html # 결과 표시 웹페이지

-- css

    ㄴ main.css # 스타일시트

-- data/ # 크롤링 결과 저장 디렉토리

## 기능

- Google Play Store 게임 카테고리 순위 크롤링
- 크롤링한 데이터를 JSON 파일로 로컬에 저장
- 웹페이지에서 크롤링 데이터 구현
- express로 api 구현

## 사용 기술

- Node.js
- Selenium WebDriver
- Chrome WebDriver
- HTML/CSS/JavaScript
- express

## 설치 방법

1. npm i / 의존성 설치
2. node index.js / 크롤링 실행
3. express 실행 / 로컬 저장소가 아닌, api 구현 시 실행
4. html 파일 실행
