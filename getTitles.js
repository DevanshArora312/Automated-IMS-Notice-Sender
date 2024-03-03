const puppeteer = require("puppeteer-core");
const fs = require("fs");

const main = async (lastNotice) =>{
    const url = "https://imsnsit.org/imsnsit/notifications.php"
    const browser = await puppeteer.launch({
        // args: [
        //     "--disable-setuid-sandbox",
        //     "--no-sandbox",
        //     "--single-process",
        //     "--no-zygote",
        // ],
        executablePath :  puppeteer.executablePath(),
            }
    );
    const page = await browser.newPage();
    await page.goto(url);

    const allNotice = await page.evaluate(async (lastNotice)=>{
        const titles1 = Array.from(document.querySelectorAll("form > table > tbody > tr:not([class]) > td.list-data-focus > a > font")).map(one => one.innerText);
        const titles2 = Array.from(document.querySelectorAll("form > table > tbody > tr:not([class]) > td > a.list-data-focus > font")).map(one => one.innerText)
        const links1 = Array.from(document.querySelectorAll('form > table > tbody > tr:not([class]) > td.list-data-focus > a')).map(one => one.getAttribute('href'));
        const links2 = Array.from(document.querySelectorAll('form > table > tbody > tr:not([class]) > td > a.list-data-focus')).map(one => one.getAttribute('href'));
        var notices1= [],notices2 = [];
        for(let i =0;i<titles1.length;i++){
            if(lastNotice[0].one === titles1[i])break;
            notices1.push({
                title : titles1[i],
                link : links1[i]
            })
        }
        for(let i =0;i<titles2.length;i++){
            if(lastNotice[0].two === titles2[i])break;
            notices2.push({
                title : titles2[i],
                link : links2[i]
            })
        }
        return {notices1,notices2};
    },lastNotice); 
    
    await browser.close();
    console.log(allNotice)
    return allNotice;

}

module.exports = main