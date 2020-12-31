const puppeteer = require('puppeteer');

const user = 'edurnin';
const pass = 'Gen99005533';


(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.authenticate({username:`${user}`, password:`${pass}`});
  await page.goto('http://backoffice.genactis.corp/default.aspx', { waitUntil: 'domcontentloaded' });
//   await page.waitForNavigation({
//     waitUntil: 'networkidle0',
//   });
  await page.evaluate(() => {
    //let elements = document.getElementsByClassName('GridItem');
    let elements   =  document.querySelectorAll('.GridItem, .GridAltItem');
    for (let element of elements){

        //check for the sudies in prepartion OR fieldwork for the end dates! 
        try{
            const str = element.textContent
            if(str.includes('Fieldwork')){
                const dateStr =str.split('Fieldwork')
                const dates= dateStr[1]
                const endDate = dates.substr(- 13);
                console.log(endDate)
            }else {
                const dateStr =str.split('Preparation')
                const dates= dateStr[1]
                const endDate = dates.substr(- 13);
                console.log(endDate)
            }
        }catch(err){
            console.log(err)
        }
    
    }
});

})();



