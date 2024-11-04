const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

const port = 3000;

app.use(express.static("."));

// 최신 JSON 파일 가져오기 API
app.get("/latest-data", (req, res) => {
  const dataDir = path.join(__dirname, "data");

  fs.readdir(dataDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "데이터를 불러올 수 없습니다." });
    }

    const jsonFiles = files.filter((file) => file.startsWith("games_"));
    if (jsonFiles.length === 0) {
      return res.status(404).json({ error: "데이터 파일이 없습니다." });
    }

    const latestFile = jsonFiles.sort().reverse()[0];
    const filePath = path.join(dataDir, latestFile);

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return res.status(500).json({ error: "파일을 읽을 수 없습니다." });
      }
      res.json(JSON.parse(data));
    });
  });
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
