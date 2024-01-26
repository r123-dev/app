// server.js
const express = require('express');
const fs = require('fs').promises;

const app = express();
const PORT = 8080;

app.get('/data', async (req, res) => {
  const { n, m } = req.query;
  if (!n) {
    return res.status(400).send('Parameter n is required');
  }

  try {
    const filePath = `/tmp/data/${n}.txt`;
    const fileContent = await fs.readFile(filePath, 'utf-8');
    if (m) {
      const lines = fileContent.split('\n');
      if (m <= lines.length) {
        return res.send(lines[m - 1]);
      } else {
        return res.status(400).send(`Line number ${m} is out of range`);
      }
    } else {
      return res.send(fileContent);
    }
  } catch (error) {
    return res.status(500).send('Internal server error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
