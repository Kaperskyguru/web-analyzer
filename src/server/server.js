const express = require("express");
const axios = require("axios");

const app = express();

app.get("/ping", async (req, res) => {
  const startTime = process.hrtime();

  const { url } = req.query;

  await axios.get(url);

  const diff = process.hrtime(startTime);
  const elapsedTime = parseInt((diff[0] + diff[1] / 1e9) * 1000);

  res.json({
    url,
    time: `${elapsedTime}ms`,
  });
});

app.listen(8000, () => console.log("Server Running"));
