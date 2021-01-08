const puppeteer = require('puppeteer');
const nodemailer = require('nodemailer');

const user = 'edurnin';
const pass = 'Gen99005533';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.authenticate({username:`${user}`, password:`${pass}`});
  await page.goto('http://backoffice.genactis.corp/default.aspx', { waitUntil: 'domcontentloaded' });
  const info = await page.evaluate(() => {
      
    let endDates = [];
    let studies = [];  
    let info = {
      endDates,
      studies
       };

    let elements   =  document.querySelectorAll('.GridItem, .GridAltItem');
    for (let element of elements){
            const str = element.textContent
            if(str.includes('Fieldwork')){
                const dateStr =str.split('Fieldwork')
                const dates= dateStr[1]
                const endDateAsString = dates.substr(- 13);
                endDates.push(endDateAsString);
                studies.push (dateStr[0])
            }
    }
    return info;
   
});
await browser.close();

const today = todaysDate(); 

for (i = 0; i < info.endDates.length; i++) {
    const date1 = new Date(`${today}`);
    const date2 = new Date(`${info.endDates[i]}`);
    const daysLeft = numberOfDaysLeft(date1, date2);
    const studyInfo = info.studies[i].trim();
    if (daysLeft < 10){
        const notifaction = (studyInfo+" ends in " + daysLeft +" days")
        sendAnEmail(notifaction);
    }
  }

} )();

function numberOfDaysLeft(firstDate, secondDate){

    const diffTime= secondDate-firstDate
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    if(diffDays >=0){
        return diffDays; 
    } else {
        return 'Study ended';
    }

}

function todaysDate(){

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;

    return today;
}


function sendAnEmail(content){

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'genactisburner@gmail.com',
          pass: 'Gen99005533*' // naturally, replace both with your real credentials or an application-specific password
        }
      });
      
      const mailOptions = {
        from: 'genactisburner@gmail.com',
        to: 'edurnin@genactis.com',
        subject: `${content}`,
        text: `${content}`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}
  

