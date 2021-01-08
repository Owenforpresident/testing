const { Console } = require('console');
const puppeteer = require('puppeteer');

(async () => {

  let choices = {AnswerForS1: 0, AnswerForS2: 1, AnswerForS3: 300};

  //launch the browser
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  //got to new clean survey link and click accept
  const newpage = await GoToLink(page);
 //answer question 1 with choice
  const newpage1 = await s1(newpage, choices.AnswerForS1);
 //get the current question 
  let CurrentQuestion = await GetCurrentQuestion(newpage1);

 //check if the correct question was returned based on the answers object 
  let currentQuestionCheck = isCurrentQuestionCorrect(CurrentQuestion, choices)
  if(currentQuestionCheck == 1) {
    const newpage2 = await s2(newpage1, choices.AnswerForS2)
  }
 
 

//   //if the next question is s2, answer it 
//  if(CurrentQuestion = 's2') { 
//    const newpage2= await s2(newpage1, choices.AnswerForS2)
//  }else {
//    //otherwise, log error because it should be s2 if s1=1
//    console.log('error')
//  }



  // switch (CurrentQuestion) {
  //   case 'S2':
  //     pathTaken.push('s2')
  //    const await s2(page, choices.AnswerForS2);
  //     break;
  //   case 'Papayas':
  //     console.log('Mangoes and papayas are $2.79 a pound.');
  //     break;
  //   default:
  //     console.log(CurrentQuestion);
  // }
  

 //await s2(page, choices.AnswerForS2);

// //s3
// await page.waitForSelector('input[type=text]') 
// await page.focus('#ctl00_ContentPlaceHolder1_Integer_SEPAR_Q00S04_TextBox1')
// await page.keyboard.type('10')
// await page.click('#ctl00_ContentPlaceHolder1_ButtonNext');
  
})();


async function GoToLink(page) {
  await page.goto('https://www2.genactis.net/log.asp?ID=29cU050787uK0601mM11O0');
  //accept conditions
  await  ClickNextButton(page);
  return page;
}

async function ClickNextButton(page) {
  const newPage = await  page.click('#ctl00_ContentPlaceHolder1_ButtonNext');
  return newPage;
}

async function GetCurrentQuestion(page) {
const question = page
                  .waitForXPath('//*[@id="ctl00_ContentPlaceHolder1_panel1"]/span[1]')
                  .then(() => {
                  return page.evaluate(() => {
                          let elements = document.getElementsByClassName('questiontext');
                          return elements[0].innerText.split('.')[0]
                      });       
                  });                  
return question; 
}

async function isCurrentQuestionCorrect(CurrentQuestion, choices) {
  
  switch (CurrentQuestion) {
    case 'S2':
     if(choices.AnswerForS1 == 0){
        return 1;
     }else {
       console.log('found an error')
     }
      break;
    case 'Papayas':
      console.log('Mangoes and papayas are $2.79 a pound.');
      break;
    default:
      console.log(CurrentQuestion);
  }
}

async function s1(page, choice) {

  await page.waitForSelector('input[type=radio]') 
  await page.evaluate( (choice) => {
    let radio = document.querySelectorAll('input[type=radio]');
    radio[choice].click();

  }, choice);
  await ClickNextButton(page);
  return page;
}

async function s2(page, choice) {
 await page.waitForSelector('input[type=checkbox]') 
 await page.evaluate((choice) => {
  let checkbox = document.querySelectorAll('input[type=checkbox]');
  checkbox[choice].click();
},choice);
  await ClickNextButton(page);
  return page;
}

// async function s3(page, choice) {
//   await page.waitForSelector('input[type=checkbox]') 
//   await page.evaluate((choice) => {
//    let checkbox = document.querySelectorAll('input[type=checkbox]');
//    checkbox[choice].click();
//  },choice);
//    await ClickNextButton(page);
//    return;
// }