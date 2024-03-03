const puppeteer = require("puppeteer-core");
const axios = require("axios");
const fs = require("fs");

const getPdf = async (link) => {
    console.log("link:",link)
    if (link.includes("google")) return link;
    
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: link,
        headers: { 
            'Accept-Encoding': 'gzip, deflate, br', 
            'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8', 
            'Accept-Language': 'en-US,en;q=0.5', 
            'Connection': 'keep-alive', 
            'Host': 'imsnsit.org', 
            'Referer': 'https://imsnsit.org/imsnsit/notifications.php', 
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36', 
        },
        responseType: 'arraybuffer',
    };
    var pdf;
    await axios.request(config)
    .then((response) => {
        const pdfBuffer = Buffer.from(response.data);
        pdf = pdfBuffer
    })
    .catch((error) => {
        console.log("Err rec:",error.data);
    });
    
    return pdf;
      
    
}

module.exports = getPdf;