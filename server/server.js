const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer");
const serveStatic = require("serve-static");
const path = require("path");

const app = express();
app.use(cors());
app.use(serveStatic(path.join(__dirname, "../dist")));

app.get("/ping", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  try {
    const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
    const page = await browser.newPage();

    //Important optimizations to get accurate results
    await page.setCacheEnabled(false);
    await page.setRequestInterception(true);
    page.on("request", (request) => {
      if (request.resourceType() === "document") {
        request.continue();
      } else {
        request.abort();
      }
    });
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

// app.use("/static"));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

function generateKey() {
  return Math.random()
    .toString(36)
    .substring(5);
}

// const production = 'https://examplePage.com';
// const development = 'http://localhost:3000/';
// const url = (process.env.NODE_ENV ? production : development);
const PORT = process.env.PORT || 9000;
const server = app.listen(PORT, () => {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Server listening at http://%s:%s", host, port);
});
