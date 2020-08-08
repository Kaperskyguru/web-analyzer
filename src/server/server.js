const express = require("express");
const axios = require("axios");
const cors = require("cors");
const puppeteer = require("puppeteer");

const app = express();
app.use(cors());

app.get("/ping", async (req, res) => {
  try {
    const startTime = process.hrtime();

    const { url } = req.query;

    await axios.get(url);

    const diff = process.hrtime(startTime);
    const elapsedTime = parseInt((diff[0] + diff[1] / 1e9) * 1000);

    return res.json({
      address: url,
      result: elapsedTime,
      icon: "Laravel",
      key: "asasd",
    });
  } catch (error) {
    return res.json({
      status: 500,
      message: "Error occurred",
    });
  }
});

app.get("/puppeteer", async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    let { url } = req.query;

    await page.goto(url);

    const pref = await page.evaluate((url) => {
      const { loadEventEnd, navigationStart } = performance.timing;

      let icon =
        document.querySelector('link[rel="icon"]') ||
        document.querySelector('link[rel="shortcut icon"]');

      let iconHref = "";
      if (icon == null) {
        iconHref = url + "/favicon.ico";
      } else {
        iconHref = icon.getAttribute("href");
      }

      return {
        loadTime: loadEventEnd - navigationStart,
        icon: iconHref,
      };
    }, url);

    await browser.close();
    return res.json({
      address: url,
      result: pref.loadTime,
      icon: pref.icon,
      key: generateKey(),
    });
  } catch (error) {
    return res.json({
      status: 500,
      message: "Error occurred",
      error: error,
    });
  }
});

function generateKey() {
  return Math.random()
    .toString(36)
    .substring(5);
}

app.listen(9000, () => console.log("Server Running"));
