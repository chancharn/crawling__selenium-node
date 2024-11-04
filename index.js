/**
 * 구글 플레이 스토어 게임 랭킹 크롤링
 */

// 크롬 드라이버 설치 (selenium 사용 시 필요)
// http://chromedriver.storage.googleapis.com/index.html

const { Builder, By, until } = require("selenium-webdriver");
const fs = require("fs"); // 파일 CRUD하는 nodejs 내장 모듈
const path = require("path"); // 경로 처리 모듈

async function main() {
  // 크롬 드라이버 생성
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // 데이터 저장 경로
    const dataDir = path.join(__dirname, "data");

    // data라는 폴더가 없으면 생성πø
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
    }

    // 구글 플레이 스토어 게임 랭킹 페이지 접속
    await driver.get("https://play.google.com/store/games");

    await driver.wait(
      until.elementLocated(By.className("sT9ø3pb DdYX5 OnEJge")), // crawling 대상 요소
      10000, // 로딩 시간 (10초)
      "로딩 시간 (10초) 초과"
    );

    let userAgent = await driver.executeScript("return navigator.userAgent");

    let searchNames = await driver.findElements(
      By.className("sT93pb DdYX5 OnEJge")
    );

    // 결과 저장 배열
    const result = [];

    for (let i = 0; i < searchNames.length; i++) {
      const rank = i + 1;

      // getText 함수는 비동기라 await 추가
      const name = await searchNames[i].getText();

      result.push({ rank, name });
    }

    // 현재 시간을 파일명에 포함
    const now = new Date();
    const timestamp =
      now.getFullYear() +
      String(now.getMonth() + 1).padStart(2, "0") +
      String(now.getDate()).padStart(2, "0") +
      "_" +
      String(now.getHours()).padStart(2, "0") +
      String(now.getMinutes()).padStart(2, "0") +
      String(now.getSeconds()).padStart(2, "0");

    const fileName = `result_${timestamp}.json`;
    const filePath = path.join(dataDir, fileName);

    fs.writeFileSync(filePath, JSON.stringify(result, null, 2));
  } catch (err) {
    console.error("error", err);
  } finally {
    await driver.quit();
  }
}

main();
