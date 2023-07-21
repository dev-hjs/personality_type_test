// const express = require('express');
// const fs = require('fs');
// const app = express();
// const PORT = 4000;

// app.use(express.json());

// // 예시로 데이터를 담은 db.json 파일 경로
// const dbFilePath = 'db.json';

// // API 엔드포인트
// app.get('/api/data', (req, res) => {
//   try {
//     // db.json 파일에서 데이터를 읽어옵니다.
//     const jsonData = fs.readFileSync(dbFilePath, 'utf8');
//     const data = JSON.parse(jsonData);
//     res.json(data);
//   } catch (error) {
//     console.error('데이터를 읽어오는데 실패하였습니다:', error);
//     res.status(500).json({ error: '서버 오류' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
// });
