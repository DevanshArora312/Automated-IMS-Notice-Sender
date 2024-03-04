
let puppeteer;
let chromium = {};
if (!process.env.AWS_LAMBDA_FUNCTION_VERSION) {
    // chrome = require("chrome-aws-lambda");
    chromium = require("@sparticuz/chromium")
    puppeteer = require("puppeteer-core");
} else {
    puppeteer = require("puppeteer");
}

const main = async (lastNotice) =>{
    let options = {};
    if (!process.env.AWS_LAMBDA_FUNCTION_VERSION) {
        console.log(await chromium.executablePath)
        options = {
            args: [...chromium.args],
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath,
            headless: true,
            ignoreHTTPSErrors: true,
            args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--single-process",
            ],
            ignoreDefaultArgs: ["--disable-extensions"],
            ignoreHTTPSErrors: true,
        };
    }
    
    const url = "https://imsnsit.org/imsnsit/notifications.php"
    const browser = await puppeteer.launch(options);
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