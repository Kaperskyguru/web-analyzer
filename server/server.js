const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer");
const serveStatic = require("serve-static");
const path = require("path");
const app = express();
app.use(cors());
app.use(serveStatic(path.join(__dirname, "../dist")));

app.get("/ping", async (req, res) => {
  let browser;
  try {
    // Launch a new Browser
    browser = await puppeteer.launch({
      headless: false,
      args: ["--no-sandbox"],
    });
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

    // Visit page and catch any error
    let { url } = req.query;
    await page.goto(parseURL(url)).catch(async (error) => {
      await browser.close();
      return res.json({
        status: 500,
        message: "Error Occurred, Please check the web address and try again",
        error: error,
      });
    });

    // Evaluate page and get Load Time and Favicon
    const pref = await page.evaluate((url) => {
      const { loadEventEnd, navigationStart } = performance.timing;

      console.log(loadEventEnd, navigationStart);
      // Generate Favicon
      let icon =
        document.querySelector('link[rel="icon"]') ||
        document.querySelector('link[rel="shortcut icon"]');

      let iconHref = "";
      if (icon == null) {
        iconHref = url + "/favicon.ico";
      } else {
        iconHref = icon.getAttribute("href");
      }

      if (iconHref.substr(0, 2) === "./") {
        iconHref = url + iconHref.substr(1, iconHref.length);
      }

      return {
        loadTime: loadEventEnd - navigationStart,
        icon: iconHref,
      };
    }, url);

    // Close Browser and return result
    await browser.close();
    return res.json({
      address: url,
      result: pref.loadTime,
      icon: pref.icon,
      key: generateKey(),
    });
  } catch (error) {
    await browser.close();
    return res.json({
      status: 500,
      message: "Error Occurred",
    });
  }
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

function generateKey() {
  return Math.random()
    .toString(36)
    .substring(5);
}

function parseURL(url) {
  if (url.substr(0, 2) === "ww") {
    url = "https://" + url;
  }
  return url;
}

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {});
