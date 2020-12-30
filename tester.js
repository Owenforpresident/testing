const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

//load the survey page
await page.goto('https://www2.genactis.net/log.asp?ID=29V31VO87uL0600mM11O0');

//accept conditions
await page.click('#ctl00_ContentPlaceHolder1_ButtonNext');

//s1
await page.waitForSelector('input[type=radio]') 
await page.evaluate(() => {
  let radio = document.querySelectorAll('input[type=radio]');
  radio[0].click();
});
await page.click('#ctl00_ContentPlaceHolder1_ButtonNext');

//check what question I am on now
//s2
await page.waitForSelector('input[type=checkbox]') 
await page.evaluate(() => {
  let checkbox = document.querySelectorAll('input[type=checkbox]');
  checkbox[0].click();
});
await page.click('#ctl00_ContentPlaceHolder1_ButtonNext');


//s3
await page.waitForSelector('input[type=text]') 
await page.focus('#ctl00_ContentPlaceHolder1_Integer_SEPAR_Q00S04_TextBox1')
await page.keyboard.type('10')
await page.click('#ctl00_ContentPlaceHolder1_ButtonNext');
  

 


})();

