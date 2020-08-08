const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer");
const serveStatic = require("serve-static");
const path = require("path");

const app = express();
app.use(cors());

app.get("/ping", async (req, res) => {
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

app.use("/", serveStatic(path.join(__dirname, "../dist")));

app.get(/.*/, function(req, res) {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

function generateKey() {
  return Math.random()
    .toString(36)
    .substring(5);
}

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log("Server Running on " + PORT));
