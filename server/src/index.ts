import express from "express";
import puppeteer from "puppeteer";

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://google.com/");

  res.send({
    title: await page.title(),
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server listening...");
});
