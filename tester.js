const puppeteer = require('puppeteer');

(async () => {

 
  let choices = {AnswerForS1: 0, AnswerForS2: 1, AnswerForS3: 300};

  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  const newpage = await GoToLink(page);

  //await s1(page, choices.AnswerForS1);
  //check what question I am on now, returned from s1 after the page click 
  //then based on that do a switch and enter the answers for the approiate question
  //await s2(page, choices.AnswerForS2);

const CurrentQuestion = await GetCurrentQuestion(newpage);
console.log(CurrentQuestion);



// //s3
// await page.waitForSelector('input[type=text]') 
// await page.focus('#ctl00_ContentPlaceHolder1_Integer_SEPAR_Q00S04_TextBox1')
// await page.keyboard.type('10')
// await page.click('#ctl00_ContentPlaceHolder1_ButtonNext');
  
})();


async function GoToLink(page) {
  await page.goto('https://www2.genactis.net/log.asp?ID=29V31VO87uL0600mM11O0');
  //accept conditions
  const newpage = await  ClickNextButton(page);
  return newpage;
}



async function ClickNextButton(page) {
  await  page.click('#ctl00_ContentPlaceHolder1_ButtonNext');
  //GetCurrentQuestion(page);
  return page;
}

async function GetCurrentQuestion(page) {
const question = page
                  .waitForXPath('//*[@id="ctl00_ContentPlaceHolder1_panel1"]/span[1]/text()')
                  .then(() => {
                  return page.evaluate(() => {
                          let elements = document.getElementsByClassName('questiontext');
                          return elements[0].innerText.split('.')[0]
                      });       
                  });
return question; 
}


async function s1(page, choice) {

  await page.waitForSelector('input[type=radio]') 
  await page.evaluate( (choice) => {
    let radio = document.querySelectorAll('input[type=radio]');
    radio[choice].click();

  }, choice);
  await ClickNextButton(page);
  return;
}

async function s2(page, choice) {
 await page.waitForSelector('input[type=checkbox]') 
 await page.evaluate((choice) => {
  let checkbox = document.querySelectorAll('input[type=checkbox]');
  checkbox[choice].click();
},choice);
  await ClickNextButton(page);
  return;
}

async function s3(page, choice) {
  await page.waitForSelector('input[type=checkbox]') 
  await page.evaluate((choice) => {
   let checkbox = document.querySelectorAll('input[type=checkbox]');
   checkbox[choice].click();
 },choice);
   await ClickNextButton(page);
   return;
 }